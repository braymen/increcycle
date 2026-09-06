import { useReducer, type ReactNode } from 'react'
import { reducer } from '../../scripts/reducer'
import { load } from '../../scripts/storage'
import { GameDispatchContext, GameStateContext } from './GameContext'

export const GameProvider = ({ children, slot = 1 }: { children: ReactNode; slot?: number }) => {
    const [state, dispatch] = useReducer(reducer, slot, load)
    return (
        <GameStateContext.Provider value={state}>
            <GameDispatchContext.Provider value={dispatch}>{children}</GameDispatchContext.Provider>
        </GameStateContext.Provider>
    )
}
