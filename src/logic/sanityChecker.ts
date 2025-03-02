import Ajv from "ajv";
import { readFileSync,readdirSync } from "fs";
import {resolve, dirname} from "path";
import { fileURLToPath } from "url";
import {ExtendedBlock} from "./Syntax.js";
export {sanityChecker}

function addReference(filePath:string,reference:string, ajv: Ajv){
    const schema = JSON.parse(readFileSync(filePath, "utf8"));
    // Add schema to Ajv, using the filename (or a URL-like identifier) as the schema ID
    ajv.addSchema(schema,reference);
}

function addAllReferences(directoryPath: string, ajv: Ajv){
    const schemasReferences=readdirSync(directoryPath)
    schemasReferences.forEach((reference) => {
        const filePath = resolve(directoryPath, reference)
        if (reference.endsWith(".json")) {
            addReference(filePath, reference, ajv)
        } else {
            addAllReferences(filePath, ajv)
        }
    })
}

function addKeywords (ajv : Ajv){
    ajv.addKeyword({
        keyword: "validConnections",
        type: "array",
        validate: function (_, outputs: string[], __, parentSchema) {

            if (!parentSchema) return false
            if (outputs.length==0) return true

            // @ts-ignore
            const blocks: ExtendedBlock[] = parentSchema.rootData.blocks; // Get all blocks
            const currentBlock = parentSchema.parentData; // The block being validated

            return outputs.every(outputId => {

                // We find the block with the specific ID
                const targetBlock = blocks.find(block => block.id === outputId);

                // check input and output types match
                return targetBlock && targetBlock.descriptors.inputType.some(item => currentBlock.descriptors.outputType.includes(item));
            });
        },
        errors: false
    });
}


function sanityChecker(diagram:Object): boolean{

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

    // Read the schema from a separate file
    const schemaData= JSON.parse(readFileSync(resolve(path,"main.json"), "utf8"));

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
        const match : string = sampledError.match(/\/blocks\/(\d+)/)[1];

        if (match !== null) {
            const stopBlock = diagram.blocks.filter(element => element.id == match)[0];
            const errorBlocks = diagram.blocks.filter( element => stopBlock.outputs.includes(element.id))
            const errorBlocksName = errorBlocks.map (element => element.descriptors.name)
            throw (Error(`Error: at block(s) ${errorBlocksName}`))

        } else throw (Error("Unknown error"))


        //throw (validator.errors)

    }
}



//const schemaData= JSON.parse(readFileSync("test.json", "utf8"));
//console.log(sanityChecker(schemaData))