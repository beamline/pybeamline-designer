import {XYPosition} from "@vue-flow/core";
import ajvManager from "../logic/ajvManager.js";
import {CleanSchema} from "../logic/Syntax.js";


async function createNode(name: string, folder: string, id: string, position : XYPosition) {

    const ajv = ajvManager.getInstance()
    const schema : CleanSchema = ajv.getCleanSchemaByName(name);

    let nodeType = "standard";

    if (schema.descriptors.inputType === null) {
        nodeType = "start";
    }
    else if (schema.descriptors.outputType === null) {
        nodeType = "end";
    }
    else if ("input" in schema) {
        nodeType = "union";
    }


    const node = {
        id : id,
        position,
        type : nodeType,
        data : {
            name : name,
            inputType : schema.descriptors.inputType,
            outputType : schema.descriptors.outputType,
            parameters : schema.parameters
        }
    }

    return node

}

export {createNode}