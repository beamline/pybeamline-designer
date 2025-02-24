import { generateCode } from "../../../codeGenerator.ts";
import { expect, test } from 'vitest';


//Initial setup
let pathToTests : string = "src/logic/tests/block/miners/";



//This test series will cover each single filter used within a legal unit pipeline



test("sliding_window_to_log", () => {
    expect(generateCode(pathToTests + "sliding_window_to_log.test.json"))
        .toBe(
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\tsliding_window_to_log()
).subscribe(on_next = lambda x : print(str(x)))
`)
})

test("simple_dfg_miner", () => {
    expect(generateCode(pathToTests + "simple_dfg_miner.test.json"))
        .toBe(
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\tsimple_dfg_miner(model_update_frequency = 20, min_relative_frequency = 3)
).subscribe(on_next = lambda x : print(str(x)))
`)
})


test("infinite_size_directly_follows_mapper", () => {
    expect(generateCode(pathToTests + "infinite_size_directly_follows_mapper.test.json"))
        .toBe(
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\tinfinite_size_directly_follows_mapper()
).subscribe(on_next = lambda x : print(str(x)))
`)
})

test("heuristics_miner_lossy_counting_budget", () => {
    expect(generateCode(pathToTests + "heuristics_miner_lossy_counting_budget.test.json"))
        .toBe(
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\theuristics_miner_lossy_counting_budget(model_update_frequency = 1, budget = 2, dependency_threshold = 3, and_threshold = 4)
).subscribe(on_next = lambda x : print(str(x)))
`)
})

test("heuristics_miner_lossy_counting", () => {
    expect(generateCode(pathToTests + "heuristics_miner_lossy_counting.test.json"))
        .toBe(
            `source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\theuristics_miner_lossy_counting(model_update_frequency = 1, max_approx_error = 2, dependency_threshold = 3, and_threshold = 4)
).subscribe(on_next = lambda x : print(str(x)))
`)
})

test("behavioral_conformance", () => {
    expect(generateCode(pathToTests + "behavioral_conformance.test.json"))
        .toBe(
            `source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\tbehavioral_conformance(mmamma mia)
).subscribe(on_next = lambda x : print(str(x)))
`)
})