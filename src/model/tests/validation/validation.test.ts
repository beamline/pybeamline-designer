import { generateCode } from "../../codeGenerator.ts";
import {beforeAll, expect, test} from 'vitest';
import {readFileSync} from "fs";
import AjvManager from "../../AjvManager.js";
import {PipelineSyntaxError} from "../../sanityChecker.js";



//Initial setup
let pathToTests : string = "src/model/tests/validation/";

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
        .toBe("Error at block string_test_source: must have required property 'iterable'\n"
)})



//  ########
//  Test 3 : [sinks]  ERROR
//  ########

test("Validation test 3", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "valid3.json", "utf-8"))))
        .toBe("Error at block lambda_sink: Invalid /inputType\n"
)})

//  ########
//  Test 4 : Source -> Miner -> Filter -> Sink
//  ########  ERROR: Output type of miner not compatible with input of filter


test("Validation test 4", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "valid4.json", "utf-8"))))
        .toBe("Error at block simple_dfg_miner: Invalid connections\n"
)})


test("Validation test 5", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "valid5.json", "utf-8"))))
        .toBe("Error at block retains_activity_filter: Invalid connections\n"
        )})


test("Validation test 6", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "valid6.json", "utf-8"))))
        .toBe("Error at block string_test_source: must have required property 'iterable'\n" +
            "Error at block mqttxes_source: must have required property 'broker'\n" +
            "Error at block log_source: must have required property 'log'\n" +
            "Error at block sliding_window_to_log: Invalid /outputType\n" +
            "Error at block behavioral_conformance: Invalid /outputType\n" +
            "Error at block excludes_activity_filter: must have required property 'activity_names'\n" +
            "Error at block simple_dfg_miner: Invalid /outputType\n" +
            "Error at block heuristics_miner_lossy_counting: Invalid /outputType\n" +
            "Error at block heuristics_miner_lossy_counting: Invalid /outputType\n" +
            "Error at block retains_activity_filter: must have required property 'activity_names'\n" +
            "Error at block dummy_sink: Invalid /inputType\n" +
            "Error at block print_sink: Invalid /inputType\n"
        )})
