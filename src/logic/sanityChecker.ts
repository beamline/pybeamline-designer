import Ajv from "ajv";
import { readFileSync,readdirSync } from "fs";
import {resolve, dirname} from "path";
import { fileURLToPath } from "url";
import {ExtendedBlock} from "./Syntax.js";
import {addKeywords, addAllReferences} from "./ajvConfig.js";
export {sanityChecker}


function sanityChecker(diagram:Object, ajv : Ajv, schemaData : any): boolean{

    // Read the schema from a separate file


    // Create a schema instance
    const validator = ajv.compile(schemaData);

    // Validate the JSON data against the schema
    if  (validator(diagram)){
        return true
    } else {

        //TODO: Experiment with this to see if we can reach the actual problem in the pipeline
        //TODO: Experiment with pipelines containing 2 or more errors and see the error trace
        //@ts-ignore
        const sampledError = validator.errors[0].instancePath;
        //Gets the block id number that raised the problem
        //@ts-ignore

        const match : string = sampledError.match(/\/blocks\/(\d+)/)[1];

        if (match !== null) {
            //@ts-ignore
            const stopBlock = diagram.blocks.filter(element => element.id == match)[0];
            //@ts-ignore
            //const errorBlocks = diagram.blocks.filter( element => stopBlock.outputs.includes(element.id))
            //@ts-ignore
            //const errorBlocksName = errorBlocks.map (element => element.descriptors.name)
            throw (Error(`Error: at block ${stopBlock}`))

        } else throw (Error("Unknown error"))


        //throw (validator.errors)

    }
}



//const schemaData= JSON.parse(readFileSync("test.json", "utf8"));
//console.log(sanityChecker(schemaData))