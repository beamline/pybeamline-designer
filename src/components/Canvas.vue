<template>
  <div class="main">
    <!-- VueFlow Diagram -->
    <div>
      <VueFlow
          v-model="nodes"
          v-model:edges="edges"
          class="canva"
          @node-click="onNodeClick"
      >
        <background />
      </VueFlow>
    </div>

    <div
        v-if="selectedNode"
        class="optionTab"
    >
      <button class="absolute top-2 right-2 text-xl" @click="selectedNode = null">
        ✖
      </button>
      <h2 class="text-xl font-bold mb-2">Node Details</h2>

      <!-- Editable Field -->
      <label class="block font-semibold">Label:</label>
      <input
          v-model="selectedNode.data.parameter1"
          class="border rounded w-full p-2 mt-1"
      />

      <label class="block font-semibold">Parameter2:</label>

      <input
          v-model="selectedNode.data.paramater2"
          class="border rounded w-full p-2 mt-1"
      />
      <p><strong>Type:</strong> {{ selectedNode.type }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { VueFlow } from "@vue-flow/core";
import Background from "@/components/Background.vue";

// Example nodes and edges
const nodes = ref([
  { id: "1", type: "default", position: { x: 100, y: 100 }, data: { parameter1: "Node 1", parameter2: "papaya" , label: "node 1"} },
  { id: "2", type: "default", position: { x: 300, y: 100 }, data: { parameter1: "Node 2" ,paramater2: "jolines", label: "node 2"} },
]);

const edges = ref([{ id: "e1-2", source: "1", target: "2" }]);

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

