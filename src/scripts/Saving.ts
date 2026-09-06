export interface GameState {
    version: number
    lastTick: number
    lastSave: number
    resources: {
        money: number
        cans: number
        bags: number
    }
    generators: {
        cans: number
    }
}

const initialState = (): GameState => {
    return {
        version: 0,
        lastTick: 0,
        lastSave: 0,
        resources: {
            money: 0,
            cans: 0,
            bags: 0,
        },
        generators: {
            cans: 0,
        },
    }
}

const storageKey = 'save'
const getLocalStorageKey = (slot: number) => {
    return storageKey + '-' + slot
}

const load = (slot: number): GameState => {
    const jsonString = localStorage.getItem(getLocalStorageKey(slot))
    return jsonString ? JSON.parse(jsonString) : initialState()
}

const save = (slot: number, state: GameState) => {
    localStorage.setItem(getLocalStorageKey(slot), JSON.stringify(state))
}

const reset = (slot: number) => {
    localStorage.removeItem(getLocalStorageKey(slot))
}
