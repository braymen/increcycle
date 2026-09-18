import type { GameState } from '../scripts/reducer'

interface Level {
    name: string
    description?: string
}

export const LevelsJSON = [
    {
        name: 'Truck Driver',
    },
    {
        name: 'Organizer',
    },
] as const satisfies readonly Level[]

export type LevelKey = (typeof LevelsJSON)[number]['name']

export const getLevel = (key: LevelKey, state: GameState) => {
    return state.levels.find((l) => l.name === key)?.amount || 0
}
