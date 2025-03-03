import {Traverser} from "./deprecated/Traverser.ts"
import {sanityChecker} from "./sanityChecker.ts";
import {readFileSync} from "fs";
import {ExtendedPipeline} from "./Syntax.js";
import {Compiler} from "./Compiler.js";
import {fileURLToPath} from "url";
import {dirname, resolve} from "path";
import Ajv from "ajv";
import {addAllReferences, addKeywords} from "./ajvConfig.js";




function generateCode (filePathToJSON : string) {

    let userPipeline : ExtendedPipeline = JSON.parse(readFileSync(filePathToJSON, "utf-8"));
    const compiler : Compiler = new Compiler();


    // Create __filename and __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const path= resolve(__dirname, "./schemas")

    // Initialize Ajv validator
    const ajv = new Ajv({ allErrors: true });

    // Add customizable keywords
    addKeywords(ajv)
    //adding reference schemas
    addAllReferences(path,ajv)

    const schemaData= JSON.parse(readFileSync(resolve(path,"main.json"), "utf8"));

    //Translation layer goes here
    ////////////////

    ///////////////

    try {
        sanityChecker(userPipeline, ajv, schemaData);
    } catch (error : any) {
        return error.message
    }

    return compiler.compilePipeline(userPipeline);
}

//console.log(generateCode("./tests/validation/valid3.json"))

export { generateCode }