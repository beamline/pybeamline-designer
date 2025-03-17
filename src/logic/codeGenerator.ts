import {PipelineSyntaxError, sanityChecker} from "./sanityChecker.ts";
import {ExtendedPipeline, GuiPipeline} from "./Syntax.js";
import {Compiler} from "./Compiler.js";
import {Translator} from "./Translator.js";
import {readFileSync} from "fs";
import AjvManager from "./AjvManager.js";


function generateCode (userPipeline : GuiPipeline) {

    //let userPipeline : GuiPipeline = JSON.parse(readFileSync(filePathToJSON, "utf-8"));
    const compiler : Compiler = new Compiler();


    const translator : Translator = new Translator();
    let extendedPipe : ExtendedPipeline;


    try {
        extendedPipe = translator.translatePipeline(userPipeline)
    } catch (error : any) {
        return "Error when parsing pipeline."
    }
    try {
        sanityChecker(extendedPipe);
    } catch (error : any) {
        return error.message
    }

    return compiler.compilePipeline(extendedPipe);
}


export { generateCode }