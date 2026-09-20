import '../styles/App.css'

interface Props {
    title: string
    price: number
    canAfford: boolean
    callback: Function
}

function LevelLine({ title, price, canAfford, callback }: Props) {
    return (
        <div className="level-line  fade-in">
            <div className="level-line-title">{title}</div>
            <div className="level-line-button">
                <button className="button-yellow" disabled={!canAfford} onClick={() => callback()}>
                    Buy ${price}
                </button>
            </div>
        </div>
    )
}

export default LevelLine
