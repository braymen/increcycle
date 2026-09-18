import Panel from '../components/Panel'
import { useGameState } from '../state/GameContext'

function Money() {
    const state = useGameState()

    return (
        <Panel title="Bank Account">
            <div style={{ fontSize: '48px' }}>${state.money.toFixed(2)}</div>
        </Panel>
    )
}

export default Money
