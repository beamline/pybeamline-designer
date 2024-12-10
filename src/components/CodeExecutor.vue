<template>
	<div v-if="kernel" class="float-right">
		<v-btn color="primary" class="mt-4 mr-2" :disabled="currentFuture" @click="executeCode">
			<v-icon icon="mdi-play-speed" />
			Run Code
		</v-btn>
		<v-btn color="error" class="mt-4" @click="stopExecution" :disabled="!currentFuture">
			<v-icon icon="mdi-stop-circle-outline" />
			Stop Execution
		</v-btn>
	</div>
	
	<h1 class="mb-3">Code Execution</h1>
	<v-container>

		<div v-if="!kernel">
			<v-alert v-if="error" type="error" class="mb-4" dense>
				<strong>Error:</strong>
				{{ error }}
			</v-alert>

			<p>Specify the URL of your Jupyter Kernel Gateway to connect to it:</p>
			<v-text-field label="Jupyter Kernel Gateway URL" v-model="serverUrl" outlined
				placeholder="e.g., http://localhost:8888" class="mt-2" :disabled="connecting"></v-text-field>
			<v-btn color="primary" class="mt-2 mb-10" @click="connectToServer">
				Connect
			</v-btn>
			<p>Start your Jupyter Kernel Gateway with:</p>
			<pre class="pa-3"
				style="overflow: auto; background-color: black; color: #0f0;">$ jupyter-kernelgateway --KernelGatewayApp.allow_origin="*" --KernelGatewayApp.auth_token='' --KernelGatewayApp.allow_headers="Content-Type, Authorization, X-XSRFToken"</pre>
		</div>

		<v-row justify="center" v-if="kernel">
			<v-col cols="12">
				<div class="border-thin">
					<codemirror v-model="pythonCode" ref="editor" style="height: 300px;" />
				</div>
			</v-col>
		</v-row>
		<v-row justify="center" v-if="kernel">
			<v-col cols="12">
				<v-card v-if="output">
					<pre class="output">{{ output }}</pre>
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
			connecting: false,
			kernel: null, // Connected kernel instance
			pythonCode: `from pybeamline.sources import string_test_source
from pybeamline.filters import excludes_activity_filter

string_test_source(["ABC", "ACB", "EFG"]).pipe(
  excludes_activity_filter(["E", "G"])
).subscribe(lambda x: print(str(x)))

`, // Default Python code
			kernelManager: null,
			currentFuture: null,
		};
	},
	methods: {
		async connectToServer() {
			this.error = "";
			this.output = "";
			this.connecting = true;
			try {
				const serverSettings = ServerConnection.makeSettings({
					baseUrl: this.serverUrl,
					token: "",
				});

				this.kernelManager = new KernelManager({ serverSettings });
				this.kernel = await this.kernelManager.startNew();
				console.log("Connected to kernel:", this.kernel);
				this.connecting = false;
			} catch (err) {
				this.error = `Failed to connect to Jupyter Kernel Gateway: ${err.message}`;
				this.connecting = false;
			}
		},
		async executeCode() {
			if (!this.kernel) {
				this.error = "Not connected to a kernel.";
				return;
			}
			this.output = "";
			this.error = "";

			try {
				// Initiate code execution
				const future = this.kernel.requestExecute({ code: this.pythonCode });
				this.currentFuture = future; // Track the execution

				// Listen for output
				future.onIOPub = (msg) => {
					if (msg.content.text) {
						this.output += msg.content.text + "\n";
					}
				};

				// Wait for execution to complete
				await future.done;
				this.currentFuture = null; // Clear once done
			} catch (err) {
				this.error = `Failed to execute code: ${err.message}`;
				this.currentFuture = null; // Clear on error
			}
		},
		async stopExecution() {
			if (this.currentFuture) {
				this.currentFuture.dispose(); // Stop execution
				this.currentFuture = null;
				this.kernel = await this.kernelManager.startNew();
				this.error = "Execution stopped by the user.";
			}
		},
	},
};
</script>

<style>
.output {
	white-space: pre-wrap;
	background: #000;
	color: #0f0;
	padding: 15px;
}
</style>
