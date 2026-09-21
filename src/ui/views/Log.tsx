import { UnlocksJSON } from '../../content/unlocks'
import Panel from '../components/Panel'
import { useGameState } from '../state/GameContext'

function Log() {
    const state = useGameState()

    return (
        <Panel title="Log">
            <div>
                {state.unlocks.map((u) => {
                    const uData = UnlocksJSON.find((uj) => uj.name === u)
                    if (!uData?.logText) return
                    return (
                        <p className="fade-in">
                            <span style={{ color: '#f3ebac' }}>[{uData.name}]</span> {uData?.logText}
                        </p>
                    )
                })}
            </div>
        </Panel>
    )
}

export default Log
