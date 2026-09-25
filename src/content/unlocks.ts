import type { GameState } from '../scripts/state'
import { ResourcesJSON } from './resources'
import type { Resource, ResourceKey } from './resources'

interface Unlock {
    id: string
}

const resourceUnlocks: Unlock[] = ResourcesJSON.map((r: Resource) => {
    return { id: r.id }
})

const otherUnlocks = [
    {
        id: 'Money',
    },
    {
        id: 'Resources',
    },
    {
        id: 'Capacities',
    },
    {
        id: 'Sorting',
    },
    {
        id: 'Logistics',
    },
    {
        id: 'Mass-Burn System',
    },
    {
        id: 'Shop',
    },
    {
        id: 'Experiments',
    },
    {
        id: 'Market',
    },
    {
        id: 'Policies',
    },
    {
        id: 'Achievements',
    },
    {
        id: 'Sort Garbage',
    },
    {
        id: 'Organizer',
    },
    {
        id: 'Employee Costs',
    },
    {
        id: 'Dump Garbage',
    },
    {
        id: 'Capacity Upgrades',
    },
    {
        id: 'Sell Sam Recyclables',
    },
    {
        id: 'Journal',
    },
] as const satisfies readonly Unlock[]

export const UnlocksJSON: readonly Unlock[] = [...resourceUnlocks, ...otherUnlocks]

export type UnlockKey = ResourceKey | (typeof otherUnlocks)[number]['id']

export const hasUnlock = (key: UnlockKey, state: GameState) => {
    return state.unlocks.includes(key)
}
