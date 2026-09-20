import { getLevel } from '../content/levels'
import { getResource } from '../content/resources'
import { CONFIGS } from './configs'
import type { GameState } from './reducer'

export interface GameDerived {
    percentRecyclables: number
    sortAmount: number
    recyclablesWorth: number
    truckDriverCost: number
    organizerCost: number
    employeeCosts: number
    garbageCapacity: number
    garbageFull: boolean
    unsortedCapacity: number
    unsortedFull: boolean
}

export const calculateDerived = (state: GameState): GameDerived => {
    return {
        percentRecyclables: 0.3,
        sortAmount: 1,
        recyclablesWorth: 1,
        truckDriverCost: Math.pow(getLevel('Truck Driver', state) + 1, 2),
        organizerCost: Math.pow(getLevel('Organizer', state) + 1, 3),
        employeeCosts: (getLevel('Organizer', state) + getLevel('Truck Driver', state)) * 0.01,
        garbageCapacity: CONFIGS.BALANCE.BASE_GARBAGE_CAPACITY,
        garbageFull: getResource('Garbage', state) >= CONFIGS.BALANCE.BASE_GARBAGE_CAPACITY,
        unsortedCapacity: CONFIGS.BALANCE.BASE_UNSORTED_CAPACITY,
        unsortedFull: getResource('Unsorted Waste', state) >= CONFIGS.BALANCE.BASE_UNSORTED_CAPACITY,
    }
}
