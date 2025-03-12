import { generateCode } from "../../../codeGenerator.ts";
import { expect, test } from 'vitest';
import {readFileSync} from "fs";


//Initial setup
let pathToTests : string = "src/logic/tests/block/filters/";
let importString : string = "from pybeamline import *\nfrom reactivex import merge, concat\n\n"


//This test series will cover each single filter used within a legal unit pipeline



test("retains_on_event_attribute_equal_filter", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "retains_on_event_attribute_equal_filter.test.json", "utf-8"))))

        .toBe(importString +
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\tretains_on_event_attribute_equal_filter(attribute_name = 'attrib1', attribute_values = {'A', 'B'})
).subscribe(on_next = lambda x : print(str(x)))
`)
})



test("excludes_on_event_attribute_equal_filter", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "excludes_on_event_attribute_equal_filter.test.json", "utf-8"))))
        .toBe(importString +
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\texcludes_on_event_attribute_equal_filter(attribute_name = 'attrib1', attribute_values = {'A', 'B'})
).subscribe(on_next = lambda x : print(str(x)))
`)
})





test("retains_on_trace_attribute_equal_filter", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "retains_on_trace_attribute_equal_filter.test.json", "utf-8"))))
        .toBe(importString +
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\tretains_on_trace_attribute_equal_filter(attribute_name = 'attrib1', attribute_values = {'A', 'B'})
).subscribe(on_next = lambda x : print(str(x)))
`
        )
})




test("excludes_on_trace_attribute_equal_filter", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "excludes_on_trace_attribute_equal_filter.test.json", "utf-8"))))
        .toBe(importString +
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
\texcludes_on_trace_attribute_equal_filter(attribute_name = 'attrib1', attribute_values = {'A', 'B'})
).subscribe(on_next = lambda x : print(str(x)))
`)
})



test("retains_activity_filter", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "retains_activity_filter.test.json", "utf-8"))))
        .toBe(importString +
`source_0 = string_test_source(iterable = ['x', 'y', 'z'])
source_0.pipe( 
\tretains_activity_filter(activity_names = {'x', 'z'})
).subscribe(on_next = lambda x : print(str(x)))
`)
})


test("excludes_activity_filter", () => {
    expect(generateCode( JSON.parse(readFileSync(pathToTests + "excludes_activity_filter.test.json", "utf-8"))))
        .toBe(importString +
`source_0 = string_test_source(iterable = ['x', 'y', 'z'])
source_0.pipe( 
\texcludes_activity_filter(activity_names = {'x', 'z'})
).subscribe(on_next = lambda x : print(str(x)))
`)})


