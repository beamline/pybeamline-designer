import {ExtendedBlock, ExtendedPipeline} from "./Syntax.js";
import AjvManager from "./AjvManager.js";
import {ErrorObject} from "ajv";
export {sanityChecker, PipelineSyntaxError, checkBlockProperties}

class PipelineSyntaxError extends Error {
    nodesId: string[]
    public constructor(message: string, ids: string[]) {
        super(message); // Call parent constructor (Error)
        this.nodesId = ids; // Add custom argument
    }
}

function sanityChecker(diagram:ExtendedPipeline){

    // Read the schema from a separate file
    const ajv : AjvManager = AjvManager.getInstance();
    // Create a schema instance
    const validator = ajv.compile(ajv.getSchemaByName("main"));

    // Validate the JSON data against the schema
    if  (validator(diagram)){
        return true
    } else {
        if (!validator.errors) {throw (Error("Unknown error"))}
        const errors: ErrorObject[]=validator.errors
        const uniquePaths = [...new Set(errors.map(err =>
            err.instancePath.split("/")[2]
        ))];
        let errorString =""
        let errorsIds = []
        for (const id of uniquePaths) {
            const errorBlock = diagram.blocks[+id]
            errorString += pinpointError(errorBlock)
            errorsIds.push(errorBlock.id)
        }
        throw new PipelineSyntaxError(errorString,errorsIds)


    }
}

function checkBlockProperties(propertyName:string, block:ExtendedBlock): {isOk:boolean, error: ErrorObject}{
    const ajv : AjvManager = AjvManager.getInstance();
    const schema=ajv.getSchemaByName(block.descriptors.name)
    // Create a schema instance
    const validator = ajv.compile(schema.properties[propertyName]);
    if (validator(block[propertyName])) {return {isOk: true, error:{instancePath: '', schemaPath: '', keyword: '',params:{}}}}
    if (validator.errors){ return {isOk: false, error:validator.errors[0]}}
    throw new Error("Unknown property name");
}

function pinpointError(errorBlock:ExtendedBlock): string {
    const parametersCheck=checkBlockProperties("parameters", errorBlock)
    if (!parametersCheck.isOk) {
        return `Error at block ${errorBlock.descriptors.name}: ${parametersCheck.error.message}\n`
    }

    const descriptorsCheck=checkBlockProperties("descriptors", errorBlock)
    if (!descriptorsCheck.isOk) {
        return `Error at block ${errorBlock.descriptors.name}: Invalid ${descriptorsCheck.error.instancePath}\n`
    }

    return `Error at block ${errorBlock.descriptors.name}: Invalid connections\n`

}



//const schemaData= JSON.parse(readFileSync("test.json", "utf8"));
//console.log(sanityChecker(schemaData))