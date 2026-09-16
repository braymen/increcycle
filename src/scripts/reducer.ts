import { CONFIGS } from './configs'
import { ResourcesJSON } from '../content/resources'
import { LevelsJSON } from '../content/levels'
import { UnlocksJSON } from '../content/unlocks'

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
    switch (type) {
        case GameActionKeys.TICK: {
            // Tick Math
            const { now } = payload
            if (state.lastTick === 0 || now < state.lastTick) return { ...state, lastTick: now }

            const ticks = Math.floor((now - state.lastTick) / CONFIGS.TICK_INTERVAL_MS)
            if (ticks <= 0) return state

            const lastTick = state.lastTick + ticks * CONFIGS.TICK_INTERVAL_MS

            // Actual Game Stuff goes here...

            return { ...state, lastTick }
        }
        case GameActionKeys.CHANGE_MONEY: {
            return {
                ...state,
                money: Math.round(Math.max(0, state.money + payload.amount) * 100) / 100,
            }
        }
        case GameActionKeys.CHANGE_RESOURCE: {
            if (payload.amount === 0) return state
            if (ResourcesJSON.find((r) => r.name !== payload.key)) return state // Not valid content
            const existingResource = state.resources.find((r) => r.name === payload.key)
            if (existingResource) {
                existingResource.amount += payload.amount
            } else {
                state.resources.push({ name: payload.key as string, amount: payload.amount })
            }
            return state
        }
        case GameActionKeys.CHANGE_LEVEL: {
            if (payload.amount === 0) return state
            if (LevelsJSON.find((l) => l.name !== payload.key)) return state
            const existingLevel = state.levels.find((l) => l.name === payload.key)
            if (existingLevel) {
                existingLevel.amount += payload.amount
            } else {
                state.levels.push({ name: payload.key as string, amount: payload.amount })
            }
            return state
        }
        case GameActionKeys.UNLOCK: {
            if (UnlocksJSON.find((u) => u.name !== payload.key)) return state
            if (!state.unlocks.includes(payload.key as string)) return state
            state.unlocks.push(payload.key as string)
            return state
        }
        default:
            return state
    }
}
