import { generateCode } from "../../../codeGenerator.ts";
import {beforeAll, expect, test} from 'vitest';
import {readFileSync} from "fs";
import AjvManager from "../../../AjvManager.js";


//Initial setup
let pathToTests : string = "src/logic/tests/block/sources/";
let importString : string = `from pybeamline.sources import *
from pybeamline.sources.real_world_sources import *
from pybeamline.mappers import *
from pybeamline.algorithms.discovery import *
from pybeamline.algorithms.conformance import *
from pybeamline.filters import *
from reactivex import merge, concat
\n`
beforeAll(async () => {
    // This code runs once before all tests
    await AjvManager.getInstance().manageReferences()
});

//This test series will cover each single source used within a legal unit pipeline


test("ais_source", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "ais_source.test.json", "utf-8"))))
        .toBe(
            importString + `source_0 = ais_source()\nsource_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))\n
`)
})



test("log_source", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "log_source.test.json", "utf-8"))))
        .toBe(
            importString +   `source_0 = log_source(log = ['T', 'E', 'S', 'T'])\nsource_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))\n
`)
})



//Note mqttxes_source requires an input() at the end

test("mqttxes_source", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "mqttxes_source.test.json", "utf-8"))))
        .toBe(
            importString +
`source_0 = mqttxes_source(broker = 'broker.mqtt.cool', port = 1883, base_topic = 'base/topic/')
source_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))\n
`)
})


test("string_test_source", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "string_test_source.test.json", "utf-8"))))
        .toBe(
            importString + `source_0 = string_test_source(iterable = ['T', 'E', 'S', 'T'])\nsource_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))\n
`)
})



//Note wikimedia_source requires an input() at the end

test("wikimedia_source", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "wikimedia_source.test.json", "utf-8"))))
        .toBe(
            importString +
            `source_0 = wikimedia_source()
source_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))\n
`)
})




test("xes_log_source", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "xes_log_source.test.json", "utf-8"))))
        .toBe(
            importString +
            `source_0 = xes_log_source(log = pm4py.read_xes("test.xes"))\nsource_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))\n
`)
})



test("xes_log_source_from_file", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "xes_log_source_from_file.test.json", "utf-8"))))
        .toBe(importString +
            `source_0 = xes_log_source_from_file(log = "test.xes")\nsource_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))\n
`)
})
