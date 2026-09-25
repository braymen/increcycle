import { CONFIGS } from '../configs'
import { getResource, ResourcesJSON } from '../../content/resources'
import { hasUnlock } from '../../content/unlocks'
import type { GamePayload } from '../reducer'
import type { GameState } from '../state'

export const changeResource = (state: GameState, payload: GamePayload<'CHANGE_RESOURCE'>): GameState => {
    if (payload.amount === 0) return state
    if (!ResourcesJSON.find((r) => r.id === payload.key)) return state // Not valid content
    let newUnlocks: string[] = []
    if (!hasUnlock('Resources', state)) newUnlocks.push('Resources')
    const existingResource = state.resources.find((r) => r.id === payload.key)
    if (!hasUnlock(payload.key, state)) newUnlocks.push(payload.key)
    if (
        !hasUnlock('Sort Garbage', state) &&
        getResource('Unsorted Waste', state) >= CONFIGS.UNLOCKS.SORT_GARBAGE_IN_UNSORTED_WASTE - 1
    )
        newUnlocks.push('Sort Garbage')
    const resources = existingResource
        ? state.resources.map((r) => (r.id === payload.key ? { ...r, amount: r.amount + payload.amount } : r))
        : [...state.resources, { id: payload.key as string, amount: payload.amount }]
    return { ...state, resources, unlocks: [...state.unlocks, ...newUnlocks] }
}
