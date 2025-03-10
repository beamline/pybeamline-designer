import Ajv, {AnySchema, Schema} from "ajv";
import {readdirSync, readFileSync} from "fs";
import {dirname, resolve} from "path";
import {ExtendedBlock} from "./Syntax.js";
import {fileURLToPath} from "url";

class ajvManager extends Ajv{

    private static instance: ajvManager;
    private constructor(){
        super({ allErrors: true })

        // Create __filename and __dirname
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const path= resolve(__dirname, "./schemas")

        this.addKeywords()
        //adding reference schemas
        this.addAllReferences(path)
    }
    // Public method to get the instance of the Singleton
    public static getInstance(): ajvManager {
        if (!ajvManager.instance) {
            ajvManager.instance = new ajvManager(); // Create instance if it doesn't exist
        }
        return ajvManager.instance;
    }
    public getSchemaByName(name: string, clean: boolean = false){
        const schema = this.getSchema(name+".json")?.schema

        if (!schema) {throw new Error("There is no schema with that name")}
        if (!clean) {return schema}
        else {return this.cleanSchema(schema)}

    }

    private addReference(filePath:string, reference : string) {
        const schema = JSON.parse(readFileSync(filePath, "utf8"));
        // Add schema to Ajv, using the filename (or a URL-like identifier) as the schema ID
        this.addSchema(schema,reference);
    }

    private addAllReferences(directoryPath: string){
        const schemasReferences=readdirSync(directoryPath)
        schemasReferences.forEach((reference) => {
            const filePath = resolve(directoryPath, reference)
            if (reference.endsWith(".json")) {
                this.addReference(filePath, reference)
            } else {
                this.addAllReferences(filePath)
            }
        })
    }

    private async addAllReferencesfromWeb(){
        const files = import.meta.glob(["/src/logic/schemas/**/*.json"]); // Match JSONs inside subfolders
        const groupedFiles = {};

        for (const path in files) {
            const module = await files[path](); // Load the JSON dynamically
            const parts = path.split("/"); // Split path to extract folder
            const filename = parts[parts.length -1 ]; // Get the folder name (second last part)
            this.addSchema(module, filename)
        }


    }

    private addKeywords (){
        this.addKeyword({
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


                    //Checks if the current outputType or target inputType is any
                    //if so, automatic true
                    if (targetBlock !== undefined
                        && (targetBlock.descriptors.inputType?.includes("any")
                            || currentBlock.descriptors.outputType.includes("any"))) {
                        return true
                    }
                    // check input and output types match
                    //@ts-ignore
                    return targetBlock && targetBlock.descriptors.inputType.some(item => currentBlock.descriptors.outputType.includes(item));
                });
            },
            errors: false
        });
    }

    private cleanSchema(schema: Schema){

        const inputType = this.getType("inputType", schema)
        const outputType = this.getType("outputType", schema)

        let parameters: Record<string, any> = {}

        if (schema.properties.parameters.properties){
            Object.keys(schema.properties.parameters.properties).forEach((key => {
                parameters[key] = '';  // Set the value to empty string
            }))
        }

        const cleanedSchema = {
            descriptors: {
                "name": schema.properties.descriptors.properties.name.const,
                "inputType": inputType,
                "outputType": outputType
            },
            parameters: parameters,
            required: schema.properties.parameters.required,
            function:  schema.properties.function.const
        }

        if (schema.required.includes("input")) {cleanedSchema["input"] = "number" }


        return cleanedSchema

    }

    private getType(typeName:string, schema : any){
        const type = schema.properties.descriptors.properties[typeName]
        if ("const" in type){
            return type.const
        }
        if ("$ref" in type) {
            const sc = this.getSchema(type["$ref"])
            return sc?.schema.const
        }
        return ["any"]
    }


}

export default ajvManager