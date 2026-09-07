import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

// Probably should be env variables if I feel like it
const PLAYER_COUNT_URL = 'https://playercount.idleward.com'
const GAME_ID = 'increcycle'

export const PlayerCount = () => {
    const [count, setCount] = useState<number>(0)

    useEffect(() => {
        const socket = io(PLAYER_COUNT_URL, { auth: { gameId: GAME_ID } })

        socket.on('playerCount', (data: { gameId: string; count: number }) => setCount(data.count))

        return () => {
            socket.disconnect()
        }
    }, [])

    return count
}
