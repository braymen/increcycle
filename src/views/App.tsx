import { useEffect, useState } from 'react'
import '../styles/App.css'
import ShopItem from './ShopItem'

function App() {
    const [cans, setCans] = useState(0)
    const [grabberLevel, setGrabberLevel] = useState(0)
    const [money, setMoney] = useState(0)
    const [bags, setBags] = useState(1)
    const [bagStorage, setBagStorage] = useState(0)

    const maxBagStorage = 5

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
        if (bags <= 0 || amount == 0) return

        // There has to be a cleaner way to do this lol
        const offset = bagStorage
        const maxCans = bags * maxBagStorage - offset
        const correctedCans = Math.min(maxCans, amount)
        const remainder = (correctedCans + bagStorage) % maxBagStorage
        const bagsConsumed = Math.floor((correctedCans + bagStorage) / maxBagStorage)
        setBagStorage(remainder)
        setBags(bags - bagsConsumed)
        setCans(cans + correctedCans)
    }

    return (
        <>
            <h1>Increcycle</h1>
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
                            setMoney(Math.round((money + cans * 0.01) * 100) / 100)
                            setCans(0)
                        }}
                    >
                        Recycle for money
                    </button>
                    <button className="primary-button" onClick={() => setMoney(10000000000)}>
                        Give lots money
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
                        setMoney(money - costFormula(grabberLevel))
                    }}
                />
            </div>
        </>
    )
}

export default App
