<script setup lang="ts">
import MainVueFlow from "@/components/mainVueFlow.vue";
import AjvManager from "@/logic/AjvManager.js";
AjvManager.getInstance().manageReferences()

</script>

<template>
  <div class="container">
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


</style>