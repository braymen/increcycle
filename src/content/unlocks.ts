import type { GameState } from '../scripts/reducer'

interface Unlock {
    name: string
    description?: string
}

export const UnlocksJSON: Unlock[] = [
    {
        name: 'Resources',
    },
    {
        name: 'Trashmart',
    },
    {
        name: 'Experiments',
    },
    {
        name: 'Sorting',
    },
    {
        name: 'Capacities',
    },
    {
        name: 'Mass-Burn System',
    },
    {
        name: 'Market',
    },
    {
        name: 'Achievements',
    },
]

export const hasUnlock = (key: string, state: GameState) => {
    return state.unlocks.includes(key)
}
