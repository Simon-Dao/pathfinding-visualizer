import React from 'react'
import { RecoilRoot } from 'recoil'

import './PathfindingVisualizer.css'
import Table from './Bottom/Table/Table'
import TopBar from './TopBar/TopBar'

function PathfindingVisualizer() {
    return (
        <RecoilRoot>
            <div className='full-screen-div'>
                <TopBar />
                <Table />
            </div>
        </RecoilRoot>
    )
}

export default PathfindingVisualizer