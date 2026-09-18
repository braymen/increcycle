import { getLevel } from '../content/levels'
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

export const calculateDerived = (state: GameState): GameDerived => {
    return {
        bagCapacity: CONFIGS.BASE_BAG_CAPACITY + getLevel('bag_capacity', state),
        volunterCost: CONFIGS.BASE_VOLUNTEER_BUY_COST * Math.pow(getLevel('volunteers', state) + 1, 3),
        bagCapacityCost: CONFIGS.BASE_BAG_CAPACITY_COST * Math.pow(getLevel('bag_capacity', state) + 1, 3),
        canPickupCost: CONFIGS.BASE_CAN_PICKUP_COST * Math.pow(getLevel('can_pickup', state) + 1, 3),
        cansPerSecond: getLevel('volunteers', state) * CONFIGS.BASE_VOLUNTEER_CANS_PER_SECOND,
        bagCost: CONFIGS.BASE_BAG_BUY_COST,
        canPickup: 1 + getLevel('can_pickup', state),
        saplingCost: CONFIGS.BASE_SAPLING_COST,
    }
}
