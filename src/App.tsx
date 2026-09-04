import { useEffect, useState } from 'react'
import './App.css'
import ShopItem from './ShopItem'

function App() {
    const [cans, setCans] = useState(0)
    const [helpers, setHelpers] = useState(0)
    const [money, setMoney] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setCans((g) => g + helpers)
        }, 1000)
        return () => clearInterval(id)
    }, [helpers, cans, money])

    const costFormula = (currentLevel: number) => {
        return currentLevel * 10 + 1
    }

    return (
        <>
            <h1>
                Environ<span style={{ color: 'white' }}>mental</span>
            </h1>
            <div className="panel">
                <h2>Resources</h2>
                <p>Money: ${money.toFixed(2)}</p>
                <p>Cans on ground: {cans}</p>
                <p>
                    Cans Bagged: {cans}
                    <span style={{ float: 'right' }}>
                        0/5 bag filled <span className="help-marker">(?)</span>
                    </span>
                </p>
                <p>Plastic Bags: 0</p>
            </div>
            <div className="panel">
                <h2>Actions</h2>
                <div className="action-grid">
                    <button className="primary-button" onClick={() => setCans(cans + 1)}>
                        Pick up cans
                    </button>
                    <button
                        className="primary-button"
                        onClick={() => {
                            setMoney(money + cans * 0.01)
                            setCans(0)
                        }}
                    >
                        Recycle for money
                    </button>
                </div>
            </div>
            <div className="panel">
                <h2>Shop</h2>
                <ShopItem
                    title="Travel to new Location"
                    price={100}
                    callback={() => {
                        console.log('ok')
                    }}
                />
                <ShopItem
                    title="Plastic Bags"
                    price={100}
                    callback={() => {
                        console.log('ok')
                    }}
                />{' '}
                <ShopItem
                    title="Rusty Grabber"
                    price={100}
                    level={helpers}
                    callback={() => {
                        console.log('ok')
                    }}
                />
            </div>
        </>
    )
}

export default App
