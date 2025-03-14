<script setup lang="ts">
import {Connection, GraphEdge, Handle, Position, useVueFlow} from "@vue-flow/core";
const {getNodes, getEdges} = useVueFlow();




const props = defineProps({
  id : String,
  data: Object,  // This will be the 'data' property passed from the node definition
});


const hasCommonElement = (arr1: any[], arr2: any[]): boolean => {
  return arr1.some(item => arr2.includes(item));
};

function isConnectedToAncestors (connection : Connection, edges : GraphEdge[], currNodeId : string) {
  const directAncestorIds = edges.filter(edge => edge.target == currNodeId).map(edges => edges.source);

  if (directAncestorIds.includes(connection.target)) {
    return true;
  } else {
    const boolArr : boolean[] = directAncestorIds.map(nodeId => isConnectedToAncestors(connection,  edges,  nodeId));
    return boolArr.includes(true);
  }
}

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


</script>

<template>
  <div class="standardNode">
    <p>{{ props.data.name }}</p>
    <Handle type="source" :position="Position.Right" :is-valid-connection="isValidConnection"
            :style="{backgroundColor : props.data.sourceColor, width:'10px', height:'10px'}"
            :connection-radius="30"
    />
    <Handle type="target" :position="Position.Left" :is-valid-connection="isValidConnection"
            :style="{backgroundColor : props.data.targetColor, width:'10px', height:'10px'}"
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