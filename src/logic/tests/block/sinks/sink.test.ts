import { generateCode } from "../../../codeGenerator.ts";
import {beforeAll, expect, test} from 'vitest';
import {readFileSync} from "fs";
import AjvManager from "../../../AjvManager.js";


//Initial setup
let pathToTests : string = "src/logic/tests/block/sinks/";
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

test("print_sink", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "print_sink.test.json", "utf-8"))))
        .toBe( importString +
`source_0 = ais_source()
source_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))

`
)})

test("dummy_sink", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "dummy_sink.test.json", "utf-8"))))
        .toBe( importString +
            `source_0 = ais_source()
source_0.pipe(
).subscribe(lambda _ : None)

`
        )})

test("lambda_sink", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "lambda_sink.test.json", "utf-8"))))
        .toBe( importString +
            `source_0 = ais_source()
source_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))

`
        )})

test("custom_sink", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "custom_sink.test.json", "utf-8"))))
        .toBe( importString +
`def myfunc():
 \treturn2

source_0 = ais_source()
source_0.pipe(
).subscribe(myfunc)

`
)})