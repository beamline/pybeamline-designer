<script setup lang="ts">
import BlockMenu from "@/componentsPrime/BlockMenu.vue";
import MainVueFlow from "@/componentsPrime/mainVueFlow.vue";
import AjvManager from "@/logic/AjvManager.js";
AjvManager.getInstance().manageReferences()

</script>

<template>
  <div class="container">
    <nav><BlockMenu/></nav>
    <main><main-vue-flow/></main>
  </div>
</template>

<style scoped>
.container{
  position:fixed;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 10fr;
  grid-template-columns: 1fr 9fr;
  grid-template-areas:
    "nav main";
  grid-gap: 0;
}
nav{
  grid-area: nav;
  width: 100%;
  height: 100%;
  z-index: 1;
}
main{
  background: ghostwhite;
  grid-area: main;
  width: 100%;
  height: 100%;
  z-index: 0;
}


</style>