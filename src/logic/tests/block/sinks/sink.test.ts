import { generateCode } from "../../../codeGenerator.ts";
import { expect, test } from 'vitest';


//Initial setup
let pathToTests : string = "src/logic/tests/block/sinks/";


test("sink", () => {
    expect(generateCode(pathToTests + "sink.test.json"))
        .toBe(
`source_0 = ais_source()
source_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))
`
)})

