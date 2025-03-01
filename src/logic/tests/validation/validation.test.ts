import { generateCode } from "../../codeGenerator.ts";
import { expect, test } from 'vitest';



//Initial setup
let pathToTests : string = "src/logic/tests/validation/";



//  ########
//  Test 1 : [source] -> [sinks]
//  ######## string_test_source is not written correctly
/*

test("Validation test 1", () => {
    expect(generateCode(pathToTests + "valid1.json"))
        .toBe(
)})



//  ########
//  Test 2 : [source] -> [sinks]
//  ######## string_test_source is missing argument 'iterable' (required)

test("Validation test 1", () => {
    expect(generateCode(pathToTests + "valid2.json"))
        .toBe(
)})


//  ########
//  Test 3 : [sinks]  ERROR
//  ########

test("Validation test 1", () => {
    expect(generateCode(pathToTests + "valid3.json"))
        .toBe(
)})

//  ########
//  Test 4 : Source -> Miner -> Filter -> Sink
//  ########  ERROR: Output type of miner not compatible with input of filter


test("Validation test 1", () => {
    expect(generateCode(pathToTests + "valid4.json"))
        .toBe(
)})


*/