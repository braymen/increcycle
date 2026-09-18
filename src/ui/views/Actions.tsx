import { getResource } from '../../content/resources'
import Panel from '../components/Panel'
import { useGameDispatch, useGameState } from '../state/GameContext'

function Actions() {
    const dispatch = useGameDispatch()
    const state = useGameState()

    return (
        <Panel title="Actions">
            <div className="actions">
                <div className="actions-column">
                    <button
                        style={{ width: '100%' }}
                        onClick={() => dispatch({ type: 'CHANGE_RESOURCE', payload: { key: 'Unsorted Waste', amount: 1 } })}
                    >
                        Collect Garbage
                    </button>
                </div>
                <div className="actions-column">
                    <button
                        style={{ width: '100%' }}
                        onClick={() => {
                            dispatch({ type: 'CHANGE_MONEY', payload: { amount: 0.05 * getResource('Bottles', state) } })
                            dispatch({
                                type: 'CHANGE_RESOURCE',
                                payload: { key: 'Bottles', amount: -getResource('Bottles', state) },
                            })
                        }}
                    >
                        Sort Garbage
                    </button>
                </div>
            </div>
        </Panel>
    )
}

export default Actions
