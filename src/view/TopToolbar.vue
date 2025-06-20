<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Image from 'primevue/image';
import dtuLogo from '@/assets/dtu.png';

</script>

<template>
    <Toolbar class="custom-toolbar">
      <template #start>
        <Image :src="dtuLogo" class="mr-3" alt="DTU" height=40 />
        <Image src="https://beamline.cloud/img/logo.svg" class="mr-3" alt="Beamline" height=30 />
        <b class="designer-text">pyBeamline Designer</b>
      </template>

      <template #end>
        <Button icon="pi pi-ellipsis-v" raised rounded severity="secondary"/>
      </template>
    </Toolbar>
</template>

<style scoped>

.custom-toolbar {
  background-color: #186AC0FF;
  border-color: #186AC0FF;
  color: white; /* Optional: changes text/icon color */
  border-radius: 0rem;
  height: 70px;
  font-family: 'Roboto', sans-serif;
}

.designer-text {
  margin-left: 10px; /* adjust spacing as needed */
  font-weight: bold;
  font-size: 18px;
}

</style>