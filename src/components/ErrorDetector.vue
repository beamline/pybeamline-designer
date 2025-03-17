<script setup lang="ts">
import { useVueFlow } from '@vue-flow/core';
import {generateCode} from "@/logic/codeGenerator.js";
import {Translator} from "@/logic/Translator.js";
import {checkBlockProperties} from "@/logic/sanityChecker.js";
import {ExtendedBlock} from "@/logic/Syntax.js";

const { nodes, edges, onNodesChange, onEdgesChange, updateNode } = useVueFlow();


onNodesChange((changes)=>{
  if (changes.length === 0) {return}
  if (changes[0].type !== "select"){return}
  const translator = new Translator();
  const node = nodes.value.filter(elemt => elemt.id === changes[0].id)
  const block: ExtendedBlock = translator.translatePipeline(translator.getGuiPipelineFromVue(node,  [])).blocks[0]

  if (checkBlockProperties("parameters", block)){
    updateNode(changes[0].id, { style: {border: 'none'} })
  } else {
    updateNode(changes[0].id, { style: {border: '2px solid red'} })
  }

})
</script>

<template>

</template>

<style scoped>

</style>