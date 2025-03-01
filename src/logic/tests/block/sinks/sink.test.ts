import { generateCode } from "../../../codeGenerator.ts";
import { expect, test } from 'vitest';


//Initial setup
let pathToTests : string = "src/logic/tests/block/sinks/";
let importString : string = "from pybeamline import *\nfrom reactivex import merge, concat\n\n"

test("sink", () => {
    expect(generateCode(pathToTests + "sink.test.json"))
        .toBe( importString +
`source_0 = ais_source()
source_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))
`
)})

