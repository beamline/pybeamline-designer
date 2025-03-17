<script setup lang="ts">
import {Translator} from "@/logic/Translator.js";
import {ref} from "vue";
import {generateCode} from "@/logic/codeGenerator.js";
import {useVueFlow, Panel} from "@vue-flow/core";

const {nodes, edges, setNodes, setEdges }=useVueFlow()

const translator = new Translator();

const editor = ref("");

function showCode() {
  editor.value = generateCode(translator.getGuiPipelineFromVue(nodes.value,  edges.value));
}

function clearDesign() {
  edges.value = [];
  nodes.value = [];
  closeEditor();

}

const downloadPythonFile = () => {
  const blob = new Blob([editor.value], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "script.py";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  editor.value=""
};

const downloadPipeline = () => {
  const graphData = {
    nodes : nodes.value,
    edges : edges.value
  }
  //pretty prints the json
  const json = JSON.stringify(graphData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); // Create a URL for the Blob
  a.download = 'pybeamline-design.json'; // Set the download file name
  a.click();
}

const closeEditor = () => {
  editor.value=""
}


const fileInput = ref<HTMLInputElement | null>(null);

//acts like the user clicking the hidden input to show file selection
const triggerFileSelection = () => {
  fileInput.value?.click();
};

const handleFileSelection = (event: Event) => {
  console.log("here")
  const input = event.target as HTMLInputElement;
  let file = input.files?.[0];
  if (file) {
    console.log('File selected:', file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      const json = e.target?.result as string;

      try {
        // Parse the JSON string into an object
        const data = JSON.parse(json);

        // Assuming the structure of your JSON contains 'nodes' and 'edges'
        if (data.nodes && data.edges) {
          // Set the new nodes and edges into VueFlow's state
          setNodes(data.nodes);
          setEdges(data.edges);
          input.value = '';
        } else {
          alert('Invalid JSON structure. Expected "nodes" and "edges" properties.');
        }
      } catch (err) {
        alert('Error parsing JSON. Please make sure the file is valid.');
      }
    };

    // Read the file as text (this will trigger the onload event)
    reader.readAsText(file);
  }

};


</script>

<template>
  <Panel class="main" position="top-left">
    <button class= "button" @click="showCode">generate code</button>
    <button class= "button" @click="clearDesign">Clear All</button>
    <button class= "button" @click="downloadPipeline">download pipeline</button>
    <button class= "button" @click="triggerFileSelection">load pipeline</button>
    <input
        type="file"
        ref="fileInput"
        style="display: none;"
        @change="handleFileSelection"
        accept=".json"
    />
  </Panel>

  <div
      v-if="editor"
      class="optionTab" >
    <button @click="closeEditor">Cancel</button>
    <button @click="downloadPythonFile">Download</button>
    <textarea v-model="editor" class="code-box" spellcheck="false"></textarea>

  </div>
</template>

<style scoped>

.main{
  display: flex;
}
.optionTab{
  width: 30%;
  height: 100%;
  background: gray;
  position: fixed;
  right:0;
  z-index:5;
}
.button{
  flex-grow: 1;
  padding: 20px;
}

.code-box {
  width: 100%;
  height: 100%;
  font-family: monospace;
  background-color: #1e1e1e;
  color: #dcdcdc;
  border: 1px solid #444;
  padding: 10px;
  resize: none;
  white-space: pre;
  overflow: auto;
}

</style>