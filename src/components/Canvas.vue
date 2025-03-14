<template>
  <div class="main">
    <!-- VueFlow Diagram -->
    <div>
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
        <OptionsPanel/>
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
import StandardNode from "./graph/StandardNode.vue";
import StartNode from "./graph/StartNode.vue";
import EndNode from "./graph/EndNode.vue";
import CustomEdge from "@/components/graph/CustomEdge.vue";
import {Connection, ConnectionMode} from "@vue-flow/core";
import UnionNode from "@/components/graph/UnionNode.vue";
import BlockSidebar from "@/components/BlockSidebar.vue";
import useDragAndDrop from './useDnD.ts'
import OptionsPanel from "@/components/OptionsPanel.vue";



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




const { onDragOver, onDrop, onDragLeave } = useDragAndDrop()

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
  width: 90%;
  height: 90%;
  position: fixed;
  z-index: 0;
}
.optionTab{
  width: 30%;
  height: 100%;
  background: gray;
  position: fixed;
  right:0;
  z-index:1;
}
</style>

