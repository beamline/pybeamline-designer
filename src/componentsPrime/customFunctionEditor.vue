<script setup lang="ts">
import {GraphNode, useVueFlow} from "@vue-flow/core";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python";
import Divider from 'primevue/divider';
import { basicSetup } from "codemirror";

const {nodes} = useVueFlow()
const props = defineProps({
  blockId: String
})
const node: GraphNode | undefined = nodes.value.find(node => node.id === props.blockId)

</script>

<template>
  <FloatLabel variant="in">
    <InputText id="function_name" v-model="node.data.parameters.functionName" variant="filled" style="width: 100%"/>
    <label for="function_name">Function name</label>
  </FloatLabel>
  <Divider/>
  <codemirror
      v-model="node.data.parameters.functionBody"
      :extensions="[python(), basicSetup]"
      :style="{ height: '500px', border: '1px solid #ddd' }"
      :autofocus="true"
      :placeholder="'def '+ node.data.parameters.functionName+ '():'"
  />


</template>

<style scoped>

</style>