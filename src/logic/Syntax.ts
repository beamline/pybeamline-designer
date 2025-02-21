interface Descriptor {
    name: string;
    inputType : string[];
    outputType : string[];
}

interface Params {
    [key: string]: any;
}

interface Block {
    id: string;
    descriptors: Descriptor;
    parameters: Params;
    input?: string | string[];         // Optional: Not all blocks have an input
    outputs: string[];      // Outputs will always be an array of strings
}


//Object with array containing all the blocks in the pipeline
interface UserPipeline {
    blocks: Block[];
}


//Object mapping IDs to blocks
interface Graph {
    [key : string] : Block;
}

//Object containing the union blocks ids and their strings, counters
interface UnionCounters {
    [key : string] : {
        counter : number;
        mergeString : string;
    }
}

export { UserPipeline, Descriptor, Params, Block, Graph, UnionCounters };