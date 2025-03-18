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
        <div
            v-if="selectedNode"
            class="optionTab" >
          <BlockSidebar v-model="selectedNode" />
        </div>
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
        <ErrorDetector/>

      </VueFlow>
    </div>



  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useVueFlow, VueFlow} from "@vue-flow/core";
import Background from "@/components/Background.vue";
import StandardNode from "./graph/nodes/StandardNode.vue";
import StartNode from "./graph/nodes/StartNode.vue";
import EndNode from "./graph/nodes/EndNode.vue";
import CustomEdge from "@/components/graph/edges/CustomEdge.vue";
import {Connection, ConnectionMode} from "@vue-flow/core";
import UnionNode from "@/components/graph/nodes/UnionNode.vue";
import BlockSidebar from "@/components/BlockSidebar.vue";
import useDragAndDrop from './useDnD.ts'
import OptionsPanel from "@/components/OptionsPanel.vue";
import ErrorDetector from "@/components/ErrorDetector.vue";

const {getNodes} = useVueFlow();

function onConnect(params : Connection) {
  // You can generate a unique id for the new edge.
  const nodes = getNodes.value;
  const outNode = nodes.filter(elemt => elemt.id === params.source)[0]

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




const { onDragOver, onDrop, onDragLeave } = useDragAndDrop()
const {removeSelectedElements, getSelectedElements} = useVueFlow()

// Example nodes and edges
const nodes = ref ([]);

const edges = ref<CustomEdge[]>([]);

const selectedNode = ref(null);

// Handle node click event
const onNodeClick = (event) => {
  if (selectedNode.value === event.node){
    removeSelectedElements()
    selectedNode.value = null;
  }else{
    selectedNode.value = event.node;

  }
};
watch(getSelectedElements, (newValue, oldValue) => {
  if (newValue.length === 0) {
    selectedNode.value = null;
  }
});

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
  z-index:5;
}
</style>

