import { generateCode } from "../../codeGenerator.ts";
import { expect, test } from 'vitest';



//Initial setup
let pathToTests : string = "src/logic/tests/validation/";



//  ########
//  Test 1 : [source] -> [sink]
//  ######## string_test_source is not written correctly


//  ########
//  Test 2 : [source] -> [sink]
//  ######## string_test_source is missing argument 'iterable' (required)



/*
//  ########
//  Test 3 : [sink]  ERROR
//  ########

test("Test 3: Sink", () => {
    expect(generateCode(pathToTests + "valid3.json"))
        .toBe("User diagram is not valid")
})


//  ########
//  Test 4 : [source]  ERROR
//  ########

test("Test 4: Source", () => {
    expect(generateCode(pathToTests + "valid4.json"))
        .toBe("User diagram is not valid")
})
*/