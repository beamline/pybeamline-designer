<script setup lang="ts">
import {useVueFlow, Panel} from "@vue-flow/core";
import Menubar from 'primevue/menubar';
import arturoBullshit from "@/componentsPrime/ArturoBullshit.js";

import {ref} from "vue";
import Drawer from "primevue/drawer";
import BlockOptions from "@/componentsPrime/BlockOptions.vue";
import CodeGeneratorEditor from "@/componentsPrime/CodeGeneratorEditor.vue";
const visible = ref(false);
const editor = ref("");

const {showCode,clearDesign,downloadPipeline,triggerFileSelection,handleFileSelection} = arturoBullshit(visible, editor)

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
        accept=".json"
    />
  </Panel>

  <Drawer v-model:visible="visible" modal position="right" header="Code generated" style="width: 600px">
    <CodeGeneratorEditor :codeGenerated="editor"/>
  </Drawer>
</template>

<style scoped>

.panel{
  width: 640px;
  left:40%
}
</style>