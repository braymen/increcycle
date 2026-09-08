export type ShopItemType = 'consumable' | 'upgrade' | 'unlock'

interface ShopItemProps {
    title: string
    price: number
    type?: ShopItemType
    level?: number
    description?: string
    currency?: string
    currentCurrency: number
    purchased?: boolean
    quantity?: number
    callback?: () => void
}

export const ShopItem = (props: ShopItemProps) => {
    const isUnlock = props.type === 'unlock'
    const purchased = isUnlock && props.purchased === true
    const quantity = props.quantity != null && props.quantity > 1 ? props.quantity : null
    const tooPoor = Math.round(props.currentCurrency * 100) / 100 < props.price

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
                        disabled={purchased || tooPoor}
                        onClick={purchased ? undefined : props.callback}
                    >
                        {purchased ? 'Owned' : isUnlock ? 'Unlock' : quantity ? `Buy ${quantity}x` : 'Buy'}
                    </button>
                </span>
            </div>
            <div style={{ textAlign: 'right', marginTop: '2px' }}>
                {purchased ? (
                    <span style={{ opacity: '.5' }}>Unlocked</span>
                ) : (
                    <>
                        <span style={{ opacity: '.5' }}>Cost:</span>{' '}
                        {props.currency ? props.price : '$' + props.price.toFixed(2)} {props.currency ? props.currency : ''}
                    </>
                )}
            </div>
        </div>
    )
}

export default ShopItem
