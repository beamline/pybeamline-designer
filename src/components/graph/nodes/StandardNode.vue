<script setup lang="ts">
import {Connection, Handle, HandleConnectableFunc, Position, useVueFlow} from "@vue-flow/core";
const {getNodes, getEdges} = useVueFlow();
import {hasCommonElement, isConnectedToAncestors, handleConnectableIn} from "./node-utils.js";

const props = defineProps({
  data: Object,  // This will be the 'data' property passed from the node definition
});



const isValidConnection = (connection : Connection) : boolean => {
  const nodes = getNodes.value;

  const outNode = nodes.filter(elemt => elemt.id === connection.source)[0]
  const inNode = nodes.filter(elemt => elemt.id === connection.target)[0]


  if ((outNode.id === inNode.id)) {
    return false;
  }

  if (isConnectedToAncestors(connection, getEdges.value, outNode.id )) {
    return false
  }

  if (outNode.data.outputType.includes("any") || inNode.data.inputType.includes("any")) {
    return true
  }

  return hasCommonElement(outNode.data.outputType, inNode.data.inputType) && (connection.target !== connection.source)
}


</script>

<template>
  <div class="standardNode">
    <p>{{ props.data.name }}</p>
    <Handle type="source" :position="Position.Right"
            :is-valid-connection="isValidConnection"
            :style="props.data.sourceHandleStyle"
            :connection-radius="30"
    />
    <Handle type="target" :position="Position.Left"
            :connectable="handleConnectableIn"
            :is-valid-connection="isValidConnection"
            :style="props.data.targetHandleStyle"
            :connection-radius="30"
    />
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