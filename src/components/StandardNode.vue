<script setup lang="ts">
import {Handle, Position} from "@vue-flow/core";


const props = defineProps(["name", "inType", "outType", "params"])


</script>

<template>
  <div class="standardNode">
    <p>{{ props.name }}</p>
    <Handle type="source" :position="Position.Right" />
    <Handle type="target" :position="Position.Left" />
  </div>
</template>

<style scoped>

</style>