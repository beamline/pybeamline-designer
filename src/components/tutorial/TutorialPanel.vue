<script setup lang="ts">
import DesignerTutorial from "@/components/tutorial/DesignerTutorial.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import SelectButton from 'primevue/selectbutton';

import {ref} from "vue";
import PyBeamlineTutorial from "@/components/tutorial/PyBeamlineTutorial.vue";
const tutorial = ref(false);
const value = ref("Designer")
</script>

<template>
  <Button label="?" rounded @click="tutorial = true"/>

    <Dialog v-model:visible="tutorial" modal :show-header="false" style="padding:0; width: 1300px; height: 750px; overflow:auto; border-radius: 11px">
      <template #container="{closeCallback}">
        <SelectButton v-model="value" :options="['Pybeamline','Designer']" style="position: absolute;left: 50%;transform: translateX(-50%); z-index: 7"></SelectButton>
        <Button icon="pi pi-times" @click="closeCallback" rounded variant="text" style="left:96%; position:absolute" severity="secondary" />
        <div v-if="value === 'Designer'" style="overflow: hidden;">
          <DesignerTutorial/>
        </div>
        <div v-else-if="value === 'Pybeamline'" style="overflow: hidden;">
          <PyBeamlineTutorial/>
        </div>
      </template>
    </Dialog>
</template>

<style scoped>

</style>