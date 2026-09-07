import { CONFIGS } from './configs'
import type { GameState } from './reducer'

export interface GameDerived {
    bagCapacity: number
    volunterCost: number
    bagCapacityCost: number
    cansPerSecond: number
    bagCost: number
}

export const calculateDerived = (state: GameState): GameDerived => ({
    bagCapacity: CONFIGS.BASE_BAG_CAPACITY + state.levels.bagCapacity,
    volunterCost: 0.1 * Math.pow(state.levels.volunteers + 1, 3),
    bagCapacityCost: 1 * Math.pow(state.levels.bagCapacity + 1, 3),
    cansPerSecond: state.levels.volunteers * CONFIGS.BASE_VOLUNTEER_CANS_PER_SECOND,
    bagCost: CONFIGS.BASE_BAG_BUY_COST + 0.01 * state.levels.bagCapacity,
})
