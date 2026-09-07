import { CONFIGS } from './configs'
import type { GameState } from './reducer'

export interface GameDerived {
    bagCapacity: number
}

export const calculateDerived = (state: GameState): GameDerived => ({
    bagCapacity: CONFIGS.BASE_BAG_CAPACITY + state.levels.bagCapacity,
})
