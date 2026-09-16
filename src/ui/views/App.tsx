import { useEffect, useState } from 'react'
import '../styles/App.css'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import ShopItem from '../components/ShopItem'
import ActionButton from '../components/ActionButton'
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

function App() {
    const state = useGameState()
    const derived = useGameDerived()
    const dispatch = useGameDispatch()
    const [settings, setSettings] = useState(false)

    const showSettings = () => setSettings(!settings)

    useEffect(() => {
        const clickSound = (event: PointerEvent) => {
            const isButton = (event.target as HTMLInputElement).nodeName === 'BUTTON'
            if (!isButton) return
            var context = new window.AudioContext()
            var osc = context.createOscillator()
            var gain = context.createGain()
            osc.type = 'triangle'
            osc.frequency.value = 100
            osc.connect(gain)
            gain.connect(context.destination)
            gain.gain.value = 0.2
            osc.start()
            osc.stop(context.currentTime + 0.05)
        }

        document.addEventListener('click', clickSound)

        return () => document.removeEventListener('click', clickSound)
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
