import { initialState, type GameState } from './state'

const storageKey = 'save'
export const getLocalStorageKey = (slot: number) => {
    return storageKey + '-' + slot
}

export const load = (slot: number): GameState => {
    const jsonString = localStorage.getItem(getLocalStorageKey(slot))
    if (!jsonString) return initialState()
    const saved: Partial<GameState> = JSON.parse(jsonString)
    const defaults = initialState()
    return {
        ...defaults,
        ...saved,
        actionProgress: { ...defaults.actionProgress, ...saved.actionProgress },
        trackers: { ...defaults.trackers, ...saved.trackers },
        workingEmployees: { ...defaults.workingEmployees, ...saved.workingEmployees },
    }
}

export const save = (slot: number, state: GameState) => {
    localStorage.setItem(getLocalStorageKey(slot), JSON.stringify(state))
}

export const reset = (slot: number) => {
    localStorage.removeItem(getLocalStorageKey(slot))
}
