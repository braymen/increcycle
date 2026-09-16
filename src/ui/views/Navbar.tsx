import { PlayerCount } from '../state/PlayerCount'
import SocialLinks from '../components/SocialLinks'

interface Props {
    showSettings: Function
}

function Navbar({ showSettings }: Props) {
    const playerCount = PlayerCount()

    return (
        <div className="app-header-container">
            <div className="app-header">
                <span className="app-title" style={{}}>
                    <span style={{ paddingTop: '6px' }}>Increcycle</span>{' '}
                    <span className="app-sub-title">An open-source game, by Braymen, about garbage.</span>
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
