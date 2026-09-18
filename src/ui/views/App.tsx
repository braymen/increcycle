import { useEffect, useMemo, useState } from 'react'
import '../styles/App.css'
import '../styles/HelpMarker.css'
import '../styles/HTML.css'
import '../styles/LevelLine.css'
import '../styles/Panel.css'
import '../styles/ResourceLine.css'
import '../styles/Rotating.css'
import '../styles/SocialLinks.css'
import '../styles/Animations.css'
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
import Money from './Money'
import Policies from './Policies'
import { useGameState } from '../state/GameContext'
import { hasUnlock } from '../../content/unlocks'

function App() {
    const state = useGameState()
    const [settings, setSettings] = useState(false)

    const showSettings = () => setSettings(!settings)

    useEffect(() => {
        addSoundEvents()
        return () => clearSoundEvents()
    }, [])

    const unlocks = useMemo(() => {
        return {
            money: hasUnlock('Money', state),
            resources: hasUnlock('Resources', state),
            capacities: hasUnlock('Capacities', state),
            sorting: hasUnlock('Sorting', state),
            logistics: hasUnlock('Logistics', state),
            massburnsystem: hasUnlock('Mass-Burn System', state),
            trashmart: hasUnlock('Trashmart', state),
            experiments: hasUnlock('Experiments', state),
            market: hasUnlock('Market', state),
            policies: hasUnlock('Policies', state),
            achievments: hasUnlock('Achievements', state),
        }
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [state.unlocks])

    return (
        <div>
            <Navbar showSettings={showSettings} />
            {settings ? (
                <Settings />
            ) : (
                <div className="content-container">
                    <div className="columns">
                        <div className="column">
                            {unlocks.money && <Money />}
                            {unlocks.resources && <Resources />}
                            {unlocks.capacities && <Capacities />}
                        </div>
                        <div className="column">
                            <Actions />
                            {unlocks.logistics && <Logistics />}
                            {unlocks.sorting && <Sorting />}
                            {unlocks.massburnsystem && <MassBurnSystem />}
                        </div>
                        <div className="column">
                            {unlocks.trashmart && <Trashmart />}
                            {unlocks.experiments && <Experiments />}
                            {unlocks.market && <Market />}
                            {unlocks.policies && <Policies />}
                        </div>
                    </div>
                    {unlocks.achievments && <Achievements />}
                </div>
            )}
        </div>
    )
}

export default App
