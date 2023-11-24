import React, { useState, useEffect } from 'react'
import './Node.css'
import { useRecoilState } from 'recoil'
import { calc_button_state, grid_state, mouse_dragging_state, node_dragged_state } from '../../State/Atoms.js'
import { nodes_state } from '../../State/Atoms.js'
function Node({ node_obj, calcPath }) {

  const [nodes, setNodes] = useRecoilState(nodes_state)
  const [draggingSE, setDragging] = useRecoilState(mouse_dragging_state)
  const [node_dragged, set_node_dragged_state] = useRecoilState(node_dragged_state)
  const [grid_options, set_grid_options] = useRecoilState(grid_state)
  const [calcButton, setCalcButton] = useRecoilState(calc_button_state)


  useEffect(() => {
  }, [draggingSE]);

  const set_node_obj = (new_node) => {
    let new_nodes = [...nodes.map(row => [...row])]
    new_nodes[node_obj.row][node_obj.col] = new_node
    setNodes(new_nodes)
  }

  let onClick = () => {

    if (node_obj.class === 'start' || node_obj.class === 'end') {
      return
    }
    if (node_obj.class === 'empty') {

      let new_node = { ...nodes[node_obj.row][node_obj.col] }
      new_node.class = 'wall'
      set_node_obj(new_node)
    }
  }

  let onRightClick = (event) => {
    event.preventDefault()

    if (node_obj.class === 'wall') {
      let new_node = { ...nodes[node_obj.row][node_obj.col] }
      new_node.class = 'empty'
      set_node_obj(new_node)
    }
  }

  let onMouseDrag = (event) => {

    if (draggingSE) return
    let new_node = { ...nodes[node_obj.row][node_obj.col] }

    if (node_obj.class === 'empty' && event.buttons === 1) {
      new_node.class = 'wall'
    } else
      if (node_obj.class === 'wall' && event.buttons === 2) {
        new_node.class = 'empty'
      }
    set_node_obj(new_node)
  }

  const onMouseDown = (event) => {

    if (event.buttons === 1 && (node_obj.class === 'start' || node_obj.class === 'end')) {
      setDragging(true)
      set_node_dragged_state(node_obj.class)
      let new_node = { ...nodes[node_obj.row][node_obj.col] }
      new_node.class = 'empty'
      set_node_obj(new_node)
      setCalcButton(true)
    }
  }

  const onMouseUp = (event) => {
    if (draggingSE) {
      setDragging(false)
      let new_node = { ...nodes[node_obj.row][node_obj.col] }
      new_node.class = node_dragged
      
      let new_grid_options = {...grid_options}
      let point = {row: node_obj.row, col: node_obj.col}

      if(new_node.class === 'end') {
        new_grid_options.end_point = point
      } else
      if(new_node.class === 'start') {
        new_grid_options.start_point = point
      }
      
      set_grid_options(new_grid_options)
      set_node_obj(new_node)
      setCalcButton(true)
    }
  }

  return (
    //<div onMouseUp={onMouseUp} onMouseDown={onMouseDown} onMouseMove={onMouseDrag} onContextMenu={onRightClick} onClick={onClick} className={`node ${node_obj.class}`}>{node_obj.row + " " + node_obj.col}</div>
    <div onMouseUp={onMouseUp} onMouseDown={onMouseDown} onMouseMove={onMouseDrag} onContextMenu={onRightClick} onClick={onClick} className={`node ${node_obj.class}`}></div>
  )
}

export default Node