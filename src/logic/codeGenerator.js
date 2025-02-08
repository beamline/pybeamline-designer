
import json from './testUserPipeline.json' assert { type: 'json' };

// Function to traverse the diagram in topological order
function traverseDiagram(diagram, callback) {
    const blocks = diagram.flow1.blocks.reduce((acc, block) => {
        acc[block.id] = { ...block, visited: false };
        return acc;
    }, {});
    console.log(blocks)

    const visit = (blockId) => {
        if (!blockId || blocks[blockId].visited) return;

        // Mark block as visited
        blocks[blockId].visited = true;


        // Process the block
        callback(blocks[blockId]);
        const t= "jjajj"
        console.log(blocks[blockId].outputs.reduce((acc,id) => {return [...acc, {"id": id,"log":t}] },[]))


        // Visit all outputs (following the one-way directional constraint)
        blocks[blockId].outputs.forEach(visit);
    };

    // Find and start traversal from all source blocks (blocks with no `input`)
    Object.values(blocks)
        .filter(block => !block.input)
        .forEach(block => visit(block.id));
}
// Example: Print block details during traversal
traverseDiagram(json, (block) => {
    console.log(`Visiting Block: ${block.id}, Type: ${block.category.type}`);
});