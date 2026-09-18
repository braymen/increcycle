import '../styles/App.css'

interface Props {
    title: string
    price: number
    canAfford: boolean
    callback: Function
}

function LevelLine({ title, price, canAfford, callback }: Props) {
    return (
        <div className="level-line">
            <div className="level-line-title">{title}</div>
            <div className="level-line-button">
                <button disabled={!canAfford} onClick={() => callback()}>
                    Buy ${price}
                </button>
            </div>
        </div>
    )
}

export default LevelLine
