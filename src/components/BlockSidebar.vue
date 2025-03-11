<script setup lang="ts">
defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);


</script>

<template>
  <div class="main">
    <button class="absolute top-2 right-2 text-xl" @click="emit('update:modelValue', null)">
      ✖
    </button>

    <h2 class="text-xl font-bold mb-2">Block: {{modelValue.data.name}}</h2>
    <i class="i">Input type: {{modelValue.data.name}}</i>
    <i class="i">Output type: {{modelValue.data.name}}</i>
    <h2 class="text-xl font-bold mb-2">Parameters:</h2>

    <div v-for="(value, key) in modelValue.data.parameters" :key="key" class="mb-2">
      <label v-if="modelValue.data.required && modelValue.data.required.includes(key)">*</label>
      <label class="block font-bold">{{ key }}:</label>
      <input v-model="modelValue.data.parameters[key]" class="border p-1 rounded w-full" />
    </div>
    <h2 class="text-xl font-bold mb-2">Additional information:</h2>
    <i>Sabes porque supe que comias las uvas dos a dos, lazaro? Porque yo comia tres a tres y tu callabas</i>
  </div>




</template>

<style scoped>
.i{
  padding: 5px;
}
.main{
}

</style>