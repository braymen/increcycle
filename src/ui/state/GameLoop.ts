import { useEffect, type Dispatch } from 'react'
import { CONFIGS } from '../../scripts/configs'
import { GameActionKeys, type GameActions } from '../../scripts/reducer'

export const GameLoop = (dispatch: Dispatch<GameActions>) => {
    useEffect(() => {
        const tick = () => dispatch({ type: GameActionKeys.TICK, payload: { now: Date.now() } })
        tick()
        const fastTick = () => dispatch({ type: GameActionKeys.FAST_TICK, payload: { now: Date.now() } })
        fastTick()

        const interval = setInterval(tick, CONFIGS.SYSTEM.TICK_INTERVAL_MS)
        const fastTickInterval = setInterval(fastTick, CONFIGS.SYSTEM.FAST_TICK_INTERVAL_MS)

        return () => {
            clearInterval(interval)
            clearInterval(fastTickInterval)
        }
    }, [dispatch])
}
