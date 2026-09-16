import type { GameState } from '../scripts/reducer'

interface Resource {
    name: string
    description?: string
}

export const ResourcesJSON: Resource[] = [
    {
        name: 'Bottles',
    },
    {
        name: 'Gas',
    },
    {
        name: 'Unsorted Waste',
        description: 'Most basic form of municiple waste',
    },
    {
        name: 'Garbage',
    },
    {
        name: 'Recyclables',
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
        name: 'Plastic Sheets',
    },
    {
        name: 'Biomass',
    },
    {
        name: 'Ash',
    },
    {
        name: 'Power',
    },
]

export const getResource = (key: string, state: GameState) => {
    return state.resources.find((r) => r.name === key)?.amount || 0
}
