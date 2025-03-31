<script setup lang="ts">
import cooltransition from "@/components/cooltransition.vue";
import Button from "primevue/button";
import { ref, watch } from "vue";
import Background from "@/components/background.vue";
import {VueFlow, Node, Edge} from "@vue-flow/core";
import Card from 'primevue/card';
import {Avatar} from "primevue";
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Divider from "primevue/divider";


import {CustomEdge, EndNode, StandardNode, StartNode, UnionNode} from "@/components/graph/index.js";
defineProps({
  func: Function,
})
const index = ref(0)
const nodesList: { [key: number]: Node[] }= {
  0:[
    {
      "id": "0",
      "position": {
        "x": 450,
        "y": 500
      },
      "type": "start",
      "data": {
        "name": "string_test_source",
        "inputType": null,
        "outputType": [
          "event"
        ],
        "parameters": {
          "iterable": "\"a22\"",
          "scheduler": ""
        },
        "sourceHandleStyle": {
          "backgroundColor": "#32CD32",
          "width": "12px",
          "height": "12px",
          "clipPath": "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)",
          "borderRadius": "50%",
          "border": "1px solid white",
          "outline": "none",
          "boxShadow": "none",
          "padding": "0",
          "margin": "0px"
        },
        "targetHandleStyle": {},
        "hint": "This is a great hint that will help you a lot",
        "required": [
          "iterable"
        ],
        "error": ""
      }
    },
    {
      "id": "1",
      "position": {
        "x": 700,
        "y": 450
      },
      "type": "end",
      "data": {
        "name": "print_sink",
        "inputType": [
          "any"
        ],
        "outputType": null,
        "parameters": {},
        "sourceHandleStyle": {},
        "targetHandleStyle": {
          "backgroundColor": "#32CD32",
          "width": "15px",
          "height": "15px",
          "borderRadius": "0",
          "border": "1px solid white",
          "outline": "none",
          "boxShadow": "none",
          "padding": "0",
          "margin": "0px",
          "textAlign": "center"
        },
        "hint": "This is a great hint that will help you a lot",
        "required": [],
        "error": ""
      }
    }
  ],
  1:[{
    "id": "3",
    "position": {
      "x": 350,
      "y": 400
    },
    "type": "start",
    "data": {
      "name": "string_test_source",
      "inputType": null,
      "outputType": [
        "event"
      ],
      "parameters": {
        "iterable": "\"a22\"",
        "scheduler": ""
      },
      "sourceHandleStyle": {
        "backgroundColor": "#32CD32",
        "width": "12px",
        "height": "12px",
        "clipPath": "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)",
        "borderRadius": "50%",
        "border": "1px solid white",
        "outline": "none",
        "boxShadow": "none",
        "padding": "0",
        "margin": "0px"
      },
      "targetHandleStyle": {},
      "hint": "This is a great hint that will help you a lot",
      "required": [
        "iterable"
      ],
      "error": ""
    }
  },
    {
      "id": "4",
      "position": {
        "x": 700,
        "y": 450
      },
      "type": "end",
      "data": {
        "name": "print_sink",
        "inputType": [
          "any"
        ],
        "outputType": null,
        "parameters": {},
        "sourceHandleStyle": {},
        "targetHandleStyle": {
          "backgroundColor": "#32CD32",
          "width": "15px",
          "height": "15px",
          "borderRadius": "0",
          "border": "1px solid white",
          "outline": "none",
          "boxShadow": "none",
          "padding": "0",
          "margin": "0px",
          "textAlign": "center"
        },
        "hint": "This is a great hint that will help you a lot",
        "required": [],
        "error": ""
      }
    }],
  2:[{
    "id": "5",
    "position": {
      "x": 550,
      "y": 400
    },
    "type": "start",
    "data": {
      "name": "string_test_source",
      "inputType": null,
      "outputType": [
        "event"
      ],
      "parameters": {
        "iterable": "\"a22\"",
        "scheduler": ""
      },
      "sourceHandleStyle": {
        "backgroundColor": "#32CD32",
        "width": "12px",
        "height": "12px",
        "clipPath": "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)",
        "borderRadius": "50%",
        "border": "1px solid white",
        "outline": "none",
        "boxShadow": "none",
        "padding": "0",
        "margin": "0px"
      },
      "targetHandleStyle": {},
      "hint": "This is a great hint that will help you a lot",
      "required": [
        "iterable"
      ],
      "error": ""
    }
  },
    {
      "id": "6",
      "position": {
        "x": 700,
        "y": 450
      },
      "type": "end",
      "data": {
        "name": "print_sink",
        "inputType": [
          "any"
        ],
        "outputType": null,
        "parameters": {},
        "sourceHandleStyle": {},
        "targetHandleStyle": {
          "backgroundColor": "#32CD32",
          "width": "15px",
          "height": "15px",
          "borderRadius": "0",
          "border": "1px solid white",
          "outline": "none",
          "boxShadow": "none",
          "padding": "0",
          "margin": "0px",
          "textAlign": "center"
        },
        "hint": "This is a great hint that will help you a lot",
        "required": [],
        "error": ""
      }
    }],
  3:[{
    "id": "7",
    "position": {
      "x": 350,
      "y": 400
    },
    "type": "start",
    "data": {
      "name": "string_test_source",
      "inputType": null,
      "outputType": [
        "event"
      ],
      "parameters": {
        "iterable": "\"a22\"",
        "scheduler": ""
      },
      "sourceHandleStyle": {
        "backgroundColor": "#32CD32",
        "width": "12px",
        "height": "12px",
        "clipPath": "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)",
        "borderRadius": "50%",
        "border": "1px solid white",
        "outline": "none",
        "boxShadow": "none",
        "padding": "0",
        "margin": "0px"
      },
      "targetHandleStyle": {},
      "hint": "This is a great hint that will help you a lot",
      "required": [
        "iterable"
      ],
      "error": ""
    }
  },
    {
      "id": "8",
      "position": {
        "x": 500,
        "y": 450
      },
      "type": "end",
      "data": {
        "name": "print_sink",
        "inputType": [
          "any"
        ],
        "outputType": null,
        "parameters": {},
        "sourceHandleStyle": {},
        "targetHandleStyle": {
          "backgroundColor": "#32CD32",
          "width": "15px",
          "height": "15px",
          "borderRadius": "0",
          "border": "1px solid white",
          "outline": "none",
          "boxShadow": "none",
          "padding": "0",
          "margin": "0px",
          "textAlign": "center"
        },
        "hint": "This is a great hint that will help you a lot",
        "required": [],
        "error": ""
      }
    }]
}


const edgesList:{ [key: number]: Edge[] }  = {
  0:[{
    "id": "e0-1",
    "source": "0",
    "target": "1",
    "type": "custom",
    "animated": true,
    "data": {
      "color": "#32CD32"
    }
  }
  ],
  1:[],
  2:[],
  3:[]
}

const rotation = ref(0);
const nodes2 = ref(nodesList[index.value])
const edges2 = ref(edgesList[index.value])

function rotate(value: number) {
  rotation.value += value;
  index.value = (index.value +1) % 4
}

watch(index, async (newQuestion, oldQuestion) => {
  nodes2.value = nodesList[index.value]
  edges2.value = edgesList[index.value]
  rotation.value = index.value * -90;
})
</script>

<template>
  <div style="width: 80vw; height: 80vh; overflow: hidden; border-radius: 11px">
    <div class="menu">
      <Stepper v-model:value="index" style="position: absolute; right: 20px; bottom: 150px" >
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
          <Divider layout="vertical" style="height: 50px; right: 5%"/>
        </StepItem>
        <StepItem :value=3>
          <Step></Step>
        </StepItem>
      </Stepper>

      <Button icon="pi pi-times" @click="func" rounded variant="text" style="left:96%;" severity="secondary" />
      <Button label="Next" icon="pi pi-play" iconPos="right" @click="rotate(-90)" rounded style="right:10px; z-index:1; bottom:10px; position: absolute" />

      <div class="circle">
        <ul :style="{ transform: `rotate(${rotation}deg)`}">
          <li class="t3">
            <div style="display: flex; left:150px;top: 25px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 3</template>
                <template #content>
                  If you look you can see, if you dont look, you cannot see
                </template>
              </Card>
            </div>
            <div style="display: flex; left:200px;top: 75px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see,
                </template>
              </Card>
            </div>

            <div style="display: flex; left:200px;top: 125px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see,
                </template>
              </Card>
            </div>

            <div style="display: flex; left:150px;top: 175px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see,
                </template>
              </Card>
            </div>

          </li>
          <li class="t3">
            <div style="display: flex; left:150px;top: 25px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 0</template>
                <template #content>
                  If you look you can see, if you dont look, you cannot see
                </template>
              </Card>
            </div>
            <div style="display: flex; left:200px;top: 75px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see,
                </template>
              </Card>
            </div>

            <div style="display: flex; left:200px;top: 125px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see,
                </template>
              </Card>
            </div>

            <div style="display: flex; left:150px;top: 175px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see,
                </template>
              </Card>
            </div>

          </li>
          <li class="t3">
            <div style="display: flex; left:150px;top: 25px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see, if you dont look, you cannot see
                </template>
              </Card>
            </div>
            <div style="display: flex; left:200px;top: 75px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see,
                </template>
              </Card>
            </div>

            <div style="display: flex; left:200px;top: 125px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see,
                </template>
              </Card>
            </div>

            <div style="display: flex; left:150px;top: 175px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see,
                </template>
              </Card>
            </div>

          </li>
          <li class="t3">
            <div style="display: flex; left:150px;top: 25px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 2</template>
                <template #content>
                  If you look you can see, if you dont look, you cannot see
                </template>
              </Card>
            </div>
            <div style="display: flex; left:200px;top: 75px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see,
                </template>
              </Card>
            </div>

            <div style="display: flex; left:200px;top: 125px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see,
                </template>
              </Card>
            </div>

            <div style="display: flex; left:150px;top: 175px; position: relative; height: fit-content">
              <Avatar icon="pi pi-folder" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: 100px">
                <template #title> Specification 1</template>
                <template #content>
                  If you look you can see,
                </template>
              </Card>
            </div>

          </li>
        </ul>
        <VueFlow
            :nodes="nodes2"
            :edges="edges2"
            :pan-on-drag="false"
            :auto-pan-on-node-drag="false"
            :pan-on-scroll="false"
        >
          <template #edge-custom="customEdgeProps">
              <CustomEdge v-bind="customEdgeProps" />
          </template>
          <template #node-standard="props">
            <cooltransition animation-type="zoom">
            <StandardNode v-bind="props" />
            </cooltransition>
          </template>
          <template #node-start="props">
            <cooltransition animation-type="zoom">
            <StartNode v-bind="props" />
              </cooltransition>
          </template>
          <template #node-end="props">
            <cooltransition animation-type="zoom">
            <EndNode v-bind="props" />
            </cooltransition>
          </template>
          <template #node-union="props">
            <cooltransition animation-type="zoom">
            <UnionNode v-bind="props" />
            </cooltransition>
          </template>
          <Background :size="2" :gap="20" pattern-color="black" style="border-radius: 50%"/>
        </VueFlow>
      </div>
    </div>
  </div>
</template>

<style>
.circle {
  --radius: 500px;
  position: relative;
  margin-top: -20%;
  margin-bottom: 20px;
  margin-left: -30%;
  width: calc(var(--radius) * 2);
  height: calc(var(--radius) * 2);
  border-radius: 50%;
  background: #c386c8;
  box-shadow: inset 0px 0px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.5s ease;
}

.circle ul {
  position: absolute;
  width: 100%;
  height: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 1s ease;
}

.circle li {
  --mini-width: 600px;
  --mini-height:600px;
  position: absolute;
  width: var(--mini-width);
  height: var(--mini-height);
}

.circle li:nth-child(1) {
  top: calc(var(--mini-width) * -0.7);
  left: calc(var(--radius) - var(--mini-width)/2);
  rotate: -90deg;
}

.circle li:nth-child(2) {
  top: calc(var(--radius) - var(--mini-height)/2);
  right: calc(var(--mini-width) * -0.7);
}

.circle li:nth-child(3) {
  bottom: calc(var(--mini-width) * -0.7);
  left: calc(var(--radius) - var(--mini-width)/2);
  rotate: 90deg;
}

.circle li:nth-child(4) {
  top: calc(var(--radius) - var(--mini-height)/2);
  left: calc(var(--mini-width) * -0.7);
  rotate: 180deg;
}

.menu{
}
.selected{
  background: black;
}

</style>

