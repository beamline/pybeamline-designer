<script setup lang="ts">
import {Connection, Handle, HandleConnectableFunc, Position} from "@vue-flow/core";
import {useVueFlow} from "@vue-flow/core";

const { getNodes } = useVueFlow();

const props = defineProps({
  data: Object,  // This will be the 'data' property passed from the node definition
});

const hasCommonElement = (arr1: any[], arr2: any[]): boolean => {
  return arr1.some(item => arr2.includes(item));
};

const isValidConnection = (connection : Connection) : boolean => {
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
            :is-valid-connection="isValidConnection" />
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