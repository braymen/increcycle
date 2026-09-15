interface Resource {
    name: string
    description?: string
}

export const ResourcesJSON: Resource[] = [
    {
        name: 'garbage',
    },
]

export const getResource = (key: string, state: GameState) => {
    return state.unlocks.includes(key)
}
