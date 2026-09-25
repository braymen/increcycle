import { UnlocksJSON } from '../../content/unlocks'
import type { GamePayload } from '../reducer'
import type { GameState } from '../state'

export const unlock = (state: GameState, payload: GamePayload<'UNLOCK'>): GameState => {
    if (!UnlocksJSON.find((u) => u.id === payload.key)) return state
    if (state.unlocks.includes(payload.key as string)) return state
    return { ...state, unlocks: [...state.unlocks, payload.key as string] }
}
