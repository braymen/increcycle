import type { ResourceKey } from '../content/resources'
import type { EmployeeKey, LevelKey } from '../content/levels'
import type { UnlockKey } from '../content/unlocks'
import type { ProgressActionKey } from '../ui/components/ProgressActionButton'
import type { GameState, TrackerKeys } from './state'
import { tick } from './reducer-handlers/tick'
import { fastTick } from './reducer-handlers/fastTick'
import { changeMoney } from './reducer-handlers/changeMoney'
import { changeResource } from './reducer-handlers/changeResource'
import { changeLevel } from './reducer-handlers/changeLevel'
import { assignEmployees } from './reducer-handlers/assignEmployees'
import { unlock } from './reducer-handlers/unlock'
import { changeAction } from './reducer-handlers/changeAction'
import { changeTracker } from './reducer-handlers/changeTracker'

// Action Types
export const GameActionKeys = {
    TICK: 'TICK',
    FAST_TICK: 'FAST_TICK',
    CHANGE_MONEY: 'CHANGE_MONEY',
    CHANGE_RESOURCE: 'CHANGE_RESOURCE',
    CHANGE_LEVEL: 'CHANGE_LEVEL',
    ASSIGN_EMPLOYEES: 'ASSIGN_EMPLOYEES',
    UNLOCK: 'UNLOCK',
    CHANGE_ACTION: 'CHANGE_ACTION',
    CHANGE_TRACKER: 'CHANGE_TRACKER',
} as const

// Action Payloads
type GameActionPayloads = {
    [GameActionKeys.TICK]: { now: number }
    [GameActionKeys.FAST_TICK]: { now: number }
    [GameActionKeys.CHANGE_MONEY]: { amount: number }
    [GameActionKeys.CHANGE_RESOURCE]: { key: ResourceKey; amount: number }
    [GameActionKeys.CHANGE_LEVEL]: { key: LevelKey; amount: number }
    [GameActionKeys.ASSIGN_EMPLOYEES]: { key: EmployeeKey; amount: number }
    [GameActionKeys.UNLOCK]: { key: UnlockKey }
    [GameActionKeys.CHANGE_ACTION]: { key: ProgressActionKey }
    [GameActionKeys.CHANGE_TRACKER]: { key: TrackerKeys; amount: number }
}

// Action Typing
export type GameActionKeysType = (typeof GameActionKeys)[keyof typeof GameActionKeys]
export type GamePayload<K extends GameActionKeysType> = GameActionPayloads[K]
export type GameActions = {
    [K in GameActionKeysType]: { type: K; payload: GameActionPayloads[K] }
}[GameActionKeysType]

export const reducer = (state: GameState, action: GameActions): GameState => {
    const { type, payload } = action

    switch (type) {
        case GameActionKeys.TICK:
            return tick(state, payload)
        case GameActionKeys.FAST_TICK:
            return fastTick(state, payload)
        case GameActionKeys.CHANGE_MONEY:
            return changeMoney(state, payload)
        case GameActionKeys.CHANGE_RESOURCE:
            return changeResource(state, payload)
        case GameActionKeys.CHANGE_LEVEL:
            return changeLevel(state, payload)
        case GameActionKeys.ASSIGN_EMPLOYEES:
            return assignEmployees(state, payload)
        case GameActionKeys.UNLOCK:
            return unlock(state, payload)
        case GameActionKeys.CHANGE_ACTION:
            return changeAction(state, payload)
        case GameActionKeys.CHANGE_TRACKER:
            return changeTracker(state, payload)
        default:
            return state
    }
}
