<script setup lang="ts">
import {Connection, Handle, HandleConnectableFunc, Position, useVueFlow} from "@vue-flow/core";
const {getNodes, getEdges} = useVueFlow();
import {hasCommonElement, isConnectedToAncestors} from "./node-utils.js";
import {ref} from "vue";

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


const handleConnectableIn: HandleConnectableFunc = (node, connectedEdges) => {

  const thisNode = getNodes.value.filter( abc => abc.id === node.id)[0]

  dynamicColor1.value = "grey"
  dynamicColor2.value = "grey"

  let count = 0;
  for (let edge of connectedEdges) {


    if (edge.source === node.id) {
      dynamicColor2.value = thisNode.data.sourceHandleStyle.backgroundColor
    }

    if (edge.target === node.id) {
      dynamicColor1.value = thisNode.data.targetHandleStyle.backgroundColor
      count++;
    }
  }

  return count < 1;
}

const dynamicColor1 = ref("grey");
const dynamicColor2 = ref("grey");

</script>

<template>
  <div v-tooltip.top="props.data.error" class="standardNode"
       :style="{ borderRadius: '5px',
       borderImage: `linear-gradient(to right, ${dynamicColor1}, ${dynamicColor2}) 1`,
       }">
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
  color: black;
}



</style>