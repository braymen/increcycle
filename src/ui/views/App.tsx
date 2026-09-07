import '../styles/App.css'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import { PlayerCount } from '../state/PlayerCount'

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
                    <span>
                        {playerCount} {playerCount === 1 ? 'Player' : 'Players'} Online
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
                        {0}/{bagCapacity} bag filled{' '}
                        <span className="help-marker" data-tooltip="As you pick up cans, you use up a bag.">
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
        </>
    )
}

export default App
