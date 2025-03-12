<script setup lang="ts">
import {ref} from "vue";
import {generateCode} from "@/logic/codeGenerator.js";
import {useVueFlow} from "@vue-flow/core";


const editor = ref("");

// Handle node click event
const showCode = () => {
  //editor.value = generateCode("bla bla bla")
  editor.value = `source_0 = string_test_source(iterable = ['A', 'B', 'C'])
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
};

const downloadPythonFile = () => {
  const blob = new Blob([editor.value], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "script.py";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  editor.value=""
};

const closeEditor = () => {
  editor.value=""
}



</script>

<template>
  <div class="main">
    <button @click="showCode">generate code</button>
  </div>

  <div
      v-if="editor"
      class="optionTab" >
    <button @click="closeEditor">Cancel</button>
    <button @click="downloadPythonFile">Download</button>
    <textarea v-model="editor" class="code-box" spellcheck="false"></textarea>

  </div>

</template>

<style scoped>

.main{
  display: flex;
}
.optionTab{
  width: 50%;
  height: 100%;
  background: gray;
  position: fixed;
  right:0

}

.code-box {
  width: 100%;
  height: 100%;
  font-family: monospace;
  background-color: #1e1e1e;
  color: #dcdcdc;
  border: 1px solid #444;
  padding: 10px;
  resize: none;
  white-space: pre;
  overflow: auto;
}
</style>