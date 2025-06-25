import {ExtendedBlock, Graph, ExtendedPipeline} from "./Syntax.js";
import {Handler} from "./Handler.js";


/*
The structure of the generated code follows this structure:

[headString]
[bodyString]


* headString is responsible for holding the imports
* function declarations for custom blocks
* and user-defined parameters

* bodyString will hold the source and pipeline definitions.

This Compiler class is responsible for going through the JSON pipeline and
hold the string that interprets as valid python code.

It is NOT responsible for knowing what to do with each block, it simply goes through
the pipeline and calls for its helper class to return the string associated with the
block it visits.
*/

export class Compiler {

    private blocks : Graph = {};

    private headString : string = `from pybeamline.sources import *
from pybeamline.sources.real_world_sources import *
from pybeamline.mappers import *
from pybeamline.algorithms.discovery import *
from pybeamline.algorithms.conformance import *
from pybeamline.filters import *
from reactivex import merge, concat

# Area reserved for user-defined parameters
# You can define variables here that will be used in the pipeline

`

    private headClosingString : string = "# pyBeamline code\n";

    private bodyString : string = "";
    private handler : Handler;

    public constructor () {
        this.handler = new Handler(this);
    }

    public getHeadString() : string {return this.headString};
    public getHeadClosingString() : string {return this.headClosingString;}


    private readUserPipeline (userPipeline : ExtendedPipeline) {

        this.blocks = userPipeline.blocks.reduce((acc : Graph, block : ExtendedBlock ) => {
            acc[block.id] = block;
            return acc;
        }, {});

    }

    public compilePipeline (userPipeline : ExtendedPipeline) {

        //Variable reset
        this.headString = `from pybeamline.sources import *
from pybeamline.sources.real_world_sources import *
from pybeamline.mappers import *
from pybeamline.algorithms.discovery import *
from pybeamline.algorithms.conformance import *
from pybeamline.filters import *
from reactivex import merge, concat

# Area reserved for user-defined parameters
# You can define variables here that will be used in the pipeline

`
        this.bodyString = "";
        this.handler.resetCounters();


        this.readUserPipeline(userPipeline);

        // Find and start traversal from all source blocks (blocks with no input)
        Object.values(this.blocks)
            .filter(block => !block.descriptors.inputType)
            .forEach(block => this.visitBlock(block,""));

        return this.headString + this.headClosingString + this.bodyString;

    }

    private visitBlock (block : ExtendedBlock, currentString : string){


        const newString = this.handler.processBlock(block,  currentString);

        //See if allowed to continue
        if (!this.handler.tryPass(block)) {
            return
        }
        // Visit all outputs (following the one-way directional constraint)
        block.outputs.forEach( id =>
            this.visitBlock(this.blocks[id], newString)
        );



    };


    //Functions appending to the final code
    public appendBodyString = (stringToAppend : string) => {
        this.bodyString += stringToAppend;
    }
    public appendHeadString = (stringToAppend : string) => {
        this.headString += stringToAppend;
    }


}