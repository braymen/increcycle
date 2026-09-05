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

const loadLocalStorage = (slot: number): GameState | null => {
    return localStorage.getItem(getLocalStorageKey(slot))
}

const saveLocalStorage = (slot: number, state: GameState) => {}

const resetLocalStorage = (slot: number) => {
    localStorage.removeItem(getLocalStorageKey(slot))
}

const loadGame = (slot: number): GameState => {
    return loadLocalStorage(slot) || initialState()
}
