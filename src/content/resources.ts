import type { GameState } from '../scripts/reducer'

interface Resource {
    name: string
    description?: string
}

export const ResourcesJSON: Resource[] = [
    {
        name: 'Unsorted Waste',
    },
    {
        name: 'Garbage',
    },
    {
        name: 'Recyclables',
    },
    {
        name: 'Trash Bags',
    },
    {
        name: 'Ash',
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
        name: 'Bottles',
    },
    {
        name: 'Plastic',
    },
    {
        name: 'Plastic Sheets',
    },
    {
        name: 'Power',
    },
]

export const getResource = (key: string, state: GameState) => {
    return state.resources.find((r) => r.name === key)?.amount || 0
}
