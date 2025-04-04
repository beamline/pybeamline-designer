<script setup lang="ts">
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import {ref, watch} from "vue";

const products=ref([
  {
    code: "papaya",
    name: "ll",
    category: "stupid",
    quantity: "mamamia"
  }
])



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
            result = mysource.pipe( <br> &emsp; &emsp; &emsp; myoperator1(...),<br>&emsp; &emsp; &emsp;
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
    <h2 style="padding-left:50px; width:100%;">Functions List</h2>




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