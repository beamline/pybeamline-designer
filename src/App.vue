<script setup>

import SideBar from "@/components/SideBar.vue";
import chat from "@/components/chat.vue";

</script>

<template>
  <div class="sidebar">
    <SideBar />
  </div>
  <div class="mainzone">
    <chat />
  </div>
</template>

<style scoped>
.sidebar{
  top:0;
  left:0;
}
.mainzone{

}
</style>
