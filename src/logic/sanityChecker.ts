import Ajv from "ajv";
import { readFileSync,readdirSync } from "fs";
import {resolve, dirname} from "path";
import { fileURLToPath } from "url";
import {Block} from "./Syntax.js";
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
            const blocks: Block[] = parentSchema.rootData.blocks; // Get all blocks
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
        throw (validator.errors)
    }
}



//const schemaData= JSON.parse(readFileSync("test.json", "utf8"));
//console.log(sanityChecker(schemaData))