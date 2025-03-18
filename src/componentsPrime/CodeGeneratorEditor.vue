<script setup lang="ts">
import {ref} from "vue";
import {python} from "@codemirror/lang-python";
import {basicSetup} from "codemirror";
import {Codemirror} from "vue-codemirror";
import Button from "primevue/button";

const props = defineProps({
  codeGenerated: String,
})
const code = ref(props.codeGenerated);
</script>

<template>
  <div class="main">
    <codemirror
        v-model="code"
        :extensions="[python(), basicSetup]"
        :style="{ height: '600px', border: '1px solid #ddd' }"
        :autofocus="true"
    />
    <Button label="Open Editor" raised/>
  </div>
</template>

<style scoped>
.main{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>