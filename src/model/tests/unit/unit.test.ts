import { generateCode } from "../../codeGenerator.ts";
import {beforeAll, expect, test} from 'vitest';
import {readFileSync} from "fs";
import AjvManager from "../../AjvManager.js";
import {Compiler} from "../../Compiler.js";
import {GuiPipeline} from "../../Syntax.js";
import {Translator} from "@/model/Translator.js";


//Initial setup
let pathToTests : string = "src/model/tests/unit/";
const compiler : Compiler = new Compiler()
const translator = Translator.getInstance();
let importString : string = compiler.getHeadString() + compiler.getHeadClosingString();

beforeAll(async () => {
    // This code runs once before all tests
    await AjvManager.getInstance().manageReferences()
});


/*
This test series checks for simple (unit) pipelines the user can make.
*/


//  ########
//  Test 1 : [source] -> [sinks]
//  ########

test("Test 1: Source -> Sink", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "unit1.json", "utf-8"))))
            .toBe(
                importString+
`source_0 = string_test_source(iterable = ['A', 'B', 'C'])\nsource_0.pipe(\n).subscribe(on_next = lambda x : print(str(x)))\n
`)
})



//  ########
//  Test 2 : [source] -> [filter] -> [sinks]
//  ########

test("Test 2: Source -> Filter -> Sink", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "unit2.json", "utf-8"))))        .toBe(
            importString +
        `source_0 = string_test_source(iterable = ['x', 'y', 'z'])\nsource_0.pipe( \n\tretains_activity_filter(activity_names = {'x', 'z'})\n).subscribe(on_next = lambda x : print(str(x)))\n
`)
})



//  ########
//  Test 3 : [source0] -> [sink0]  (disconnected diagram)
//           [source1] -> [sink1]
//  ########

test("Test 3: source -> sinks, source1 -> sink1", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "unit3.json", "utf-8"))))

.toBe(importString + "source_0 = string_test_source(iterable = 'x')\nsource_0.pipe(\n).subscribe(on_next = lambda x : print(str(x)))\n\nsource_1 = string_test_source(iterable = 'y')\nsource_1.pipe(\n).subscribe(on_next = lambda x : print(str(x)))\n\n")
})



/*
 * Test 4 :
 *            ->  filter0 -> sink0
 *  source0
 *            ->  filter1 -> sink1
*/

test("Test 4: 1 source goes to 2 sinks", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "unit4.json", "utf-8"))))        .toBe(
importString + `source_0 = string_test_source(iterable = ['x', 'y'])
source_0.pipe( 
\tretains_activity_filter(activity_names = 'y')
).subscribe(on_next = lambda x : print(str(x)))

source_0.pipe( 
\tretains_activity_filter(activity_names = 'x')
).subscribe(on_next = lambda x : print(str(x)))

`)
})


/*
 * Test 5 :
 *   source0  ->
 *                (merge/concat) => sink0
 *   source1  ->
*/

test("Test 5: 2 sources merge towards 1 sinks", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "unit5.json", "utf-8"))))        .toBe(
importString + `source_0 = string_test_source(iterable = ['A', 'B', 'C'])
pipe_0 = source_0.pipe()

source_1 = string_test_source(iterable = ['x', 'y', 'z'])
pipe_1 = source_1.pipe()

union_0 = merge(pipe_0, pipe_1)

union_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))

`)
})




/*
 * Test 6 :
 *   source0  ->  filter0 ->
 *                        (merge/concat) => sink0
 *   source1  ->  filter1 ->
*/

test("Test 6: 2 sources extended with sinks merge towards 1 sinks", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "unit6.json", "utf-8"))))        .toBe(
importString + `source_0 = string_test_source(iterable = ['A', 'B', 'C'])
pipe_0 = source_0.pipe( 
\texcludes_activity_filter(activity_names = {'A'}))

source_1 = string_test_source(iterable = ['x', 'y', 'z'])
pipe_1 = source_1.pipe( 
\tretains_activity_filter(activity_names = {'x', 'z'}))

union_0 = merge(pipe_0, pipe_1)

union_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))

`)
})

test("Test 7: Test 1 with UI data", () => {
    const UIinfo = JSON.parse(readFileSync(pathToTests + "unit7.json", "utf-8"))
    const pipeline: GuiPipeline = translator.getGuiPipelineFromVue(UIinfo.nodes,  UIinfo.edges)
    expect(generateCode(pipeline))        .toBe(
        importString+
        `source_0 = string_test_source(iterable = ['A', 'B', 'C'])\nsource_0.pipe(\n).subscribe(on_next = lambda x : print(str(x)))\n
`)
})