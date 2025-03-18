import {XYPosition} from "@vue-flow/core";
import AjvManager from "../../logic/AjvManager.js";
import {CleanSchema} from "../../logic/Syntax.js";


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
        if (types == null) {
            return "#000000";
        }

        const str = types[0];
        if (str === "any") {
            return "grey"
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

    const stringToHexColor2 = (types: string[] | null): string => {
        if (types == null) {
            return "#000000";
        }
        if (Object.keys(colorPalette).includes(types[0]))
            //@ts-ignore
            return colorPalette[types[0]];
        else {
            return stringToHexColor(types)
        }
    }

    const colorPalette = {
        "tuple": "#ffbd00",
        "dataframe": "#FF1493",
        "event": "#32CD32",
        "petrinet": "#FFD700",
        "heuristics": "#8A2BE2",
        "model": "#DC143C",
        "conformance": "#4682B4",
        "any": "grey"            // Wildcard color
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
            sourceColor : stringToHexColor2(schema.descriptors.outputType),
            targetColor : stringToHexColor2(schema.descriptors.inputType),
            hint : schema.hint
        }
    }

    return node

}

export {createNode}