import { useMemo } from 'react'
import { getResource, type ResourceKey } from '../../content/resources'
import Panel from '../components/Panel'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import { hasUnlock } from '../../content/unlocks'
import ProgressActionButton from '../components/ProgressActionButton'

function Actions() {
    const dispatch = useGameDispatch()
    const state = useGameState()
    const derived = useGameDerived()
    const unlocks = useMemo(() => {
        return {
            sortAction: hasUnlock('Sort Garbage', state),
            sellRecyclablesAction: hasUnlock('Recyclables', state),
        }
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [state.unlocks])

    return (
        <Panel title="Actions">
            <div className="actions">
                <div className="actions-column">
                    <ProgressActionButton
                        text="Steal Garbage From House"
                        progress={50}
                        callback={() => {
                            dispatch({ type: 'CHANGE_RESOURCE', payload: { key: 'Unsorted Waste', amount: 1 } })
                            dispatch({ type: 'CHANGE_ACTION', payload: { key: 'steal' } })
                        }}
                        disabled={false}
                        progressActionKey="steal"
                    />
                </div>
                {unlocks.sortAction && (
                    <div className="actions-column  fade-in">
                        <ProgressActionButton
                            text="Sift Through Garbage"
                            disabled={getResource('Unsorted Waste', state) <= 0}
                            progress={50}
                            callback={() => {
                                const recyclablesProc = Math.random() < derived.percentRecyclables
                                let drop: ResourceKey = 'Garbage'
                                if (recyclablesProc) drop = 'Recyclables'
                                dispatch({ type: 'CHANGE_RESOURCE', payload: { amount: derived.sortAmount, key: drop } })
                                dispatch({ type: 'CHANGE_RESOURCE', payload: { amount: -1, key: 'Unsorted Waste' } })
                                dispatch({ type: 'CHANGE_ACTION', payload: { key: 'sift' } })
                            }}
                            progressActionKey="sift"
                        />
                    </div>
                )}
                {unlocks.sellRecyclablesAction && (
                    <div className="actions-column  fade-in">
                        <button
                            disabled={getResource('Recyclables', state) <= 0}
                            style={{ width: '100%' }}
                            onClick={() => {
                                dispatch({
                                    type: 'CHANGE_MONEY',
                                    payload: { amount: derived.recyclablesWorth * getResource('Recyclables', state) },
                                })
                                dispatch({
                                    type: 'CHANGE_RESOURCE',
                                    payload: { amount: -getResource('Recyclables', state), key: 'Recyclables' },
                                })
                            }}
                        >
                            Sell Recyclables to Shady Sam
                        </button>
                    </div>
                )}
            </div>
        </Panel>
    )
}

export default Actions
