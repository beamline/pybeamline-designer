<script setup lang="ts">
import {Connection, ConnectionMode, NodeChange, NodeMouseEvent, VueFlow} from "@vue-flow/core";
import Background from "@/components/background.vue";
import {ref} from "vue";
import useDragAndDrop from "@/components/useDnD.js";
import {StandardNode, StartNode, EndNode, UnionNode, CustomEdge} from "@/components/graph/index.ts"
import Drawer from 'primevue/drawer';
import BlockOptions from "@/components/BlockOptions.vue";
import ActionPanel from "@/components/ActionPanel.vue";
import { MiniMap } from '@vue-flow/minimap'



const { onDragOver, onDrop, onDragLeave } = useDragAndDrop()
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
  edges.value.push(newEdge);
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
  if (change[0].type === "remove"){
    visible.value = false;
  }
}


</script>

<template>
  <VueFlow
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
    <background />

  </VueFlow>
</template>

<style scoped>

</style>