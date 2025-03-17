import { generateCode } from "../../../codeGenerator.ts";
import {beforeAll, expect, test} from 'vitest';
import {readFileSync} from "fs";
import AjvManager from "../../../AjvManager.js";


//Initial setup
let pathToTests : string = "src/logic/tests/block/utilities/";
let importString : string = `from pybeamline.sources import *
from pybeamline.sources.real_world_sources import *
from pybeamline.mappers import *
from pybeamline.algorithms import *
from pybeamline.filters import *
from reactivex import merge, concat
\n`
beforeAll(async () => {
    // This code runs once before all tests
    await AjvManager.getInstance().manageReferences()
});


test("union (concat)", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "concat.test.json", "utf-8"))))
        .toBe( importString +
`source_0 = string_test_source(iterable = ['A', 'B', 'C'])
pipe_0 = source_0.pipe()
source_1 = string_test_source(iterable = ['x', 'y', 'z'])
pipe_1 = source_1.pipe()
union_0 = concat(pipe_0, pipe_1)
union_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))
`
)})



test("union (merge)", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "merge.test.json", "utf-8"))))
        .toBe(importString +
            `source_0 = string_test_source(iterable = ['A', 'B', 'C'])
pipe_0 = source_0.pipe()
source_1 = string_test_source(iterable = ['x', 'y', 'z'])
pipe_1 = source_1.pipe()
union_0 = merge(pipe_0, pipe_1)
union_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))
`
)})


test("custom (as source)", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "customSource.test.json", "utf-8"))))
        .toBe(importString +
            `example_function_body
\toperation1
\toperation2
\treturn ans
source_0 = user_made_function_as_source()
`
        )})


test("custom (as filter)", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "customFilter.test.json", "utf-8"))))
        .toBe(importString +
            `example_function_body
\toperation1
\toperation2
\treturn ans
source_0 = string_test_source(iterable = ['x', 'y', 'z'])
source_0.pipe( 
\tuser_made_function_as_filter()
).subscribe(on_next = lambda x : print(str(x)))
`
)})


test("custom (as miner)", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "customMiner.test.json", "utf-8"))))
        .toBe(importString +
            `example_function_body
\toperation1
\toperation2
\treturn ans
source_0 = string_test_source(iterable = ['x', 'y', 'z'])
source_0.pipe( 
\tuser_made_function_as_miner()
).subscribe(on_next = lambda x : print(str(x)))
`)})


test("custom (as union)", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "customUnion.test.json", "utf-8"))))
        .toBe(importString +
            `example_function_body
\toperation1
\toperation2
\treturn ans
source_0 = string_test_source(iterable = ['x', 'y', 'z'])
pipe_0 = source_0.pipe()
source_1 = string_test_source(iterable = ['A', 'B', 'C'])
pipe_1 = source_1.pipe()
union_0 = user_made_function_as_merger(pipe_0, pipe_1)
union_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))
`
)})
