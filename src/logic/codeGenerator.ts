import {Traverser} from "./deprecated/Traverser.ts"
import {sanityChecker} from "./sanityChecker.ts";
import {readFileSync} from "fs";
import {ExtendedPipeline} from "./Syntax.js";
import Ajv, {ErrorObject} from "ajv";
import {Compiler} from "./Compiler.js";


function generateCode (filePathToJSON : string) {

    let userPipeline : ExtendedPipeline = JSON.parse(readFileSync(filePathToJSON, "utf-8"));
    const compiler : Compiler = new Compiler();

    try {
        sanityChecker(userPipeline);
    } catch (error) {
        return error.message
    }

    return compiler.compilePipeline(userPipeline);
}

//console.log(generateCode("./tests/validation/valid3.json"))

export { generateCode }