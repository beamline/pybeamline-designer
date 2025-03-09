<script setup lang="ts">
import { ref, onMounted } from "vue";
const jsonByFolder = ref({});
const namesType = ref([])
const show = ref (false)

import useDragAndDrop from './useDnD.js'

const { onDragStart } = useDragAndDrop()

// Load all JSON files dynamically
const loadJSONs = async () => {
  const files = import.meta.glob(["/src/logic/schemas/**/*.json"]); // Match JSONs inside subfolders
  const groupedFiles = {};

  for (const path in files) {
    if ((path.includes("definitions")) || path.includes("main")){
      continue
    }
    const module = await files[path](); // Load the JSON dynamically
    const parts = path.split("/"); // Split path to extract folder
    const folderName = parts[parts.length - 2]; // Get the folder name (second last part)

    if (!groupedFiles[folderName]) {
      groupedFiles[folderName] = [];
    }

    groupedFiles[folderName].push(module.properties.descriptors.properties.name.const); // Add JSON name to the corresponding folder
  }

  jsonByFolder.value = groupedFiles;
};

function click_handler(jsonNames: string[]){
  if ( namesType.value == jsonNames){  show.value = !show.value} else{
    namesType.value = jsonNames
    show.value = true
  }

  }

onMounted(() => {
  loadJSONs();
});
</script>

<template>
  <div class="main">
    <div class="sidebar">
      <ul>
        <div v-for="(jsonNames, folder) in jsonByFolder" :key="folder" @click="click_handler(jsonNames)">
          <div class="options">{{ folder }}</div>
        </div>
      </ul>
    </div>
    <div class="subsidebar" v-if="show">
      <ul>
        <div v-for="(jsonNames) in namesType">
          <div class="options" :draggable="true" @dragstart="onDragStart($event, 'start')">{{ jsonNames }}</div>
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex; /* Align children horizontally */
  height: 100%;
}

.sidebar {
  width: 100%; /* Set a fixed width */
  background-color: #2d3748;
  color: white;
  padding: 10px;
}

.subsidebar {
  width: 100%; /* Set a fixed width */
  background-color: #4a5568;
  color: white;
  padding: 10px;
}
.options{
  display: flex;
  padding: 10px;
  background-color: #444;
  margin: 5px 0;
  border-radius: 4px;
  cursor: pointer;
}
.options:hover{
  background-color: #555;
}
</style>