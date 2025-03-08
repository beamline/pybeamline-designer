<script setup lang="ts">
import {Handle, Position} from "@vue-flow/core";


const props = defineProps({
  data: Object,  // This will be the 'data' property passed from the node definition
});

</script>

<template>
  <div class="endNode">
    <p>{{ props.data.name }}</p>
    <Handle type="target" :position="Position.Left" />
  </div>
</template>

<style scoped>
.endNode {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  color: blue;
}
</style>