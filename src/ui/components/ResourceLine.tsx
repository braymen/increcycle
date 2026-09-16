import '../styles/App.css'

interface Props {
    primaryText: string
    amount: number
    secondaryText?: string
    ratePerSecond?: number // Clicks per second for example
    helperText?: string
}

function ResourceLine({ primaryText, amount, secondaryText, ratePerSecond, helperText }: Props) {
    return (
        <p>
            <span>
                <span style={{}}>{primaryText}:</span> {amount}{' '}
                <span style={{ fontSize: '12px', marginLeft: '2px' }}>
                    ({ratePerSecond && ratePerSecond >= 0 ? '+' : '-'}
                    {ratePerSecond}/sec)
                </span>
            </span>
            <span style={{ float: 'right' }}>
                {secondaryText}{' '}
                {helperText && (
                    <span className="help-marker" data-tooltip="As you pick up cans, you use up a bag." data-tooltip-align="left">
                        (?)
                    </span>
                )}
            </span>
        </p>
    )
}

export default ResourceLine
