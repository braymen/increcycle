import { useMemo, useReducer, type ReactNode } from 'react'
import { reducer } from '../../scripts/reducer'
import { calculateDerived } from '../../scripts/formula'
import { load } from '../../scripts/storage'
import { GameDerivedContext, GameDispatchContext, GameStateContext } from './GameContext'

export const GameProvider = ({ children, slot = 1 }: { children: ReactNode; slot?: number }) => {
    const [state, dispatch] = useReducer(reducer, slot, load)
    const derived = useMemo(() => calculateDerived(state), [state])

    return (
        <GameStateContext.Provider value={state}>
            <GameDerivedContext.Provider value={derived}>
                <GameDispatchContext.Provider value={dispatch}>{children}</GameDispatchContext.Provider>
            </GameDerivedContext.Provider>
        </GameStateContext.Provider>
    )
}
