import type { GameState } from '../scripts/reducer'
import { ResourcesJSON } from './resources'
import type { Resource, ResourceKey } from './resources'

interface Unlock {
    name: string
    description?: string
}

const resourceUnlocks: Unlock[] = ResourcesJSON.map((r: Resource) => {
    return { name: r.name, logText: r.logText }
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
        name: 'Shop',
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
    {
        name: 'Dump Garbage',
    },
    {
        name: 'Capacity Upgrades',
    },
    {
        name: 'Sell Sam Recyclables',
    },
    {
        name: 'Log',
    },
] as const satisfies readonly Unlock[]

export const UnlocksJSON: readonly Unlock[] = [...resourceUnlocks, ...otherUnlocks]

export type UnlockKey = ResourceKey | (typeof otherUnlocks)[number]['name']

export const hasUnlock = (key: UnlockKey, state: GameState) => {
    return state.unlocks.includes(key)
}
