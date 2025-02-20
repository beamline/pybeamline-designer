import Ajv from "ajv";
import { readFileSync,readdirSync } from "fs";

export {sanityChecker}

function sanityChecker(diagram:Object): boolean{

    // Initialize Ajv validator
    const ajv = new Ajv();
    const schemasReferences=readdirSync("src/logic/schemas")
    schemasReferences.forEach((reference) => {

        const filePath = "src/logic/schemas/"+reference;
        const schema = JSON.parse(readFileSync(filePath, "utf8"));

        // Add schema to Ajv, using the filename (or a URL-like identifier) as the schema ID
        ajv.addSchema(schema,reference);
    });

    // Read the schema from a separate file
    const schemaData= JSON.parse(readFileSync("src/logic/schemas/main.json", "utf8"));

    // Create a schema instance
    const validator = ajv.compile(schemaData);

    // Validate the JSON data against the schema
    if  (validator(diagram)){
        return true
    } else {
        throw (validator.errors)
    }
}



//const schemaData= JSON.parse(readFileSync("./test.json", "utf8"));
//console.log(sanityChecker(schemaData))