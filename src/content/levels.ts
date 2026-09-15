import type { GameState } from '../scripts/reducer'

interface Level {
    name: string
    description?: string
}

export const LevelsJSON: Level[] = [
    {
        name: 'volunteers',
    },
]

export const getLevel = (key: string, state: GameState) => {
    return state.levels.find((l) => l.name === key)?.amount || 0
}
