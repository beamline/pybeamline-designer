import { generateCode } from "../../../codeGenerator.ts";
import {beforeAll, expect, test} from 'vitest';
import {readFileSync} from "fs";
import AjvManager from "../../../AjvManager.js";
import {Compiler} from "../../../Compiler.js";


//Initial setup
let pathToTests : string = "src/model/tests/block/sinks/";
const compiler : Compiler = new Compiler()
let importString : string = compiler.getHeadString() + compiler.getHeadClosingString();

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
        .toBe(
compiler.getHeadString() +
`def myfunc():
 \treturn2

`
+ compiler.getHeadClosingString() +
`source_0 = ais_source()
source_0.pipe(
).subscribe(myfunc)

`
)})