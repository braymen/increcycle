import '../styles/App.css'

interface Props {
    title: string
    assigned: number
    max: number
    callback: (amount: number) => void
}

function EmployeeLine({ title, assigned, max, callback }: Props) {
    return (
        <div className="level-line fade-in">
            <div className="level-line-title">
                {title}
                <span style={{ float: 'right', marginRight: '12px' }}>
                    {assigned} / {max}
                </span>
            </div>
            <div className="level-line-button">
                <input
                    type="range"
                    min={0}
                    max={max}
                    step={1}
                    value={assigned}
                    disabled={max === 0}
                    onChange={(e) => callback(Number(e.target.value))}
                />
            </div>
        </div>
    )
}

export default EmployeeLine
