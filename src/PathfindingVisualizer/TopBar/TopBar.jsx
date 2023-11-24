import React from 'react'
import './TopBar.css'

function TopBar() {
    return (
        <div>
            <nav className='top-nav'>
                <h3 className='title'>Pathfinding Visualizer</h3>
                <div className=''>Algorithms</div>
                <div className=''>Mazes</div>
            </nav>
            <div className='options-bar'>
                <div className='option'>Start node</div>
                <div className='option'>End node</div>
                <div className='option'>Wall</div>
            </div>
        </div>
    )
}

export default TopBar