import { createContext, useContext, type Dispatch } from 'react'
import type { GameActions, GameState } from '../../scripts/reducer'
import type { GameDerived } from '../../scripts/formula'

export const GameStateContext = createContext<GameState | null>(null)
export const GameDerivedContext = createContext<GameDerived | null>(null)
export const GameDispatchContext = createContext<Dispatch<GameActions> | null>(null)

export const useGameState = () => {
    const state = useContext(GameStateContext)
    if (state === null) throw new Error('I just need this dumb check to make sure its not null')
    return state
}

export const useGameDerived = () => {
    const derived = useContext(GameDerivedContext)
    if (derived === null) throw new Error('I just need this dumb check to make sure its not null')
    return derived
}

export const useGameDispatch = () => {
    const dispatch = useContext(GameDispatchContext)
    if (dispatch === null) throw new Error('I just need this dumb check to make sure its not null')
    return dispatch
}
