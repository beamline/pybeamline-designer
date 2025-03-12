
import {sanityChecker} from "./sanityChecker.ts";
import {readFileSync} from "fs";
import {ExtendedPipeline, GuiPipeline} from "./Syntax.js";
import {Compiler} from "./Compiler.js";
import {fileURLToPath} from "url";
import {dirname, resolve} from "path";
import {Translator} from "./Translator.js";


function generateCode (userPipeline : GuiPipeline) {

    //let userPipeline : GuiPipeline = JSON.parse(readFileSync(filePathToJSON, "utf-8"));
    const compiler : Compiler = new Compiler();


    // Create __filename and __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const path= resolve(__dirname, "./schemas")




    const schemaData= JSON.parse(readFileSync(resolve(path,"main.json"), "utf8"));


    const translator : Translator = new Translator();
    let extendedPipe : ExtendedPipeline;


    try {
        extendedPipe = translator.translatePipeline(userPipeline)
    } catch (error : any) {
        return "Error when parsing pipeline."
    }
    try {
        sanityChecker(extendedPipe, schemaData);
    } catch (error : any) {
        return error.message
    }

    return compiler.compilePipeline(extendedPipe);
}

//console.log(generateCode("./tests/validation/valid5.json"))

export { generateCode }