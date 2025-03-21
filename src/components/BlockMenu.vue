
<script setup lang="ts">
import TieredMenu from 'primevue/tieredmenu';
import {ref, onMounted, Ref} from "vue";

const items: Ref<{ label: string; icon: string; items: any; }[]> = ref([])

// Load all JSON files dynamically
const loadJSONs = async () => {
  const files = import.meta.glob(["/src/logic/schemas/**/*.json"]); // Match JSONs inside subfolders
  const groupedFiles: {string:string[]} = {};

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

  createItems(groupedFiles)
};

function createItems(groupedFiles: {string:string[]}) {
  for (const folder in groupedFiles) {
    items.value.push({
      label: folder,
      icon: 'pi pi-folder',
      items: groupedFiles[folder].map((item:string) => ({
        label: item,
        icon: 'pi pi-box',
        parent: folder
      }))
    })
  }
}

onMounted(() => {
  loadJSONs();
});

import useDragAndDrop from './useDnD.js'
const { onDragStart } = useDragAndDrop()
</script>

<template>
  <div class="menu-container">
    <TieredMenu :model="items" style="height: 100%; padding: 5px; border-radius: 0" >
        <template #item="{ item, props, hasSubmenu }" >
          <a class="flex items-center" v-bind="props.action" draggable="true" @dragstart="onDragStart($event, item.label, item.parent)">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" class="ml-auto pi pi-angle-right"></i>
          </a>
        </template>
    </TieredMenu>
  </div>
</template>

<style scoped>
.menu-container {
  height: 100vh; /* Make sure the parent container is full height */
  display: flex;
  flex-direction: column;
}
</style>