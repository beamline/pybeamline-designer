<template>
  <div class="main">
    <!-- VueFlow Diagram -->
    <div>
      <VueFlow
          v-model="nodes"
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

import BlockSidebar from "@/components/BlockSidebar.vue";
import useDragAndDrop from './useDnD.ts'

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

// Example nodes and edges
const nodes = ref ([
  ]);

const edges = ref<CustomEdge[]>([
]);

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
  right:0

}
</style>

