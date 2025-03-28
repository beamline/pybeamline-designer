import {Compiler} from "./Compiler.js";
import {ExtendedBlock, UnionData } from "./Syntax.js";
import {maxHeaderSize} from "node:http";


export class Handler {

    private compiler : Compiler;
    private counters  = {
        "source" : 0,
        "pipe" : 0,
        "union" : 0
    };
    private unionData: UnionData = {
    };
    private customDefinitions : string[] = []

    public constructor(compiler : Compiler) {
     this.compiler = compiler;
    }


    public resetCounters() {
        this.counters  = {
            "source" : 0,
            "pipe" : 0,
            "union" : 0
        };
        this.unionData = {};
        this.customDefinitions = [];
    }

    public processBlock (block : ExtendedBlock, currentString : string) : string {

        if (block.descriptors.name.includes("custom")) {
            return this.handleCustom(block,  currentString)
        }

        if (block.descriptors.name == ("lambda_operator")) {
            return this.handleLambdaOp(block, currentString)
        }

        //Checks if the block has an input property, i.e. is a union (or a custom union)
        if (block.input) {
            return this.handleUnion(block, currentString);
        }
        if (block.descriptors.inputType === null) {
            return this.handleSource(block,  currentString);
        }
        if (block.descriptors.outputType === null) {
            return this.handleSink(block, currentString)
        }

        return this.handleDefault(block,  currentString)


    }

    private handleLambdaOp (block : ExtendedBlock, currentString : string) : string {
        this.defineFunction(block, currentString);

        return currentString + "\t" + block.function.slice(0, -1) + block.parameters.functionName + "),\n"

    }

    private handleCustom (block : ExtendedBlock, currentString : string) : string {
        this.defineFunction(block, currentString)
        block["function"] = block.parameters.functionName + "()"


        //CASE: Custom block is a union
        if (block.input) {
            return this.handleUnion(block,  currentString)
        }
        //CASE: Custom block is a source
        if (block.descriptors.inputType === null) {
            this.compiler.appendBodyString(`source_${this.counters.source} = ${block.function}\n`)
            currentString += `source_${this.counters.source}.pipe( \n`
            this.counters.source++
            return currentString
        }
        //CASE: Custom block is a sink
        if (block.descriptors.outputType === null) {
            block.function = ".subscribe(" + block.function.slice(0, -2) + ")";
            this.compiler.appendBodyString(`${currentString.slice(0, -2)}\n)${block.function}\n\n`)
            return currentString
        }

        //CASE: Custom block is an operator
        return `${currentString}\t${block.function},\n`

    }


    private handleDefault (block : ExtendedBlock, currentString : string) : string {
        if (block.header) {
            this.compiler.appendHeadString(`${block.header}${block.id} ${block.auxHeader}\n\n`)
        }

        return `${currentString}\t${this.addParametersToPipeline(block)},\n`
    }

    private handleSink(block : ExtendedBlock, currentString : string) :string {

        this.compiler.appendBodyString(`${currentString.slice(0, -2)}\n)${this.addParametersToPipeline(block)}\n\n`)
        return currentString

    }

    private handleUnion (block : ExtendedBlock, currentString : string) : string {

        let newString = "";

        //Adds the union block to the counter if not already existing
        if (!(block.id in this.unionData)) {
            this.unionData[block.id] = {
                //@ts-ignore
                counter: block.input,
                //open the bracket of the union()
                mergeString: block.function.slice(0, -1),
                pass : false
            };
        }


        this.compiler.appendBodyString(`pipe_${this.counters.pipe} = ${currentString.slice(0, -2)})\n\n`);

        //@ts-ignore
        this.unionData[block.id].mergeString += `${this.unionData[block.id].counter < block.input ? ", " : ""}pipe_${this.counters.pipe}`;
        this.unionData[block.id].counter--;
        this.counters.pipe++;

        //close the function and continue with the diagram
        if (this.unionData[block.id].counter === 0) {
            this.compiler.appendBodyString("union_" + this.counters.union + " = " + this.unionData[block.id].mergeString + ")\n\n")
            newString = "union_" + this.counters.union + ".pipe( \n"
            this.unionData[block.id].pass = true;
            this.counters.union++;
        }

        return newString;
    }

    public tryPass( block : ExtendedBlock ) : boolean {

        if ((this.unionData[block.id] === undefined)) {
            return true
        }
        return this.unionData[block.id].pass;

    }

    private defineFunction (block : ExtendedBlock, currentString : string) : void {

        //Add the function definition to the head code if not already present
        if (!(this.customDefinitions.includes(block.id))) {
            this.compiler.appendHeadString(block.parameters.functionBody + "\n\n")
            this.customDefinitions.push(block.id)
        }


    }

    private handleSource (block : ExtendedBlock, currentString : string) : string {

        this.compiler.appendBodyString(`source_${this.counters.source} = ${this.addParametersToPipeline(block)}\n`)

        currentString += `source_${this.counters.source}.pipe( \n`
        this.counters.source++

        return currentString

    }

    private addParametersToPipeline (block : ExtendedBlock) : string {

        //Open bracket
        let resultString : string = block.function.slice(0, -1);

        if (Object.keys(block).includes("header")) {
            //@ts-ignore
            resultString += block.id;
        }

        //If there are no parameters return
        if (Object.keys(block.parameters).length == 0) {
            return resultString + ")"
        }


        // Add parameters to the result string
        for (const parameter in block.parameters) {
                resultString += `${parameter} = ${block.parameters[parameter]}, `;
        }
        // Remove the comma and space
        resultString = resultString.slice(0, -2);

        // Close the bracket and return the result
        return resultString + ")";
    }

}