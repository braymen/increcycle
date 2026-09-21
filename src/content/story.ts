import type { GameState } from '../scripts/reducer'
import { getResource } from './resources'

interface Story {
    name: string
    text: string
    checkTrigger: Function
}

export const StoryJSON = [
    {
        name: 'Stealing Trash',
        text: "You know it isn't right, but you have been left with no choice...",
        checkTrigger: (state: GameState) => getResource('Unsorted Waste', state) > 0,
    },
    {
        name: 'Sift Through Garbage',
        text: "I hope there's something in here I can sell... anything. I know Sam will take recyclables for a little money.",
        checkTrigger: (state: GameState) => getResource('Garbage', state) > 0,
    },
    {
        name: 'Sell Recyclables to Sam',
        text: "There we go. Finally a little cash. Sam also gave me a site I can use to build my own landfill. Not the most glamourous job, but it's something. I can work with something.",
        checkTrigger: (state: GameState) => state.money > 0,
    },
    {
        name: 'Dump in the Ocean',
        text: "We ran out of space for garbage, but I have no methods of getting rid of it. Sam has a pump that dumps it right into the ocean... I hate using it, but I need to or I can't continue to run this.",
        checkTrigger: (state: GameState) => state.trackers.oceanGarbage > 0,
    },
] as const satisfies readonly Story[]

export type StoryKey = (typeof StoryJSON)[number]['name']

export const findStory = (key: StoryKey, state: GameState) => {
    return StoryJSON.find((r) => r.name === key)
}
