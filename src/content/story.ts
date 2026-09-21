import { calculateDerived } from '../scripts/formula'
import type { GameState } from '../scripts/reducer'
import { getLevel } from './levels'
import { getResource } from './resources'

interface Story {
    name: string
    text: string
    checkTrigger: Function
}

export const StoryJSON = [
    {
        name: 'Stealing Trash',
        text: "You know it isn't right, but you have been left with no choice... Garbage is my life now.",
        checkTrigger: (state: GameState) => getResource('Unsorted Waste', state) >= 5,
    },
    {
        name: 'Sift Through Garbage',
        text: "I hope there's something in here I can sell... anything. I know Sam will take recyclables for a little money. Maybe I should get 3 and see what he pays.",
        checkTrigger: (state: GameState) => getResource('Garbage', state) >= 5,
    },
    {
        name: 'Sell Recyclables to Sam',
        text: "There we go. Finally a little cash. $1 a recyclable. Sam also gave me a site I can use to build my own landfill. Not the most glamourous job, but it's something. I can work with something. Maybe I should look into employees once I get $10.",
        checkTrigger: (state: GameState) => state.money > 0,
    },
    {
        name: 'Hire an Employee',
        text: "I've got my first employee. Sounds like they will work for free for awhile... But that won't last long. My storage is filling up and I need to talk to Sam about that.",
        checkTrigger: (state: GameState) => calculateDerived(state).totalEmployees >= 1,
    },
    {
        name: 'Dump in the Ocean',
        text: "We ran out of space for garbage finally, but I have no methods of getting rid of it. Sam has a pump that dumps it right into the ocean... I hate using it, but I need to or I can't continue to run this right now. He also gave me permission to upgrade the capacities to help with it.",
        checkTrigger: (state: GameState) => state.trackers.oceanGarbage > 0,
    },
    {
        name: 'Capacity Upgraded',
        text: "Things are starting to come together. I'm thinking we start sorting things and trying to make more money at market value for these materials.",
        checkTrigger: (state: GameState) =>
            getLevel('Garbage Capacity', state) > 0 ||
            getLevel('Recyclables Capacity', state) > 0 ||
            getLevel('Unsorted Waste Capacity', state) > 0,
    },
] as const satisfies readonly Story[]

export type StoryKey = (typeof StoryJSON)[number]['name']

export const findStory = (key: StoryKey, state: GameState) => {
    return StoryJSON.find((r) => r.name === key)
}
