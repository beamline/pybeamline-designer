<template>
  <div class="mamamia">
    <!-- VueFlow Diagram -->
    <div class="flex-1">
      <VueFlow
          v-model="nodes"
          v-model:edges="edges"
          class="h-full"
          @node-click="onNodeClick"
      >      <background />
      </VueFlow>
    </div>

    <!-- Dark Overlay when sidebar is open -->
    <div
        v-if="selectedNode"
        class="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
        @click="selectedNode = null"
    ></div>

    <!-- Sidebar -->
    <transition name="slide">
      <div
          v-if="selectedNode"
          class="w-80 bg-white shadow-lg p-4 fixed right-500px top-0 h-full transition-transform width-500px height-500px"
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
    </transition>
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
  selectedNode.value = event.node;
};
</script>

<style>
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';
/* Sidebar Slide-in Animation */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
  top:0;
  right: 0;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(50%);
}
.h-full{
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left:0
}
.mamamia{
  width: 100%;
  height: 100%;

}
</style>

