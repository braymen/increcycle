import { useEffect, useMemo, useState } from 'react'
import { getResource, ResourcesJSON } from '../../content/resources'
import type { Resource } from '../../content/resources'
import Panel from '../components/Panel'
import ResourceLine from '../components/ResourceLine'
import { useGameState } from '../state/GameContext'
import { hasUnlock } from '../../content/unlocks'
import type { GameState } from '../../scripts/reducer'

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

    const buildResources = (state: GameState) => {
        const build: LooseObject = {}
        for (let i = 0; i < ResourcesJSON.length; i++) {
            const resource = ResourcesJSON[i]
            build[resource.name] = getResource(resource.name, state)
        }
        return build
    }
    const buildRates = (prev: LooseObject, current: LooseObject) => {
        const build: LooseObject = {}
        for (let i = 0; i < ResourcesJSON.length; i++) {
            const resource = ResourcesJSON[i]
            build[resource.name] = current[resource.name] - prev[resource.name]
        }
        return build
    }

    const [prevResources, setPrevResources] = useState<LooseObject>(buildResources(state))
    const [currentResources, setCurrentResources] = useState<LooseObject>(buildResources(state))
    const [resourceRates, setResourceRates] = useState<LooseObject>(buildRates(prevResources, currentResources))

    // Calculating the resource rates
    useEffect(() => {
        setPrevResources(currentResources)
        setCurrentResources(buildResources(state))
        setResourceRates(buildRates(prevResources, currentResources))
        // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [state.lastTick])

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
                        ratePerSecond={resourceRates[r.name]}
                        helperText={(r as Resource).description}
                    />
                )
            })}
        </Panel>
    )
}

export default Resources
