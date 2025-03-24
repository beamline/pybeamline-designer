<script setup lang="ts">
import {Connection, Handle, HandleConnectableFunc, Position} from "@vue-flow/core";
import {useVueFlow} from "@vue-flow/core";
import {hasCommonElement} from "./node-utils.js";
import {ref} from "vue";

const { getNodes, getEdges } = useVueFlow();

const props = defineProps({
  data: Object,  // This will be the 'data' property passed from the node definition
});

const isValidConnectionStart = (connection : Connection) : boolean => {
  const nodes = getNodes.value;

  const outNode = nodes.filter(elemt => elemt.id === connection.source)[0]
  const inNode = nodes.filter(elemt => elemt.id === connection.target)[0]

  if (outNode.data.outputType.includes("any") || inNode.data.inputType.includes("any")) {
    return true
  }

  return hasCommonElement(outNode.data.outputType, inNode.data.inputType)
}

const handleConnectableOut: HandleConnectableFunc = (node, connectedEdges) => {

  const thisNode = getNodes.value.filter( abc => abc.id === node.id)[0]
  dynamicColor.value = "grey"

  if (connectedEdges.length > 0) {
    dynamicColor.value = thisNode.data.sourceHandleStyle.backgroundColor
  }
  return true
}

const dynamicColor = ref("")


</script>

<template>
  <div v-tooltip.top="props.data.error" class="startNode" :style="{borderColor : dynamicColor}">
    <p>{{ props.data.name }}</p>
    <Handle type="source" :position="Position.Right"
            :is-valid-connection="isValidConnectionStart"
            :connection-radius="30"
            :connectable="handleConnectableOut"
            :style="props.data.sourceHandleStyle"
    />
  </div>
</template>

<style scoped>
.startNode {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  color: black;
}


</style>