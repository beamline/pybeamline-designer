<script setup lang="ts">
import {Connection, Handle, HandleConnectableFunc, Position} from "@vue-flow/core";
import {useVueFlow} from "@vue-flow/core";
import {ref, onMounted} from "vue";
import {hasCommonElement, handleConnectableIn} from "./node-utils.js";


const props = defineProps({
  data: Object,  // This will be the 'data' property passed from the node definition
});

const { getNodes } = useVueFlow();

const isValidConnection = (connection : Connection) : boolean => {
  const nodes = getNodes.value;

  const outNode = nodes.filter(elemt => elemt.id === connection.source)[0]
  const inNode = nodes.filter(elemt => elemt.id === connection.target)[0]

  if (outNode.data.outputType.includes("any") || inNode.data.inputType.includes("any")) {
    return true
  }

  return hasCommonElement(outNode.data.outputType, inNode.data.inputType)
}


const color = ref('red'); // Initial color

/*
onMounted(() => {
  let index = 0;
  setInterval(() => {
    const colors = ['red', 'blue', '#90EE90'];
    color.value = colors[index];
    index = (index + 1) % colors.length;
  }, 1000); // Change color every second
});
*/


</script>

<template>
  <div class="endNode">
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
  color: blue;
}
/*
.animated-handle {
  transition: background-color 0.5s linear;
}
*/

</style>