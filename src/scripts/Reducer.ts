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
    generators: {
        cans: number
    }
}

export const initialState = (): GameState => {
    return {
        version: 0,
        lastTick: 0,
        lastSave: 0,
        resources: {
            money: 0,
            cans: 0,
            bags: 0,
        },
        generators: {
            cans: 0,
        },
    }
}

// Action Types
export const GameActionKeys = {
    CHANGE_CANS: 'CHANGE_CANS',
} as const

// Action Payloads
type GameActionPayloads = {
    [GameActionKeys.CHANGE_CANS]: { amount: number }
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
            return {
                ...state,
                resources: {
                    ...state.resources,
                    cans: Math.max(0, state.resources.cans + payload.amount),
                },
            }
        }
        default:
            return state
    }
}
