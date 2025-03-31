<script setup lang="ts">
import MainVueFlow from "@/components/mainVueFlow.vue";
import AjvManager from "@/logic/AjvManager.js";
import TutorialPanel from "@/components/TutorialPanel.vue";
AjvManager.getInstance().manageReferences()

</script>

<template>
  <div class="container">
    <div class="tutorial">
      <TutorialPanel/>
    </div>
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
  height: 100%;
  z-index: 0;
}

.tutorial{
  position: absolute;
  left:0;
  bottom: 0;
  padding: 10px;
  z-index: 5;
 }

</style>