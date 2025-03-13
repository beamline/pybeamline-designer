<script setup lang="ts">
import {Translator} from "@/logic/Translator.js";
import {ref} from "vue";
import {generateCode} from "@/logic/codeGenerator.js";
import {useVueFlow, Panel} from "@vue-flow/core";

const {nodes, edges}=useVueFlow()

const translator = new Translator();

const editor = ref("");

function showCode() {
  editor.value = generateCode(translator.getGuiPipelineFromVue(nodes.value,  edges.value));
  console.log(editor.value);
}

function clearDesign() {
  edges.value = [];
  nodes.value = [];
  closeEditor();

}

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
  <Panel class="main" position="top-left">
    <button class= "button" @click="showCode">generate code</button>
    <button class= "button" @click="clearDesign">Clear All</button>
  </Panel>

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
  width: 30%;
  height: 100%;
  background: gray;
  position: fixed;
  right:0;
  z-index:5;
}
.button{
  flex-grow: 1;
  padding: 20px;
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