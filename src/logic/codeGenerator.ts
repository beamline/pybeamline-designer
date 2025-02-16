import {Traverser} from "./Traverser.ts"
import {sanityChecker} from "./sanityChecker.ts";
import {readFileSync} from "fs";
import {UserPipeline} from "./Syntax.js";
import Ajv, {ErrorObject} from "ajv";


function generateCode (filePathToJSON : string) {

    let userPipeline : UserPipeline = JSON.parse(readFileSync(filePathToJSON, "utf-8"));
    const traverser : Traverser = new Traverser();

    try {
        //sanityChecker(userPipeline);
    } catch (error) {
        if (error instanceof Ajv.ValidationError) {
            return error.message
        } else if (error instanceof Error) {
            return error.message
        } else {
            return "Unknown error"
        }
    }

    return traverser.traverseDiagram(userPipeline);
}

//console.log(generateCode("./tests/unit/unit1.json"))

export { generateCode }