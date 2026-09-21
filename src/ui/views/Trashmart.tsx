import { useEffect, useMemo } from 'react'
import LevelLine from '../components/LevelLine'
import Panel from '../components/Panel'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import { getLevel } from '../../content/levels'
import { hasUnlock } from '../../content/unlocks'
import { CONFIGS } from '../../scripts/configs'

function Trashmart() {
    const state = useGameState()
    const derived = useGameDerived()
    const dispatch = useGameDispatch()

    const levels = useMemo(() => {
        return {
            truckDrivers: getLevel('Truck Driver', state),
            organizers: getLevel('Organizer', state),
            unsortedWasteCapacity: getLevel('Unsorted Waste Capacity', state),
            garbageCapacity: getLevel('Garbage Capacity', state),
            recyclablesCapacity: getLevel('Recyclables Capacity', state),
        }
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [state.levels])

    const unlocks = useMemo(() => {
        return {
            organizer: hasUnlock('Organizer', state),
            capacityUpgrades: hasUnlock('Capacity Upgrades', state),
            unsortedWaste: hasUnlock('Unsorted Waste', state),
            garbage: hasUnlock('Garbage', state),
            recyclables: hasUnlock('Recyclables', state),
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
        <Panel title="Trashmart">
            <div className="level-lines-container">
                <h3 className="level-lines-category">Logistics Upgrades</h3>
                <LevelLine
                    title={`Truck Driver`}
                    level={levels.truckDrivers}
                    price={derived.truckDriverCost}
                    canAfford={derived.truckDriverCost <= state.money}
                    callback={() => {
                        dispatch({ type: 'CHANGE_LEVEL', payload: { amount: 1, key: 'Truck Driver' } })
                        dispatch({ type: 'CHANGE_MONEY', payload: { amount: -derived.truckDriverCost } })
                    }}
                />
                {unlocks.organizer && (
                    <LevelLine
                        title={`Organizer`}
                        level={levels.organizers}
                        price={derived.organizerCost}
                        canAfford={derived.organizerCost <= state.money}
                        callback={() => {
                            dispatch({ type: 'CHANGE_LEVEL', payload: { amount: 1, key: 'Organizer' } })
                            dispatch({ type: 'CHANGE_MONEY', payload: { amount: -derived.organizerCost } })
                        }}
                    />
                )}
                {unlocks.capacityUpgrades && (
                    <>
                        <h3 className="level-lines-category">Capacities Upgrades</h3>
                        {unlocks.unsortedWaste && (
                            <LevelLine
                                title={`Unsorted Waste Capacity`}
                                level={levels.unsortedWasteCapacity}
                                price={derived.unsortedCapacityCost}
                                canAfford={derived.unsortedCapacityCost <= state.money}
                                callback={() => {
                                    dispatch({
                                        type: 'CHANGE_LEVEL',
                                        payload: { amount: 1, key: 'Unsorted Waste Capacity' },
                                    })
                                    dispatch({ type: 'CHANGE_MONEY', payload: { amount: -derived.unsortedCapacityCost } })
                                }}
                            />
                        )}
                        {unlocks.garbage && (
                            <LevelLine
                                title={`Garbage Capacity`}
                                level={levels.garbageCapacity}
                                price={derived.garbageCapacityCost}
                                canAfford={derived.garbageCapacityCost <= state.money}
                                callback={() => {
                                    dispatch({ type: 'CHANGE_LEVEL', payload: { amount: 1, key: 'Garbage Capacity' } })
                                    dispatch({ type: 'CHANGE_MONEY', payload: { amount: -derived.garbageCapacityCost } })
                                }}
                            />
                        )}
                        {unlocks.recyclables && (
                            <LevelLine
                                title={`Recyclables Capacity`}
                                level={levels.recyclablesCapacity}
                                price={derived.recyclablesCapacityCost}
                                canAfford={derived.recyclablesCapacityCost <= state.money}
                                callback={() => {
                                    dispatch({ type: 'CHANGE_LEVEL', payload: { amount: 1, key: 'Recyclables Capacity' } })
                                    dispatch({
                                        type: 'CHANGE_MONEY',
                                        payload: { amount: -derived.recyclablesCapacityCost },
                                    })
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        </Panel>
    )
}

export default Trashmart
