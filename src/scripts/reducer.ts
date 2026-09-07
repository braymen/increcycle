// Setting up Game State
export interface GameState {
    version: number
    lastTick: number
    lastSave: number
    resources: {
        money: number
        cans: number
        bags: number
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
            money: -1,
            cans: -1,
            bags: 1,
        },
        levels: {
            volunteers: 0,
            bagCapacity: 0,
        },
    }
}

// Action Types
export const GameActionKeys = {
    CHANGE_CANS: 'CHANGE_CANS',
    CHANGE_BAGS: 'CHANGE_BAGS',
    CHANGE_MONEY: 'CHANGE_MONEY',
} as const

// Action Payloads
type GameActionPayloads = {
    [GameActionKeys.CHANGE_CANS]: { amount: number }
    [GameActionKeys.CHANGE_BAGS]: { amount: number }
    [GameActionKeys.CHANGE_MONEY]: { amount: number }
}

// Action Typing
export type GameActionKeysType = (typeof GameActionKeys)[keyof typeof GameActionKeys]
export type GameActions = {
    [K in GameActionKeysType]: { type: K; payload: GameActionPayloads[K] }
}[GameActionKeysType]

// Actual Logic
export const reducer = (state: GameState, action: GameActions): GameState => {
    const { type, payload } = action
    switch (type) {
        case GameActionKeys.CHANGE_CANS: {
            if (state.resources.cans < 0) state.resources.cans = 0 // This is for the scaffolding logic
            return {
                ...state,
                resources: {
                    ...state.resources,
                    cans: Math.max(0, state.resources.cans + payload.amount),
                },
            }
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
            const adjustedMoney = state.resources.money < 0 ? 1 : 0
            return {
                ...state,
                resources: {
                    ...state.resources,
                    money: Math.round(Math.max(0, state.resources.money + payload.amount + adjustedMoney) * 100) / 100,
                },
            }
        }
        default:
            return state
    }
}
