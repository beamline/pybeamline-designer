<script setup lang="ts">
import Tutorial from "@/components/Tutorial.vue";
import { Panel} from "@vue-flow/core";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import {ref} from "vue";
const tutorial = ref(false);
</script>

<template>
  <Button label="?" rounded @click="tutorial = true"/>

    <Dialog v-model:visible="tutorial" modal :show-header="false" style="padding:0">
      <template #container="{closeCallback}">
        <Tutorial :func="closeCallback"/>
      </template>
    </Dialog>
</template>

<style scoped>

</style>