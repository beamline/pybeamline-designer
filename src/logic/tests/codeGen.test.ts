import { CodeGen } from "../codeGen.ts"
import { expect, test } from '@jest/globals';


//Initial setup
const pathToTests : string = "src/logic/tests/";
const codeGenerator : CodeGen = new CodeGen("");




//  ########
//  Test 1 : [source] -> [sink]
//  ########

test("Test 1: Source -> Sink", () => {
    codeGenerator.updateFilepath(pathToTests + "test1.json")
    expect(codeGenerator.traverseDiagram())
            .toBe(
                `source_0 = string_test_source(iterable = ['A', 'B', 'C'])\nsource_0.pipe(\n).subscribe(on_next = lambda x : print(str(x)))\n`)
})

//TODO: [TEST 1] Find a way to make sure the ... .pipe(\n) is not printed as .pipe\n) when the body is empty




