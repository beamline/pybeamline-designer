<script setup lang="ts">
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import {computed, ref} from "vue";
import ajvManager from "@/logic/AjvManager.js";



const ajv = ajvManager.getInstance()
const keys=Object.keys(ajv.schemas).slice(1).filter((key) => (key != "main.json" && key != "definitions.json"))
const products = keys.map(key => (ajv.getCleanSchemaByName(key.slice(0,-5)))).map((schema) => ({
  name: schema.descriptors.name,
  inputType: schema.descriptors.inputType,
  multipleInputs: !!schema.input,
  outputType: schema.descriptors.outputType,
  multipleOutputs: true,
  parameters:  Object.entries(schema.parameters).map(([key, value]) => (
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

</script>

<template>
  <div class="main">
    <div style="height: 30px"></div>
    <h1>PyBeamline quick Tutorial</h1>
    <h2 style="padding-left:50px; width:100%">Core Concepts</h2>
    <div class="core">
      <Card class="concepts">
        <template #title>Source</template>
        <template #content>
          <p>
            In PyBeamline, sources are equivalent to observables—they emit event streams that can be processed. Observers can subscribe to these observables and react dynamically to the emitted data.
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
    <h2 style="padding-left:50px; width:100%">Syntax</h2>
    <div class="core">
      <Card class="concepts">
        <template #title>Adding Sources</template>
        <template #content>
          <p style="padding-bottom:20px">
            In PyBeamline, sources are equivalent to observables—they emit event streams that can be processed. Observers can subscribe to these observables and react dynamically to the emitted data.
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
            Filters are operators that do not modify the input stream but selectively allow or block events based on a predicate test. They process an event stream and output a filtered event stream.
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
            Mappers and algorithms transform event streams. The resulting output depends on the specific algorithm being used. For example, discovery miners analyze event logs to construct process models.
          </p>
          <div class="example">
            result.subscribe(lambda x: print(x))
          </div>
        </template>
      </Card>
    </div>
    <h2 style="padding-left:50px; width:100%; padding-bottom: 20px">Functions List</h2>

    <InputText v-model="searchQuery" placeholder="Search..." style="width: 50rem" />
    <div style="min-height: 50rem">
      <DataTable v-model:expandedRows="expandedRows" :value="filteredData" tableStyle="min-width: 50rem; padding-bottom: 30%" dataKey="name">
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
</template>

<style scoped>
.main{
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;

  justify-content: center;
  align-items: center;

  overflow: auto;
}
.core{
  width: 100%;

  display: flex;
  gap: 16px;
  justify-content: center;
  padding: 10px;
}

.concepts{
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb
}

.example{
  padding: 10px;
  background-color: rgba(127, 127, 127, 0.31);
  border-radius: 10px;
}
</style>