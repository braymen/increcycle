import type { GameState } from '../scripts/reducer'

interface Unlock {
    name: string
    description?: string
}

export const UnlocksJSON: Unlock[] = [
    {
        name: 'trashmart',
    },
]

export const hasUnlock = (key: string, state: GameState) => {
    return state.unlocks.includes(key)
}
