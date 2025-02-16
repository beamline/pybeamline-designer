import { generateCode } from "../../codeGenerator.ts";
import { expect, test } from '@jest/globals';


//Initial setup
let pathToTests : string = "src/logic/tests/unit/";





//  ########
//  Test 1 : [source] -> [sink]
//  ########

test("Test 1: Source -> Sink", () => {
    expect(generateCode(pathToTests + "unit1.json"))
            .toBe(
                `source_0 = string_test_source(iterable = ['A', 'B', 'C'])\nsource_0.pipe(\n).subscribe(on_next = lambda x : print(str(x)))\n`)
})



//  ########
//  Test 2 : [source] -> [filter] -> [sink]
//  ########

test("Test 2: Source -> Filter -> Sink", () => {
    expect(generateCode(pathToTests + "unit2.json"))
        .toBe(
            `source_0 = string_test_source(iterable = {'A', 'B', 'C'})\nsource_0.pipe( \nretains_activity_filter({'x', 'z'})).subscribe(on_next = lambda x : print(str(x)))\n`)
})


//  ########
//  Test 3 : [sink]  ERROR
//  ########

test("Test 3: Sink", () => {
    expect(generateCode(pathToTests + "unit3.json"))
        .toBe("User diagram is not valid")
})


//  ########
//  Test 4 : [source]  ERROR
//  ########

test("Test 4: Source", () => {
    expect(generateCode(pathToTests + "unit4.json"))
        .toBe("User diagram is not valid")
})

//  ########
//  Test 5 : [source0] -> [sink0]  (disconnected diagram)
//           [source1] -> [sink1]
//  ########

test("Test 5:\n[source0] -> [sink0]\n[source1] -> [sink1]", () => {
    expect(generateCode(pathToTests + "unit5.json"))
        .toBe("source_0 = string_test_source('x')\nsource_0.pipe().subscribe(lambda x : print(str(x))\nsource_1 = string_test_source('y')\nsource_1.pipe().subscribe(lambda x : print(str(x))")
})


/*
TODO: Test 6 :
TODO:            ->  filter0 -> sink0
TODO:   source0
TODO:            ->  filter1 -> sink1
*/

/*
TODO: Test 7 :
TODO:   source0  ->
TODO:                (merge/concat) => sink0
TODO:   source1  ->
*/