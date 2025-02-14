import { readFile } from 'fs/promises';

async function loadJson(filePath) {
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
}

let filePath = "./testUserPipeline.json";

let userPipeline = await loadJson(filePath)



// Function to traverse the diagram in topological order
function traverseDiagram(diagram, callback = stringGenerator) {
    const blocks = diagram.blocks.reduce((acc, block) => {
        acc[block.id] = { ...block};
        return acc;
    }, {});

    console.log(blocks);
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




//block.json -> string + any arguments needed
function addParametersToFunction(block) {
    let resultString = block.category.name + "(";
    let parameters = block.parameters;

    // Check if there are parameters
    if (Object.keys(parameters).length > 0) {
        // Add parameters to the result string
        for (const parameter in parameters) {
            resultString += `${parameter} = ${parameters[parameter]}, `;
        }
        // Remove the comma and space
        resultString = resultString.slice(0, -2);
    }

    // Close the bracket and return the result
    return resultString + ")";
}

//string -> block.json -> string
function stringGenerator(currentString, block){
    let newString = currentString


    if (block.category.type === "source"){
        finalString += "source_" + counter + " = " + addParametersToFunction(block) + "\n"
        newString+="source_"+counter+".pipe(\n"
        counter++
    }
    else if (block.outputs == false) {
        //removes ", " from the last element
        finalString += newString.slice(0, -2) + "\n)" + addParametersToFunction(block) + "\n"
    }
    else{
        newString += addParametersToFunction(block) + ",\n"
    }

    return newString
}

let finalString = ""
let counter = 0


traverseDiagram(userPipeline);
console.log(finalString)