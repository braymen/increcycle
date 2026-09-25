import type { GamePayload } from '../reducer'
import type { GameState } from '../state'

export const changeTracker = (state: GameState, payload: GamePayload<'CHANGE_TRACKER'>): GameState => {
    return {
        ...state,
        trackers: {
            ...state.trackers,
            [payload.key]: state.trackers[payload.key] + payload.amount,
        },
    }
}
