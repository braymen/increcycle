import '../styles/App.css'

interface Props {
    primaryText: string
    amount: number
    capacity: number
}

function CapacityLine({ primaryText, amount, capacity }: Props) {
    const percent = Math.min((amount / capacity) * 100, 100)
    const full = percent >= 95
    const nearlyFull = !full && percent >= 70

    return (
        <div style={{ marginBottom: '12px' }}>
            <div className="resource-line fade-in">
                <div className="resource-line-left" style={{ flex: 1 }}>
                    {primaryText}
                </div>
                <div className="resource-line-right">
                    <span style={{ color: 'white' }}>{amount}</span>
                    <span style={{ fontSize: '12px', marginLeft: '2px', color: '#afc0ba' }}>/ {capacity}</span>
                </div>
            </div>
            <div style={{ position: 'relative', height: '10px', marginTop: '4px' }}>
                <div
                    style={{
                        backgroundColor: full ? '#e29f9f' : nearlyFull ? '#e2e09f' : '#a7e29f',
                        position: 'absolute',
                        width: '100%',
                        height: '10px',
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                ></div>
                <div
                    style={{
                        backgroundColor: full ? 'rgb(193, 61, 61)' : nearlyFull ? 'rgb(193, 171, 61)' : 'rgb(28, 130, 0)',
                        position: 'absolute',
                        width: percent + '%',
                        height: '10px',
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                ></div>
            </div>
        </div>
    )
}

export default CapacityLine
