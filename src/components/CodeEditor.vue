<template>
  <div v-if="kernel" class="runStop">
    <Button icon="pi pi-play" :disabled="currentFuture" @click="executeCode"/>

    <Button icon="pi pi-stop" @click="stopExecution" :disabled="!currentFuture"/>
  </div>

  <div v-if="!kernel">
    <h2>Kernel Connection</h2>

    <p>Specify the URL of your Jupyter Kernel Gateway to connect to it:</p>
    <InputGroup>
      <InputText v-model="serverUrl" outlined
                 placeholder="e.g., http://localhost:8888" :disabled="connecting"></InputText>
      <Button @click="connectToServer">
        Connect
      </Button>
    </InputGroup>

    <p>Start your Jupyter Kernel Gateway with:</p>
    <InputGroup>
      <InputText :value="text" readonly />
      <Button icon="pi pi-copy" @click="copyText" />
    </InputGroup>
    <Divider/>
  </div>

  <div class="border-thin">
    <codemirror
        v-model="code"
        :extensions="[python(), basicSetup]"
        :style="{ height: '450px', border: '1px solid #ddd' }"
        :autofocus="true"
    />
  </div>


  <div>

    <div justify="center" v-if="kernel">
      <Divider/>
      <ScrollPanel style="width: 100%; height: 100px">
        <pre class="output">{{ output }}</pre>
      </ScrollPanel>

    </div>
  </div>
</template>

<script setup>
import { KernelManager, ServerConnection } from "@jupyterlab/services";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Divider from "primevue/divider";
import ScrollPanel from 'primevue/scrollpanel';
import { Codemirror } from "vue-codemirror";
import {python} from "@codemirror/lang-python";
import {basicSetup} from "codemirror";
import {InputGroup} from "primevue";
import {computed, ref} from "vue";

const { modelValue } = defineProps(['modelValue']);
const emit = defineEmits(["update:modelValue"]);
const code = computed({
  get() {
    return modelValue;
  },
  set(nextValue) {
    emit("update:modelValue", nextValue);
  },
});


const text ="jupyter notebook --NotebookApp.allow_origin='http://localhost:5173' --NotebookApp.token='' --NotebookApp.disable_check_xsrf=True\n"
const serverUrl = ref("http://localhost:8888") // Default Jupyter Kernel Gateway URL
const output= ref("") // Output from the kernel
let error = "" // Error messages
let connecting = false
const kernel = ref(null) // Connected kernel instance
let kernelManager= null
let currentFuture =null


async function connectToServer() {
  error = "";
  output.value = "";
  connecting = true;
  try {
    const serverSettings = ServerConnection.makeSettings({
      baseUrl: serverUrl.value,
      token: "",
    });

    kernelManager = new KernelManager({ serverSettings });
    kernel.value = await kernelManager.startNew();
    console.log("Connected to kernel:", kernel);
    connecting = false;
  } catch (err) {
    error = `Failed to connect to Jupyter Kernel Gateway: ${err.message}`;
    connecting = false;
  }
}
async function executeCode() {
  if (!kernel) {
    error = "Not connected to a kernel.";
    return;
  }
  output.value = "";
  error = "";

  try {
    // Initiate code execution
    const future = kernel.value.requestExecute({ code: code.value });
    currentFuture = future; // Track the execution

    // Listen for output
    future.onIOPub = (msg) => {
      if (msg.content.text) {
        output.value += msg.content.text + "\n";
      }
    };

    // Wait for execution to complete
    await future.done;
    currentFuture = null; // Clear once done
  } catch (err) {
    error = `Failed to execute code: ${err.message}`;
    currentFuture = null; // Clear on error
  }
}
async function stopExecution() {
  if (currentFuture) {
    currentFuture.dispose(); // Stop execution
    currentFuture = null;
    kernel.value = await kernelManager.startNew();
    error = "Execution stopped by the user.";
  }
}
async function copyText() {
  await navigator.clipboard.writeText(text);
}

</script>

<style>
.output {
  white-space: pre-wrap;
  background: black;
  color: white;
  padding: 15px;
  min-height: 100px;
}
.runStop{
  display:flex;
  gap: 3px;
  padding-bottom: 10px;
  justify-content: right;
}
</style>