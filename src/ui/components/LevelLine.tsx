import '../styles/App.css'

interface Props {
    title: string
    level: number
    price: number
    canAfford: boolean
    levelPrefix?: string
    levelSuffix?: string
    helperText?: string
    callback: Function
}

function LevelLine({ title, level, price, canAfford, levelPrefix, levelSuffix, helperText, callback }: Props) {
    return (
        <div className="level-line fade-in">
            <div className="level-line-title">
                {title}{' '}
                {helperText && (
                    <span className="help-marker" data-tooltip={helperText} data-tooltip-align="">
                        (?)
                    </span>
                )}
                <span style={{ float: 'right', marginRight: '12px' }}>
                    {levelPrefix !== undefined ? levelPrefix : 'Lvl.'} {level} {levelSuffix !== undefined ? levelSuffix : ''}
                </span>
            </div>
            <div className="level-line-button">
                <button className="button-yellow" disabled={!canAfford} onClick={() => callback()}>
                    Buy ${price}
                </button>
            </div>
        </div>
    )
}

export default LevelLine
