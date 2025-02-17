interface Category {
    type: string;
    name: string;
}

interface Params {
    [key: string]: any;
}

interface Block {
    id: string;
    category: Category;
    parameters: Params;
    input?: string | string[];         // Optional: Not all blocks have an input
    outputs: string[];      // Outputs will always be an array of strings
}


interface UserPipeline {
    blocks: Block[];
}

interface Graph {
    [key : string] : Block;
}

export { UserPipeline, Category, Params, Block, Graph };