import { Schema , ValidationFailedError} from "@imhonglu/json-schema";
import { readFileSync } from "fs";

function sanityChecker(diagram:Object): boolean{

    // Read the schema from a separate file
    const schemaData = JSON.parse(readFileSync("./test.json", "utf8"));

    // Create a schema instance
    const schema = new Schema(schemaData);

    // Validate the JSON data against the schema
    if  (schema.validate(diagram)){
        return true
    } else {
        throw new ValidationFailedError("User diagram is not valid")
    }
}

export {sanityChecker}