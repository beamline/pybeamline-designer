import {ExtendedBlock, ExtendedPipeline} from "./Syntax.js";
import AjvManager from "./AjvManager.js";
export {sanityChecker, PipelineSyntaxError, checkBlockProperties}

class PipelineSyntaxError extends Error {
    nodeId: string
    public constructor(message: string, id: string) {
        super(message); // Call parent constructor (Error)
        this.nodeId = id; // Add custom argument
    }
}

function sanityChecker(diagram:ExtendedPipeline): boolean{

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
            throw (new PipelineSyntaxError(`Error: at block ${errorBlock.descriptors.name}\nCheck for missing arguments or incorrect connections according to type.`, errorBlock.id));

        } else throw (Error("Unknown error"))


        //throw (validator.errors)

    }
}

function checkBlockProperties(propertyName:string, block:ExtendedBlock): boolean{
    const ajv : AjvManager = AjvManager.getInstance();
    const schema=ajv.getSchemaByName(block.descriptors.name)
    // Create a schema instance
    const validator = ajv.compile(schema.properties[propertyName]);
    if (validator(block[propertyName])) {return true}
    return false
}



//const schemaData= JSON.parse(readFileSync("test.json", "utf8"));
//console.log(sanityChecker(schemaData))