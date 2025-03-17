import { generateCode } from "../../codeGenerator.ts";
import {beforeAll, expect, test} from 'vitest';
import {readFileSync} from "fs";
import AjvManager from "../../AjvManager.js";



//Initial setup
let pathToTests : string = "src/logic/tests/validation/";

beforeAll(async () => {
    // This code runs once before all tests
    await AjvManager.getInstance().manageReferences()
});


//  ########
//  Test 1 : [source] -> [sinks]
//  ######## string_test_source is not written correctly


test("Validation test 1", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "valid1.json", "utf-8"))))
        .toBe("Error when parsing pipeline."
)})



//  ########
//  Test 2 : [source] -> [sinks]
//  ######## string_test_source is missing argument 'iterable' (required)

test("Validation test 2", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "valid2.json", "utf-8"))))
        .toBe("Error: at block string_test_source\n" +
            "Check for missing arguments or incorrect connections according to type."
)})



//  ########
//  Test 3 : [sinks]  ERROR
//  ########

test("Validation test 3", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "valid3.json", "utf-8"))))
        .toBe("Error: at block sink\n" +
            "Check for missing arguments or incorrect connections according to type."
)})

//  ########
//  Test 4 : Source -> Miner -> Filter -> Sink
//  ########  ERROR: Output type of miner not compatible with input of filter


test("Validation test 4", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "valid4.json", "utf-8"))))
        .toBe("Error: at block simple_dfg_miner\n" +
            "Check for missing arguments or incorrect connections according to type."
)})


test("Validation test 5", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "valid5.json", "utf-8"))))
        .toBe("Error: at block retains_activity_filter\n" +
            "Check for missing arguments or incorrect connections according to type."
        )})

