import type { EmployeeKey, LevelKey } from '../content/levels'
import type { ProgressActionKey } from '../ui/components/ProgressActionButton'
import type { AchievementKey } from '../content/achievements'
import type { JournalKey } from '../content/journal'

// Setting up Game State
export interface GameState {
    version: number
    lastTick: number
    lastFastTick: number
    lastSave: number
    money: number
    resources: {
        id: string
        amount: number
    }[]
    levels: {
        name: LevelKey
        amount: number
        assigned?: number
    }[]
    unlocks: string[]
    achievements: AchievementKey[]
    actionProgress: {
        id: ProgressActionKey
        progress: number
    }
    trackers: {
        oceanGarbage: number
    }
    workingEmployees: Record<EmployeeKey, number>
    journal: JournalKey[]
}

export const initialState = (): GameState => {
    return {
        version: 0,
        lastTick: 0,
        lastFastTick: 0,
        lastSave: 0,
        money: 0,
        resources: [],
        levels: [],
        unlocks: [],
        achievements: [],
        actionProgress: {
            id: '',
            progress: 0,
        },
        trackers: {
            oceanGarbage: 0,
        },
        workingEmployees: {
            'Truck Driver': 0,
            Organizer: 0,
        },
        journal: [],
    }
}

// Tracker Typing
export type TrackerKeys = keyof GameState['trackers']
