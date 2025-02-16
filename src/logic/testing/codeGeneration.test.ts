import { generateCode} from "../codeGenerator.js";
import { expect, test } from '@jest/globals';


//Initial setup
const pathToTests : string = "src/logic/testing/tests/";



//  ########
//  Test 1 : [source] -> [sink]
//  ########

test("Test 1: Source -> Sink", () => {
    expect(generateCode(pathToTests + "test1.json"))
            .toBe(
                `source_0 = string_test_source(iterable = ['A', 'B', 'C'])\nsource_0.pipe(\n).subscribe(on_next = lambda x : print(str(x)))\n`)
})






