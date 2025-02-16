import {Traverser} from "./Traverser.ts"
import {sanityChecker} from "./sanityChecker.ts";
import {readFileSync} from "fs";
import {UserPipeline} from "./Syntax.js";
import { ValidationFailedError} from "@imhonglu/json-schema";


function generateCode (filePathToJSON : string) {

    let userPipeline : UserPipeline = JSON.parse(readFileSync(filePathToJSON, "utf-8"));
    const traverser : Traverser = new Traverser();

    try {
        sanityChecker(userPipeline);
    } catch (error : ValidationFailedError) {
        return error.message
    }

    return traverser.traverseDiagram(userPipeline);
}

//generateCode("exampleUserPipeline.json")

export { generateCode }