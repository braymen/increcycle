import { EmployeeLevelKeys, type LevelKey } from '../../content/levels'
import type { GamePayload } from '../reducer'
import type { GameState } from '../state'

export const assignEmployees = (state: GameState, payload: GamePayload<'ASSIGN_EMPLOYEES'>): GameState => {
    if (!(EmployeeLevelKeys as readonly LevelKey[]).includes(payload.key)) return state
    const existingLevel = state.levels.find((l) => l.name === payload.key)
    if (!existingLevel) return state
    const assigned = Math.max(0, Math.min(Math.floor(payload.amount), existingLevel.amount))
    const levels = state.levels.map((l) => (l.name === payload.key ? { ...l, assigned } : l))
    return { ...state, levels }
}
