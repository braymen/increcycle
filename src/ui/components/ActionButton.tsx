import { useEffect, useRef, useState } from 'react'
import { CONFIGS } from '../../scripts/configs'

interface ActionButtonProps {
    title: string
    disabled?: boolean
    autoClickable?: boolean
    callback: () => void
}

export const ActionButton = (props: ActionButtonProps) => {
    const [autoClicking, setAutoClicking] = useState(false)
    const [pressed, setPressed] = useState(false)
    const callbackRef = useRef(props.callback)
    const disabledRef = useRef(props.disabled)
    useEffect(() => {
        callbackRef.current = props.callback
        disabledRef.current = props.disabled
    })

    useEffect(() => {
        if (!autoClicking) return

        let pressTimeout: ReturnType<typeof setTimeout> | undefined
        const interval = setInterval(() => {
            if (disabledRef.current) return
            setPressed(true)
            clearTimeout(pressTimeout)
            pressTimeout = setTimeout(() => setPressed(false), 100)
            callbackRef.current()
        }, CONFIGS.AUTO_CLICK_INTERVAL_MS)

        return () => {
            clearInterval(interval)
            clearTimeout(pressTimeout)
            setPressed(false)
        }
    }, [autoClicking])

    return (
        <div className="action-button-group">
            <button
                className={pressed ? 'primary-button pressed' : 'primary-button'}
                disabled={props.disabled}
                onClick={props.callback}
            >
                {props.title}
            </button>
            {props.autoClickable ? (
                <button
                    className={autoClicking ? 'auto-click-button active' : 'auto-click-button'}
                    aria-pressed={autoClicking}
                    title={`Auto click every ${CONFIGS.AUTO_CLICK_INTERVAL_MS}ms`}
                    onClick={() => setAutoClicking((on) => !on)}
                >
                    Auto
                </button>
            ) : null}
        </div>
    )
}

export default ActionButton
