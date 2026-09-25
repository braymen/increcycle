import { CONFIGS } from '../configs'
import type { GamePayload } from '../reducer'
import type { GameState } from '../state'

export const fastTick = (state: GameState, payload: GamePayload<'FAST_TICK'>): GameState => {
    // Tick Math
    const { now } = payload
    if (state.lastFastTick === 0 || now < state.lastFastTick) return { ...state, lastFastTick: now }

    const ticks = Math.floor((now - state.lastFastTick) / CONFIGS.SYSTEM.FAST_TICK_INTERVAL_MS)
    if (ticks <= 0) return state

    const lastFastTick = state.lastFastTick + ticks * CONFIGS.SYSTEM.FAST_TICK_INTERVAL_MS

    // Action Progress
    if (state.actionProgress.id !== '') {
        state.actionProgress.progress += ticks * 5
        if (state.actionProgress.progress >= 100) {
            state.actionProgress.progress = 0
            const elementId = 'progress-action-key-' + state.actionProgress.id
            const button = document.getElementById(elementId)
            if (button) {
                button.click()
                button.classList.add('pressed')
                setTimeout(() => button.classList.remove('pressed'), 100)
            }
        }
    }

    return { ...state, lastFastTick }
}
