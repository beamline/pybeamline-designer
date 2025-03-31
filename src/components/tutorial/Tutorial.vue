<script setup lang="ts">
import cooltransition from "@/components/tutorial/cooltransition.vue";
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
  <div style="width: 1300px; height: 750px; overflow: hidden; border-radius: 11px">
    <div class="menu">
      <Stepper v-model:value="index" style="position: absolute; right: 20px; bottom: calc(50% - 150px)" >
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
            <div style="display: flex; left:130px;top: 0px; position: relative; height: fit-content">
              <Avatar icon="pi pi-pencil" size="xlarge" style="height:120px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title>Custom Block</template>
                <template #content>
                  In case the provided blocks are not enough for you, we offer customs blocks where you can code your own functions
                </template>
              </Card>
            </div>
            <div style="display: flex; left:180px;top: 40px; position: relative; height: fit-content">
              <Avatar icon="pi pi-file-edit" size="xlarge" style="height:120px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title>Edit Code</template>
                <template #content>
                  Once the code is generated you will be able to edit it before the download
                </template>
              </Card>
            </div>

            <div style="display: flex; left:175px;top: 80px; position: relative; height: fit-content">
              <Avatar icon="pi pi-play" size="xlarge" style="height:120px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title>Jupyter Kernel</template>
                <template #content>
                  In the case you have jupyter installed, you will be able to run the code directly from the web
                </template>
              </Card>
            </div>

            <div style="display: flex; left:120px;top: 120px; position: relative; height: fit-content">
              <Avatar icon="pi pi-info" size="xlarge" style="height:120px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title>Where can I learn more?</template>
                <template #content>
                  All the documentation of pybeamline is specified in its website:
                  <a href="https://beamline.cloud/pybeamline/" target="_blank">pyBeamline</a>
                </template>
              </Card>
            </div>

          </li>
          <li class="t0">
            <div style="display: flex; left:150px;top: 5px; position: relative; height: fit-content">
              <Avatar icon="pi pi-face-smile" size="xlarge" style="height:150px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title> Welcome</template>
                <template #content>
                  PybeamLine Designer aims to make your process mining analytics as easy as possible. Here you will be able to create diagrams resembling your own system.
                </template>
              </Card>
            </div>
            <div style="display: flex; left:180px;top: 45px; position: relative; height: fit-content">
              <Avatar icon="pi pi-bolt" size="xlarge" style="height:120px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title> Minimum Requisites</template>
                <template #content>
                  Every valid diagram, must have at least 1 source, and 1 sink. That is, it must have a start and an end
                </template>
              </Card>
            </div>

            <div style="display: flex; left:180px;top: 90px; position: relative; height: fit-content">
              <Avatar icon="pi pi-plus-circle" size="xlarge" style="height:120px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title> But, what is a Source?</template>
                <template #content>
                  Sources are any block that contains an output (represented as a colored shape on the right), and no input
                </template>
              </Card>
            </div>

            <div style="display: flex; left:120px;top: 125px; position: relative; height: fit-content">
              <Avatar icon="pi pi-minus-circle" size="xlarge" style="height:120px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title> And, what is a Sink?</template>
                <template #content>
                  Sinks are any block that contains an input (represented as a colored shape on the left), and no output
                </template>
              </Card>
            </div>

          </li>
          <li class="t1">
            <div style="display: flex; left:130px;top: 0px; position: relative; height: fit-content">
              <Avatar icon="pi pi-box" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title> Blocks Structure</template>
                <template #content>
                  Blocks are composed of an input (left colored shape), an output (right colored shape) and a name
                </template>
              </Card>
            </div>
            <div style="display: flex; left:180px;top: 30px; position: relative; height: fit-content">
              <Avatar icon="pi pi-graduation-cap" size="xlarge" style="height:120px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title> Input / Output types</template>
                <template #content>
                  Every input and output has a type, which is defined by its shape and color.
                </template>
              </Card>
            </div>

            <div style="display: flex; left:180px;top: 60px; position: relative; height: fit-content">
              <Avatar icon="pi pi-exclamation-triangle" size="xlarge" style="height:170px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title> Connections </template>
                <template #content>
                  Connections are always between an input and an output. For a connection to be possible, both connected types need to be the same. That is, an output with a green circle can only be connected with an input with a green circle
                </template>
              </Card>
            </div>

            <div style="display: flex; left:120px;top: 85px; position: relative; height: fit-content">
              <Avatar icon="pi pi-sitemap" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title> Multiple connections</template>
                <template #content>
                  Blocks with a long connection shape, can have more than one connection at that input/output
                </template>
              </Card>
            </div>

          </li>
          <li class="t2">
            <div style="display: flex; left:130px;top: 0px; position: relative; height: fit-content">
              <Avatar icon="pi pi-globe" size="xlarge" style="height:120px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title>Universal type</template>
                <template #content>
                  Blocks with a grey square can be connected to any type
                </template>
              </Card>
            </div>
            <div style="display: flex; left:180px;top: 25px; position: relative; height: fit-content">
              <Avatar icon="pi pi-cog" size="xlarge" style="height:120px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title> Attributes</template>
                <template #content>
                  Some blocks have attributes, this are specifications that need to be defined by the user. You can click on a block to see them
                </template>
              </Card>
            </div>

            <div style="display: flex; left:180px;top: 75px; position: relative; height: fit-content">
              <Avatar icon="pi pi-user-edit" size="xlarge" style="height:100px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title> Required Attributes</template>
                <template #content>
                  Attributes may be mandatory to specify, this will highlight in red until you fill them
                </template>
              </Card>
            </div>

            <div style="display: flex; left:130px;top: 100px; position: relative; height: fit-content">
              <Avatar icon="pi pi-exclamation-triangle" size="xlarge" style="height:150px; background: none " />
              <Card style="width: fit-content; height: fit-content">
                <template #title> Why is the node red?</template>
                <template #content>
                  When we detect that you are missing any essential part of your diagram, the block with the missing part will get red. Hover over it to see extra information
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
  top: -200px;
  left: -400px;
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

