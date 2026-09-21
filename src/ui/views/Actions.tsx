import { useMemo } from 'react'
import { getResource, type ResourceKey } from '../../content/resources'
import Panel from '../components/Panel'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import { hasUnlock } from '../../content/unlocks'
import ProgressActionButton from '../components/ProgressActionButton'
import stealTrashIcon from '../assets/steal-trash.svg'
import siftTrashIcon from '../assets/sift-trash.svg'
import sellRecyclablesIcon from '../assets/sell-recyclables.svg'
import dumpOceanIcon from '../assets/dump-ocean.svg'

function Actions() {
    const dispatch = useGameDispatch()
    const state = useGameState()
    const derived = useGameDerived()
    const unlocks = useMemo(() => {
        return {
            sortAction: hasUnlock('Sort Garbage', state),
            sellRecyclablesAction: hasUnlock('Recyclables', state),
            dumpGarbageAction: hasUnlock('Dump Garbage', state),
        }
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [state.unlocks])

    return (
        <Panel title="Actions">
            <div className="actions">
                <div className="actions-column">
                    <ProgressActionButton
                        text="Steal Garbage From House"
                        icon={stealTrashIcon}
                        callback={() => {
                            if (!hasUnlock('Log', state)) {
                                dispatch({
                                    type: 'UNLOCK',
                                    payload: {
                                        key: 'Log',
                                    },
                                })
                            }
                            dispatch({ type: 'CHANGE_RESOURCE', payload: { key: 'Unsorted Waste', amount: 1 } })
                            dispatch({ type: 'CHANGE_ACTION', payload: { key: 'steal' } })
                        }}
                        disabled={derived.unsortedFull}
                        progressActionKey="steal"
                    />
                </div>
                {unlocks.sortAction && (
                    <div className="actions-column fade-in">
                        <ProgressActionButton
                            text="Sift Through Garbage"
                            icon={siftTrashIcon}
                            disabled={getResource('Unsorted Waste', state) <= 0 || derived.garbageFull || derived.recyclablesFull}
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
                    <div className="actions-column fade-in">
                        <button
                            className="button-yellow"
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
                            <span className="action-button-label">
                                <img className="action-button-icon" src={sellRecyclablesIcon} />
                                Sell Recyclables to Shady Sam
                            </span>
                        </button>
                    </div>
                )}
                {unlocks.dumpGarbageAction && derived.garbageFull && (
                    <div className="actions-column fade-in">
                        <button
                            className="button-blue"
                            disabled={getResource('Garbage', state) <= 0}
                            style={{ width: '100%' }}
                            onClick={() => {
                                const garbageAmount = getResource('Garbage', state)
                                dispatch({
                                    type: 'CHANGE_TRACKER',
                                    payload: { key: 'oceanGarbage', amount: garbageAmount },
                                })
                                dispatch({
                                    type: 'CHANGE_RESOURCE',
                                    payload: { amount: -garbageAmount, key: 'Garbage' },
                                })
                            }}
                        >
                            <span className="action-button-label">
                                <img className="action-button-icon" src={dumpOceanIcon} />
                                Dump Garbage in Ocean
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </Panel>
    )
}

export default Actions
