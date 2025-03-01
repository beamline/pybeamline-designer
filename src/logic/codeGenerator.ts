import {Traverser} from "./deprecated/Traverser.ts"
import {sanityChecker} from "./sanityChecker.ts";
import {readFileSync} from "fs";
import {UserPipeline} from "./Syntax.js";
import Ajv, {ErrorObject} from "ajv";
import {Compiler} from "./Compiler.js";


function generateCode (filePathToJSON : string) {

    let userPipeline : UserPipeline = JSON.parse(readFileSync(filePathToJSON, "utf-8"));
    const compiler : Compiler = new Compiler();

    try {
        sanityChecker(userPipeline);
    } catch (error) {
        return error
    }

    return compiler.compilePipeline(userPipeline);
}

//console.log(generateCode("./tests/unit/unit1.json"))

export { generateCode }