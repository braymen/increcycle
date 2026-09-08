import { CONFIGS } from './configs'
import { calculateDerived } from './formula'
import { changeCans } from './reducer-actions/change-cans'

// Setting up Game State
export interface GameState {
    version: number
    lastTick: number
    lastSave: number
    resources: {
        money: number
        cans: number
        bags: number
        bagStorage: number
        saplings: number
        trees: number
        gaiaFavor: number
    }
    levels: {
        volunteers: number
        bagCapacity: number
        canPickup: number
    }
}

export const initialState = (): GameState => {
    return {
        version: 0,
        lastTick: 0,
        lastSave: 0,
        resources: {
            money: 0,
            cans: -1,
            bags: 1,
            bagStorage: 0,
            saplings: -1,
            trees: -1,
            gaiaFavor: -1,
        },
        levels: {
            volunteers: 0,
            bagCapacity: 0,
            canPickup: 0,
        },
    }
}

export type ResourceKeys = Exclude<keyof GameState['resources'], 'money' | 'cans'>
export type LevelKeys = keyof GameState['levels']

// Action Types
export const GameActionKeys = {
    TICK: 'TICK',
    CHANGE_CANS: 'CHANGE_CANS',
    CHANGE_MONEY: 'CHANGE_MONEY',
    CHANGE_RESOURCE: 'CHANGE_RESOURCE',
    CHANGE_LEVEL: 'CHANGE_LEVEL',
} as const

// Action Payloads
type GameActionPayloads = {
    [GameActionKeys.TICK]: { now: number }
    [GameActionKeys.CHANGE_CANS]: { amount: number }
    [GameActionKeys.CHANGE_MONEY]: { amount: number }
    [GameActionKeys.CHANGE_RESOURCE]: { key: ResourceKeys; amount: number }
    [GameActionKeys.CHANGE_LEVEL]: { key: LevelKeys; amount: number }
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

            // Actual Game Stuff
            const { cansPerSecond } = calculateDerived(state)
            const collected = cansPerSecond * ((ticks * CONFIGS.TICK_INTERVAL_MS) / 1000)

            return { ...changeCans(state, collected), lastTick }
        }
        case GameActionKeys.CHANGE_CANS: {
            return changeCans(state, payload.amount)
        }
        case GameActionKeys.CHANGE_MONEY: {
            return {
                ...state,
                resources: {
                    ...state.resources,
                    money: Math.round(Math.max(0, state.resources.money + payload.amount) * 100) / 100,
                },
            }
        }
        case GameActionKeys.CHANGE_RESOURCE: {
            if (payload.amount === 0) return state
            const base = Math.max(0, state.resources[payload.key]) // This is for the scaffolding logic

            return {
                ...state,
                resources: {
                    ...state.resources,
                    [payload.key]: Math.max(0, base + payload.amount),
                },
            }
        }
        case GameActionKeys.CHANGE_LEVEL: {
            return {
                ...state,
                levels: {
                    ...state.levels,
                    [payload.key]: Math.max(0, state.levels[payload.key] + payload.amount),
                },
            }
        }
        default:
            return state
    }
}
