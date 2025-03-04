import { generateCode } from "../../codeGenerator.ts";
import { expect, test } from 'vitest';


//Initial setup
let pathToTests : string = "src/logic/tests/complex/";

let importString : string = "from pybeamline import *\nfrom reactivex import merge, concat\n\n"

/*
    0 -> 1 ->                4 ->
              2 (merges) ->
         3 ->                5 -> 6
 */


test("Complex pipeline 1", () => {
    expect(generateCode(pathToTests + "complex1.json"))
        .toBe(
importString +
`source_0 = string_test_source(iterable = ['A', 'B', 'C'])
pipe_0 = source_0.pipe( 
\tretains_activity_filter(activity_names = {'x', 'z'}))
source_1 = string_test_source(iterable = ['E', 'F', 'G'])
pipe_1 = source_1.pipe()
union_0 = merge(pipe_0, pipe_1)
union_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))
union_0.pipe( 
\tsimple_dfg_miner()
).subscribe(on_next = lambda x : print(str(x)))
`
)})


/*
    0 -> 1 ->                4 ->
              2 (merges) ->        6 (concats) -> 7
         3 ->                5 ->
 */


test("Complex pipeline 2", () => {
    expect(generateCode(pathToTests + "complex2.json"))
        .toBe(
importString +
`source_0 = string_test_source(iterable = ['A', 'B', 'C'])
pipe_0 = source_0.pipe( 
\tretains_activity_filter(activity_names = {'x', 'z'}))
source_1 = string_test_source(iterable = ['E', 'F', 'G'])
pipe_1 = source_1.pipe()
union_0 = merge(pipe_0, pipe_1)
pipe_2 = union_0.pipe( 
\tretains_activity_filter(activity_names = 'E'))
pipe_3 = union_0.pipe( 
\tretains_activity_filter(activity_names = 'F'))
union_1 = concat(pipe_2, pipe_3)
union_1.pipe(
).subscribe(on_next = lambda x : print(str(x)))
`
        )})





test("Complex pipeline 3 - 3 sources merging", () => {
    expect(generateCode(pathToTests + "complex3.json"))
        .toBe(
            importString +
`source_0 = string_test_source(iterable = ['A', 'B', 'C'])
pipe_0 = source_0.pipe()
source_1 = string_test_source(iterable = ['G', 'H', 'I'])
pipe_1 = source_1.pipe()
source_2 = string_test_source(iterable = ['D', 'E', 'F'])
pipe_2 = source_2.pipe()
source_3 = string_test_source(iterable = ['J', 'K', 'L'])
pipe_3 = source_3.pipe()
source_4 = string_test_source(iterable = ['M', 'N', 'Ñ'])
pipe_4 = source_4.pipe()
union_0 = merge(pipe_0, pipe_1, pipe_2, pipe_3, pipe_4)
union_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))
`
        )})




test("Complex pipeline 4 - long single pipeline", () => {
    expect(generateCode(pathToTests + "complex4.json"))
        .toBe(
            importString +
`source_0 = string_test_source(iterable = ['A', 'B', 'C', 'D', 'E'])
source_0.pipe( 
\texcludes_activity_filter(activity_names = 'E'),
\texcludes_activity_filter(activity_names = 'D'),
\texcludes_activity_filter(activity_names = 'C'),
\texcludes_activity_filter(activity_names = 'B')
).subscribe(on_next = lambda x : print(str(x)))
`
        )})

