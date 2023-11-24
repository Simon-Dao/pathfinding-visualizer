/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './Table.css'
import Node from '../Node/Node'
import { useRecoilState } from 'recoil'
import { calc_button_state, grid_state, nodes_state } from '../../State/Atoms.js'
import { algorithm_option_state } from '../../State/Atoms.js'
import { Djikstras, AStar, getNodesInShortestPathOrder } from '../../Algorithms/SearchAlgorithms.js'

function Table() {

    const [nodes, setNodes] = useRecoilState(nodes_state)
    const [grid_options, setGridOptions] = useRecoilState(grid_state)
    const [algorithm_option, set_algorithm_option] = useRecoilState(algorithm_option_state)
    const [visited, setVisited] = useState([])
    const [path, setPath] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paused, setPaused] = useState(true)
    const [speed, setSpeed] = useState(1000)
    const [calcButton, setCalcButtton] = useRecoilState(calc_button_state)

    const display = (class_name) => {

        if (visited.length > 0 && currentIndex < visited.length) {
            let new_nodes = [...nodes.map(row => [...row])];
            let changed_node = visited[currentIndex];
            let new_node = { ...new_nodes[changed_node.row][changed_node.col] };
            new_node.class = class_name;
            new_nodes[changed_node.row][changed_node.col] = new_node;
            setNodes(new_nodes);
        }
    }

    const displayPath = (path, class_name) => {
        let new_nodes = [...nodes.map(row => [...row])];

        for (let i = 0; i < path.length; i++) {
            let changed_node = path[i];
            let new_node = { ...new_nodes[changed_node.row][changed_node.col] };
            new_node.class = class_name;
            new_nodes[changed_node.row][changed_node.col] = new_node;
        }
        setNodes(new_nodes);
    }

    const clear = (class_name) => {

        let tmp_nodes = [...nodes.map((row) => [...row.map((node) => { return { ...node } })])]

        for (let i = 0; i < tmp_nodes.length; i++) {
            for (let j = 0; j < tmp_nodes[0].length; j++) {
                let node = tmp_nodes[i][j]

                if (node.class === 'visited' || node.class == 'path') {
                    node.class = 'empty'
                }
            }
        }

        setNodes(tmp_nodes)
    }

    const calcPath = () => {

        setCalcButtton(false)

        setCurrentIndex(0)
        clear('')

        let visited_nodes = null

        switch (algorithm_option) {
            case "djikstra":
                visited_nodes = (Djikstras(nodes, grid_options.start_point, grid_options.end_point))
                break
            case "astar":
                visited_nodes = (AStar(nodes, grid_options.start_point, grid_options.end_point))
                break
            default:
                visited_nodes = (Djikstras(nodes, grid_options.start_point, grid_options.end_point))
                break
        }
        if (visited_nodes) {
            setVisited((visited_nodes))
            setPath(getNodesInShortestPathOrder(visited_nodes[visited_nodes.length - 1]))
            console.log(path)
        }
    }

    const next = () => {

        if (visited.length === 0) return
        setCurrentIndex((prevIndex) => prevIndex >= visited.length ? visited.length : prevIndex + 1);
        display('visited')

        if (currentIndex === visited.length) {
            displayPath(path, 'path')
        }
    };

    const prev = () => {

        if (visited.length === 0) return

        setCurrentIndex((prevIndex) =>
            prevIndex <= 0 ? 0 : prevIndex - 1
        );
        if (currentIndex <= visited.length) {
            displayPath(path, 'visited')
        }
        display('empty')

    };

    const pause = () => {
        setPaused((prevPaused) => !prevPaused)
    }

    useEffect(() => {
        let interval

        if (!paused) {
            interval = setInterval(() => {
                next()
                if (currentIndex >= visited.length) {
                    setPaused(true)
                    displayPath(path, 'path')
                }
            }, speed);
        }
        return () => clearInterval(interval)
    }, [paused, visited, currentIndex, speed, next, nodes])

    const onResize = () => {
        let new_grid_options = { ...grid_options }
        console.log(window.innerHeight)
        new_grid_options.grid_width = (window.innerWidth - 100) / nodes.length
        setGridOptions(new_grid_options)
    }

    return (
        <>
            <div className='control-panel'>
                <div style={{ display: 'flex' }}>
                    <button className='btn btn-success' onClick={prev}>prev</button>
                    <button className='btn btn-success' onClick={pause}>{paused ? 'P' : 'R'}</button>
                    <button className='btn btn-success' onClick={next}>next</button>
                    <button className={calcButton ? 'btn btn-danger' : 'btn btn-success'} onClick={calcPath}>calculate</button>
                    {/* <button onClick={() => clear('visited')}>clear visited</button>
                    <button onClick={() => clear('path')}>clear path</button>
                    <button onClick={() => clear('wall')}>clear walls</button> */}
                </div>
                <div style={{ display: 'flex' }}>
                    <h3>Speed: {speed}ms</h3>
                    <input
                        onChange={(event) => { setSpeed(event.target.value) }}
                        type="range" min="10" max="2000" value={speed}
                        className="slider" id="myRange">
                    </input>
                </div>
            </div>
            <div className='grid'
                style=
                {
                    {
                        gridTemplateColumns: `repeat(${grid_options.grid_width},${grid_options.node_size})`
                        , gridTemplateRows: `repeat(${grid_options.grid_height}, ${grid_options.node_size})`
                    }
                } onResize={onResize}>

                {nodes.map((row, row_index) => (
                    <>
                        {row.map((node_obj, col_index) => (
                            <Node calcPath={calcPath} key={node_obj.row + " " + node_obj.col} node_obj={node_obj} nodes={nodes} />
                        ))}
                    </>
                ))}
            </div>
        </>
    )
}

export default Table