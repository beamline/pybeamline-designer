<script setup lang="ts">
import {Handle, HandleConnectableFunc, Position} from "@vue-flow/core";
import * as string_decoder from "node:string_decoder";


const props = defineProps({
  id : String,
  data: Object,  // This will be the 'data' property passed from the node definition
});



</script>

<template>
  <div class="standardNode">
    <p>{{ props.data.name }}</p>
    <Handle type="source" :position="Position.Right"  />
    <Handle type="target" :position="Position.Left"/>
  </div>
</template>

<style scoped>
.standardNode {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  color: crimson;
}
</style>