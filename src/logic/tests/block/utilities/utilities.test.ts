import { generateCode } from "../../../codeGenerator.ts";
import { expect, test } from 'vitest';


//Initial setup
let pathToTests : string = "src/logic/tests/block/utilities/";



test("union (concat)", () => {
    expect(generateCode(pathToTests + "concat.test.json"))
        .toBe(
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
    expect(generateCode(pathToTests + "merge.test.json"))
        .toBe(
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
    expect(generateCode(pathToTests + "customSource.test.json"))
        .toBe(
`example_function_body
\toperation1
\toperation2
\treturn ans
source_0 = user_made_function_as_source()
`
        )})


test("custom (as filter)", () => {
    expect(generateCode(pathToTests + "customFilter.test.json"))
        .toBe(
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
    expect(generateCode(pathToTests + "customMiner.test.json"))
        .toBe(
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
    expect(generateCode(pathToTests + "customUnion.test.json"))
        .toBe(
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
