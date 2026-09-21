import type { GameState } from '../scripts/reducer'

export interface Resource {
    name: string
    description?: string
}

export const ResourcesJSON = [
    {
        name: 'Unsorted Waste',
        description: 'Municiple trash that needs organizing.',
    },
    {
        name: 'Garbage',
        description: 'Smelly nasty trash. Maybe you can do something with it one day...',
    },
    {
        name: 'Recyclables',
        description: 'Unsorted recyclables that you can sell and make another persons problem.',
    },
    {
        name: 'Paper',
    },
    {
        name: 'Glass',
    },
    {
        name: 'Metal',
    },
    {
        name: 'Plastic',
    },
    {
        name: 'Wood',
    },
    {
        name: 'Biomass',
    },
    {
        name: 'Ash',
    },
    {
        name: 'Clay',
    },
    {
        name: 'Cement',
    },
    {
        name: 'Power',
    },
] as const satisfies readonly Resource[]

export type ResourceKey = (typeof ResourcesJSON)[number]['name']

export const getResource = (key: ResourceKey, state: GameState) => {
    return state.resources.find((r) => r.name === key)?.amount || 0
}

export const RecyclableResourceKeys: readonly ResourceKey[] = ['Recyclables', 'Paper', 'Glass', 'Metal', 'Plastic', 'Wood']

export const getRecyclablesTotal = (state: GameState) => {
    return RecyclableResourceKeys.reduce((total, key) => total + getResource(key, state), 0)
}
