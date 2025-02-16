import { CodeGen } from "../codeGen.ts"
import { expect, test } from '@jest/globals';


//Initial setup
const pathToTests : string = "src/logic/testing/tests";
const codeGenerator : CodeGen = new CodeGen;




//  ########
//  Test 1 : [source] -> [sink]
//  ########

test("Test 1: Source -> Sink", () => {
    expect(codeGenerator.traverseDiagram(pathToTests + "test1.json"))
            .toBe(
                `source_0 = string_test_source(iterable = ['A', 'B', 'C'])\nsource_0.pipe(\n).subscribe(on_next = lambda x : print(str(x)))\n`)
})






