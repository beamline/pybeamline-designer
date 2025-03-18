<script setup lang="ts">
import {Connection, Handle, HandleConnectableFunc, Position} from "@vue-flow/core";
import {useVueFlow} from "@vue-flow/core";
import {ref, onMounted} from "vue";
import {hasCommonElement} from "./node-utils.js";



const props = defineProps({
  data: Object,  // This will be the 'data' property passed from the node definition
});

const { getNodes, getEdges } = useVueFlow();

const isValidConnection = (connection : Connection) : boolean => {
  const nodes = getNodes.value;

  const outNode = nodes.filter(elemt => elemt.id === connection.source)[0]
  const inNode = nodes.filter(elemt => elemt.id === connection.target)[0]

  if (outNode.data.outputType.includes("any") || inNode.data.inputType.includes("any")) {
    return true
  }

  return hasCommonElement(outNode.data.outputType, inNode.data.inputType)
}

const handleConnectableIn: HandleConnectableFunc = (node, connectedEdges) => {

  const edge = getEdges.value.filter(abc => abc.target === node.id)[0]
  const thisNode = getNodes.value.filter( abc => abc.id === node.id)[0]


  //Edge has been deleted, reset the handle color back to grey
  dynamicColor.value = "grey"

  //Edge has been connected, set the handle color to the input type
  if (thisNode.data.inputType.includes("any") && edge !== undefined) {
    thisNode.data.targetHandleStyle.backgroundColor = edge.data.color;
    dynamicColor.value = edge.data.color
  }


  let count = 0;
  for (let edge of connectedEdges) {
    if (edge.target === node.id) {
      count++;
    }
  }

  return count < 1;
}

const dynamicColor = ref("")

</script>

<template>
  <div class="endNode" :style="{borderColor : dynamicColor}">
    <p>{{ props.data.name }}</p>
    <Handle type="target" :position="Position.Left"
            :connectable="handleConnectableIn"
            :is-valid-connection="isValidConnection"
            :style="props.data.targetHandleStyle"
            :connection-radius="30"
    />
  </div>
</template>

<style scoped>
.endNode {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  color: black;
}


</style>