import { useEffect, useRef } from 'react'
import { findJournal } from '../../content/journal'
import Panel from '../components/Panel'
import { useGameState } from '../state/GameContext'

function Journal() {
    const state = useGameState()
    const journalRef = useRef<HTMLDivElement>(null)
    const hasScrolled = useRef(false)

    useEffect(() => {
        const element = journalRef.current
        if (!element) return
        element.scrollTo({ top: element.scrollHeight, behavior: hasScrolled.current ? 'smooth' : 'auto' })
        hasScrolled.current = true
    }, [state.journal.length])

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
                {state.journal.map((u, index) => {
                    const uData = findJournal(u)
                    if (!uData) return
                    return (
                        <div key={u + index} className="fade-in" style={{ fontSize: '14px' }}>
                            <p style={{ opacity: index === state.journal.length - 1 ? 1 : 0.5, transition: 'opacity 0.5s' }}>
                                <span style={{ color: '#f3ebac', fontWeight: '600' }}>ENTRY #{index + 1}:</span>{' '}
                                <span style={{ fontStyle: 'italic' }}>{uData.text}</span>
                            </p>
                        </div>
                    )
                })}
            </div>
        </Panel>
    )
}

export default Journal
