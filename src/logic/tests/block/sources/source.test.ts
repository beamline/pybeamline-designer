import { generateCode } from "../../../codeGenerator.ts";
import { expect, test } from 'vitest';


//Initial setup
let pathToTests : string = "src/logic/tests/block/sources/";


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



//Note mqttxes_source requires an input() at the end

test("mqttxes_source", () => {
    expect(generateCode(pathToTests + "mqttxes_source.test.json"))
        .toBe(
`source_0 = mqttxes_source(broker = 'broker.mqtt.cool', port = 1883, base_topic = 'base/topic/')
input()
`)
})


test("string_test_source", () => {
    expect(generateCode(pathToTests + "string_test_source.test.json"))
        .toBe(
            `source_0 = string_test_source(iterable = ['T', 'E', 'S', 'T'])\n`)
})



//Note wikimedia_source requires an input() at the end

test("wikimedia_source", () => {
    expect(generateCode(pathToTests + "wikimedia_source.test.json"))
        .toBe(
`source_0 = wikimedia_source()
input()`)
})




test("xes_log_source", () => {
    expect(generateCode(pathToTests + "xes_log_source.test.json"))
        .toBe(
            `source_0 = xes_log_source(log = pm4py.read_xes("test.xes"))\n`)
})



test("xes_log_source_from_file", () => {
    expect(generateCode(pathToTests + "xes_log_source_from_file.test.json"))
        .toBe(
            `source_0 = xes_log_source_from_file(log = "test.xes")\n`)
})
