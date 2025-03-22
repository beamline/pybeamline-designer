<script setup lang="ts">
import {EdgeChange, useVueFlow} from '@vue-flow/core';
import {Translator} from "@/logic/Translator.js";
import {PipelineSyntaxError, sanityChecker} from "@/logic/sanityChecker.js";

const { nodes, edges, onNodesChange, onEdgesChange, updateNode } = useVueFlow();


onNodesChange((changes)=> {
  if (changes.length === 0) {
    return
  }
  if (changes[0].type !== "select" && changes[0].type !== "remove") {
    return
  }
  checkPipeline()
})

onEdgesChange((changes: EdgeChange[])=>{
  if (changes.length === 0) {return}
  if (changes[0].type === "select"){return}
  checkPipeline()
})

function checkPipeline(){
  const translator = Translator.getInstance();
  try{
    sanityChecker(translator.translatePipeline(translator.getGuiPipelineFromVue(nodes.value,  edges.value)));
  }catch (e) {
    if (e instanceof PipelineSyntaxError){
      const id =  e.nodeId
      nodes.value.forEach((node)=>{
        if (node.id === id){
          updateNode(node.id, { style: {
              "-webkit-box-shadow": " 0px 0px 10px 1px red",
              "box-shadow": " 0px 0px 10px 1px red",
              "border-radius": " 5px",
            }, data:{...node.data, error:e.message}})
        } else {
          updateNode(node.id, { style: {
              "-webkit-box-shadow": " none",
              "box-shadow": " none",
            }, data:{...node.data, error:''}})
        }
      })
      return
    }
  }
  nodes.value.forEach((node)=>{
    updateNode(node.id, { style: {
        "-webkit-box-shadow": " none",
        "box-shadow": " none",
      },data:{...node.data, error:''} })})

}


</script>

<template>

</template>

<style scoped>

</style>