
import {sanityChecker} from "./sanityChecker.ts";
import {readFileSync} from "fs";
import {ExtendedPipeline, GuiPipeline} from "./Syntax.js";
import {Compiler} from "./Compiler.js";
import {fileURLToPath} from "url";
import {dirname, resolve} from "path";
import Ajv from "ajv";
import {addAllReferences, addKeywords} from "./ajvConfig.js";
import {Translator} from "./Translator.js";





function generateCode (filePathToJSON : string) {

    let userPipeline : GuiPipeline = JSON.parse(readFileSync(filePathToJSON, "utf-8"));
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


    const translator : Translator = new Translator(ajv);
    let extendedPipe : ExtendedPipeline;

    //TODO: Fix sanity checker to allow for this new intermediate json to pass
    //console.log(JSON.stringify(extendedPipe))
    try {
        extendedPipe = translator.translatePipeline(userPipeline)
    } catch (error : any) {
        return error
    }
    try {
        sanityChecker(extendedPipe, ajv, schemaData);
    } catch (error : any) {
        return "Error when validating pipeline"
    }

    return compiler.compilePipeline(extendedPipe);
}

console.log(generateCode("./tests/validation/valid2.json"))

export { generateCode }