import { LevelsJSON, type LevelKey } from '../../content/levels'
import { hasUnlock, type UnlockKey } from '../../content/unlocks'
import type { GamePayload } from '../reducer'
import type { GameState } from '../state'

export const changeLevel = (state: GameState, payload: GamePayload<'CHANGE_LEVEL'>): GameState => {
    if (payload.amount === 0) return state
    if (!LevelsJSON.find((l) => l.name === payload.key)) return state
    let newUnlocks: UnlockKey[] = []
    if (
        !hasUnlock('Sorting', state) &&
        (['Garbage Capacity', 'Recyclables Capacity', 'Unsorted Waste Capacity'] as LevelKey[]).includes(payload.key)
    ) {
        newUnlocks.push('Sorting')
    }
    if (!hasUnlock('Logistics', state) && (['Truck Driver', 'Organizer'] as LevelKey[]).includes(payload.key)) {
        newUnlocks.push('Logistics')
    }

    const existingLevel = state.levels.find((l) => l.name === payload.key)
    const levels = existingLevel
        ? state.levels.map((l) => {
              if (l.name !== payload.key) return l
              const assigned = l.assigned === undefined ? undefined : Math.max(0, l.assigned + payload.amount)
              return { ...l, amount: l.amount + payload.amount, assigned }
          })
        : [...state.levels, { name: payload.key, amount: payload.amount }]
    return { ...state, levels, unlocks: [...state.unlocks, ...newUnlocks] }
}
