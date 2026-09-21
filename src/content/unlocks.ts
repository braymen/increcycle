import type { GameState } from '../scripts/reducer'
import { ResourcesJSON } from './resources'
import type { Resource, ResourceKey } from './resources'

interface Unlock {
    name: string
    description?: string
    logText?: string
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
        logText: 'Going through this garbage... There has to be some recyclables I can make a little money from...',
    },
    {
        name: 'Organizer',
    },
    {
        name: 'Employee Costs',
    },
    {
        name: 'Dump Garbage',
        logText: 'Sadly, there was no other quick solution. Dumping in the ocean is the only way...',
    },
    {
        name: 'Capacity Upgrades',
    },
    {
        name: 'Log',
        logText: "Stealing my first garbage. I don't know what I have come to. But I am sure they don't mind.",
    },
] as const satisfies readonly Unlock[]

export const UnlocksJSON: readonly Unlock[] = [...resourceUnlocks, ...otherUnlocks]

export type UnlockKey = ResourceKey | (typeof otherUnlocks)[number]['name']

export const hasUnlock = (key: UnlockKey, state: GameState) => {
    return state.unlocks.includes(key)
}
