import { CONFIGS } from './configs'
import type { GameState } from './reducer'

export interface GameDerived {
    bagCapacity: number
    volunterCost: number
    bagCapacityCost: number
    canPickupCost: number
    cansPerSecond: number
    bagCost: number
    canPickup: number
    saplingCost: number
}

export const calculateDerived = (state: GameState): GameDerived => ({
    bagCapacity: CONFIGS.BASE_BAG_CAPACITY + state.levels.bagCapacity,
    volunterCost: CONFIGS.BASE_VOLUNTEER_BUY_COST * Math.pow(state.levels.volunteers + 1, 3),
    bagCapacityCost: CONFIGS.BASE_BAG_CAPACITY_COST * Math.pow(state.levels.bagCapacity + 1, 3),
    canPickupCost: CONFIGS.BASE_CAN_PICKUP_COST * Math.pow(state.levels.bagCapacity + 1, 3),
    cansPerSecond: state.levels.volunteers * CONFIGS.BASE_VOLUNTEER_CANS_PER_SECOND,
    bagCost: CONFIGS.BASE_BAG_BUY_COST,
    canPickup: 1 + state.levels.canPickup,
    saplingCost: CONFIGS.BASE_SAPLING_COST,
})
