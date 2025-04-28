<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ajvManager from "@/logic/AjvManager.js";
import StepItem from "primevue/stepitem";
import Stepper from "primevue/stepper";
import Divider from "primevue/divider";
import Step from "primevue/step";
import {python} from "@codemirror/lang-python";
import {basicSetup} from "codemirror";
import {Codemirror} from "vue-codemirror";



const ajv = ajvManager.getInstance()
const keys=Object.keys(ajv.schemas).slice(1).filter((key) => (key != "main.json" && key != "definitions.json"))
const products = keys.map(key => (ajv.getCleanSchemaByName(key.slice(0,-5)))).map((schema) => ({
  name: schema.descriptors.name,
  inputType: schema.descriptors.inputType,
  multipleInputs: !!schema.input,
  outputType: schema.descriptors.outputType,
  multipleOutputs: true,
  parameters:  Object.keys(schema.parameters).map((key) => (
      {
        attrName: key,
        required:schema.required? schema.required.includes(key) : false,
      }))
}))


const searchQuery = ref("")
const filteredData = computed(()=>{
  return products.filter((product)=> product.name.includes(searchQuery.value))
})

const expandedRows = ref({});


const sections = ['part1', 'part2', 'part3']
const currentIndex = ref(0)

function goToNext() {
  if (currentIndex.value < sections.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
  window.location.href = '#' + sections[currentIndex.value]
}

function onStepChange(event: any){
  window.location.href = '#' + sections[currentIndex.value]
}


</script>

<template>
  <div>
    <Button rounded label="Next" icon="pi pi-play" iconPos="right" @click="goToNext" style="right:10px; z-index:1; bottom:10px; position: absolute"></Button>
  </div>
  <Stepper v-model:value="currentIndex" @update:value="onStepChange" style="position: absolute; right: 20px; bottom: calc(50% - 100px)" >
    <StepItem :value=0>
      <Step></Step>
      <Divider layout="vertical" style="height: 50px; right: 5%"/>
    </StepItem>
    <StepItem :value=1>
      <Step></Step>
      <Divider layout="vertical" style="height: 50px; right: 5%"/>
    </StepItem>
    <StepItem :value=2>
      <Step></Step>
    </StepItem>
  </Stepper>
  <div class="scroll-container">
    <div class="scroll-page" id="part1">
      <div class="exampleBox">
          <codemirror
              :extensions="[python(), basicSetup]"
              :style="{ height: '675px', width:'350px'}"
              :autofocus="true"

          />
      </div>
      <div class="explanationBox">
        <h2 >Core Concepts</h2>
        <Card class="concepts">
          <template #title>Source</template>
          <template #content>
            <p>
              In pyBeamline, sources are equivalent to observables—they emit event streams that can be processed. Observers can subscribe to these observables and react dynamically to the emitted data.
            </p>
          </template>
        </Card>
        <Card class="concepts">
          <template #title>Filters</template>
          <template #content>
            <p>
              Filters are operators that do not modify the input stream but selectively allow or block events based on a predicate test. They process an event stream and output a filtered event stream.          </p>
          </template>
        </Card>
        <Card class="concepts">
          <template #title>Mappers & Algorithms</template>
          <template #content>
            <p>
              Mappers and algorithms transform event streams. The resulting output depends on the specific algorithm being used. For example, discovery miners analyze event logs to construct process models.          </p>
          </template>
        </Card>
      </div>
    </div>
    <div class="scroll-page" id="part2">
      <div class="exampleBox">
        <codemirror
            :extensions="[python(), basicSetup]"
            :style="{ height: '675px', width:'350px'}"
            :autofocus="true"

        />
      </div>
      <div class="explanationBox">
        <h2>Syntax</h2>
        <Card class="concepts">
          <template #title>Adding Sources</template>
          <template #content>
            <p style="padding-bottom:20px">
              Sources can be easily added by just referencing its name function. We recommend assigning variables to it, so you can use it in multiple instances.
            </p>
            <div class="example">
              source_1 = mySource(attr1= value1, attr2= value2)
            </div>
          </template>
        </Card>
        <Card class="concepts">
          <template #title>Applying operators</template>
          <template #content>
            <p style="padding-bottom:20px">
              Operators should be encapsulated in a .pipe() statement, following the source where you want to apply it. Be sure that the input and outputs types match for it to work, else it may lead to unexpected behaviour.
            </p>
            <div class="example">
              result = source_1.pipe( <br> &emsp; &emsp; &emsp; myoperator1(...),<br>&emsp; &emsp; &emsp;
              myoperator2(...)
              )
            </div>
          </template>
        </Card>
        <Card class="concepts">
          <template #title>.subscribe</template>
          <template #content>
            <p style="padding-bottom:20px">
              If once you have processed the whole data you want to apply some function to it, you can use the .subscribe method to apply your personalised lambda function
            </p>
            <div class="example">
              result.subscribe(lambda x: print(x))
            </div>
          </template>
        </Card>
      </div>
    </div>
    <div class="scroll-page" id="part3" style="justify-content: center">
      <div style="display: flex; flex-direction: column; align-content: center; padding-top: 50px; height:735px">
        <h2 style="padding-left:50px; width:100%; padding-bottom: 20px">Functions List</h2>

        <InputText v-model="searchQuery" placeholder="Search..." style="width: 70rem" />
        <div style="height: 50rem; overflow: scroll; padding-bottom: 30px">
          <DataTable v-model:expandedRows="expandedRows" :value="filteredData" tableStyle="width: 70rem;" dataKey="name" paginator :rows="8">
            <Column expander style="width: 5rem" />
            <Column field="name" header="Name"></Column>
            <Column field="inputType" header="Input type"></Column>
            <Column field="multipleInputs" header="Allow multiple inputs"></Column>
            <Column field="outputType" header="Output type"></Column>
            <Column field="multipleOutputs" header="Allow multiple outputs"></Column>

            <template #expansion="slotProps">
              <DataTable :value="slotProps.data.parameters">
                <Column field="attrName" header="Attribute Name"></Column>
                <Column field="required" header="Required"></Column>
              </DataTable>
            </template>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.exampleBox {
  height: 675px;
  width: 350px;

  padding-top: 20px;
  padding-left: 20px;
}



.explanationBox {
  height: 735px;
  width: 750px;
  padding-top: 60px;
  padding-left: 40px;
}

.scroll-container{
  height:735px;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  overflow: hidden;
}

.scroll-page{
  display: flex;
  flex-direction: row;
  justify-content: left;

}

.concepts{
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  margin-top:10px
}
</style>