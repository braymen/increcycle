import type { GameState } from '../scripts/reducer'

interface Resource {
    name: string
    description?: string
}

export const ResourcesJSON: Resource[] = [
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
        name: 'Gas',
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
