import {ExtendedBlock, ExtendedPipeline} from "./Syntax.js";
import AjvManager from "./AjvManager.js";
import {ErrorObject} from "ajv";
export {sanityChecker, PipelineSyntaxError, checkBlockProperties}

class PipelineSyntaxError extends Error {
    nodeId: string
    public constructor(message: string, id: string) {
        super(message); // Call parent constructor (Error)
        this.nodeId = id; // Add custom argument
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
        //Get the position of a block that raised an error
        //@ts-ignore
        const sampledError = validator.errors[0].instancePath;
        //@ts-ignore

        const match : string = sampledError.match(/\/blocks\/(\d+)/)[1];

        if (match !== null) {
            //@ts-ignore
            const errorBlock = diagram.blocks[match]

            const parametersCheck=checkBlockProperties("parameters", errorBlock)
            if (!parametersCheck.isOk) {
                throw (new PipelineSyntaxError(`Error at block ${errorBlock.descriptors.name}\n${parametersCheck.error.message}`, errorBlock.id));
            }

            const descriptorsCheck=checkBlockProperties("descriptors", errorBlock)
            if (!descriptorsCheck.isOk) {
                throw (new PipelineSyntaxError(`Error at block ${errorBlock.descriptors.name}\nInvalid ${descriptorsCheck.error.instancePath}`, errorBlock.id));
            }

            throw (new PipelineSyntaxError(`Error at block ${errorBlock.descriptors.name}\nInvalid connections`, errorBlock.id));


        } else throw (Error("Unknown error"))


        //throw (validator.errors)

    }
}

function checkBlockProperties(propertyName:string, block:ExtendedBlock): {isOk:boolean, error: ErrorObject}{
    const ajv : AjvManager = AjvManager.getInstance();
    const schema=ajv.getSchemaByName(block.descriptors.name)
    // Create a schema instance
    const validator = ajv.compile(schema.properties[propertyName]);
    if (validator(block[propertyName])) {return {isOk: true, error:{instancePath: '', schemaPath: '', keyword: '',params:{}}}}
    console.log(validator.errors)
    if (validator.errors){ return {isOk: false, error:validator.errors[0]}}
    throw new Error("Unknown property name");

}



//const schemaData= JSON.parse(readFileSync("test.json", "utf8"));
//console.log(sanityChecker(schemaData))