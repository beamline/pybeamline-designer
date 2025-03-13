<template>
  <div class="main">
    <!-- VueFlow Diagram -->
    <div>
      <div class="main">
        <button @click="showCode">generate code</button>
        <button @click="clearDesign">Clear All</button>
      </div>

      <div
          v-if="editor"
          class="optionTab" >
        <button @click="closeEditor">Cancel</button>
        <button @click="downloadPythonFile">Download</button>
        <textarea v-model="editor" class="code-box" spellcheck="false"></textarea>

      </div>
      <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          class="canva"
          @node-click="onNodeClick"
          :connection-mode="ConnectionMode.Strict"
          @connect="onConnect"
          @dragover="onDragOver"
          @dragleave="onDragLeave"
          @drop="onDrop"
          :connection-radius="20"
      >
        <template #edge-custom="customEdgeProps">
          <CustomEdge v-bind="customEdgeProps" />
        </template>
        <template #node-standard="props">
          <StandardNode v-bind="props" />
        </template>
        <template #node-start="props">
          <StartNode v-bind="props" />
        </template>
        <template #node-end="props">
          <EndNode v-bind="props" />
        </template>
        <template #node-union="props">
          <UnionNode v-bind="props" />
        </template>
        <background />

      </VueFlow>
    </div>

    <div
        v-if="selectedNode"
        class="optionTab" >
      <BlockSidebar v-model="selectedNode" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VueFlow } from "@vue-flow/core";
import Background from "@/components/Background.vue";
import StandardNode from "./StandardNode.vue";
import StartNode from "./StartNode.vue";
import EndNode from "./EndNode.vue";
import CustomEdge from "@/components/CustomEdge.vue";
import {CustomData} from "@/components/edges.js";
import {Connection, ConnectionMode} from "@vue-flow/core";
import {GuiBlock, GuiPipeline} from "@/logic/Syntax.js";
import UnionNode from "@/components/UnionNode.vue";
import BlockSidebar from "@/components/BlockSidebar.vue";
import useDragAndDrop from './useDnD.ts'
import {Translator} from "@/logic/Translator.js";
import {generateCode} from "@/logic/codeGenerator.js";

function onConnect(params : Connection) {
  // You can generate a unique id for the new edge.
  const newEdge = {
    id: `e${params.source}-${params.target}`,
    source: params.source,
    target: params.target,
    type: 'custom',
    animated:true
  };
  edges.value.push(newEdge);
}

const translator = new Translator();

const editor = ref("");

function showCode() {
  editor.value = generateCode(translator.getGuiPipelineFromVue(nodes.value,  edges.value));
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


const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

// Example nodes and edges
const nodes = ref ([]);

const edges = ref<CustomEdge[]>([]);

const selectedNode = ref(null);

// Handle node click event
const onNodeClick = (event) => {
  if (selectedNode.value === event.node){
    selectedNode.value = null;
  }else{
    selectedNode.value = event.node;

  }
};

</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';


.canva{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
}
.main{
  width: 100%;
  height: 100%;

}
.optionTab{
  width: 30%;
  height: 100%;
  background: gray;
  position: fixed;
  right:0;
  z-index:1;
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

