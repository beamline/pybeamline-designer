import {XYPosition} from "@vue-flow/core";
import AjvManager from "../model/AjvManager.js";
import {CleanSchema} from "../model/Syntax.js";
import {colorPalette, hexagonStyle, stylePalette} from "../view/graph/handleStyles.js";
import {reactive} from "vue";

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

const getHandleStyle = (types: string[] | null) => {
    if (types == null) {
        return {};
    }
    //@ts-ignore
    //Makes a new object to pass

    let t1 = { backgroundColor: stringToHexColor2(types) };

    // Clone the object to prevent VueFlow from mutating the original styles
    let t2 = { ...stylePalette[types[0]] };

    return reactive({...t1, ...t2})
}




async function createNode(name: string, id: string, position : XYPosition) {

    const ajv = AjvManager.getInstance()
    const schema : CleanSchema = ajv.getCleanSchemaByName(name);

    let nodeType = "standard";
    let targetHandle = getHandleStyle(schema.descriptors.inputType);
    let sourceHandle = {backgroundColor : stringToHexColor2(schema.descriptors.outputType), ...hexagonStyle};

    if (schema.descriptors.inputType === null) {
        nodeType = "start";
    }
    else if (schema.descriptors.outputType === null) {
        nodeType = "end";
    }
    else if ("input" in schema) {
        nodeType = "union";
        targetHandle = {backgroundColor : stringToHexColor2(schema.descriptors.outputType), ...hexagonStyle};
    }

    const node = {
        id : id,
        position,
        type : nodeType,
        data : {
            name : name,
            inputType : schema.descriptors.inputType,
            outputType : schema.descriptors.outputType,
            parameters : schema.parameters,
            sourceHandleStyle : sourceHandle,
            targetHandleStyle : targetHandle,
            hint : schema.hint,
            required: schema.required || [],
            error: ''
        }
    }

    return node

}


export {createNode}