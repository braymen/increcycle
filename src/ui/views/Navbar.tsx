import '../styles/App.css'
import { PlayerCount } from '../state/PlayerCount'
import SocialLinks from '../components/SocialLinks'

function Navbar() {
    const playerCount = PlayerCount()

    return (
        <div className="app-header">
            <span className="app-title">
                Increcycle{' '}
                <span
                    style={{ fontSize: '14px', opacity: '.6', fontWeight: '400', textTransform: 'initial', fontStyle: 'italic' }}
                >
                    An open-source game, by Braymen, about garbage.
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
    )
}

export default Navbar
