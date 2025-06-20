<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Image from 'primevue/image';
import dtuLogo from '@/assets/dtu.png';
import {ref} from "vue";
import Menu  from 'primevue/menu';
import Dialog from 'primevue/dialog';

const items =[
    {
    label: 'About',
    icon: 'pi pi-info-circle',
      command: () => {
        showAbout.value = true;
      }
    }
]

const menuRef = ref()

const showAbout = ref(false)

</script>

<template>
    <Toolbar class="custom-toolbar">
      <template #start>
        <Image :src="dtuLogo" class="mr-3" alt="DTU" height=40 />
        <Image src="https://beamline.cloud/img/logo.svg" class="mr-3" alt="Beamline" height=30 />
        <b class="designer-text">pyBeamline Designer</b>
      </template>

      <template #end>
        <Button icon="pi pi-ellipsis-v" raised rounded severity="secondary" @click="menuRef.toggle($event)" aria-haspopup="true" aria-controls="overlay_menu"/>
        <Menu ref="menuRef" id="overlay_menu" :model="items" :popup="true" />

        <Dialog  v-model:visible="showAbout"
                 header="About the pyBeamline Designer"
                :modal="true"
                :closable="true"
                :closeOnEscape="true"
                :dismissableMask="true"
                 :style="{ width: '60rem' }"
        >
          <p>pyBeamline Designer is the result of the bachelor project of Arturo Cortes Porras and Sotero Pedro Romero Moron, described in the document
            "Development of an interactive, no-code process mining platform based on Beamline/pyBeamline." Abstract of the thesis:
          </p><br>
          <p><i>
            Streaming process mining enables real-time analysis of event logs to uncover inefficiencies and deviations in business processes. pyBeamline, a Python-based prototyping library built on RxPY, provides a flexible environment for developing such pipelines. However, there are some usability challenges present due to the complexity behind pipeline logic and operator behavior, particularly for non-experts and rapid prototyping scenarios. To address this, we designed and implemented a no-code development platform (NCDP) for pyBeamline, enabling users to visually construct, execute, and export streaming process mining pipelines through a web-based interface. The tool supports core functionalities such as error detection, diagram-to-code translation, runtime execution, and custom operator extension while requiring minimal setup and no backend dependencies.
          </i></p><br>
          <p>The complete report is available at: [insert report link]</p>
          <br>
          <p>The source code of this application is available at: <a href="https://github.com/Sotero-Romero/Development-of-an-interactive-no-code-process-mining-platform-based-on-Beamline-pyBeamline">this repository.</a></p>
        <br>
          <p>This project is licensed under the Apache License 2.0.</p>
        </Dialog>
      </template>
    </Toolbar>
</template>

<style scoped>

.custom-toolbar {
  background-color: #186AC0FF;
  border-color: #186AC0FF;
  color: white; /* Optional: changes text/icon color */
  border-radius: 0rem;
  height: 7.5%;
  font-family: 'Roboto', sans-serif;
}

.designer-text {
  margin-left: 10px; /* adjust spacing as needed */
  font-weight: bold;
  font-size: 18px;
}



</style>