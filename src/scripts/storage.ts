import { initialState, type GameState } from './reducer'

const storageKey = 'save'
export const getLocalStorageKey = (slot: number) => {
    return storageKey + '-' + slot
}

export const load = (slot: number): GameState => {
    const jsonString = localStorage.getItem(getLocalStorageKey(slot))
    return jsonString ? JSON.parse(jsonString) : initialState()
}

export const save = (slot: number, state: GameState) => {
    localStorage.setItem(getLocalStorageKey(slot), JSON.stringify(state))
}

export const reset = (slot: number) => {
    localStorage.removeItem(getLocalStorageKey(slot))
}
