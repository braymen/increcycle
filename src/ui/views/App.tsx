import '../styles/App.css'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import { PlayerCount } from '../state/PlayerCount'
import ShopItem from '../components/ShopItem'
import { CONFIGS } from '../../scripts/configs'

function App() {
    const state = useGameState()
    const { bagCapacity } = useGameDerived()
    const dispatch = useGameDispatch()
    const playerCount = PlayerCount()

    return (
        <>
            <div
                style={{
                    backgroundColor: '#091d09',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 16px',
                    border: 'dashed 2px #ffffff3b',
                }}
            >
                <span style={{ fontSize: '24px', fontWeight: '800', color: '#ddfee2' }}>
                    Inc<span style={{ color: '#60e075' }}>recycle</span>
                </span>
                {playerCount !== null ? (
                    <span style={{ fontSize: '14px' }}>
                        {playerCount} Playing{' '}
                        <span
                            className="help-marker"
                            data-tooltip="There's no online feature nor any tracking other than player count."
                            data-tooltip-align="left bottom"
                        >
                            (?)
                        </span>
                    </span>
                ) : null}
            </div>
            <h1 style={{ margin: 0, padding: 0, marginTop: '16px', color: '#ddfee2' }}>
                Money: ${state.resources.money.toFixed(2)}
            </h1>
            <div className="panel" style={{ marginTop: 0 }}>
                <h2>Resources</h2>
                <p>
                    <span>Plastic Bags: {state.resources.bags}</span>
                    <span style={{ float: 'right' }}>
                        {state.resources.bagStorage}/{bagCapacity} bag filled{' '}
                        <span
                            className="help-marker"
                            data-tooltip="As you pick up cans, you use up a bag."
                            data-tooltip-align="left"
                        >
                            (?)
                        </span>
                    </span>
                </p>
                {state.resources.cans >= 0 ? <p>Cans: {state.resources.cans}</p> : <></>}
            </div>
            <div className="panel">
                <h2>Actions</h2>
                <div className="action-grid">
                    <button
                        disabled={state.resources.bags <= 0}
                        className="primary-button"
                        onClick={() => dispatch({ type: 'CHANGE_CANS', payload: { amount: 1 } })}
                    >
                        Pick up cans
                    </button>
                    <button
                        className="primary-button"
                        disabled={state.resources.cans <= 0}
                        onClick={() => {
                            dispatch({
                                type: 'CHANGE_MONEY',
                                payload: {
                                    amount: state.resources.cans * CONFIGS.BASE_CAN_SELL_PRICE,
                                },
                            })
                            dispatch({ type: 'CHANGE_CANS', payload: { amount: -state.resources.cans } })
                        }}
                    >
                        Recycle for money
                    </button>
                </div>
            </div>
            <div className="panel">
                <h2>Shop</h2>
                <ShopItem
                    title="Plastic Bags"
                    price={0.01}
                    currentCurrency={state.resources.money}
                    callback={() => {
                        dispatch({
                            type: 'CHANGE_BAGS',
                            payload: {
                                amount: 1,
                            },
                        })
                        dispatch({
                            type: 'CHANGE_MONEY',
                            payload: {
                                amount: -CONFIGS.BASE_BAG_BUY_COST,
                            },
                        })
                    }}
                />
            </div>
        </>
    )
}

export default App
