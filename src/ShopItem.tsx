interface ShopItemProps {
    title: string
    price: number
    level?: number
    currency?: string
    callback?: () => void
}

export const ShopItem = (props: ShopItemProps) => {
    return (
        <div style={{ marginBottom: '12px' }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <span>
                    {props.title} <span className="help-marker">(?)</span>
                </span>
                <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {props.level != null ? <span>Level {props.level}</span> : <></>}
                    <button className="primary-button" onClick={props.callback}>
                        Buy
                    </button>
                </span>
            </div>
            <div style={{ textAlign: 'right', marginTop: '2px' }}>
                Cost: {props.currency ? '' : '$'}
                {props.price} {props.currency ? props.currency : ''}
            </div>
        </div>
    )
}

export default ShopItem
