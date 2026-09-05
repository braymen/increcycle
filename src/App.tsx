import { useEffect, useState } from 'react'
import './App.css'
import ShopItem from './ShopItem'

function App() {
    const [cans, setCans] = useState(0)
    const [grabberLevel, setGrabberLevel] = useState(0)
    const [money, setMoney] = useState(0)
    const [bags, setBags] = useState(1)
    const [bagStorage, setBagStorage] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            addCan(grabberLevel)
        }, 1000)
        return () => clearInterval(id)
    }, [grabberLevel, cans, money])

    const costFormula = (currentLevel: number) => {
        return 0.1 * Math.pow(currentLevel + 1, 3)
    }

    const addCan = (amount: number) => {
        // TODO: need to fix plastic bag math when multiple rust grabbers
        if (bags <= 0) return
        if (bagStorage + amount >= maxBagStorage) {
            setBagStorage(0)
            setBags(bags - amount)
        } else {
            setBagStorage(bagStorage + amount)
        }
        setCans(cans + amount)
    }

    const maxBagStorage = 5

    return (
        <>
            <h1>
                <span style={{ color: 'white' }}>Inc</span>recycle
            </h1>
            <div className="panel">
                <h2>Resources</h2>
                <p>Money: ${money.toFixed(2)}</p>
                <p>Cans: {cans}</p>
                <p>
                    <span style={{ color: bags <= 0 ? 'red' : 'inherit' }}>Plastic Bags: {bags}</span>
                    <span style={{ float: 'right' }}>
                        {bagStorage}/{maxBagStorage} bag filled{' '}
                        <span className="help-marker" data-tooltip="As you pick up cans, you use up a bag.">
                            (?)
                        </span>
                    </span>
                </p>
            </div>
            <div className="panel">
                <h2>Actions</h2>
                <div className="action-grid">
                    <button disabled={bags <= 0} className="primary-button" onClick={() => addCan(1)}>
                        Pick up cans
                    </button>
                    <button
                        className="primary-button"
                        disabled={cans <= 0}
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
                    title="Plastic Bags"
                    price={0.01}
                    currentCurrency={money}
                    callback={() => {
                        setBags(bags + 1)
                        setMoney(money - 0.01)
                    }}
                />{' '}
                <ShopItem
                    title="Hire a Volunteer"
                    description="Helps pick up cans, once per second each."
                    price={costFormula(grabberLevel)}
                    level={grabberLevel}
                    currentCurrency={money}
                    callback={() => {
                        setGrabberLevel(grabberLevel + 1)
                        setMoney(money - 0.1)
                    }}
                />
            </div>
        </>
    )
}

export default App
