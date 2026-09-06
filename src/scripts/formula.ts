import type { GameState } from './reducer'

export interface GameDerived {
    bagCapacity: number
}

export const calculateDerived = (state: GameState): GameDerived => ({
    bagCapacity: 5 + state.levels.bagCapacity,
})
