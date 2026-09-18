import { useMemo } from 'react'
import LevelLine from '../components/LevelLine'
import Panel from '../components/Panel'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import { getLevel } from '../../content/levels'
import { hasUnlock } from '../../content/unlocks'

function Logistics() {
    const state = useGameState()
    const derived = useGameDerived()
    const dispatch = useGameDispatch()
    const levels = useMemo(() => {
        return {
            truckDrivers: getLevel('Truck Driver', state),
            organizers: getLevel('Organizer', state),
        }
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [state.levels])
    const unlocks = useMemo(() => {
        return {
            organizer: hasUnlock('Organizer', state),
        }
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [state.unlocks])

    return (
        <Panel title="Logistics">
            <div className="level-lines-container">
                <LevelLine
                    title={`Truck Driver (Lvl. ${levels.truckDrivers})`}
                    price={derived.truckDriverCost}
                    canAfford={derived.truckDriverCost <= state.money}
                    callback={() => {
                        dispatch({ type: 'CHANGE_LEVEL', payload: { amount: 1, key: 'Truck Driver' } })
                        dispatch({ type: 'CHANGE_MONEY', payload: { amount: -derived.truckDriverCost } })
                    }}
                />
                {unlocks.organizer && (
                    <LevelLine
                        title={`Organizer (Lvl. ${levels.organizers})`}
                        price={derived.organizerCost}
                        canAfford={derived.organizerCost <= state.money}
                        callback={() => {
                            dispatch({ type: 'CHANGE_LEVEL', payload: { amount: 1, key: 'Organizer' } })
                            dispatch({ type: 'CHANGE_MONEY', payload: { amount: -derived.organizerCost } })
                        }}
                    />
                )}
            </div>
        </Panel>
    )
}

export default Logistics
