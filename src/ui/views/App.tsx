import '../styles/App.css'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'

function App() {
    const state = useGameState()
    const { bagCapacity } = useGameDerived()
    const dispatch = useGameDispatch()

    return (
        <>
            <h1>Increcycle</h1>
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
                                    amount: state.resources.cans * 0.01,
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
                <h2>Resources</h2>
                <p>
                    <span>Plastic Bags: {state.resources.bags}</span>
                    <span style={{ float: 'right' }}>
                        {0}/{bagCapacity} bag filled{' '}
                        <span className="help-marker" data-tooltip="As you pick up cans, you use up a bag.">
                            (?)
                        </span>
                    </span>
                </p>
                {state.resources.money >= 0 ? <p>Money: ${state.resources.money.toFixed(2)}</p> : <></>}
                {state.resources.cans >= 0 ? <p>Cans: {state.resources.cans}</p> : <></>}
            </div>
        </>
    )
}

export default App
