import { CodeGen } from "../codeGen.ts"
import { expect, test} from '@jest/globals';

//Testing requires an absolute path or else it will not work


const codeGenerator : CodeGen = new CodeGen("src/logic/tests/test1.json");

test("Test 1: Source -> Sink", () => {

    codeGenerator.traverseDiagram()
    expect(codeGenerator.returnCode())
            .toBe(
                `source_0 = string_test_source(iterable = ['A', 'B', 'C'])
source_0.pipe(
).subscribe(on_next = lambda x : print(str(x)))`
            )
})




