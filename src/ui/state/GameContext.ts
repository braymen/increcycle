import { createContext, useContext, type Dispatch } from 'react'
import type { GameActions, GameState } from '../../scripts/reducer'

export const GameStateContext = createContext<GameState | null>(null)
export const GameDispatchContext = createContext<Dispatch<GameActions> | null>(null)

export const useGameState = () => {
    const state = useContext(GameStateContext)
    return state
}

export const useGameDispatch = () => {
    const dispatch = useContext(GameDispatchContext)
    return dispatch
}
