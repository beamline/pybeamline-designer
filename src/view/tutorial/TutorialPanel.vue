<script setup lang="ts">
import DesignerTutorial from "@/view/tutorial/DesignerTutorial.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import SelectButton from 'primevue/selectbutton';

import {ref, render} from "vue";
import PyBeamlineTutorial from "@/view/tutorial/PyBeamlineTutorial.vue";
const tutorial = ref(false);
const value = ref("Designer")
import { defineProps } from 'vue';

const props = defineProps<{
  render: boolean
}>();

</script>

<template>

    <Dialog v-model:visible="props.render" modal :show-header="false" style="padding:0; width: 1300px; height: 750px; overflow:auto; border-radius: 11px">
      <template #container>
        <SelectButton v-model="value" :options="['pyBeamline','Designer']" style="position: absolute;left: 50%;transform: translateX(-50%); z-index: 7"></SelectButton>
        <Button icon="pi pi-times" @click="$emit('close')" rounded variant="text" style="left:96%; position:absolute" severity="secondary" />
        <div v-if="value === 'Designer'" style="overflow: hidden;">
          <DesignerTutorial/>
        </div>
        <div v-else-if="value === 'pyBeamline'" style="overflow: hidden;">
          <PyBeamlineTutorial/>
        </div>
      </template>
    </Dialog>
</template>

<style scoped>

</style>