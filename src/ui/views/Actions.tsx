import Panel from '../components/Panel'
import { useGameDispatch } from '../state/GameContext'

function Actions() {
    const dispatch = useGameDispatch()

    return (
        <Panel title="Actions">
            <button onClick={() => dispatch({ type: 'CHANGE_RESOURCE', payload: { key: 'Bottles', amount: 1 } })}>
                Collect Bottles
            </button>
        </Panel>
    )
}

export default Actions
