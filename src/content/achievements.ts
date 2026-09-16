import type { GameState } from '../scripts/reducer'

interface Achievement {
    name: string
    description?: string
    gridPrimaryName: string
    gridSecondaryName: string
}

export const AchievementsJSON: Achievement[] = [
    {
        name: 'Unsorted Trash I',
        description: 'Gather 100 Unsorted Trash',
        gridPrimaryName: 'UT',
        gridSecondaryName: 'I',
    },
    {
        name: 'Unsorted Trash II',
        description: 'Gather 1,000 Unsorted Trash',
        gridPrimaryName: 'UT',
        gridSecondaryName: 'II',
    },
]

export const hasAchievement = (key: string, state: GameState) => {
    return state.achievements.find((a) => a === key) != null
}

export const getAchievement = (key: string) => {
    return AchievementsJSON.find((a) => a.name === key)
}
