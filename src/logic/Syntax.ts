interface Descriptor {
    name: string;
    inputType : string[] | null;
    outputType : string[] | null;
}

interface Params {
    [key: string]: any;
}

interface ExtendedBlock {
    id: string;
    descriptors: Descriptor;
    parameters: Params;
    input?: number;         // Optional: Not all blocks have an input
    outputs: string[];      // Outputs will always be an array of strings
    function : string       //python code that calls the function
    header? : string
    auxHeader? : string
}

interface GuiBlock {
    id : string;
    name : string;
    parameters: Params;
    outputs : string[];
}

interface GuiPipeline {
    blocks : GuiBlock[];
}


//Object with array containing all the blocks in the pipeline
//Extended with input/output types and other necessary information
interface ExtendedPipeline {
    blocks: ExtendedBlock[];
}


//Object mapping IDs to blocks
interface Graph {
    [key : string] : ExtendedBlock;
}

//Object containing the union blocks ids and their strings, counters
interface UnionData {
    [key : string] : {
        counter : number;
        mergeString : string;
        pass : boolean;
    }
}

interface BlockSchema  {
    Object : any,
    properties : {
        parameters : {
            properties : any
            required : string[]
        },
        descriptors : {properties : any}
        function : { const : string },
        hint: {const: string},
        header? : {const : string},
        auxHeader? : {const : string},
    }
    required : string[]
}

interface CleanSchema {
    descriptors : Descriptor,
    parameters : Params,
    required : string[],
    input? : string,
    function : string,
    header? : string,
    auxHeader? : string,
    hint : string
}



export { ExtendedPipeline, Descriptor, Params, ExtendedBlock, Graph, UnionData , GuiBlock, GuiPipeline, CleanSchema, BlockSchema};