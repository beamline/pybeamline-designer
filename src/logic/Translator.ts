import {ExtendedBlock, ExtendedPipeline, GuiBlock, GuiPipeline} from "./Syntax.js";


export class Translator {


/*
Objective:

GuiPipeline -> ExtendedPipeline

for each GuiBlock in GuiPipeline:
    apply fun(GuiBlock -> ExtendedBlock)

 */
    public translatePipeline (guiPipeline : GuiPipeline) : ExtendedPipeline {
        const ExtendedBlocksArr : ExtendedBlock[] = [];

        for (let guiBlock in guiPipeline.GuiBlocks) {
            //@ts-ignore
            ExtendedBlocksArr.push(this.translateBlock(guiBlock, guiPipeline))
        }

        return {"blocks": ExtendedBlocksArr};


    }

    public translateBlock (guiBlock : GuiBlock, guiPipeline : GuiPipeline) : ExtendedBlock {

        const extendedBlockTemplate : ExtendedBlock = {
            "id" : guiBlock.id,
            descriptors : {
                "name" : "",
                "inputType" : [],
                "outputType" : []
            },
            parameters :  guiBlock.parameters,
            outputs : guiBlock.outputs
        }

        //This part could be redundant/changed, depends on the information fetch from the schemas
            switch (true) {
                case guiBlock.name.includes("Sink") :
                    return this.translateSink(guiBlock, extendedBlockTemplate);
                case guiBlock.name.includes("Source"):
                    return this.translateSource(guiBlock, extendedBlockTemplate);
                case guiBlock.name.includes("Miner"):
                    return this.translateMiner(guiBlock, extendedBlockTemplate);
                case guiBlock.name.includes("Filter"):
                    return this.translateFilter(guiBlock, extendedBlockTemplate);
                case guiBlock.name.includes("Custom"):
                    return this.translateCustom(guiBlock, extendedBlockTemplate, guiPipeline);
                case guiBlock.name.includes("Union"):
                    //Count the number of blocks in the pipeline that have this union block in their output
                    //Add an "Inputs" : number tag maybe, or just use inputs : ["2", "3"]
                    return this.translateUnion(guiBlock, extendedBlockTemplate, guiPipeline);
                default:
                    throw Error("Unknown block")
            }

    }

    //This part could be redundant, depends on the information fetch from the schemas
    private translateSink(guiBlock : GuiBlock, extendedBlock : ExtendedBlock) : ExtendedBlock {

        return extendedBlock;
    }

    //This part could be redundant, depends on the information fetch from the schemas
    //Maybe give it the GuiPipeline to see if pipe is empty to omit the .pipe, add it to the schemas
    //bla bla
    private translateSource(guiBlock : GuiBlock, extendedBlock : ExtendedBlock) : ExtendedBlock {

        return extendedBlock;
    }

    //This part could be redundant, depends on the information fetch from the schemas
    private translateMiner(guiBlock : GuiBlock, extendedBlock : ExtendedBlock) : ExtendedBlock {

        return extendedBlock;
    }

    //This part could be redundant, depends on the information fetch from the schemas
    private translateFilter(guiBlock : GuiBlock, extendedBlock : ExtendedBlock) : ExtendedBlock {

        return extendedBlock;
    }

    //This part could be redundant, depends on the information fetch from the schemas
    private translateUnion(guiBlock : GuiBlock, extendedBlock : ExtendedBlock, guiPipeline : GuiPipeline) : ExtendedBlock {

        return extendedBlock;
    }

    //This part could be redundant, depends on the information fetch from the schemas
    private translateCustom(guiBlock : GuiBlock, extendedBlock : ExtendedBlock, guiPipeline : GuiPipeline) : ExtendedBlock {

        return extendedBlock;
    }



}