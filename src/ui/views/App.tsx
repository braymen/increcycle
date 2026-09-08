import '../styles/App.css'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import { PlayerCount } from '../state/PlayerCount'
import ShopItem from '../components/ShopItem'
import { CONFIGS } from '../../scripts/configs'

function App() {
    const state = useGameState()
    const { bagCapacity, volunterCost, cansPerSecond, bagCapacityCost, bagCost, canPickupCost, canPickup, saplingCost } =
        useGameDerived()
    const dispatch = useGameDispatch()
    const playerCount = PlayerCount()

    return (
        <>
            <div className="app-header">
                <span className="app-title">
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
            <div className="columns">
                <div className="column">
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
                        {state.resources.cans >= 0 ? (
                            <p>
                                <span>Cans: {state.resources.cans}</span>
                                {cansPerSecond > 0 ? (
                                    <span style={{ float: 'right' }}>
                                        +{cansPerSecond}/sec{' '}
                                        <span
                                            className="help-marker"
                                            data-tooltip="Volunteers are helping you pick up cans for you."
                                            data-tooltip-align="left"
                                        >
                                            (?)
                                        </span>
                                    </span>
                                ) : null}
                            </p>
                        ) : (
                            <></>
                        )}
                        {state.resources.saplings >= 0 ? (
                            <p>
                                <span>Saplings: {state.resources.saplings}</span>
                            </p>
                        ) : (
                            <></>
                        )}
                        {state.resources.trees >= 0 ? (
                            <p>
                                <span>Trees: {state.resources.trees}</span>
                            </p>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="panel">
                        <h2>Actions</h2>
                        <div className="action-grid">
                            <button
                                disabled={state.resources.bags <= 0}
                                className="primary-button"
                                onClick={() => dispatch({ type: 'CHANGE_CANS', payload: { amount: canPickup } })}
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
                                Recycle cans for money
                            </button>
                            {state.resources.money <= 0 && state.resources.bags <= 0 && state.resources.cans <= 0 ? (
                                <button
                                    className="primary-button"
                                    onClick={() => dispatch({ type: 'CHANGE_RESOURCE', payload: { key: 'bags', amount: 1 } })}
                                >
                                    Scavenge for a Free Bag
                                </button>
                            ) : (
                                <></>
                            )}
                            {state.resources.saplings >= 0 ? (
                                <button
                                    disabled={state.resources.saplings <= 0}
                                    className="primary-button"
                                    onClick={() => {
                                        dispatch({ type: 'CHANGE_RESOURCE', payload: { key: 'saplings', amount: -1 } })
                                        dispatch({ type: 'CHANGE_RESOURCE', payload: { key: 'trees', amount: 1 } })
                                    }}
                                >
                                    Plant Tree
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="panel">
                        <h2>Consumables Shop</h2>
                        <ShopItem
                            title="Plastic Bags"
                            price={bagCost}
                            currentCurrency={state.resources.money}
                            callback={() => {
                                dispatch({
                                    type: 'CHANGE_RESOURCE',
                                    payload: {
                                        key: 'bags',
                                        amount: 1,
                                    },
                                })
                                dispatch({
                                    type: 'CHANGE_MONEY',
                                    payload: {
                                        amount: -bagCost,
                                    },
                                })
                            }}
                        />
                        <ShopItem
                            title="Saplings"
                            price={saplingCost}
                            currentCurrency={state.resources.money}
                            callback={() => {
                                dispatch({
                                    type: 'CHANGE_RESOURCE',
                                    payload: {
                                        key: 'saplings',
                                        amount: 1,
                                    },
                                })
                                dispatch({
                                    type: 'CHANGE_MONEY',
                                    payload: {
                                        amount: -saplingCost,
                                    },
                                })
                            }}
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="panel">
                        <h2>Upgrades</h2>
                        <ShopItem
                            title="Hire a Volunteer"
                            description="Helps pick up cans, once per second each."
                            price={volunterCost}
                            level={state.levels.volunteers}
                            currentCurrency={state.resources.money}
                            callback={() => {
                                dispatch({
                                    type: 'CHANGE_LEVEL',
                                    payload: {
                                        key: 'volunteers',
                                        amount: 1,
                                    },
                                })
                                dispatch({
                                    type: 'CHANGE_MONEY',
                                    payload: {
                                        amount: -volunterCost,
                                    },
                                })
                            }}
                        />
                        <ShopItem
                            title="Grabber Upgrades"
                            description="Increase manually picking up cans +1"
                            price={canPickupCost}
                            level={state.levels.canPickup}
                            currentCurrency={state.resources.money}
                            callback={() => {
                                dispatch({
                                    type: 'CHANGE_LEVEL',
                                    payload: {
                                        key: 'canPickup',
                                        amount: 1,
                                    },
                                })
                                dispatch({
                                    type: 'CHANGE_MONEY',
                                    payload: {
                                        amount: -canPickupCost,
                                    },
                                })
                            }}
                        />
                        <ShopItem
                            title="Bigger Bags"
                            description="Increase bag capacity by +1"
                            price={bagCapacityCost}
                            level={state.levels.bagCapacity}
                            currentCurrency={state.resources.money}
                            callback={() => {
                                dispatch({
                                    type: 'CHANGE_LEVEL',
                                    payload: {
                                        key: 'bagCapacity',
                                        amount: 1,
                                    },
                                })
                                dispatch({
                                    type: 'CHANGE_MONEY',
                                    payload: {
                                        amount: -bagCapacityCost,
                                    },
                                })
                            }}
                        />
                    </div>
                    <div className="panel">
                        <h2>Warehouse</h2>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    )
}

export default App
