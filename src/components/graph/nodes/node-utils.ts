//Utility functions for node connections
import {Connection, GraphEdge, HandleConnectableFunc} from "@vue-flow/core";



export const hasCommonElement = (arr1: any[], arr2: any[]): boolean => {
    return arr1.some(item => arr2.includes(item));
};


export function isConnectedToAncestors (connection : Connection, edges : GraphEdge[], currNodeId : string) {
    const directAncestorIds = edges.filter(edge => edge.target == currNodeId).map(edges => edges.source);

    if (directAncestorIds.includes(connection.target)) {
        return true;
    } else {
        const boolArr : boolean[] = directAncestorIds.map(nodeId => isConnectedToAncestors(connection,  edges,  nodeId));
        return boolArr.includes(true);
    }
}

export const handleConnectableIn: HandleConnectableFunc = (node, connectedEdges) => {
    let count = 0;
    for (let edge of connectedEdges) {
        if (edge.target === node.id) {
            count++;
        }
    }

    return count < 1;
}



