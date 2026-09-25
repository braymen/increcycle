import { CONFIGS } from '../configs'
import { getRecyclablesTotal, getResource, type ResourceKey } from '../../content/resources'
import { getAssigned, getLevel } from '../../content/levels'
import { hasUnlock, type UnlockKey } from '../../content/unlocks'
import { hasAchievement, type AchievementKey } from '../../content/achievements'
import { Journal, type JournalKey } from '../../content/journal'
import { calculateDerived } from '../formula'
import type { GamePayload } from '../reducer'
import { initialState, type GameState } from '../state'

export const tick = (state: GameState, payload: GamePayload<'TICK'>): GameState => {
    // Tick Math
    const { now } = payload
    if (state.lastTick === 0 || now < state.lastTick) return { ...state, lastTick: now }

    const ticks = Math.floor((now - state.lastTick) / CONFIGS.SYSTEM.TICK_INTERVAL_MS)
    if (ticks <= 0) return state

    const lastTick = state.lastTick + ticks * CONFIGS.SYSTEM.TICK_INTERVAL_MS

    const derived = calculateDerived(state)

    // Calculate employees
    const newResources = state.resources.map((r) => ({ ...r }))
    const newState: GameState = { ...state, resources: newResources }
    let newMoney = state.money
    const newUnlocks: UnlockKey[] = []

    const addAmount = (key: ResourceKey, amount: number) => {
        const resource = newResources.find((r) => r.id === key)
        if (resource) resource.amount += amount
    }

    const payEmployee = () => {
        if (newMoney < derived.employeeCost) return false
        newMoney = Math.round((newMoney - derived.employeeCost) * 100) / 100
        return true
    }
    const workingEmployees = { ...initialState().workingEmployees }

    for (let i = 0; i < getAssigned('Truck Driver', state); i++) {
        if (getResource('Unsorted Waste', newState) >= derived.unsortedCapacity) break
        if (!payEmployee()) break
        addAmount('Unsorted Waste', 1)
        workingEmployees['Truck Driver']++
    }

    for (let i = 0; i < getAssigned('Organizer', state); i++) {
        if (getResource('Unsorted Waste', newState) <= 0) break
        if (getResource('Garbage', newState) >= derived.garbageCapacity) break
        if (getRecyclablesTotal(newState) >= derived.recyclablesCapacity) break
        if (!payEmployee()) break
        const recyclablesProc = Math.random() < derived.percentRecyclables
        let drop: ResourceKey = 'Garbage'
        if (recyclablesProc) drop = 'Recyclables'
        addAmount(drop, derived.sortAmount)
        addAmount('Unsorted Waste', -1)
        workingEmployees['Organizer']++
    }

    if (!hasUnlock('Capacities', state) && state.money > 0) newUnlocks.push('Capacities')
    const garbageFull = getResource('Garbage', newState) >= derived.garbageCapacity
    if (!hasUnlock('Capacity Upgrades', state) && state.trackers.oceanGarbage > 0) newUnlocks.push('Capacity Upgrades')
    if (!hasUnlock('Dump Garbage', state) && garbageFull) {
        newUnlocks.push('Dump Garbage')
    }

    // Journal Checks
    const currentJournalIndex = state.journal.length
    let newJournal: JournalKey[] = []
    if (currentJournalIndex + 1 <= Journal.length) {
        const unlockNextJournalEntry = Journal[currentJournalIndex].checks.trigger(state)
        if (unlockNextJournalEntry) {
            newJournal.push(Journal[currentJournalIndex].name as JournalKey)
        }
    }

    // Unlock Checks
    if (!hasUnlock('Sell Sam Recyclables', state) && getResource('Recyclables', state) >= 3) {
        newUnlocks.push('Sell Sam Recyclables')
    }

    // Achievement Checks
    const newAchievements: AchievementKey[] = []
    if (!hasAchievement('Truck Drivers I', state) && getLevel('Truck Driver', state) > 5) newAchievements.push('Truck Drivers I')
    if (!hasAchievement('Organizer I', state) && getLevel('Organizer', state) > 5) newAchievements.push('Organizer I')

    return {
        ...state,
        money: newMoney,
        resources: [...newResources],
        unlocks: [...state.unlocks, ...newUnlocks],
        journal: [...state.journal, ...newJournal],
        achievements: [...state.achievements, ...newAchievements],
        workingEmployees,
        lastTick,
    }
}
