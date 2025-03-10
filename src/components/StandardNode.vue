<script setup lang="ts">
import {Handle, HandleConnectableFunc, Position} from "@vue-flow/core";



const props = defineProps({
  id : String,
  data: Object,  // This will be the 'data' property passed from the node definition
});


const handleConnectableIn: HandleConnectableFunc = (node, connectedEdges) => {
  let count = 0;
  for (let edge of connectedEdges) {
    if (edge.target === node.id) {
      count++;
    }
  }
  return count < 1;

}

</script>

<template>
  <div class="standardNode">
    <p>{{ props.data.name }}</p>
    <Handle type="source" :position="Position.Right" />
    <Handle type="target" :position="Position.Left" :connectable="handleConnectableIn"/>
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