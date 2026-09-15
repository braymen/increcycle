import type { GameState } from '../scripts/reducer'

interface Resource {
    name: string
    description?: string
}

export const ResourcesJSON: Resource[] = [
    {
        name: 'garbage',
    },
]

export const getResource = (key: string, state: GameState) => {
    return state.resources.find((r) => r.name === key)?.amount || 0
}
