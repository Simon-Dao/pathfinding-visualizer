import { atom } from "recoil";

let width = 30
let height = 8

function calculateNodeWidth() {
    const totalWidth = window.innerWidth - 100;
    const node_size = totalWidth / width

    return node_size + 'px'
}

let default_grid_state = {
    grid_width: width,
    grid_height: height,
    node_size: calculateNodeWidth(),
    start_point: {
        row: 0,
        col: 0
    },
    end_point: {
        row: 2,
        col: 2
    },
   
}

function generateNodes(width, height) {

    let nodes = []

    for (let i = 0; i < height; i++) {

        let row = []

        for (let j = 0; j < width; j++) {

            let node = {
                row: i,
                col: j,
                class: 'empty'
            }
            row.push(node)
        }
        nodes.push(row);
    }

    let start = default_grid_state.start_point

    let end = default_grid_state.end_point

    nodes[start.row][start.col].class = 'start'
    nodes[end.row][end.col].class = 'end'

    return nodes;
}

export const nodes_state = atom({
    key: 'nodes_state',
    default: generateNodes(default_grid_state.grid_width, default_grid_state.grid_height)
})

export const algorithm_option_state = atom({
    key: 'options_state',
    default: 'djikstra',
})

export const grid_state = atom({
    key: 'grid_state',
    default: default_grid_state
})

export const mouse_dragging_state = atom({
    key: 'mouse_dragging_state',
    default: false
})
export const node_dragged_state = atom({
    key: 'node_dragged_state',
    default: ''
})

export const calc_button_state = atom({
    key: 'calc_button_state',
    default: true
})