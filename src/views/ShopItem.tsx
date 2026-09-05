interface ShopItemProps {
    title: string
    price: number
    level?: number
    description?: string
    currency?: string
    currentCurrency: number
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
                    {props.title}{' '}
                    {props.description ? (
                        <span className="help-marker" data-tooltip={props.description}>
                            (?)
                        </span>
                    ) : null}
                </span>
                <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {props.level != null ? <span>Level {props.level}</span> : <></>}
                    <button
                        className="primary-button"
                        disabled={Math.round(props.currentCurrency * 100) / 100 < props.price}
                        onClick={props.callback}
                    >
                        Buy
                    </button>
                </span>
            </div>
            <div style={{ textAlign: 'right', marginTop: '2px' }}>
                Cost: {props.currency ? '' : '$'}
                {props.price.toFixed(2)} {props.currency ? props.currency : ''}
            </div>
        </div>
    )
}

export default ShopItem
