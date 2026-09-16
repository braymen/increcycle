import { PlayerCount } from '../state/PlayerCount'
import SocialLinks from '../components/SocialLinks'
import faviconIcon from '../assets/favicon.svg'

interface Props {
    showSettings: Function
}

function Navbar({ showSettings }: Props) {
    const playerCount = PlayerCount()

    return (
        <div className="app-header-container">
            <div className="app-header">
                <span className="app-title" style={{}}>
                    <span className="app-title-main">
                        <img className="app-title-icon rotating" src={faviconIcon} />
                        <span style={{ paddingTop: '6px' }}>Increcycle</span>
                    </span>
                    <span className="app-sub-title">
                        A garbage open-source game, by <span style={{ color: 'white' }}>Braymen</span>.
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
                    <SocialLinks showSettings={showSettings} />
                </div>
            </div>
        </div>
    )
}

export default Navbar
