import { CONFIGS } from './configs'
import { getResource, ResourcesJSON } from '../content/resources'
import { getLevel, LevelsJSON } from '../content/levels'
import { hasUnlock, UnlocksJSON } from '../content/unlocks'
import { calculateDerived } from './formula'

// Setting up Game State
export interface GameState {
    version: number
    lastTick: number
    lastSave: number
    money: number
    resources: {
        name: string
        amount: number
    }[]
    levels: {
        name: string
        amount: number
    }[]
    unlocks: string[]
    achievements: string[]
}

export const initialState = (): GameState => {
    return {
        version: 0,
        lastTick: 0,
        lastSave: 0,
        money: 0,
        resources: [],
        levels: [],
        unlocks: [],
        achievements: ['Unsorted Trash I'],
    }
}

// Action Types
export const GameActionKeys = {
    TICK: 'TICK',
    CHANGE_MONEY: 'CHANGE_MONEY',
    CHANGE_RESOURCE: 'CHANGE_RESOURCE',
    CHANGE_LEVEL: 'CHANGE_LEVEL',
    UNLOCK: 'UNLOCK',
} as const

// Action Payloads
type GameActionPayloads = {
    [GameActionKeys.TICK]: { now: number }
    [GameActionKeys.CHANGE_MONEY]: { amount: number }
    [GameActionKeys.CHANGE_RESOURCE]: { key: string; amount: number }
    [GameActionKeys.CHANGE_LEVEL]: { key: string; amount: number }
    [GameActionKeys.UNLOCK]: { key: string }
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
            const newResources = [...state.resources]
            let newMoney = (state.money / 100) * 100 // rounding fix?
            if (employeeCosts <= newMoney) {
                if (hasUnlock('Employee Costs', state)) newMoney -= employeeCosts
                // Truck Drivers
                const truckDriverLevel = getLevel('Truck Driver', state)
                const garbageCollected = truckDriverLevel
                const garbageResource = newResources.find((r) => r.name === 'Unsorted Waste')
                if (garbageResource) garbageResource.amount += garbageCollected

                // Organizers
                for (let i = 0; i < getLevel('Organizer', state); i++) {
                    const unsortedWaste = newResources.find((r) => r.name === 'Unsorted Waste')
                    if (unsortedWaste && unsortedWaste.amount <= 0) break
                    const recyclablesProc = Math.random() < derived.percentRecyclables
                    let drop = 'Garbage'
                    if (recyclablesProc) drop = 'Recyclables'
                    const dropResource = newResources.find((r) => r.name === drop)
                    if (dropResource) dropResource.amount += derived.sortAmount
                    if (unsortedWaste) unsortedWaste.amount -= 1
                }
            }

            return { ...state, money: newMoney, resources: [...newResources], lastTick }
        }
        case GameActionKeys.CHANGE_MONEY: {
            let newUnlocks: string[] = []
            if (!hasUnlock('Money', state)) newUnlocks = [...newUnlocks, 'Money', 'Logistics']
            if (!hasUnlock('Sorting', state) && state.money + payload.amount >= CONFIGS.UNLOCKS.SORTING_PANEL_IN_MONEY)
                newUnlocks = [...newUnlocks, 'Sorting']
            if (!hasUnlock('Organizer', state) && state.money + payload.amount >= CONFIGS.UNLOCKS.ORGANIZER_LOGISTIC)
                newUnlocks = [...newUnlocks, 'Organizer']
            return {
                ...state,
                money: Math.round(Math.max(0, state.money + payload.amount) * 100) / 100,
                unlocks: [...state.unlocks, ...newUnlocks],
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
            let newUnlocks: string[] = []
            const existingLevel = state.levels.find((l) => l.name === payload.key)
            const levels = existingLevel
                ? state.levels.map((l) => (l.name === payload.key ? { ...l, amount: l.amount + payload.amount } : l))
                : [...state.levels, { name: payload.key as string, amount: payload.amount }]
            return { ...state, levels, unlocks: [...state.unlocks, ...newUnlocks] }
        }
        case GameActionKeys.UNLOCK: {
            if (!UnlocksJSON.find((u) => u.name === payload.key)) return state
            if (state.unlocks.includes(payload.key as string)) return state
            return { ...state, unlocks: [...state.unlocks, payload.key as string] }
        }
        default:
            return state
    }
}
