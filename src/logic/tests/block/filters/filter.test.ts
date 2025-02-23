import { generateCode } from "../../../codeGenerator.ts";
import { expect, test } from 'vitest';


//Initial setup
let pathToTests : string = "src/logic/tests/block/filters/";



//This test series will cover each single filter used within a legal unit pipeline



test("retains_on_event_attribute_equal_filter", () => {
    expect(generateCode(pathToTests + "retains_on_event_attribute_equal_filter.test.json"))
        .toBe(
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe( 
retains_on_event_attribute_equal_filter(attribute_name = 'attrib1', attribute_values = {'A', 'B'})
).subscribe(on_next = lambda x : print(str(x)))
`
        )
})



test("excludes_on_event_attribute_equal_filter", () => {
    expect(generateCode(pathToTests + "excludes_on_event_attribute_equal_filter.test.json"))
        .toBe(
`source_0 = xes_log_source_from_file(log = "test.xes")
source_0.pipe(excludes_on_event_attribute_equal_filter(attribute_name = 'attrib_1', attribute_values = {'A', 'B'})
)`
        )
})





test("retains_on_trace_attribute_equal_filter", () => {
    expect(generateCode(pathToTests + "retains_on_trace_attribute_equal_filter.test.json"))
        .toBe(

        )
})


/*

test("excludes_on_trace_attribute_equal_filter", () => {
    expect(generateCode(pathToTests + "excludes_on_trace_attribute_equal_filter.test.json"))
        .toBe(

        )
})



test("retains_activity_filter", () => {
    expect(generateCode(pathToTests + "retains_activity_filter.test.json"))
        .toBe(

        )
})


test("excludes_activity_filter", () => {
    expect(generateCode(pathToTests + "excludes_activity_filter.test.json"))
        .toBe(

        )
})


 */