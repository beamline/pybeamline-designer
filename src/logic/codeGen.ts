import { readFileSync } from "fs";
import { UserPipeline, Block, Category, Params, Graph } from "./Syntaxes.js";


export class CodeGen {
    private filePath : string;
    private finalString : string = "";
    private counter : number = 0;

    private userPipeline : any;

    public constructor(filePath: string) {
        this.filePath = filePath;
        this.userPipeline = JSON.parse(readFileSync(this.filePath,"utf-8"));
    }

    public traverseDiagram (diagram : UserPipeline, callback : Function ) {

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

    }
}

