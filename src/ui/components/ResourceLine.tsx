import '../styles/App.css'

interface Props {
    primaryText: string
    amount: number
    ratePerSecond: number // Clicks per second for example
    helperText?: string
}

function ResourceLine({ primaryText, amount, ratePerSecond, helperText }: Props) {
    return (
        <div style={{ marginBottom: '6px' }}>
            <div className="resource-line  fade-in">
                <div className="resource-line-left">
                    {primaryText}{' '}
                    {helperText && (
                        <span className="help-marker" data-tooltip={helperText} data-tooltip-align="">
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
                        {ratePerSecond >= 0 ? '+' : ''}
                        {ratePerSecond}/s
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ResourceLine
