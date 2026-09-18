import type { GameState } from '../scripts/reducer'
import { ResourcesJSON } from './resources'
import type { ResourceKey } from './resources'

interface Unlock {
    name: string
    description?: string
}

const resourceUnlocks: readonly Unlock[] = ResourcesJSON.map((r) => {
    return { name: r.name }
})

const otherUnlocks = [
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
    {
        name: 'Employee Costs',
    },
] as const satisfies readonly Unlock[]

export const UnlocksJSON: readonly Unlock[] = [...resourceUnlocks, ...otherUnlocks]

export type UnlockKey = ResourceKey | (typeof otherUnlocks)[number]['name']

export const hasUnlock = (key: UnlockKey, state: GameState) => {
    return state.unlocks.includes(key)
}
