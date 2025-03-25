<script setup lang="ts">
import {Connection, ConnectionMode, NodeChange, NodeMouseEvent, useVueFlow, VueFlow} from "@vue-flow/core";
import Background from "@/components/background.vue";
import {ref} from "vue";
import useDragAndDrop from "@/components/useDnD.js";
import {StandardNode, StartNode, EndNode, UnionNode, CustomEdge} from "@/components/graph/index.ts"
import Drawer from 'primevue/drawer';
import BlockOptions from "@/components/BlockOptions.vue";
import ActionPanel from "@/components/ActionPanel.vue";
import { MiniMap } from '@vue-flow/minimap'
import ErrorDetector from "@/components/ErrorDetector.vue";
import { ControlButton, Controls } from '@vue-flow/controls'
import Icon from "@/components/Icon.vue";
import '@vue-flow/controls/dist/style.css'

const { onDragOver, onDrop, onDragLeave } = useDragAndDrop()
const {addEdges, setViewport} = useVueFlow()
const nodes = ref ([]);
const edges = ref<CustomEdge[]>([]);

const visible = ref(false);
const selectedNodeId = ref("");
const modalRef = ref(false);

function onConnect(params : Connection) {
  const outNode = nodes.value.filter(elemt => elemt.id === params.source)[0]
  // You can generate a unique id for the new edge.
  const newEdge = {
    id: `e${params.source}-${params.target}`,
    source: params.source,
    target: params.target,
    type: 'custom',
    animated:true,
    data: { color : outNode.data.sourceHandleStyle.backgroundColor }
  };
  addEdges(newEdge);
}
// Handle node click event
const onNodeClick = (event: NodeMouseEvent) => {
  visible.value = true;
  selectedNodeId.value = event.node.id
  modalRef.value = false;
  if (event.node.data.name === "custom" || event.node.data.name === "lambda_operator") {
    modalRef.value = true;
  }
};
const onNodeRemoved = (change: NodeChange[]) => {
  if (change.length === 0) {return}
  if (change[0].type === "remove"){
    visible.value = false;
  }
}

function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}

function toggleDarkMode() {
  dark.value = !dark.value
}

const dark = ref(false)

</script>

<template>
  <VueFlow
      class="basic-flow"
      v-model:nodes="nodes"
      v-model:edges="edges"
      @node-click="onNodeClick"
      @nodesChange="onNodeRemoved"
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

    <Drawer v-model:visible="visible" :modal="modalRef" position="right" header="Block Information">
      <BlockOptions :blockId="selectedNodeId" />
    </Drawer>

    <ActionPanel/>

    <MiniMap style="background: gray;"/>
    <ErrorDetector/>
    <background />


    <Controls position="top-left" />

  </VueFlow>
</template>

<style scoped>


.basic-flow .vue-flow__controls {
  display:flex;
  flex-wrap:wrap;
  justify-content:center
}


.basic-flow .vue-flow__controls .vue-flow__controls-button svg {
  height:100%;
  width:100%
}



</style>