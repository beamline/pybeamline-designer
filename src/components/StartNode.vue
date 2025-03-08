<script setup lang="ts">
import {Handle, Position} from "@vue-flow/core";
import {defaultAllowedOrigins} from "vite";


const props = defineProps({
  data: Object,  // This will be the 'data' property passed from the node definition
});



</script>

<template>
  <div class="startNode">
    <p>{{ props.data.name }}</p>
    <p id="hasParams" v-if="data && data.parameters !== {}">!!!</p>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>

<style scoped>
.startNode {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  color: darkviolet;
}

#hasParams {
  color: crimson;
}
</style>