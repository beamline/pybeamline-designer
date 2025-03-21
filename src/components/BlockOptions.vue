<script setup lang="ts">
import {GraphNode, useVueFlow} from "@vue-flow/core";
import InputText from 'primevue/inputtext';
import FloatLabel from "primevue/floatlabel";
import Divider from 'primevue/divider';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import CustomFunctionEditor from "@/components/customFunctionEditor.vue";

import {ref} from "vue";

const customEditor=ref(false)
const {nodes} = useVueFlow()
const props = defineProps({
  blockId: String,
})

const node: GraphNode | undefined = nodes.value.find(node => node.id === props.blockId)


</script>

<template>
  <Divider/>
  <div class="information">
    <h2>General information</h2>
    <p>Block name:</p>
    <Chip style="width: fit-content; border-radius: 3px" :label="node.data.name" />

    <div v-for="type in node.data.inputType">
      <p>Input type:</p>
      <Chip style="width: fit-content" :label="type" />
    </div>

    <div v-for="type in node.data.outputType">
      <p>Output type:</p>
      <Chip style="width: fit-content" :label="type" />
    </div>

  </div>
  <Divider/>
  <div v-if="node.data.name !== 'custom'">
    <h2>Parameters</h2>
    <div v-for='(_,key) in node.data.parameters'>
      <FloatLabel variant="in" class="params">
        <InputText :id="'in_label_' + key" v-model="node.data.parameters[key]" variant="filled" style="width: 100%"/>
        <label :for="'in_label_' + key">{{key}}</label>
      </FloatLabel>
    </div>
  </div>
  <div v-else class="information">
    <h2>Code Editor</h2>
    <Button label="Open Function Editor" raised @click="customEditor = true"/>
  </div>
  <Divider/>
  <h2>Additional Information</h2>
  <p>{{node.data.hint}}</p>

  <Dialog v-model:visible="customEditor" modal header="Edit function" style="width:50rem"  >
    <CustomFunctionEditor :blockId="blockId"/>
  </Dialog>
</template>

<style scoped>
.params{
  padding-bottom: 10px;
}
.information{
  display: flex;
  flex-direction: column;
  gap: 5px;
}


</style>