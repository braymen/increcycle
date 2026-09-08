import { useState } from 'react'
import '../styles/App.css'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import { PlayerCount } from '../state/PlayerCount'
import ShopItem from '../components/ShopItem'
import ActionButton from '../components/ActionButton'
import SocialLinks from '../components/SocialLinks'
import { CONFIGS } from '../../scripts/configs'

function App() {
    const state = useGameState()
    const { bagCapacity, volunterCost, cansPerSecond, bagCapacityCost, bagCost, canPickupCost, canPickup, saplingCost } =
        useGameDerived()
    const dispatch = useGameDispatch()
    const playerCount = PlayerCount()
    const [bulkAmount, setBulkAmount] = useState(1)

    const buyAmount = state.unlocks.bulkBuy ? bulkAmount : 1
    const bulkPrice = (price: number) => Math.round(price * buyAmount * 100) / 100

    return (
        <>
            <div className="app-header">
                <span className="app-title">
                    Increcycle{' '}
                    <span style={{ fontSize: '14px', opacity: '.6', fontWeight: '400', textTransform: 'initial' }}>
                        - An open-source game, by Braymen, about saving the planet by doing impactful sustainable actions.
                    </span>
                </span>
                <div className="app-header-right">
                    {playerCount !== null ? (
                        <>
                            <span className="player-count">
                                {playerCount} Playing{' '}
                                <span
                                    className="help-marker"
                                    data-tooltip="There's no online feature nor any tracking other than player count."
                                    data-tooltip-align="left bottom"
                                >
                                    (?)
                                </span>
                            </span>
                            <span className="header-divider" aria-hidden="true" />
                        </>
                    ) : null}
                    <SocialLinks />
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="panel">
                        <h1 style={{ margin: 0, padding: 0, color: '#ddfee2' }}>${state.resources.money.toFixed(2)}</h1>
                    </div>
                    <div className="panel">
                        <h2>Resources</h2>
                        <p>
                            <span>
                                <span style={{ opacity: '.6' }}>Plastic Bags:</span> {state.resources.bags}
                            </span>
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
                                <span>
                                    <span style={{ opacity: '.6' }}>Cans:</span> {state.resources.cans}
                                </span>
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
                        {state.resources.impact >= 0 ? (
                            <p>
                                <span>
                                    <span style={{ opacity: '.6' }}>Impact:</span> {state.resources.impact.toFixed(2)}
                                </span>
                            </p>
                        ) : (
                            <></>
                        )}
                        {state.resources.saplings >= 0 ? (
                            <p>
                                <span>
                                    <span style={{ opacity: '.6' }}>Saplings:</span> {state.resources.saplings}{' '}
                                    <span style={{ color: '#fb00ff' }}>⇒</span> <span style={{ opacity: '.6' }}>Trees:</span>{' '}
                                    {state.resources.trees}
                                </span>
                            </p>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="panel">
                        <h2>Actions</h2>
                        <div className="action-grid">
                            <ActionButton
                                title="Pick up cans"
                                disabled={state.resources.bags <= 0}
                                autoClickable={state.unlocks.autoClick}
                                callback={() => dispatch({ type: 'CHANGE_CANS', payload: { amount: canPickup } })}
                            />
                            <ActionButton
                                title="Recycle cans"
                                disabled={state.resources.cans <= 0}
                                autoClickable={state.unlocks.autoClick}
                                callback={() => {
                                    dispatch({
                                        type: 'CHANGE_MONEY',
                                        payload: {
                                            amount: state.resources.cans * CONFIGS.BASE_CAN_SELL_PRICE,
                                        },
                                    })
                                    dispatch({ type: 'CHANGE_CANS', payload: { amount: -state.resources.cans } })
                                }}
                            />
                            {state.resources.money <= 0 && state.resources.bags <= 0 && state.resources.cans <= 0 ? (
                                <ActionButton
                                    title="Scavenge for a Free Bag"
                                    callback={() => dispatch({ type: 'CHANGE_RESOURCE', payload: { key: 'bags', amount: 1 } })}
                                />
                            ) : (
                                <></>
                            )}
                            {state.resources.saplings >= 0 ? (
                                <ActionButton
                                    title="Plant Tree"
                                    disabled={state.resources.saplings <= 0}
                                    autoClickable={state.unlocks.autoClick}
                                    callback={() => {
                                        dispatch({ type: 'CHANGE_RESOURCE', payload: { key: 'saplings', amount: -1 } })
                                        dispatch({ type: 'CHANGE_RESOURCE', payload: { key: 'trees', amount: 1 } })
                                        dispatch({
                                            type: 'CHANGE_RESOURCE',
                                            payload: { key: 'impact', amount: CONFIGS.BASE_IMPACT.TREES },
                                        })
                                    }}
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="panel">
                        <h2>Consumables Shop</h2>
                        {state.unlocks.bulkBuy ? (
                            <div className="bulk-buy-row">
                                {CONFIGS.BULK_BUY_AMOUNTS.map((amount) => (
                                    <button
                                        key={amount}
                                        className="primary-button"
                                        aria-pressed={buyAmount === amount}
                                        title={`Buy ${amount} at a time`}
                                        onClick={() => setBulkAmount(amount)}
                                    >
                                        {amount}x
                                    </button>
                                ))}
                            </div>
                        ) : null}
                        <ShopItem
                            title="Plastic Bags"
                            price={bulkPrice(bagCost)}
                            quantity={buyAmount}
                            currentCurrency={state.resources.money}
                            callback={() => {
                                dispatch({
                                    type: 'CHANGE_RESOURCE',
                                    payload: {
                                        key: 'bags',
                                        amount: buyAmount,
                                    },
                                })
                                dispatch({
                                    type: 'CHANGE_MONEY',
                                    payload: {
                                        amount: -bulkPrice(bagCost),
                                    },
                                })
                            }}
                        />
                        <ShopItem
                            title="Saplings"
                            price={bulkPrice(saplingCost)}
                            quantity={buyAmount}
                            currentCurrency={state.resources.money}
                            callback={() => {
                                dispatch({
                                    type: 'CHANGE_RESOURCE',
                                    payload: {
                                        key: 'saplings',
                                        amount: buyAmount,
                                    },
                                })
                                dispatch({
                                    type: 'CHANGE_MONEY',
                                    payload: {
                                        amount: -bulkPrice(saplingCost),
                                    },
                                })
                            }}
                        />
                    </div>
                    <div className="panel">
                        <h2>Impact Exchange</h2>
                        <ShopItem
                            title="Auto Click"
                            type="unlock"
                            description="Adds an Auto toggle to actions that clicks them for you."
                            price={CONFIGS.UNLOCK_COSTS.autoClick}
                            currency="Impact"
                            currentCurrency={state.resources.impact}
                            purchased={state.unlocks.autoClick}
                            callback={() => {
                                dispatch({
                                    type: 'UNLOCK',
                                    payload: {
                                        key: 'autoClick',
                                    },
                                })
                                dispatch({
                                    type: 'CHANGE_RESOURCE',
                                    payload: {
                                        key: 'impact',
                                        amount: -CONFIGS.UNLOCK_COSTS.autoClick,
                                    },
                                })
                            }}
                        />
                        <ShopItem
                            title="Bulk Buy"
                            type="unlock"
                            description="Adds ability to bulk buy consumables."
                            price={CONFIGS.UNLOCK_COSTS.bulkBuy}
                            currency="Impact"
                            currentCurrency={state.resources.impact}
                            purchased={state.unlocks.bulkBuy}
                            callback={() => {
                                dispatch({
                                    type: 'UNLOCK',
                                    payload: {
                                        key: 'bulkBuy',
                                    },
                                })
                                dispatch({
                                    type: 'CHANGE_RESOURCE',
                                    payload: {
                                        key: 'impact',
                                        amount: -CONFIGS.UNLOCK_COSTS.bulkBuy,
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
                </div>
                <div className="column">
                    <div className="panel">
                        <h2>Homebase</h2>
                        <span>
                            <span style={{ opacity: '.6' }}>Electricity:</span> {state.resources.bags}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
