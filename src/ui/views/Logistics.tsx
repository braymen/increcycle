import { useEffect, useMemo } from 'react'
import LevelLine from '../components/LevelLine'
import Panel from '../components/Panel'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import { getLevel } from '../../content/levels'
import { hasUnlock } from '../../content/unlocks'
import { CONFIGS } from '../../scripts/configs'

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
            employeeCosts: hasUnlock('Employee Costs', state),
        }
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [state.unlocks])

    useEffect(() => {
        if (
            !hasUnlock('Employee Costs', state) &&
            getLevel('Truck Driver', state) + getLevel('Organizer', state) >= CONFIGS.UNLOCKS.TOTAL_EMPLOYEES_FOR_COST
        ) {
            dispatch({ type: 'UNLOCK', payload: { key: 'Employee Costs' } })
        }
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [state.levels])

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
                {unlocks.employeeCosts && (
                    <div className="level-line" style={{ paddingTop: '10px', borderTop: '1px solid #ffffff55' }}>
                        <div className="level-line-title">
                            Employee Costs{' '}
                            <span
                                className="help-marker"
                                data-tooltip="Employees are not free... Each employee costs $0.10 a second. If you run out of money, they stop."
                                data-tooltip-align=""
                            >
                                (?)
                            </span>
                        </div>
                        <div className="level-line-button" style={{ color: '#dc9b9b' }}>
                            -${derived.employeeCosts.toFixed(2)}/s
                        </div>
                    </div>
                )}
            </div>
        </Panel>
    )
}

export default Logistics
