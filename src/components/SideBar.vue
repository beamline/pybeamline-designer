<script setup lang="ts">
import { ref, onMounted } from "vue";
const jsonByFolder = ref({});
const namesType = ref([])
const show = ref (false)

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
        <div class="options">{{ jsonNames }}</div>
      </div>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 150px;
  background-color: #333;
  color: white;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
}
.subsidebar{
  width: 350px;
  background-color: #333;
  color: white;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 150px;
  padding: 20px;
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