import { CONFIGS } from '../configs'
import { hasUnlock, type UnlockKey } from '../../content/unlocks'
import { hasAchievement, type AchievementKey } from '../../content/achievements'
import type { GamePayload } from '../reducer'
import type { GameState } from '../state'

export const changeMoney = (state: GameState, payload: GamePayload<'CHANGE_MONEY'>): GameState => {
    let newUnlocks: UnlockKey[] = []
    let newAchievements: AchievementKey[] = []
    const newMoney = Math.round(Math.max(0, state.money + payload.amount) * 100) / 100
    if (!hasUnlock('Money', state)) newUnlocks = [...newUnlocks, 'Money']
    if (!hasUnlock('Shop', state) && newMoney >= 10) newUnlocks = [...newUnlocks, 'Shop']
    if (!hasUnlock('Organizer', state) && newMoney >= CONFIGS.UNLOCKS.ORGANIZER_LOGISTIC)
        newUnlocks = [...newUnlocks, 'Organizer']

    // Money Achievements and Unlock
    if ((!hasAchievement('Cash I', state) || !hasUnlock('Achievements', state)) && newMoney >= 50) {
        newUnlocks.push('Achievements')
        newAchievements.push('Cash I')
    }
    if (!hasAchievement('Cash II', state) && newMoney >= 250) newAchievements.push('Cash II')
    if (!hasAchievement('Cash III', state) && newMoney >= 1_000) newAchievements.push('Cash III')
    if (!hasAchievement('Cash IV', state) && newMoney >= 10_000) newAchievements.push('Cash IV')
    if (!hasAchievement('Cash V', state) && newMoney >= 100_000) newAchievements.push('Cash V')
    if (!hasAchievement('Cash VI', state) && newMoney >= 1_000_000) newAchievements.push('Cash VI')
    if (!hasAchievement('Cash VII', state) && newMoney >= 1_000_000_000) newAchievements.push('Cash VII')
    if (!hasAchievement('Cash VIII', state) && newMoney >= 1_000_000_000_000) newAchievements.push('Cash VIII')

    return {
        ...state,
        money: newMoney,
        unlocks: [...state.unlocks, ...newUnlocks],
        achievements: [...state.achievements, ...newAchievements],
    }
}
