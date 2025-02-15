import { readFileSync } from "fs";
import { UserPipeline, Block, Category, Params, Graph } from "./Syntax.js";



export class CodeGen {
    private filePath : string;
    private finalString: string;
    private counter : number = 0;

    private userPipeline : any;

    public constructor(filePath: string) {
        this.filePath = filePath;

        if (this.filePath !== "") {
            this.userPipeline = JSON.parse(readFileSync(this.filePath, "utf-8"));
        }

        this.finalString = "";

    }

    public traverseDiagram (diagram : UserPipeline = this.userPipeline, callback : Function = this.stringGenerator.bind(this) ) : string {
        //Reset the finalString
        this.finalString = "";
        //Iterates through block and assigns id as key, Object is { id : block } for all ids and blocks
        const blocks : Graph = diagram.blocks.reduce((acc : Graph, block : Block ) => {
            acc[block.id] = block;
            return acc;
        }, {});

        const visit = (blockId : string, currentString : string) => {
            // Process the block
            const newString =callback (currentString, blocks[blockId]);

            // Visit all outputs (following the one-way directional constraint)
            blocks[blockId].outputs.forEach((id)=>visit(id, newString));
        };

        // Find and start traversal from all source blocks (blocks with no input)
        Object.values(blocks)
            .filter(block => !block.input)
            .forEach(block => visit(block.id,""));

        return this.finalString;

    }


    private addParametersToPipeline (block : Block) : string {
        let resultString : string = block.category.name + "(";
        let parameters : Params = block.parameters;

        // Check if there are parameters
        if (Object.keys(parameters).length > 0) {
            // Add parameters to the result string
            for (const parameter in parameters) {
                resultString += `${parameter} = ${parameters[parameter]}, `;
            }
            // Remove the comma and space
            resultString = resultString.slice(0, -2);
        }
        // Close the bracket and return the result
        return resultString + ")";
    }

    private stringGenerator(currentString : string, block : Block) : string {
        let newString : string = currentString;

        if (block.category.type === "source"){
            this.finalString += "source_" + this.counter + " = " + this.addParametersToPipeline(block) + "\n"
            newString+="source_" + this.counter + ".pipe(\n"
            this.counter++

        }
        else if (block.outputs.length === 0) {
            //removes ", " from the sink (for readability purposes)
            this.finalString += newString.slice(0, -2) + "\n)" + this.addParametersToPipeline(block) + "\n"
        }
        else {
            newString += this.addParametersToPipeline(block) + ",\n"
        }

        return newString
    }


    public updateFilepath (newFilePath : string) {
        this.filePath = newFilePath;

        if (this.filePath !== "") {
            this.userPipeline = JSON.parse(readFileSync(this.filePath, "utf-8"));
        }
        //Reset the finalString
        this.finalString = "";
    }


    //For debugging purposes
    public printCode() {
        console.log(this.finalString)
    }

}

/*
const codeGenerator : CodeGen = new CodeGen("./tests/test1.json");
codeGenerator.traverseDiagram()
codeGenerator.printCode()
*/