import '../styles/App.css'

interface Props {
    title: string
    level: number
    price: number
    canAfford: boolean
    callback: Function
}

function LevelLine({ title, level, price, canAfford, callback }: Props) {
    return (
        <div className="level-line fade-in">
            <div className="level-line-title">
                {title}
                <span style={{ float: 'right', marginRight: '12px' }}>Lvl. {level}</span>
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
