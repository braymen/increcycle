import { createRoot } from 'react-dom/client'
import App from './ui/views/App.tsx'
import { GameProvider } from './ui/state/GameProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <GameProvider>
        <App />
    </GameProvider>
)
