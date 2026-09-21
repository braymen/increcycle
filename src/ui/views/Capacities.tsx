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
        }
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [state.unlocks])

    return (
        <Panel title="Capacities">
            {unlocks.unsortedWaste && (
                <CapacityLine
                    primaryText="Unsorted Waste"
                    amount={getResource('Unsorted Waste', state)}
                    capacity={derived.unsortedCapacity}
                    greenText="Think I should be collecting more waste..."
                    yellowText="Filling up nicely! Hopefully things are being organized..."
                    redText="This is getting out of hand! Why is our waste filling up!"
                />
            )}
            {unlocks.garbage && (
                <CapacityLine
                    primaryText="Garbage"
                    amount={getResource('Garbage', state)}
                    capacity={derived.garbageCapacity}
                    greenText="Glad things are cleaned up around here. No garbage to worry about..."
                    yellowText="The garbage is starting to build up. May need to clean it soon."
                    redText="Way too much garbage! I need to be getting this out of here asap!"
                />
            )}
        </Panel>
    )
}

export default Capacities
