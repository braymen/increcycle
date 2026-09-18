import '../styles/App.css'

interface Props {
    primaryText: string
    amount: number
    ratePerSecond?: number // Clicks per second for example
    helperText?: string
}

function ResourceLine({ primaryText, amount, ratePerSecond, helperText }: Props) {
    return (
        <p>
            <div className="resource-line">
                <div className="resource-line-left">
                    {primaryText}{' '}
                    {helperText && (
                        <span className="help-marker" data-tooltip="As you pick up cans, you use up a bag." data-tooltip-align="">
                            (?)
                        </span>
                    )}
                </div>
                <div className="resource-line-dots"></div>
                <div className="resource-line-right">
                    {amount}{' '}
                    <span
                        style={{
                            fontSize: '12px',
                            marginLeft: '2px',
                            color: !ratePerSecond ? '#afc0ba' : ratePerSecond > 0 ? '#afc0ba' : '#dc9b9b',
                        }}
                    >
                        ( {ratePerSecond}/sec )
                    </span>
                </div>
            </div>
        </p>
    )
}

export default ResourceLine
