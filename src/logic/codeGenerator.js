
import json from './testUserPipeline.json' assert { type: 'json' };

// Function to traverse the diagram in topological order
function traverseDiagram(diagram, callback) {
    const blocks = diagram.flow1.blocks.reduce((acc, block) => {
        acc[block.id] = { ...block, visited: false };
        return acc;
    }, {});

    const visit = (block_info) => {
        const blockId=block_info["id"]
        const current_string=block_info["log"]

        // Mark block as visited
        blocks[blockId].visited = true;


        // Process the block
        const new_string=callback(current_string,blocks[blockId]);

        // Visit all outputs (following the one-way directional constraint)
        blocks[blockId].outputs=blocks[blockId].outputs.reduce((acc,id) => {return [...acc, {"id": id,"log":new_string}] },[])
        blocks[blockId].outputs.forEach(visit);
    };

    // Find and start traversal from all source blocks (blocks with no `input`)
    Object.values(blocks)
        .filter(block => !block.input)
        .forEach(block => visit({"id": block.id,"log":""}));
}

let final_string=""
let counter=0
function string_generator(current_string, block){
    let new_string=current_string
    if (block.category.type=="source"){
        final_string+="source_"+counter+"="+block.category.name+"\n"
        new_string+="source_"+counter+".pipe(\n"
        counter++
    }else{
        new_string+=block.category.name+",\n"
    }
    if (block.outputs==false){
        final_string+=new_string+")\n"
    }
    return new_string
}
// Example: Print block details during traversal
traverseDiagram(json, string_generator);
console.log(final_string)