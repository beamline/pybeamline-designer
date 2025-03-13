<script setup lang="ts">

import SideBar from "@/components/SideBar.vue";
import Canvas from "@/components/Canvas.vue";
import AjvManager from "@/logic/AjvManager.js";
import Topbar from "@/components/Topbar.vue";
AjvManager.getInstance()

</script>

<template>
  <div class="container">
    <header><Topbar/></header>
    <nav><SideBar/></nav>
    <main><Canvas/></main>
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
  grid-template-rows: 1fr 9fr;
  grid-template-columns: 1fr 9fr;
  grid-template-areas:
    "header header"
    "nav main";
  grid-gap: 0;
}
header{
  grid-area: header;
  background-color: teal;
  z-index: 1;
}
nav{
  grid-area: nav;
  background-color: tomato;
  z-index: 1;
}
main{
  grid-area: main;
  background-color: lightblue;
  z-index: 0;
}
</style>
