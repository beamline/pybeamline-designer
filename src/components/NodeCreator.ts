import {XYPosition} from "@vue-flow/core";
import AjvManager from "../logic/AjvManager.js";
import {CleanSchema} from "../logic/Syntax.js";


async function createNode(name: string, folder: string, id: string, position : XYPosition) {

    const ajv = AjvManager.getInstance()
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

    const stringToHexColor = (types: string[] | null): string => {
        if (types !== null) {
            const str = types[0];
            if (str === "any") {
                return "blue"
            }
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            let color = "#";
            for (let i = 0; i < 3; i++) {
                color += ("00" + ((hash >> (i * 8)) & 0xff).toString(16)).slice(-2);
            }
            return color ;
        }
        return "#000000";
    };

    const node = {
        id : id,
        position,
        type : nodeType,
        data : {
            name : name,
            inputType : schema.descriptors.inputType,
            outputType : schema.descriptors.outputType,
            parameters : schema.parameters,
            sourceColor : stringToHexColor(schema.descriptors.outputType),
            targetColor : stringToHexColor(schema.descriptors.inputType),
        }
    }

    return node

}

export {createNode}