import { calculateDerived } from '../formula'
import type { GameState } from '../reducer'

export const changeCans = (state: GameState, amount: number): GameState => {
    if (amount === 0) return state
    const cans = Math.max(0, state.resources.cans) // This is for the scaffolding logic
    const impact = Math.max(0, state.resources.impact) // This is for the scaffolding logic

    if (amount < 0) {
        return {
            ...state,
            resources: {
                ...state.resources,
                cans: Math.max(0, cans + amount),
            },
        }
    }

    const { bags, bagStorage } = state.resources
    if (bags <= 0) return state
    const { bagCapacity } = calculateDerived(state)
    const openSpace = bags * bagCapacity - bagStorage
    const addedCans = Math.min(openSpace, amount)
    if (addedCans <= 0) return state
    const filled = bagStorage + addedCans

    return {
        ...state,
        resources: {
            ...state.resources,
            cans: cans + addedCans,
            bags: bags - Math.floor(filled / bagCapacity),
            bagStorage: filled % bagCapacity,
            impact: addedCans > 0 ? impact + addedCans * 0.01 : impact,
        },
    }
}
