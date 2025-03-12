import {ExtendedBlock, ExtendedPipeline, GuiBlock, GuiPipeline, CleanSchema} from "./Syntax.js";

import AjvManager from "./AjvManager.js";
import {GraphEdge, GraphNode} from "@vue-flow/core";


export class Translator {

    private ajv: AjvManager

    public constructor() {
        this.ajv = AjvManager.getInstance();
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
            let guiBlock : GuiBlock = {
                id : block.id,
                name : block.data.name,
                parameters : block.data.parameters,
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

        return extendedBlockTemplate


    }

}