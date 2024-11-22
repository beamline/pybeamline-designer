<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5">Python Code Executor via Jupyter Kernel Gateway</v-card-title>
          <v-card-text>
            <p>Start your jupyter server with</p>
            <pre>$ jupyter-kernelgateway --KernelGatewayApp.allow_origin="*" --KernelGatewayApp.auth_token='' --KernelGatewayApp.allow_headers="Content-Type, Authorization, X-XSRFToken"</pre>
            <v-text-field
              v-if="!kernel"
              label="Jupyter Server URL"
              v-model="serverUrl"
              outlined
              placeholder="e.g., http://localhost:8888"
              class="mt-2"
            ></v-text-field>
            <v-btn
              v-if="!kernel"
              color="primary"
              class="mt-2"
              @click="connectToServer">
              Connect to Jupyter Kernel Gateway
            </v-btn>
            <codemirror v-if="kernel" v-model="pythonCode" style="height: 300px;" />
            <v-btn color="primary" class="mt-4" @click="executeCode" v-if="kernel">
              Run Code
            </v-btn>
            <v-alert v-if="output" type="info" class="mt-4" dense>
              <strong>Output:</strong>
              <pre class="output">{{ output }}</pre>
            </v-alert>
            <v-alert v-if="error" type="error" class="mt-4" dense>
              <strong>Error:</strong>
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
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
      pythonCode: `a = 1
b = 2
print(a + b * 3)`, // Default Python code
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
