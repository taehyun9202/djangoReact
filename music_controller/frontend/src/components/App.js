import React, { useState } from 'react'
import { render } from 'react-dom'
import HomePage from './HomePage'
export default function App(props) {
    return (
        <div className="center" style={{width:'100wv'}}>
            <HomePage />
        </div>
    )
}

const appDiv = document.getElementById('app')
render(<App name="Music Controller" />, appDiv)