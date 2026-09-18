import { getLevel } from '../content/levels'
import type { GameState } from './reducer'

export interface GameDerived {
    percentRecyclables: number
    sortAmount: number
    recyclablesWorth: number
    truckDriverCost: number
    organizerCost: number
}

export const calculateDerived = (state: GameState): GameDerived => {
    return {
        percentRecyclables: 0.2,
        sortAmount: 1,
        recyclablesWorth: 1,
        truckDriverCost: Math.pow(getLevel('Truck Driver', state) + 1, 2),
        organizerCost: Math.pow(getLevel('Organizer', state) + 1, 3),
    }
}
