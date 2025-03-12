import { ExtendedPipeline} from "./Syntax.js";
import AjvManager from "./AjvManager.js";
export {sanityChecker}


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
            throw (Error(`Error: at block ${errorBlock.descriptors.name}\nCheck for missing arguments or incorrect connections according to type.`))

        } else throw (Error("Unknown error"))


        //throw (validator.errors)

    }
}



//const schemaData= JSON.parse(readFileSync("test.json", "utf8"));
//console.log(sanityChecker(schemaData))