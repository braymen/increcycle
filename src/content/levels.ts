import type { GameState } from '../scripts/state'

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
    {
        name: 'Unsorted Waste Capacity',
    },
    {
        name: 'Garbage Capacity',
    },
    {
        name: 'Recyclables Capacity',
    },
] as const satisfies readonly Level[]

export type LevelKey = (typeof LevelsJSON)[number]['name']

export const getLevel = (key: LevelKey, state: GameState) => {
    return state.levels.find((l) => l.name === key)?.amount || 0
}

export const EmployeeLevelKeys = ['Truck Driver', 'Organizer'] as const satisfies readonly LevelKey[]
export type EmployeeKey = (typeof EmployeeLevelKeys)[number]

export const getAssigned = (key: EmployeeKey, state: GameState) => {
    const level = state.levels.find((l) => l.name === key)
    if (!level) return 0
    return Math.max(0, Math.min(level.assigned ?? level.amount, level.amount))
}
