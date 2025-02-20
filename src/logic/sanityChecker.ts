import Ajv from "ajv";
import { readFileSync,readdirSync } from "fs";
import {resolve, dirname} from "path";
import { fileURLToPath } from "url";
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


function sanityChecker(diagram:Object): boolean{

    // Create __filename and __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const path= resolve(__dirname, "./schemas")

    // Initialize Ajv validator
    const ajv = new Ajv();

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



//const schemaData= JSON.parse(readFileSync("./tests/unit/unit1.json", "utf8"));
//console.log(sanityChecker(schemaData))