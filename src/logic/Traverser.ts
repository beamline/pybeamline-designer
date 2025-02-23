import { UserPipeline, Block, Descriptor, Params, Graph, UnionCounters} from "./Syntax.js";


export class Traverser {

    private blocks: Graph = {};
    private finalString: string = "";
    private sourceCounter : number = 0;
    private pipeCounter : number = 0;
    private unionCounters: UnionCounters = {};

/*
* Prepares the user pipeline for traversal
* Starts visiting the users pipeline at the sources
*/
    public traverseDiagram (userPipeline : UserPipeline ) : string {


        //Variable reset
        this.finalString = "";
        this.sourceCounter = 0;
        this.pipeCounter = 0;
        this.unionCounters = {};

        //Iterates through block and assigns id as key, Object is { id : block } for all ids and blocks
        this.blocks = userPipeline.blocks.reduce((acc : Graph, block : Block ) => {
            acc[block.id] = block;
            return acc;
        }, {});

        // Find and start traversal from all source blocks (blocks with no input)
        Object.values(this.blocks)
            .filter(block => !block.descriptors.inputType)
            .forEach(block => this.visitBlockById(block.id,""));

        return this.finalString;

    }


/*
*  Calls for handling the string the given block produces
*  Visits the blocks to which this block outputs to
*/

    private visitBlockById (blockId : string, currentString : string){

        if ( Array.isArray(this.blocks[blockId].input )){
            this.unionBlockHandler(blockId, currentString)
            return
        }

        // Process the block
        const newString = this.stringGenerator.bind(this)(currentString, this.blocks[blockId]);

        // Visit all outputs (following the one-way directional constraint)
        this.blocks[blockId].outputs.forEach( id=>
            this.visitBlockById(id, newString)
        );



    };

/*
* Reads a blocks parameters and adds them to the final string
*/
    private addParametersToPipeline (block : Block) : string {

        if (block.descriptors.name === "custom") {
            //add custom function name to pipeline
            return block.parameters.functionName + "()"
        }

        let resultString : string = block.descriptors.name + "(";

        // Check if there are parameters
        if (Object.keys(block.parameters).length > 0) {
            // Add parameters to the result string
            for (const parameter in block.parameters) {
                resultString += `${parameter} = ${block.parameters[parameter]}, `;
            }
            // Remove the comma and space
            resultString = resultString.slice(0, -2);
        }
        // Close the bracket and return the result
        return resultString + ")";
    }




/*
  * Handles the string the current block produces
  * Updates the currentString following the traversal
*/
    private stringGenerator(currentString : string, block : Block) : string {
        let newString : string = currentString;

        if (block.descriptors.name === "custom"){
            this.finalString += block.parameters.functionBody + "\n"
        }

        if (block.descriptors.inputType === null){

            this.finalString += `source_${this.sourceCounter} = ${this.addParametersToPipeline(block)}\n`
            newString        += `source_${this.sourceCounter}.pipe( \n`
            this.sourceCounter++

            return newString
        }

        if (block.descriptors.outputType === null) {
            //removes ", " from the last element (for readability purposes)
            this.finalString += `${newString.slice(0, -2)}\n)${this.addParametersToPipeline(block)}\n`

            return newString
        }

        newString += `${this.addParametersToPipeline(block)},\n`

        return newString

    }


/*
    * Handles specifically pipeline merges/concatenations
*/
    private unionBlockHandler(blockId: string, currentString: string) {
        //retrieving block information
        const block = this.blocks[blockId]
        if (!block.input) return

        //adding block to counter if not already in
        if (!(blockId in this.unionCounters)) {
            const functionName =
                block.descriptors.name === "custom" ? block.parameters.functionName : block.descriptors.name

            this.unionCounters[blockId] = { counter: block.input.length, mergeString: `${functionName}(`};
        }

        //adding new pipeline variable
        const pipeName: string  = `pipe_${this.pipeCounter}`;
        const trimmedString: string = currentString.slice(0, -2); // Removing last ", "
        this.finalString += `${pipeName} = ${trimmedString})\n`;
        this.pipeCounter++;

        // adding pipeline inside the union function
        const unionCounter=this.unionCounters[blockId]
        unionCounter.mergeString += `${unionCounter.counter < block.input.length ? ", " : ""}${pipeName}`;
        unionCounter.counter--;

        //close the function and continue with the diagram
        if (unionCounter.counter === 0) {
            unionCounter.mergeString += block.outputs.length ? `).pipe( \n` : `\n`;
            block.outputs.forEach((id) => this.visitBlockById(id, unionCounter.mergeString));
        }
    }



}
