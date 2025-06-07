import {Translator} from "@/model/Translator.js";
import {generateCode} from "@/model/codeGenerator.js";
import {useVueFlow} from "@vue-flow/core";



export default function actionPanelFunctions(visible, editor, fileInput){
    const {nodes, edges, setNodes, setEdges }=useVueFlow()

    const translator = new Translator();


    function showCode() {
        editor.value = generateCode(translator.getGuiPipelineFromVue(nodes.value,  edges.value));
        visible.value=true
    }

    function clearDesign() {
        edges.value = [];
        nodes.value = [];
        closeEditor();

    }

    const downloadPythonFile = () => {
        const blob = new Blob([editor.value], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "script.py";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        editor.value=""
    };

    const downloadPipeline = () => {
        const graphData = {
            nodes : nodes.value,
            edges : edges.value
        }
        //pretty prints the json
        const json = JSON.stringify(graphData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob); // Create a URL for the Blob
        a.download = 'pybeamline-design.pdb'; // Set the download file name
        a.click();
    }

    const closeEditor = () => {
        editor.value=""
    }



//acts like the user clicking the hidden input to show file selection
    const triggerFileSelection = () => {
        fileInput.value?.click();
    };

    const handleFileSelection = (event: Event) => {
        const input = event.target as HTMLInputElement;
        let file = input.files?.[0];
        if (file) {

            const reader = new FileReader();

            reader.onload = (e) => {
                const json = e.target?.result as string;

                try {
                    // Parse the JSON string into an object
                    const data = JSON.parse(json);

                    // Assuming the structure of your JSON contains 'nodes' and 'edges'
                    if (data.nodes && data.edges) {
                        // Set the new nodes and edges into VueFlow's state
                        setNodes(data.nodes);
                        setEdges(data.edges);
                        input.value = '';
                    } else {
                        alert('Invalid JSON structure. Expected "nodes" and "edges" properties.');
                    }
                } catch (err) {
                    alert('Error parsing JSON. Please make sure the file is valid.');
                }
            };

            // Read the file as text (this will trigger the onload event)
            reader.readAsText(file);
        }

    };

    return {
        editor,
        showCode,
        clearDesign,
        downloadPythonFile,
        downloadPipeline,
        closeEditor,
        triggerFileSelection,
        handleFileSelection

    }
}