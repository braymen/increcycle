import { useEffect, type Dispatch } from 'react'
import { CONFIGS } from '../../scripts/configs'
import { GameActionKeys, type GameActions } from '../../scripts/reducer'

export const GameLoop = (dispatch: Dispatch<GameActions>) => {
    useEffect(() => {
        const tick = () => dispatch({ type: GameActionKeys.TICK, payload: { now: Date.now() } })
        tick()

        const interval = setInterval(tick, CONFIGS.TICK_INTERVAL_MS)

        return () => {
            clearInterval(interval)
        }
    }, [dispatch])
}
