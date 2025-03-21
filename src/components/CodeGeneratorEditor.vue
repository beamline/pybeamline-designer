<script setup lang="ts">
import {ref} from "vue";
import {python} from "@codemirror/lang-python";
import {basicSetup} from "codemirror";
import {Codemirror} from "vue-codemirror";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import CodeEditor from "@/components/CodeEditor.vue";

const props = defineProps({
  codeGenerated: String,
})
const code = ref(props.codeGenerated);
const codeEditor=ref(false)

const downloadPythonFile = () => {
  const blob = new Blob([code.value], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "script.py";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  code.value=""
};

</script>

<template>
  <div class="main">
    <div class="buttons">
      <Button label="Download Code" icon="pi pi-cloud-download" raised @click="downloadPythonFile"/>
      <Button label="Expand Editor" icon="pi pi-pen-to-square" raised @click="codeEditor=true"/>
    </div>
    <codemirror
        v-model="code"
        :extensions="[python(), basicSetup]"
        :style="{ height:'80vh' , border: '1px solid #ddd' }"
        :autofocus="true"
    />
  </div>

  <Dialog v-model:visible="codeEditor" modal header="Edit code" style="width:50rem"  >
    <CodeEditor v-model="code"/>
  </Dialog>
</template>

<style scoped>
.main{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.buttons{
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.buttons > * {
  flex: 1; /* Ensures all components take up equal space */
}
</style>