import type { GameState } from '../scripts/reducer'
import type { UnlockKey } from './unlocks'

interface Achievement {
    name: string
    description?: string
    gridPrimaryName: string
    gridSecondaryName: string
    hiddenUntil?: UnlockKey
}

export const AchievementsJSON = [
    {
        name: 'Cash I',
        description: 'Reach $50',
        gridPrimaryName: 'C',
        gridSecondaryName: 'I',
    },
    {
        name: 'Cash II',
        description: 'Reach $250',
        gridPrimaryName: 'C',
        gridSecondaryName: 'II',
    },
    {
        name: 'Cash III',
        description: 'Reach $1,000',
        gridPrimaryName: 'C',
        gridSecondaryName: 'III',
    },
    {
        name: 'Cash IV',
        description: 'Reach $10,000',
        gridPrimaryName: 'C',
        gridSecondaryName: 'IV',
    },
    {
        name: 'Cash V',
        description: 'Reach $100,000',
        gridPrimaryName: 'C',
        gridSecondaryName: 'V',
    },
    {
        name: 'Cash VI',
        description: 'Reach $1,000,000',
        gridPrimaryName: 'C',
        gridSecondaryName: 'VI',
    },
    {
        name: 'Cash VII',
        description: 'Reach $1,000,000,000',
        gridPrimaryName: 'C',
        gridSecondaryName: 'VII',
    },
    {
        name: 'Cash VIII',
        description: 'Reach $1,000,000,000,000',
        gridPrimaryName: 'C',
        gridSecondaryName: 'VIII',
    },
    {
        name: 'Truck Drivers I',
        description: 'Reach 5 Truck Drivers',
        gridPrimaryName: 'TD',
        gridSecondaryName: 'I',
        hiddenUntil: 'Shop',
    },
    {
        name: 'Organizer I',
        description: 'Reach 5 Organizers',
        gridPrimaryName: 'OG',
        gridSecondaryName: 'I',
        hiddenUntil: 'Shop',
    },
] as const satisfies readonly Achievement[]

export type AchievementKey = (typeof AchievementsJSON)[number]['name']

export const hasAchievement = (key: AchievementKey, state: GameState) => {
    return state.achievements.find((a) => a === key) != null
}

export const getAchievement = (key: AchievementKey) => {
    return AchievementsJSON.find((a) => a.name === key)
}
