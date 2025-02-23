import { generateCode } from "../../codeGenerator.ts";
import { expect, test } from 'vitest';


//Initial setup
let pathToTests : string = "src/logic/tests/block/";


//This test series will cover each single block used within a legal unit pipeline

//SOURCES

test("ais_source", () => {
    expect(generateCode(pathToTests + "ais_source.test.json"))
        .toBe(
            `source_0 = ais_source()\n`)
})



test("log_source", () => {
    expect(generateCode(pathToTests + "log_source.test.json"))
        .toBe(
            `source_0 = log_source(log = ['T', 'E', 'S', 'T'])\n`)
})
