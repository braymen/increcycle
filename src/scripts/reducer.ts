import { CONFIGS } from './configs'
import { getResource, RecyclableResourceKeys, ResourcesJSON, type ResourceKey } from '../content/resources'
import { EmployeeLevelKeys, getAssigned, getLevel, LevelsJSON, type EmployeeKey, type LevelKey } from '../content/levels'
import { hasUnlock, UnlocksJSON, type UnlockKey } from '../content/unlocks'
import { calculateDerived } from './formula'
import type { ProgressActionKey } from '../ui/components/ProgressActionButton'
import { hasAchievement, type AchievementKey } from '../content/achievements'
import { Journal, type JournalKey } from '../content/journal'

// Setting up Game State
export interface GameState {
    version: number
    lastTick: number
    lastFastTick: number
    lastSave: number
    money: number
    resources: {
        name: string
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
        journal: [],
    }
}

// Tracker Typing
export type TrackerKeys = keyof GameState['trackers']

// Action Types
export const GameActionKeys = {
    TICK: 'TICK',
    FAST_TICK: 'FAST_TICK',
    CHANGE_MONEY: 'CHANGE_MONEY',
    CHANGE_RESOURCE: 'CHANGE_RESOURCE',
    CHANGE_LEVEL: 'CHANGE_LEVEL',
    ASSIGN_EMPLOYEES: 'ASSIGN_EMPLOYEES',
    UNLOCK: 'UNLOCK',
    CHANGE_ACTION: 'CHANGE_ACTION',
    CHANGE_TRACKER: 'CHANGE_TRACKER',
} as const

// Action Payloads
type GameActionPayloads = {
    [GameActionKeys.TICK]: { now: number }
    [GameActionKeys.FAST_TICK]: { now: number }
    [GameActionKeys.CHANGE_MONEY]: { amount: number }
    [GameActionKeys.CHANGE_RESOURCE]: { key: ResourceKey; amount: number }
    [GameActionKeys.CHANGE_LEVEL]: { key: LevelKey; amount: number }
    [GameActionKeys.ASSIGN_EMPLOYEES]: { key: EmployeeKey; amount: number }
    [GameActionKeys.UNLOCK]: { key: UnlockKey }
    [GameActionKeys.CHANGE_ACTION]: { key: ProgressActionKey }
    [GameActionKeys.CHANGE_TRACKER]: { key: TrackerKeys; amount: number }
}

// Action Typing
export type GameActionKeysType = (typeof GameActionKeys)[keyof typeof GameActionKeys]
export type GameActions = {
    [K in GameActionKeysType]: { type: K; payload: GameActionPayloads[K] }
}[GameActionKeysType]

export const reducer = (state: GameState, action: GameActions): GameState => {
    const { type, payload } = action

    const derived = calculateDerived(state)

    switch (type) {
        case GameActionKeys.TICK: {
            // Tick Math
            const { now } = payload
            if (state.lastTick === 0 || now < state.lastTick) return { ...state, lastTick: now }

            const ticks = Math.floor((now - state.lastTick) / CONFIGS.SYSTEM.TICK_INTERVAL_MS)
            if (ticks <= 0) return state

            const lastTick = state.lastTick + ticks * CONFIGS.SYSTEM.TICK_INTERVAL_MS

            // Calculate employees
            const employeeCosts = derived.employeeCosts
            const newResources = state.resources.map((r) => ({ ...r }))
            let newMoney = (state.money / 100) * 100 // rounding fix?
            const newUnlocks: UnlockKey[] = []

            const amountOf = (key: ResourceKey) => newResources.find((r) => r.name === key)?.amount || 0
            const addAmount = (key: ResourceKey, amount: number) => {
                const resource = newResources.find((r) => r.name === key)
                if (resource) resource.amount += amount
            }
            const recyclablesTotal = () => RecyclableResourceKeys.reduce((total, key) => total + amountOf(key), 0)

            if (employeeCosts <= newMoney || !hasUnlock('Employee Costs', state)) {
                if (hasUnlock('Employee Costs', state)) newMoney -= employeeCosts

                // These employees can't function while at capacity (but you lose money)
                const unsortedRoom = Math.max(0, derived.unsortedCapacity - amountOf('Unsorted Waste'))
                addAmount('Unsorted Waste', Math.min(getAssigned('Truck Driver', state), unsortedRoom))

                for (let i = 0; i < getAssigned('Organizer', state); i++) {
                    if (amountOf('Unsorted Waste') <= 0) break
                    if (amountOf('Garbage') >= derived.garbageCapacity) break
                    if (recyclablesTotal() >= derived.recyclablesCapacity) break
                    const recyclablesProc = Math.random() < derived.percentRecyclables
                    let drop: ResourceKey = 'Garbage'
                    if (recyclablesProc) drop = 'Recyclables'
                    addAmount(drop, derived.sortAmount)
                    addAmount('Unsorted Waste', -1)
                }
            }

            if (!hasUnlock('Capacities', state) && state.money > 0) newUnlocks.push('Capacities')
            const garbageFull = amountOf('Garbage') >= derived.garbageCapacity
            if (!hasUnlock('Capacity Upgrades', state) && state.trackers.oceanGarbage > 0) newUnlocks.push('Capacity Upgrades')
            if (!hasUnlock('Dump Garbage', state) && garbageFull) {
                newUnlocks.push('Dump Garbage')
            }

            // Journal Checks
            const currentJournalIndex = state.journal.length
            let newJournal: JournalKey[] = []
            if (currentJournalIndex + 1 <= Journal.length) {
                const unlockNextJournalEntry = Journal[currentJournalIndex].checks.trigger(state)
                if (unlockNextJournalEntry) {
                    newJournal.push(Journal[currentJournalIndex].name as JournalKey)
                }
            }

            // Unlock Checks
            if (!hasUnlock('Sell Sam Recyclables', state) && getResource('Recyclables', state) >= 3) {
                newUnlocks.push('Sell Sam Recyclables')
            }

            // Achievement Checks
            const newAchievements: AchievementKey[] = []
            if (!hasAchievement('Truck Drivers I', state) && getLevel('Truck Driver', state) > 5)
                newAchievements.push('Truck Drivers I')
            if (!hasAchievement('Organizer I', state) && getLevel('Organizer', state) > 5) newAchievements.push('Organizer I')

            return {
                ...state,
                money: newMoney,
                resources: [...newResources],
                unlocks: [...state.unlocks, ...newUnlocks],
                journal: [...state.journal, ...newJournal],
                achievements: [...state.achievements, ...newAchievements],
                lastTick,
            }
        }
        case GameActionKeys.FAST_TICK: {
            // Tick Math
            const { now } = payload
            if (state.lastFastTick === 0 || now < state.lastFastTick) return { ...state, lastFastTick: now }

            const ticks = Math.floor((now - state.lastFastTick) / CONFIGS.SYSTEM.FAST_TICK_INTERVAL_MS)
            if (ticks <= 0) return state

            const lastFastTick = state.lastFastTick + ticks * CONFIGS.SYSTEM.FAST_TICK_INTERVAL_MS

            // Action Progress
            if (state.actionProgress.id !== '') {
                state.actionProgress.progress += ticks * 5
                if (state.actionProgress.progress >= 100) {
                    state.actionProgress.progress = 0
                    const elementId = 'progress-action-key-' + state.actionProgress.id
                    const button = document.getElementById(elementId)
                    if (button) {
                        button.click()
                        button.classList.add('pressed')
                        setTimeout(() => button.classList.remove('pressed'), 100)
                    }
                }
            }

            return { ...state, lastFastTick }
        }
        case GameActionKeys.CHANGE_MONEY: {
            let newUnlocks: UnlockKey[] = []
            let newAchievements: AchievementKey[] = []
            const newMoney = Math.round(Math.max(0, state.money + payload.amount) * 100) / 100
            if (!hasUnlock('Money', state)) newUnlocks = [...newUnlocks, 'Money']
            if (!hasUnlock('Shop', state) && newMoney >= 10) newUnlocks = [...newUnlocks, 'Shop']
            if (!hasUnlock('Organizer', state) && newMoney >= CONFIGS.UNLOCKS.ORGANIZER_LOGISTIC)
                newUnlocks = [...newUnlocks, 'Organizer']

            // Money Achievements and Unlock
            if ((!hasAchievement('Cash I', state) || !hasUnlock('Achievements', state)) && newMoney >= 50) {
                newUnlocks.push('Achievements')
                newAchievements.push('Cash I')
            }
            if (!hasAchievement('Cash II', state) && newMoney >= 250) newAchievements.push('Cash II')
            if (!hasAchievement('Cash III', state) && newMoney >= 1_000) newAchievements.push('Cash III')
            if (!hasAchievement('Cash IV', state) && newMoney >= 10_000) newAchievements.push('Cash IV')
            if (!hasAchievement('Cash V', state) && newMoney >= 100_000) newAchievements.push('Cash V')
            if (!hasAchievement('Cash VI', state) && newMoney >= 1_000_000) newAchievements.push('Cash VI')
            if (!hasAchievement('Cash VII', state) && newMoney >= 1_000_000_000) newAchievements.push('Cash VII')
            if (!hasAchievement('Cash VIII', state) && newMoney >= 1_000_000_000_000) newAchievements.push('Cash VIII')

            return {
                ...state,
                money: newMoney,
                unlocks: [...state.unlocks, ...newUnlocks],
                achievements: [...state.achievements, ...newAchievements],
            }
        }
        case GameActionKeys.CHANGE_RESOURCE: {
            if (payload.amount === 0) return state
            if (!ResourcesJSON.find((r) => r.name === payload.key)) return state // Not valid content
            let newUnlocks: string[] = []
            if (!hasUnlock('Resources', state)) newUnlocks.push('Resources')
            const existingResource = state.resources.find((r) => r.name === payload.key)
            if (!hasUnlock(payload.key, state)) newUnlocks.push(payload.key)
            if (
                !hasUnlock('Sort Garbage', state) &&
                getResource('Unsorted Waste', state) >= CONFIGS.UNLOCKS.SORT_GARBAGE_IN_UNSORTED_WASTE - 1
            )
                newUnlocks.push('Sort Garbage')
            const resources = existingResource
                ? state.resources.map((r) => (r.name === payload.key ? { ...r, amount: r.amount + payload.amount } : r))
                : [...state.resources, { name: payload.key as string, amount: payload.amount }]
            return { ...state, resources, unlocks: [...state.unlocks, ...newUnlocks] }
        }
        case GameActionKeys.CHANGE_LEVEL: {
            if (payload.amount === 0) return state
            if (!LevelsJSON.find((l) => l.name === payload.key)) return state
            let newUnlocks: UnlockKey[] = []
            if (
                !hasUnlock('Sorting', state) &&
                (['Garbage Capacity', 'Recyclables Capacity', 'Unsorted Waste Capacity'] as LevelKey[]).includes(payload.key)
            ) {
                newUnlocks.push('Sorting')
            }
            if (!hasUnlock('Logistics', state) && (['Truck Driver', 'Organizer'] as LevelKey[]).includes(payload.key)) {
                newUnlocks.push('Logistics')
            }

            const existingLevel = state.levels.find((l) => l.name === payload.key)
            const levels = existingLevel
                ? state.levels.map((l) => {
                      if (l.name !== payload.key) return l
                      const assigned = l.assigned === undefined ? undefined : Math.max(0, l.assigned + payload.amount)
                      return { ...l, amount: l.amount + payload.amount, assigned }
                  })
                : [...state.levels, { name: payload.key, amount: payload.amount }]
            return { ...state, levels, unlocks: [...state.unlocks, ...newUnlocks] }
        }
        case GameActionKeys.ASSIGN_EMPLOYEES: {
            if (!(EmployeeLevelKeys as readonly LevelKey[]).includes(payload.key)) return state
            const existingLevel = state.levels.find((l) => l.name === payload.key)
            if (!existingLevel) return state
            const assigned = Math.max(0, Math.min(Math.floor(payload.amount), existingLevel.amount))
            const levels = state.levels.map((l) => (l.name === payload.key ? { ...l, assigned } : l))
            return { ...state, levels }
        }
        case GameActionKeys.UNLOCK: {
            if (!UnlocksJSON.find((u) => u.name === payload.key)) return state
            if (state.unlocks.includes(payload.key as string)) return state
            return { ...state, unlocks: [...state.unlocks, payload.key as string] }
        }
        case GameActionKeys.CHANGE_ACTION: {
            if (payload.key === '') {
                return { ...state, actionProgress: initialState().actionProgress }
            } else {
                return {
                    ...state,
                    actionProgress: {
                        id: payload.key,
                        progress: 0,
                    },
                }
            }
        }
        case GameActionKeys.CHANGE_TRACKER: {
            return {
                ...state,
                trackers: {
                    ...state.trackers,
                    [payload.key]: state.trackers[payload.key] + payload.amount,
                },
            }
        }
        default:
            return state
    }
}
