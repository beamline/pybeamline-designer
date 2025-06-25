<script setup lang="ts">
import TieredMenu from 'primevue/tieredmenu';
import { ref, onMounted, Ref } from "vue";
import { Panel } from "@vue-flow/core";
import ProgressSpinner from 'primevue/progressspinner';
import useDragAndDrop from '../controller/useDnD.js';

const { onDragStart, onClickAdd } = useDragAndDrop()

const items: Ref<{ label: string; icon: string; items: any; }[]> = ref([])
const loading = ref(true);

// Load all JSON files dynamically
const loadJSONs = async () => {
	const files = import.meta.glob(["/src/model/schemas/**/*.json"]); // Match JSONs inside subfolders
	const groupedFiles: { [key: string]: string[] } = {};

	for (const path in files) {
		if ((path.includes("definitions")) || path.includes("main")) {
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

	createItems(groupedFiles);
	loading.value = false;
};

function createItems(groupedFiles: { [key: string]: string[] }) {
	for (const folder in groupedFiles) {

		let folderIcon = 'pi pi-folder'
		let itemIcon = 'pi pi-box';

		switch (folder) {
			case "filters":
				folderIcon = 'pi pi-filter'
				break;
			case "algorithms":
				folderIcon = 'pi pi-hammer'
				break;
			case "mappers":
				folderIcon = 'pi pi-eye'
				break;
			case "sources":
				folderIcon = 'pi pi-plus-circle'
				break;
			case "sinks":
				folderIcon = 'pi pi-minus-circle'
				break;
			case "utilities":
				folderIcon = 'pi pi-cog'
				break;
			default:
				break;
		}


		items.value.push({
			label: folder,
			icon: folderIcon,
			items: groupedFiles[folder].map((item: string) => ({
				label: item,
				icon: itemIcon,
				parent: folder,
				command: (event: any) => {
					onClickAdd(event, item)
				}
			}))
		})
	}
}

onMounted(() => {
	loadJSONs();
});


</script>

<template>
	<Panel class="menu-container" position="top-left">
		<div v-if="loading" class="loading-menu-item" style="padding: 5px; border-radius: 10px;">
			<div class="p-menu p-component">
				<ul class="p-menu-list p-reset">
					<li class="p-menuitem">
						<div class="p-menuitem-content" style="padding: 25px 5px; text-align: center;">
							<ProgressSpinner style="width: 25px; height: 25px" />
							<br>
							<span style="color: gainsboro">Loading menu...</span>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<TieredMenu v-else :model="items" style="height: 100%; padding: 5px; border-radius: 10px">
			<template #item="{ item, props, hasSubmenu }">
				<a class="flex items-center" v-bind="props.action" :draggable="!!item.parent"
					@dragstart="onDragStart($event, item.label, item.parent)">
					<span :class="item.icon" />
					<span class="ml-2">{{ item.label }}</span>
					<span v-if="item.shortcut"
						class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{
							item.shortcut }}</span>
					<i v-if="hasSubmenu" class="ml-auto pi pi-angle-right"></i>
				</a>
			</template>
		</TieredMenu>
	</Panel>
</template>

<style scoped>
.menu-container {
	height: auto;
	/* Make sure the parent container is full height */
	display: flex;
	flex-direction: column;
	z-index: 6;
}
</style>