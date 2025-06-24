<script setup lang="ts">
import MainVueFlow from "@/view/mainVueFlow.vue";
import AjvManager from "@/model/AjvManager.js";
import TutorialPanel from "@/view/tutorial/TutorialPanel.vue";
AjvManager.getInstance().manageReferences()
import TopToolbar from "@/view/TopToolbar.vue";

</script>

<template>
  <div class="container">
    <TopToolbar/>
    <main><main-vue-flow/></main>
  </div>
</template>

<style scoped>
.container{
  position:fixed;
  width: 100vw;
  height: 100vh;
  top:0;
  left: 0;
}
main{
  background: ghostwhite;
  width: 100%;
  height: 92.5%;
  z-index: 0;
}
</style>

<style>
:root {
	--p-button-text-primary-color: #ffffff: #ff5722; /* Change to your desired primary color */
}
</style>