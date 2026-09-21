import { useEffect, useRef } from 'react'
import { findStory } from '../../content/story'
import Panel from '../components/Panel'
import { useGameState } from '../state/GameContext'

const FADE_STEPS = 5
const MIN_OPACITY = 0.4

function Log() {
    const state = useGameState()
    const journalRef = useRef<HTMLDivElement>(null)
    const hasScrolled = useRef(false)

    useEffect(() => {
        const element = journalRef.current
        if (!element) return
        element.scrollTo({ top: element.scrollHeight, behavior: hasScrolled.current ? 'smooth' : 'auto' })
        hasScrolled.current = true
    }, [state.story.length])

    return (
        <Panel title="Personal Journal">
            <div
                ref={journalRef}
                style={{
                    height: '240px',
                    overflowY: 'auto',
                    paddingRight: '8px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--button-color) var(--bg-2)',
                }}
            >
                {state.story.map((u, index) => {
                    const uData = findStory(u, state)
                    if (!uData) return
                    const age = Math.min(state.story.length - 1 - index, FADE_STEPS)
                    const opacity = 1 - (age * (1 - MIN_OPACITY)) / FADE_STEPS
                    return (
                        <div key={u + index} className="fade-in">
                            <p style={{ opacity, transition: 'opacity 0.5s' }}>
                                <span style={{ color: '#f3ebac', fontWeight: '600', fontSize: '12px' }}>ENTRY #{index + 1}:</span>{' '}
                                <span style={{ fontStyle: 'italic' }}>{uData.text}</span>
                            </p>
                        </div>
                    )
                })}
            </div>
        </Panel>
    )
}

export default Log
