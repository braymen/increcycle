import { useMemo } from 'react'
import { getResource } from '../../content/resources'
import CapacityLine from '../components/CapacityLine'
import Panel from '../components/Panel'
import { useGameDerived, useGameState } from '../state/GameContext'
import { hasUnlock } from '../../content/unlocks'

function Capacities() {
    const state = useGameState()
    const derived = useGameDerived()
    const unlocks = useMemo(() => {
        return {
            unsortedWaste: hasUnlock('Unsorted Waste', state),
            garbage: hasUnlock('Garbage', state),
            recyclables: hasUnlock('Recyclables', state),
        }
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [state.unlocks])

    return (
        <Panel title="Landfill Capacities">
            {unlocks.unsortedWaste && (
                <CapacityLine
                    primaryText="Unsorted Waste"
                    amount={getResource('Unsorted Waste', state)}
                    capacity={derived.unsortedCapacity}
                />
            )}
            {unlocks.garbage && (
                <CapacityLine primaryText="Garbage" amount={getResource('Garbage', state)} capacity={derived.garbageCapacity} />
            )}
            {unlocks.recyclables && (
                <CapacityLine
                    primaryText="Recyclables"
                    amount={derived.recyclablesTotal}
                    capacity={derived.recyclablesCapacity}
                />
            )}
        </Panel>
    )
}

export default Capacities
