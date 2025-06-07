<script setup lang="ts">
import {EdgeChange, useVueFlow} from '@vue-flow/core';
import {Translator} from "@/model/Translator.js";
import {PipelineSyntaxError, sanityChecker} from "@/model/sanityChecker.js";

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
      const ids =  e.nodesId
      const errors = e.message.split("\n");
      nodes.value.forEach((node)=>{
        const index = ids.indexOf(node.id)
        if (index != -1){
          updateNode(node.id, { style: {
              "-webkit-box-shadow": " 0px 0px 10px 1px red",
              "box-shadow": " 0px 0px 10px 1px red",
              "border-radius": " 5px",
            }, data:{...node.data, error:errors[index]}});
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