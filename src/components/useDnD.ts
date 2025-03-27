import {pointToRendererPoint, useVueFlow} from '@vue-flow/core'
import { ref, watch } from 'vue'
import {createNode} from "./graph/NodeCreator.js"

let id = 0

/**
 * @returns {string} - A unique id.
 */
function getId() {
    return `${id++}`
}

/**
 * In a real world scenario you'd want to avoid creating refs in a global scope like this as they might not be cleaned up properly.
 * @type {{draggedType: Ref<string|null>, isDragOver: Ref<boolean>, isDragging: Ref<boolean>}}
 */
const state = {
    /**
     * The type of the node being dragged.
     */
    draggedType: ref(""),
    draggedClassifier: ref(""),
    isDragOver: ref(false),
    isDragging: ref(false),
}

export default function useDragAndDrop() {
    const { draggedType,draggedClassifier, isDragOver, isDragging } = state

    const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode, viewport } = useVueFlow()

    watch(isDragging, (dragging) => {
        document.body.style.userSelect = dragging ? 'none' : ''
    })

    function onDragStart(event: DragEvent, type: string, classifier: string) {
        if (event.dataTransfer) {
            event.dataTransfer.setData('application/vueflow', type)
            event.dataTransfer.effectAllowed = 'move'
        }

        draggedType.value = type
        draggedClassifier.value = classifier
        isDragging.value = true

        document.addEventListener('drop', onDragEnd)
    }

    /**
     * Handles the drag over event.
     *
     * @param {DragEvent} event
     */
    function onDragOver(event: DragEvent) {
        event.preventDefault()

        if (draggedType.value) {
            isDragOver.value = true

            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move'
            }
        }
    }

    function onDragLeave() {
        isDragOver.value = false
    }

    function onDragEnd() {
        isDragging.value = false
        isDragOver.value = false
        draggedType.value = ""
        document.removeEventListener('drop', onDragEnd)
    }

    /**
     * Handles the drop event.
     *
     * @param {DragEvent} event
     */
    async function onDrop(event: DragEvent) {
        const position = screenToFlowCoordinate({
            x: event.clientX,
            y: event.clientY,
        })

        const nodeId = getId()


        const newNode = await createNode(draggedType.value, nodeId, position)


        /**
         * Align node position after drop, so it's centered to the mouse
         *
         * We can hook into events even in a callback, and we can remove the event listener after it's been called.
         */
        const {off} = onNodesInitialized(() => {
            updateNode(nodeId, (node) => ({
                position: {
                    x: node.position.x - node.dimensions.width / 2,
                    y: node.position.y - node.dimensions.height / 2
                },
            }))

            off()
        })

        addNodes(newNode)
    }

    async function onClickAdd(event: any, name:string) {
        const position = {x:event.originalEvent.clientX , y: event.originalEvent.clientY}
        const canvaPosition = pointToRendererPoint(position, viewport.value)

        const newNode = await createNode(name, getId(), canvaPosition)
        addNodes(newNode)
    }

    return {
        draggedType,
        isDragOver,
        isDragging,
        onDragStart,
        onDragLeave,
        onDragOver,
        onDrop,
        onClickAdd
    }
}
