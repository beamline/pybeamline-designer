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
let savedFunctionName = ""
let savedFunctionBody = ""
function openEditor(){
  customEditor.value = true
  savedFunctionName = node.data.parameters.functionName
  savedFunctionBody = node.data.parameters.functionBody
};

function reset(closeCallback){
  node.data.parameters.functionName = savedFunctionName
  node.data.parameters.functionBody = savedFunctionBody
  closeCallback()
};

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
  <div v-if="node.data.name !== 'custom' && node.data.name !== 'lambda_operator'">
    <h2>Parameters</h2>
    <div v-for='(_,key) in node.data.parameters'>
      <FloatLabel v-if="node.data.required.includes(key)" variant="in" class="params">
        <InputText :id="'in_label_' + key" v-model="node.data.parameters[key]" variant="filled" style="width: 100%" :invalid="!node.data.parameters[key]"
                   v-tooltip.top="'This parameter is required'"/>
        <label :for="'in_label_' + key">{{key}}</label>
      </FloatLabel>

      <FloatLabel v-else variant="in" class="params">
        <InputText :id="'in_label_' + key" v-model="node.data.parameters[key]" variant="filled" style="width: 100%"/>
        <label :for="'in_label_' + key">{{key}}</label>
      </FloatLabel>


    </div>
  </div>
  <div v-else class="information">
    <h2>Code Editor</h2>
    <Button label="Open Function Editor" raised @click="openEditor"/>
  </div>
  <Divider/>
  <h2>Additional Information</h2>
  <p>{{node.data.hint}}</p>

  <Dialog v-model:visible="customEditor" modal header="Edit function" style="width:50rem"  >
    <template #closebutton="{closeCallback}">
      <Button @click="closeCallback" icon="pi pi-save" variant="text" severity="contrast" label="Save"/>
      <Button @click="reset(closeCallback)" icon="pi pi-times" variant="text" severity="contrast" label="Cancel"/>
    </template>
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