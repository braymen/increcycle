import { useState } from 'react'
import '../styles/App.css'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import ShopItem from '../components/ShopItem'
import ActionButton from '../components/ActionButton'
import SocialLinks from '../components/SocialLinks'
import { CONFIGS } from '../../scripts/configs'
import Navbar from './Navbar'
import Resources from './Resources'

function App() {
    const state = useGameState()
    const derived = useGameDerived()
    const dispatch = useGameDispatch()

    return (
        <>
            <Navbar />
            <div className="columns">
                <div className="column">
                    <Resources />
                </div>
            </div>
        </>
    )
}

export default App
