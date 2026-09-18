import { getLevel } from '../content/levels'
import type { GameState } from './reducer'

export interface GameDerived {
    percentRecyclables: number
    sortAmount: number
    recyclablesWorth: number
    truckDriverCost: number
    organizerCost: number
    employeeCosts: number
}

export const calculateDerived = (state: GameState): GameDerived => {
    return {
        percentRecyclables: 0.5,
        sortAmount: 1,
        recyclablesWorth: 1,
        truckDriverCost: Math.pow(getLevel('Truck Driver', state) + 1, 2),
        organizerCost: Math.pow(getLevel('Organizer', state) + 1, 3),
        employeeCosts: (getLevel('Organizer', state) + getLevel('Truck Driver', state)) * 0.1,
    }
}
