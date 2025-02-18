import { readFileSync } from "fs";
import { UserPipeline, Block, Category, Params, Graph, UnionCounters} from "./Syntax.js";



export class Traverser {

    private blocks: Graph={};
    private finalString: string = "";
    private sourceCounter : number = 0;
    private pipeCounter : number = 0;
    private unionCounters: UnionCounters = {};


    public traverseDiagram (userPipeline : UserPipeline ) : string {
        //Reset the variables
        this.finalString = "";
        this.sourceCounter = 0;
        //Iterates through block and assigns id as key, Object is { id : block } for all ids and blocks
        this.blocks = userPipeline.blocks.reduce((acc : Graph, block : Block ) => {
            acc[block.id] = block;
            return acc;
        }, {});

        // Find and start traversal from all source blocks (blocks with no input)
        Object.values(this.blocks)
            .filter(block => !block.input)
            .forEach(block => this.visit(block.id,""));

        return this.finalString;

    }

    private visit (blockId : string, currentString : string){

        if (this.blocks[blockId].category.type === "union"){
            this.union(blockId, currentString)
        } else {
            // Process the block
            const newString =this.stringGenerator.bind(this)(currentString, this.blocks[blockId]);

            // Visit all outputs (following the one-way directional constraint)
            this.blocks[blockId].outputs.forEach((id)=>this.visit(id, newString));
        }


    };


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
            this.finalString += "source_" + this.sourceCounter + " = " + this.addParametersToPipeline(block) + "\n"
            newString+="source_" + this.sourceCounter + ".pipe( \n"
            this.sourceCounter++

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

    private union(blockId: string, currentString: string) {
        const pipeName = `pipe_${this.pipeCounter}`;
        const trimmedString = currentString.slice(0, -2); // Removing last ", "

        if (!(blockId in this.unionCounters)) {
            this.unionCounters[blockId] = {
                //@ts-ignore
                counter: this.blocks[blockId].input.length,
                mergeString: `${this.blocks[blockId].category.name}( `
            };
        }

        this.finalString += `${pipeName} = ${trimmedString})\n`;
        //@ts-ignore
        this.unionCounters[blockId].mergeString += `${this.unionCounters[blockId].counter < this.blocks[blockId].input.length ? ", " : ""}${pipeName}`;
        this.unionCounters[blockId].counter--;
        this.pipeCounter++;

        //TODO: Fix bug causing merge (...) to not have a closing )
        if (this.unionCounters[blockId].counter === 0) {
            this.unionCounters[blockId].mergeString += this.blocks[blockId].outputs.length ? `.pipe(\n` : `\n`;
            this.blocks[blockId].outputs.forEach((id) => this.visit(id, this.unionCounters[blockId].mergeString));
        }
    }



    //For debugging purposes
    public printCode() {
        console.log(this.finalString)
    }

}
