import type { GameState } from '../scripts/state'

export interface Resource {
    id: string
    description?: string
}

export const ResourcesJSON = [
    {
        id: 'Unsorted Waste',
        description: 'Municiple trash that needs organizing.',
    },
    {
        id: 'Garbage',
        description: 'Smelly nasty trash. Maybe you can do something with it one day...',
    },
    {
        id: 'Recyclables',
        description: 'Unsorted recyclables that you can sell and make another persons problem.',
    },
    {
        id: 'Paper',
    },
    {
        id: 'Glass',
    },
    {
        id: 'Metal',
    },
    {
        id: 'Plastic',
    },
    {
        id: 'Wood',
    },
    {
        id: 'Biomass',
    },
    {
        id: 'Ash',
    },
    {
        id: 'Clay',
    },
    {
        id: 'Cement',
    },
    {
        id: 'Power',
    },
] as const satisfies readonly Resource[]

export type ResourceKey = (typeof ResourcesJSON)[number]['id']

export const getResource = (key: ResourceKey, state: GameState) => {
    return state.resources.find((r) => r.id === key)?.amount || 0
}

export const RecyclableResourceKeys: ResourceKey[] = ['Recyclables', 'Paper', 'Glass', 'Metal', 'Plastic', 'Wood']

export const getRecyclablesTotal = (state: GameState) => {
    return RecyclableResourceKeys.reduce((total, key) => total + getResource(key, state), 0)
}
