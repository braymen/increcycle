import { getAssigned, getLevel } from '../content/levels'
import { getRecyclablesTotal, getResource } from '../content/resources'
import { CONFIGS } from './configs'
import type { GameState } from './reducer'

export interface GameDerived {
    percentRecyclables: number
    sortAmount: number
    recyclablesWorth: number
    truckDriverCost: number
    organizerCost: number
    employeeCosts: number
    totalEmployees: number
    garbageCapacity: number
    garbageFull: boolean
    unsortedCapacity: number
    unsortedFull: boolean
    recyclablesCapacity: number
    recyclablesTotal: number
    recyclablesFull: boolean
    unsortedCapacityCost: number
    garbageCapacityCost: number
    recyclablesCapacityCost: number
}

export const calculateDerived = (state: GameState): GameDerived => {
    const garbageCapacity = CONFIGS.BALANCE.BASE_GARBAGE_CAPACITY * (getLevel('Garbage Capacity', state) + 1)
    const unsortedCapacity = CONFIGS.BALANCE.BASE_UNSORTED_CAPACITY * (getLevel('Unsorted Waste Capacity', state) + 1)
    const recyclablesCapacity = CONFIGS.BALANCE.BASE_RECYCLABLES_CAPACITY * (getLevel('Recyclables Capacity', state) + 1)
    const recyclablesTotal = getRecyclablesTotal(state)
    return {
        percentRecyclables: 0.25,
        sortAmount: 1,
        recyclablesWorth: 1,
        truckDriverCost: Math.pow(getLevel('Truck Driver', state) + 1, 2),
        organizerCost: Math.pow(getLevel('Organizer', state) + 1, 3),
        employeeCosts:
            (getAssigned('Organizer', state) + getAssigned('Truck Driver', state)) * CONFIGS.EMPLOYEES.BASE_EMPLOYEE_PAY,
        totalEmployees: getLevel('Organizer', state) + getLevel('Truck Driver', state),
        garbageCapacity,
        garbageFull: getResource('Garbage', state) >= garbageCapacity,
        unsortedCapacity,
        unsortedFull: getResource('Unsorted Waste', state) >= unsortedCapacity,
        recyclablesCapacity,
        recyclablesTotal,
        recyclablesFull: recyclablesTotal >= recyclablesCapacity,
        unsortedCapacityCost: 10 * Math.pow(2, getLevel('Unsorted Waste Capacity', state)),
        garbageCapacityCost: 10 * Math.pow(2, getLevel('Garbage Capacity', state)),
        recyclablesCapacityCost: 10 * Math.pow(2, getLevel('Recyclables Capacity', state)),
    }
}
