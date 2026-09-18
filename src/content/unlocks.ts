import type { GameState } from '../scripts/reducer'
import { ResourcesJSON } from './resources'

interface Unlock {
    name: string
    description?: string
}

const resourceUnlocks = ResourcesJSON.map((r) => {
    return { name: r.name }
})

export const UnlocksJSON: Unlock[] = [
    ...resourceUnlocks,
    {
        name: 'Money',
    },
    {
        name: 'Resources',
    },
    {
        name: 'Capacities',
    },
    {
        name: 'Sorting',
    },
    {
        name: 'Logistics',
    },
    {
        name: 'Mass-Burn System',
    },
    {
        name: 'Trashmart',
    },
    {
        name: 'Experiments',
    },
    {
        name: 'Market',
    },
    {
        name: 'Policies',
    },
    {
        name: 'Achievements',
    },
    {
        name: 'Sort Garbage',
    },
    {
        name: 'Organizer',
    },
]

export const hasUnlock = (key: string, state: GameState) => {
    return state.unlocks.includes(key)
}
