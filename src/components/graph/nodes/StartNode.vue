<script setup lang="ts">
import {Connection, Handle, Position} from "@vue-flow/core";
import {useVueFlow} from "@vue-flow/core";
import {hasCommonElement} from "./node-utils.js";

const { getNodes } = useVueFlow();

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


</script>

<template>
  <div class="startNode">
    <p>{{ props.data.name }}</p>
    <Handle type="source" :position="Position.Right"
            :is-valid-connection="isValidConnectionStart"
            :connection-radius="30"
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
  color: darkviolet;
}


</style>