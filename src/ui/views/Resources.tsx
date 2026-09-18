import { useMemo } from 'react'
import { getResource, ResourcesJSON } from '../../content/resources'
import Panel from '../components/Panel'
import ResourceLine from '../components/ResourceLine'
import { useGameState } from '../state/GameContext'
import { hasUnlock } from '../../content/unlocks'

interface LooseObject {
    [key: string]: any
}

function Resources() {
    const state = useGameState()
    const unlocks = useMemo(() => {
        const u: LooseObject = {}
        const resourceNames = ResourcesJSON.map((r) => r.name)
        for (let i = 0; i < resourceNames.length; i++) {
            u[resourceNames[i]] = hasUnlock(resourceNames[i], state)
        }
        return u
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [state.unlocks])

    return (
        <Panel title="Resources laying around">
            {ResourcesJSON.map((r) => {
                const playerResource = getResource(r.name, state)
                if (!unlocks[r.name]) return
                return (
                    <ResourceLine
                        key={'resourceline-' + r.name}
                        primaryText={r.name}
                        amount={playerResource}
                        ratePerSecond={0}
                        helperText={r.description}
                    />
                )
            })}
        </Panel>
    )
}

export default Resources
