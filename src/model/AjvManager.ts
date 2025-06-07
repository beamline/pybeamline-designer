import Ajv from "ajv";
import {ExtendedBlock, CleanSchema, BlockSchema} from "./Syntax.js";


class AjvManager extends Ajv{

    private static instance: AjvManager;
    private constructor(){
        super({ allErrors: true })

        this.addKeywords()


    }
    // Public method to get the instance of the Singleton
    public static getInstance(): AjvManager {
        if (!AjvManager.instance) {
            AjvManager.instance = new AjvManager(); // Create instance if it doesn't exist
        }
        return AjvManager.instance;
    }
    public getSchemaByName(name: string) {
        const schema = this.getSchema(name+".json")?.schema

        if (!schema) {throw new Error(`There is no schema with that name ${name}`)}
        else {return schema}

    }

    public getCleanSchemaByName (name: string) : CleanSchema{
        //@ts-ignore
        const schema: BlockSchema = this.getSchema(name+".json")?.schema

        if (!schema) {throw new Error(`There is no schema with that name ${name}`)}
        else {return this.cleanSchema(schema)}

    }
    public async manageReferences() {
        const isTest = process.env.VITEST === "true";

        if (isTest) {
            const {readdirSync, readFileSync} = await import("fs");
            const {dirname, resolve} = await import("path");
            const {fileURLToPath} = await import("url");

            // Create __filename and __dirname
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const path= resolve(__dirname, "./schemas")

            this.addAllReferences(path,readdirSync,resolve,readFileSync)


        } else {
            this.addAllReferencesfromWeb()
        }
    }


    private addReference(filePath:string, reference : string, readFileSync: Function) {
        const schema = JSON.parse(readFileSync(filePath, "utf8"));
        // Add schema to Ajv, using the filename (or a URL-like identifier) as the schema ID
        this.addSchema(schema,reference);
    }

    private addAllReferences(directoryPath: string, readdirSync: Function, resolve: Function, readFileSync: Function){
        const schemasReferences=readdirSync(directoryPath)
        schemasReferences.forEach((reference: string) => {
            const filePath = resolve(directoryPath, reference)
            if (reference.endsWith(".json")) {
                this.addReference(filePath, reference, readFileSync)
            } else {
                this.addAllReferences(filePath,readdirSync,resolve,readFileSync)
            }
        })
    }

    private async addAllReferencesfromWeb(){
        //@ts-ignore
        const files = import.meta.glob(["/src/model/schemas/**/*.json"]); // Match JSONs inside subfolders

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

    private cleanSchema(schema : BlockSchema) : CleanSchema {

        const inputType = this.getType("inputType", schema)
        const outputType = this.getType("outputType", schema)

        let parameters: Record<string, any> = {}

        if (schema.properties.parameters.properties){
            Object.keys(schema.properties.parameters.properties).forEach((key => {
                parameters[key] = '';  // Set the value to empty string
            }))
        }

        const cleanedSchema : CleanSchema = {
            descriptors: {
                "name": schema.properties.descriptors.properties.name.const,
                "inputType": inputType,
                "outputType": outputType
            },
            parameters: parameters,
            required: schema.properties.parameters.required,
            function:  schema.properties.function.const,
            hint: schema.properties.hint.const
        }

        if (schema.required.includes("input")) {
            cleanedSchema["input"] = "number"
        }

        if (Object.keys(schema.properties).includes("header")) {
            //@ts-ignore
            cleanedSchema["header"] = schema.properties.header.const;
            cleanedSchema["auxHeader"] = schema.properties.auxHeader.const;
        }


        return cleanedSchema

    }

    private getType(typeName:string, schema : BlockSchema){
        const type = schema.properties.descriptors.properties[typeName]
        if ("const" in type){
            return type.const
        }
        if ("$ref" in type) {
            const sc = this.getSchema(type["$ref"])
            //@ts-ignore
            return sc?.schema.const
        }
        return ["any"]
    }


}

export default AjvManager