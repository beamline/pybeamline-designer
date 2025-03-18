import {ExtendedBlock, ExtendedPipeline, GuiBlock, GuiPipeline, CleanSchema} from "./Syntax.js";

import AjvManager from "./AjvManager.js";
import {GraphEdge, GraphNode} from "@vue-flow/core";


export class Translator {

    private ajv: AjvManager
    private static instance : Translator;

    private constructor() {
        this.ajv = AjvManager.getInstance();
    }

    public static getInstance(): Translator {
        if (!Translator.instance) {
            Translator.instance = new Translator(); // Create instance if it doesn't exist
        }
        return Translator.instance;
    }


    public getGuiPipelineFromVue (nodes : GraphNode[], edges : GraphEdge[]) {
        let guiBlocksArr = [];
        for (let block of nodes) {
            //New array of output ids for each block, to add to the GuiBlock
            let blockOuts : string[] = [];
            for (let edge of edges) {
                if (block.id === edge.source) {
                    blockOuts.push(edge.target)

                }
            }

            //Removes parameters that have not been specified
            const filteredParams = Object.fromEntries(
                Object.entries(block.data.parameters).filter(([key, value]) => value !== "")
            );

            let guiBlock : GuiBlock = {
                id : block.id,
                name : block.data.name,
                parameters : filteredParams,
                outputs : blockOuts

            }
            guiBlocksArr.push(guiBlock);
        }
        const guiPipe : GuiPipeline = {
            blocks : guiBlocksArr
        }

        return guiPipe
    }

    public translatePipeline(guiPipeline: GuiPipeline): ExtendedPipeline {
        const ExtendedBlocksArr: ExtendedBlock[] = [];

        for (let guiBlock of guiPipeline.blocks) {
            ExtendedBlocksArr.push(this.translateBlock(guiBlock, guiPipeline))
        }

        return {"blocks": ExtendedBlocksArr};


    }

    public translateBlock(guiBlock: GuiBlock, guiPipeline: GuiPipeline): ExtendedBlock {

        const blockSchema : CleanSchema = this.ajv.getCleanSchemaByName(guiBlock.name);
        let inputCounter = 0


        const extendedBlockTemplate: ExtendedBlock = {
            id: guiBlock.id,
            descriptors: {
                "name": guiBlock.name,
                "inputType": blockSchema.descriptors.inputType,
                "outputType": blockSchema.descriptors.outputType
            },
            parameters: guiBlock.parameters,
            outputs: guiBlock.outputs,
            function : blockSchema.function
        }

        for (let element of guiPipeline.blocks) {
            //@ts-ignore
            if (element.outputs.includes(guiBlock.id)){inputCounter++}
        }
        if (inputCounter > 1) {
            extendedBlockTemplate["input"] = inputCounter
        }
        if (inputCounter == 0) {
            extendedBlockTemplate.descriptors["inputType"] = null
        }
        if (guiBlock.outputs.length<1){
            extendedBlockTemplate.descriptors["outputType"] = null
        }
        if (blockSchema.header) {
            extendedBlockTemplate.header = blockSchema.header;
        }

        return extendedBlockTemplate


    }

}