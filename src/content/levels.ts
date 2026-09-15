interface Level {
    name: string
    description?: string
}

export const LevelsJSON: Level[] = [
    {
        name: 'volunteers',
    },
]

export const getLevel = (key: string, state: GameState) => {
    return state.unlocks.includes(key)
}
