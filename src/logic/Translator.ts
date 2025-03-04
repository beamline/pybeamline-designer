import {ExtendedBlock, ExtendedPipeline, GuiBlock, GuiPipeline} from "./Syntax.js";
import Ajv from "ajv";


export class Translator {

    private ajv: Ajv

    public constructor(ajv: Ajv) {
        this.ajv = ajv
    }


    public translatePipeline(guiPipeline: GuiPipeline): ExtendedPipeline {
        const ExtendedBlocksArr: ExtendedBlock[] = [];

        for (let guiBlock of guiPipeline.blocks) {

            ExtendedBlocksArr.push(this.translateBlock(guiBlock, guiPipeline))
        }

        return {"blocks": ExtendedBlocksArr};


    }

    public translateBlock(guiBlock: GuiBlock, guiPipeline: GuiPipeline): ExtendedBlock {

        const blockSchema = this.ajv.getSchema(guiBlock.name+".json")?.schema;
        let inputCounter = 0
        const inputType = this.getType("inputType",blockSchema)
        const outputType = this.getType("outputType",blockSchema)
        const funName = this.getFunction(blockSchema)

        const extendedBlockTemplate: ExtendedBlock = {
            "id": guiBlock.id,
            descriptors: {
                "name": guiBlock.name,
                "inputType": inputType,
                "outputType": outputType
            },
            parameters: guiBlock.parameters,
            outputs: guiBlock.outputs,
            function : funName
        }

        for (let element of guiPipeline.blocks) {
            //@ts-ignore
            if (element.outputs.includes(guiBlock.id)){inputCounter++}
        }
        if (inputCounter>1){extendedBlockTemplate["input"]=inputCounter}

        return extendedBlockTemplate


    }

    private getType(typeName:string,blockSchema : any){
        const type = blockSchema.properties.descriptors.properties[typeName]
        if ("const" in type){
            return type.const
        }
        if ("$ref" in type) {
            const sc = this.ajv.getSchema(type["$ref"])
            return sc?.schema.const
        }
    }

    private getFunction(blockSchema : any) {
        const type = blockSchema.properties.function;
        return type.const
    }


}