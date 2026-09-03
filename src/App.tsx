import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [garbage, setGarbage] = useState(0)
    const [grabber, setGrabber] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setGarbage((g) => g + grabber)
        }, 1000)
        return () => clearInterval(id)
    }, [grabber])

    const costFormula = (currentLevel: number) => {
        return currentLevel * 10 + 10
    }

    return (
        <>
            <h1>Environmental</h1>
            <p>Garbage: {garbage}</p>
            <p>Grabbers: {grabber}</p>
            <button className="primary-button" onClick={() => setGarbage(garbage + 1)}>
                Pick up garbage
            </button>
            <br />
            <p>Grabber Cost: {costFormula(grabber)}</p>
            <button
                disabled={garbage < costFormula(grabber)}
                className="primary-button"
                onClick={() => {
                    setGarbage(garbage - costFormula(grabber))
                    setGrabber(grabber + 1)
                }}
            >
                Buy auto-grabber
            </button>
        </>
    )
}

export default App
