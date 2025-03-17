import { generateCode } from "../../../codeGenerator.ts";
import {beforeAll, expect, test} from 'vitest';
import {readFileSync} from "fs";
import AjvManager from "../../../AjvManager.js";


//Initial setup
let pathToTests : string = "src/logic/tests/block/miners/";
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


//This test series will cover each single filter used within a legal unit pipeline



test("sliding_window_to_log", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "sliding_window_to_log.test.json", "utf-8"))))
        .toBe(importString +
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\tsliding_window_to_log()
).subscribe(on_next = lambda x : print(str(x)))
`)
})

test("simple_dfg_miner", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "simple_dfg_miner.test.json", "utf-8"))))
        .toBe(importString +
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\tsimple_dfg_miner(model_update_frequency = 20, min_relative_frequency = 3)
).subscribe(on_next = lambda x : print(str(x)))
`)
})


test("infinite_size_directly_follows_mapper", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "infinite_size_directly_follows_mapper.test.json", "utf-8"))))
        .toBe(importString +
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\tinfinite_size_directly_follows_mapper()
).subscribe(on_next = lambda x : print(str(x)))
`)
})

test("heuristics_miner_lossy_counting_budget", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "heuristics_miner_lossy_counting_budget.test.json", "utf-8"))))
        .toBe(importString +
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\theuristics_miner_lossy_counting_budget(model_update_frequency = 1, budget = 2, dependency_threshold = 3, and_threshold = 4)
).subscribe(on_next = lambda x : print(str(x)))
`)
})

test("heuristics_miner_lossy_counting", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "heuristics_miner_lossy_counting.test.json", "utf-8"))))
        .toBe(importString +
            `source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\theuristics_miner_lossy_counting(model_update_frequency = 1, max_approx_error = 2, dependency_threshold = 3, and_threshold = 4)
).subscribe(on_next = lambda x : print(str(x)))
`)
})

test("behavioral_conformance", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "behavioral_conformance.test.json", "utf-8"))))
        .toBe(importString +
            `source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\tbehavioral_conformance(model = user_defined_parameter)
).subscribe(on_next = lambda x : print(str(x)))
`)
})