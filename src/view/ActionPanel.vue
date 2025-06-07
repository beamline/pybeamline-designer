<script setup lang="ts">
import { Panel} from "@vue-flow/core";
import Menubar from 'primevue/menubar';
import {ref} from "vue";
import Drawer from "primevue/drawer";
import CodeGeneratorEditor from "@/view/CodeGeneratorEditor.vue";
import actionPanelFunctions from "@/controller/actionPanelFunctions.js";
const visible = ref(false);
const editor = ref("");
const fileInput = ref<HTMLInputElement | null>(null);


const {showCode,clearDesign,downloadPipeline,triggerFileSelection,handleFileSelection} = actionPanelFunctions(visible, editor, fileInput)

const items = ref([
  {
    label: 'Generate Code',
    icon: 'pi pi-sparkles',
    command: showCode,
  },
  {
    label: 'Clear all',
    icon: 'pi pi-trash',
    command: clearDesign,
  },
  {
    label: 'Download Pipeline',
    icon: 'pi pi-download',
    command: downloadPipeline,
  },
  {
    label: 'Upload Pipeline',
    icon: 'pi pi-upload',
    command: triggerFileSelection,
  }
]);
</script>


<template>
  <Panel  class="panel" position="top-center">
    <Menubar :model="items"/>
    <input
        type="file"
        ref="fileInput"
        style="display: none;"
        @change="handleFileSelection"
        accept=".pdb"
    />
  </Panel>

  <Drawer v-model:visible="visible" modal position="right" header="Code generated" style="width: 400px">
    <CodeGeneratorEditor :codeGenerated="editor"/>
  </Drawer>
</template>

<style scoped>

.panel{
  width: 640px;
  left:40%
}
</style>