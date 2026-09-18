import type { GameState } from './reducer'

export interface GameDerived {
    percentRecyclables: number
    sortAmount: number
    recyclablesWorth: number
    truckDriverCost: number
}

export const calculateDerived = (state: GameState): GameDerived => {
    return {
        percentRecyclables: 0.2,
        sortAmount: 1,
        recyclablesWorth: 1,
        truckDriverCost: 1,
    }
}
