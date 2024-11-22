<template>
  <v-container>

    <div v-if="!kernel">
      <p>Specify the URL of your Jupyter Kernel Gateway to connect to it:</p>
      <v-text-field
        label="Jupyter Server URL"
        v-model="serverUrl"
        outlined
        placeholder="e.g., http://localhost:8888"
        class="mt-2"
      ></v-text-field>
      <v-btn
        color="primary"
        class="mt-2 mb-4"
        @click="connectToServer">
        Connect to Jupyter Kernel Gateway
      </v-btn>
      <p>Start your jupyter server with</p>
      <pre>$ jupyter-kernelgateway --KernelGatewayApp.allow_origin="*" --KernelGatewayApp.auth_token='' --KernelGatewayApp.allow_headers="Content-Type, Authorization, X-XSRFToken"</pre>
    </div>

    <v-row justify="center" v-if="kernel">
      <v-col cols="6">
        <div class="border-thin">
          <codemirror v-model="pythonCode" style="height: 500px;" />
        </div>
        <v-btn color="primary" class="mt-4" @click="executeCode">
          <v-icon icon="mdi-play-speed" />
          Run Code
        </v-btn>  
      </v-col>
      <v-col cols="6">
        <div v-if="output">
          <pre class="output">{{ output }}</pre>
        </div>
        <v-alert v-if="error" type="error" class="mt-4" dense>
          <strong>Error:</strong>
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { KernelManager, ServerConnection } from "@jupyterlab/services";

export default {
  data() {
    return {
      serverUrl: "http://localhost:8888", // Default Jupyter Kernel Gateway URL
      output: "", // Output from the kernel
      error: "", // Error messages
      kernel: null, // Connected kernel instance
      pythonCode: `from pybeamline.sources import string_test_source
from pybeamline.filters import excludes_activity_filter

string_test_source(["ABC", "ACB", "EFG"]).pipe(
  excludes_activity_filter(["E", "G"])
).subscribe(lambda x: print(str(x)))

`, // Default Python code
    };
  },
  methods: {
    async connectToServer() {
      this.error = "";
      this.output = "";
      try {
        // Create server settings
        const serverSettings = ServerConnection.makeSettings({
          baseUrl: this.serverUrl,
          token: "", // Add a token here if your gateway uses authentication
        });

        // Connect to the kernel manager
        const kernelManager = new KernelManager({ serverSettings });
        this.kernel = await kernelManager.startNew();
        console.log("Connected to kernel:", this.kernel);
      } catch (err) {
        this.error = `Failed to connect to Jupyter Kernel Gateway: ${err.message}`;
      }
    },
    async executeCode() {
      if (!this.kernel) {
        this.error = "Not connected to a kernel.";
        return;
      }
      this.output = ""; // Clear previous output
      this.error = ""; // Clear previous errors
      try {
        // Send code to the kernel
        const future = this.kernel.requestExecute({ code: this.pythonCode });

        // Listen for output messages
        future.onIOPub = (msg) => {
          if (msg.content.text) {
            this.output += msg.content.text + "\n"; // Append the output
          }
        };

        // Wait for execution to complete
        await future.done;
      } catch (err) {
        this.error = `Failed to execute code: ${err.message}`;
      }
    },
  },
};
</script>

<style>
pre {
  background: #f4f4f4;
  padding: 10px;
  border: 1px solid #ccc;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.output {
  white-space: pre-wrap;
  word-wrap: break-word;
  background: #000;
  color: #fff;
}
</style>
