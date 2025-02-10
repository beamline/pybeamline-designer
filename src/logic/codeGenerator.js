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
        const newString =callback(current_string,blocks[blockId]);

        // Visit all outputs (following the one-way directional constraint)
        blocks[blockId].outputs=blocks[blockId].outputs.reduce((acc,id) => {return [...acc, {"id": id,"log":newString}] },[])
        blocks[blockId].outputs.forEach(visit);
    };

    // Find and start traversal from all source blocks (blocks with no `input`)
    Object.values(blocks)
        .filter(block => !block.input)
        .forEach(block => visit({"id": block.id,"log":""}));
}

let finalString = ""

let counter = 0


//block json -> string for the function, with parameters and arguments
function addParametersToFunction(block) {

    let resultString = block.category.name + "("
    for (const parameter in block.parameters) {
        resultString += `${parameter} = ${block.parameters[parameter]},`;
    }

    return resultString + ")"

}

function stringGenerator(currentString, block){
    let newString = currentString


    if (block.category.type === "source"){
        finalString += "source_" + counter + " = " + block.category.name + "\n"
        newString+="source_"+counter+".pipe(\n"
        counter++
    }
    else if (block.category.type === "sink") {
        finalString += newString + ").subscribe\n"
    }
    else{

        newString += addParametersToFunction(block) + ",\n"
    }

    return newString
}

// Example: Print block details during traversal
traverseDiagram(json, stringGenerator);
console.log(finalString)