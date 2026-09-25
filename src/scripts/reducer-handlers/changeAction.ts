import type { GamePayload } from '../reducer'
import { initialState, type GameState } from '../state'

export const changeAction = (state: GameState, payload: GamePayload<'CHANGE_ACTION'>): GameState => {
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
