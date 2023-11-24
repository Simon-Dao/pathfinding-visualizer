function deepCopy(nodes) {

    let res = []

    for (let i = 0; i < nodes.length; i++) {

        let row = []

        for (let j = 0; j < nodes[0].length; j++) {

            row.push({...nodes[i][j], distance: Infinity, previousNode: null, visited:nodes[i][j].class==='visited',  wall:nodes[i][j].class==='wall' })
        }
        res.push(row);
    }
    console.log(res[0][1])
    return res
}

export function Djikstras(nodes, start_node_initial, end_node_initial) {

    let visited_nodes_in_order = []
    let grid = deepCopy(nodes);
    let start_node = { ...grid[start_node_initial.row][start_node_initial.col], distance: 0, previousNode: null, visited:start_node_initial.class==='visited',  wall:start_node_initial.class==='wall'}
    grid[start_node_initial.row][start_node_initial.col] = start_node

    let unvisited_nodes = getAllNodes(grid);

    while (!!unvisited_nodes.length) {
        sortNodesByDistance(unvisited_nodes)
        let closest_node = unvisited_nodes.shift()
        if (closest_node.wall) continue

        if (closest_node.distance === Infinity) return visited_nodes_in_order

        closest_node.visited = true
        if(closest_node.class !== 'end' && closest_node.class !== 'start')
            visited_nodes_in_order.push(closest_node)

        if (closest_node.row === end_node_initial.row && closest_node.col === end_node_initial.col) {
            return visited_nodes_in_order
        }
        updateUnvisitedNeighbors(closest_node, grid)
    }
}

function updateUnvisitedNeighbors(closest_node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(closest_node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = closest_node.distance + 1;
        neighbor.previousNode = closest_node;
    }
}

function getUnvisitedNeighbors(closest_node, grid) {

    const neighbors = [];
    const { col, row } = closest_node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.visited);
}

function sortNodesByDistance(unvisited_nodes) {
    unvisited_nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getAllNodes(grid) {
    let nodes = []
    for (let row of grid) {
        for (let col of row) {
            nodes.push(col)
        }
    }
    return nodes
}

export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null && currentNode.class !== 'start') {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    if(nodesInShortestPathOrder[0].class !== 'end') {
        return []
    }

    return nodesInShortestPathOrder;
}

export function AStar(nodes, start_node, end_node) {
    return []
}