<template>
	<h1 class="mb-3">MQTT Visualizer</h1>
	
	<v-container class="flex-fill" style="height: 100%;">
		<!-- Top Panel -->
		<div v-if="!connected">
			<v-alert v-if="connection_error" type="error" class="mb-4" dense>
				<strong>Error:</strong>
				{{ connection_error }}
			</v-alert>
			<p>Specify the URL of the MQTT broker and the base topic:</p>
			<v-text-field label="Broker URL" v-model="mqtt_address.broker" outlined placeholder="e.g., wss://broker.emqx.io:8084/mqtt" class="mt-2"></v-text-field>
			<v-text-field label="Base Topic" v-model="mqtt_address.topic" outlined placeholder="e.g., wss://broker.emqx.io:8084/mqtt" class="mt-2"></v-text-field>
			<v-btn color="primary" class="mt-2 mb-10" @click="connectToBroker">Connect</v-btn>
		</div>

		<!-- Main Content -->
		<v-row v-if="connected" style="display: flex; flex-direction: row; height: 100%;">
			<!-- Left Panel: List of Messages -->
			<v-col cols="3" style="display: flex; flex-direction: column;">
				<v-card>
					<v-list density="compact">
						<v-list-subheader>Received messages</v-list-subheader>
						<v-list-item v-for="(message, index) in messages" :key="index" @click="selectMessage(message)"
							:class="{ 'selected-item': selectedMessage === message }">
							<v-list-item-content>
								<v-list-item-title>{{ message.title }}</v-list-item-title>
								<v-list-item-subtitle>{{ message.time }}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card>

				<v-btn color="error" variant="outlined" class="mt-2 mb-10" @click="diconnectFromBroker">Disconnect</v-btn>
			</v-col>

			<!-- Right Panel: Selected Message -->
			<v-col style="display: flex; flex-direction: column;">
				<v-card style="flex: 1; display: flex; flex-direction: column">
					<v-card-title>Message Details</v-card-title>
					<v-card-text v-if="selectedMessage">
						<div><strong>Title:</strong> {{ selectedMessage.title }}</div>
						<div><strong>Time:</strong> {{ selectedMessage.time }}</div>
						
						<div
							v-if="svg_content"
							ref="graphvizContainer"
							style="width: 100%; height: 100%; display: flex; flex: 1;"
							v-html="svg_content"></div>
						<pre v-else><strong>Content:</strong> {{ selectedMessage.content }}</pre>
					</v-card-text>
					<v-card-text style="display: flex; flex: 1;" v-else>
						<em>No message selected</em>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { ref } from 'vue';
import mqtt from 'mqtt';
import { instance } from "@viz-js/viz";

const mqtt_address = ref({
	'broker': 'wss://broker.emqx.io:8084/mqtt',
	'topic': 'pybeamline/output/#'
});
const messages = ref([]);
const svg_content = ref(null);
const selectedMessage = ref(null);
const connected = ref(false);
const connection_error = ref(null);
const client = ref(null);

function connectToBroker() {
	const brokerUrl = mqtt_address.value.broker;
	const topic = mqtt_address.value.topic;

	// Create a new MQTT client
	client.value = mqtt.connect(brokerUrl);

	// Handle connection success
	client.value.on('connect', () => {
		logMessage(`Connected to ${brokerUrl}`);
		client.value.subscribe(topic, (err) => {
			if (!err) {
				connected.value = true;
				connection_error.value = null;
			} else {
				logMessage(`Failed to subscribe to topic: ${topic}`);
				connection_error.value = err;
			}
		});
	});

	// Handle incoming messages
	client.value.on('message', (topic, message) => {
		if (messages.value.length > 10) {
			messages.value.pop();
		}
		messages.value.unshift({
			title: topic,
			time: new Date().toLocaleString(),
			content: message.toString()
		});
	});

	// Handle errors
	client.value.on('error', (err) => {
		connection_error.value = err;
	});

	// Handle disconnection
	client.value.on('close', () => {
		logMessage('Disconnected from broker');
	});
}

function diconnectFromBroker() {
	if (client.value) {
		client.value.end();
		connected.value = false;
	}
}

function logMessage(message) {
	console.log(message);
}

function selectMessage(message) {
	selectedMessage.value = message;

	const dotGraph = message.content;

	instance().then(viz => {
		svg_content.value = viz.renderSVGElement(dotGraph).outerHTML;
	}).catch((err) => {
		console.error(err);
		svg_content.value = null;
	});

// 	if (!viz) {
//     logMessage('Viz instance is not initialized.');
//     return;
//   }

//   try {
//     viz
//       .renderString(dotGraph)
//       .then((svg) => {
//         svg_content.value = svg; // Store the SVG string
//       })
//       .catch((err) => {
//         logMessage('Error rendering Graphviz graph: ' + err);
//       });
//   } catch (err) {
//     logMessage('Error rendering Graphviz graph: ' + err);
//   }
	// try {
	// 	// Use viz.js to render the DOT graph to an SVG
	// 	if (typeof Viz !== 'undefined') {
	// 		const viz = new Viz();
	// 		viz.renderString(dotGraph).then((svg) => {
	// 			svg_content.value = new DOMParser().parseFromString(svg, 'image/svg+xml').documentElement;
	// 			// msgContainer.appendChild(svgElement); // Append the new graph SVG
	// 		}).catch((err) => {
	// 			logMessage('Error rendering Graphviz graph: ' + err);
	// 			// msgContainer.appendChild(document.createTextNode('Error rendering Graphviz graph.'));
	// 		});
	// 	} else {
	// 		logMessage("Viz is not loaded.");
	// 	}
	// } catch (err) {
	// 	logMessage('Error rendering Graphviz graph: ' + err);
	// 	// msgContainer.appendChild(document.createTextNode('Error rendering Graphviz graph.'));
	// }
}

</script>

<style scoped>
.selected-item {
	background-color: #f0f0f0;
}
</style>