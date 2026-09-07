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
    }
    levels: {
        volunteers: number
        bagCapacity: number
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
        },
        levels: {
            volunteers: 0,
            bagCapacity: 0,
        },
    }
}

// Action Types
export const GameActionKeys = {
    TICK: 'TICK',
    CHANGE_CANS: 'CHANGE_CANS',
    CHANGE_BAGS: 'CHANGE_BAGS',
    CHANGE_MONEY: 'CHANGE_MONEY',
    CHANGE_VOLUNTEERS: 'CHANGE_VOLUNTEERS',
} as const

// Action Payloads
type GameActionPayloads = {
    [GameActionKeys.TICK]: { now: number }
    [GameActionKeys.CHANGE_CANS]: { amount: number }
    [GameActionKeys.CHANGE_BAGS]: { amount: number }
    [GameActionKeys.CHANGE_MONEY]: { amount: number }
    [GameActionKeys.CHANGE_VOLUNTEERS]: { amount: number }
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
        case GameActionKeys.CHANGE_BAGS: {
            return {
                ...state,
                resources: {
                    ...state.resources,
                    bags: Math.max(0, state.resources.bags + payload.amount),
                },
            }
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
        case GameActionKeys.CHANGE_VOLUNTEERS: {
            return {
                ...state,
                levels: {
                    ...state.levels,
                    volunteers: Math.max(0, state.levels.volunteers + payload.amount),
                },
            }
        }
        default:
            return state
    }
}
