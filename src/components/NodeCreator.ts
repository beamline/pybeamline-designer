import {XYPosition} from "@vue-flow/core";
import {getEventHandlerParams} from "@vue-flow/core/dist/utils/index.js";
import {validateAdditionalItems} from "ajv/dist/vocabularies/applicator/additionalItems.js";


async function createNode(name: string, folder: string, id: string, position : XYPosition) {
    const path = `/src/logic/schemas/${folder}/${name}.json`;
    const files = import.meta.glob("/src/logic/schemas/**/*.json");
    const module = await files[path]();
    const schema = module.default


    const keys = Object.keys(schema.properties.parameters.properties);
    let params = {} as { [key: string]: string | number };
    for (let key of keys) {
        params[key] = "";
    }

    let nodeType = "standard";

    if (schema.properties.descriptors.properties.inputType === null) {
        nodeType = "start";
    }
    else if (schema.properties.descriptors.properties.outputType === null) {
        nodeType = "end";
    }
    else if (schema.required.includes("input")) {
        nodeType = "union";
    }


    const node = {
        id : id,
        position,
        type : nodeType,
        data : {
            name : name,
            inputType : schema.properties.descriptors.properties.inputType,
            outputType : schema.properties.descriptors.properties.outputType,
            parameters : params
        }
    }

    return node

}

export {createNode}