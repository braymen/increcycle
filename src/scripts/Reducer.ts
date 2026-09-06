import type { GameState } from "./Saving";

export const GameActionKeys = {
    CHANGE_CANS: "CHANGE_CANS"
} as const

export type GameActionKeys = typeof GameActionKeys[keyof typeof GameActionKeys]

export interface GameActions {
    type: GameActionKeys
    payload: any
}

export const gameStateReducer = (state: GameState, action: GameActions) {
    const { type, payload } = action
    switch(type) {
        case GameActionKeys.CHANGE_CANS: {
            return {
                ...state,
            }
        }
        default:
            return state
    }
}