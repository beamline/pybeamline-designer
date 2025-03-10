import {XYPosition} from "@vue-flow/core";


async function createNode(name: string, folder: string, id: string, position : XYPosition) {
    const path = `/src/logic/schemas/${folder}/${name}.json`;
    const files = import.meta.glob("/src/logic/schemas/**/*.json");
    const module = await files[path]();
    const schema = module.default
    let keys: string[] = []

    if (schema.properties.parameters.properties){    keys = Object.keys(schema.properties.parameters.properties);}
    else {keys = []}
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
    else if ("input" in schema) {
        nodeType = "union";
    }


    const node = {
        id : id,
        position,
        type : "standard",
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