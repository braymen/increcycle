import { useEffect, useState } from 'react'
import '../styles/App.css'
import { useGameState } from '../state/GameContext'

export type ProgressActionKey = '' | 'steal' | 'sift'

interface Props {
    text: string
    progress: number
    callback: Function
    disabled: boolean
    progressActionKey: ProgressActionKey
}

function ProgressActionButton({ text, callback, disabled, progressActionKey }: Props) {
    const state = useGameState()
    const focusing = state.actionProgress.id === progressActionKey

    return (
        <button
            id={'progress-action-key-' + progressActionKey}
            disabled={disabled}
            style={{ width: '100%' }}
            onClick={() => callback()}
        >
            {text}
            {focusing && !disabled && (
                <div>
                    <div
                        style={{
                            backgroundColor: 'white',
                            position: 'absolute',
                            width: '100%',
                            height: '3px',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: '.3',
                        }}
                    ></div>
                    <div
                        style={{
                            backgroundColor: 'white',
                            position: 'absolute',
                            width: Math.min(state.actionProgress.progress, 100) + '%',
                            height: '3px',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: '.6',
                        }}
                    ></div>
                </div>
            )}
        </button>
    )
}

export default ProgressActionButton
