<script setup lang="ts">
import {Connection, GraphEdge, Handle, HandleConnectableFunc, Position, useVueFlow} from "@vue-flow/core";
import {hasCommonElement, isConnectedToAncestors} from "@/components/graph/nodes/node-utils.js";
import {ref} from "vue";
const {getNodes, getEdges} = useVueFlow();


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

  return hasCommonElement(outNode.data.outputType, inNode.data.inputType)
}


const handleConnectableIn: HandleConnectableFunc = (node, connectedEdges) => {

  const thisNode = getNodes.value.filter( abc => abc.id === node.id)[0]

  dynamicColor1.value = "grey"
  dynamicColor2.value = "grey"

  for (let edge of connectedEdges) {
    if (edge.source === node.id) {
      dynamicColor2.value = thisNode.data.sourceHandleStyle.backgroundColor
    }
    if (edge.target === node.id) {
      dynamicColor1.value = thisNode.data.targetHandleStyle.backgroundColor
    }
  }

  return true
}

const dynamicColor1 = ref("grey");
const dynamicColor2 = ref("grey");

</script>

<template>
  <div v-tooltip="props.data.error" class="unionNode" :style="{ borderRadius: '5px',
       borderImage: `linear-gradient(to right, ${dynamicColor1}, ${dynamicColor2}) 1`,
       }">
    <p>{{ props.data.name }}</p>
    <Handle type="source" :position="Position.Right" :is-valid-connection="isValidConnection"
            :connectable="handleConnectableIn"
            :style="props.data.sourceHandleStyle"
            :connection-radius="30"
    />
    <Handle type="target" :position="Position.Left" :is-valid-connection="isValidConnection"
            :connectable="handleConnectableIn"
            :style="props.data.targetHandleStyle"
            :connection-radius="30"

    />
  </div>
</template>

<style scoped>
.unionNode {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  color: black;
}
</style>