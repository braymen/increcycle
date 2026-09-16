import { useEffect, useState } from 'react'
import '../styles/App.css'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import ShopItem from '../components/ShopItem'
import SocialLinks from '../components/SocialLinks'
import { CONFIGS } from '../../scripts/configs'
import Navbar from './Navbar'
import Resources from './Resources'
import Actions from './Actions'
import Trashmart from './Trashmart'
import Capacities from './Capacities'
import Experiments from './Experiments'
import Settings from './Settings'
import MassBurnSystem from './MassBurnSystem'
import Sorting from './Sorting'
import Logistics from './Logistics'
import Market from './Market'
import Achievements from './Achievements'
import { clearSoundEvents, addSoundEvents } from '../../scripts/sounds'

function App() {
    const state = useGameState()
    const derived = useGameDerived()
    const dispatch = useGameDispatch()
    const [settings, setSettings] = useState(false)

    const showSettings = () => setSettings(!settings)

    useEffect(() => {
        addSoundEvents()
        return () => clearSoundEvents()
    }, [])

    return (
        <div>
            <Navbar showSettings={showSettings} />
            {settings ? (
                <Settings />
            ) : (
                <div className="content-container">
                    <div className="columns">
                        <div className="column">
                            <Resources />
                            <Capacities />
                            <MassBurnSystem />
                        </div>
                        <div className="column">
                            <Actions />
                            <Sorting />
                            <Logistics />
                        </div>
                        <div className="column">
                            <Trashmart />
                            <Experiments />
                            <Market />
                        </div>
                    </div>
                    <Achievements />
                </div>
            )}
        </div>
    )
}

export default App
