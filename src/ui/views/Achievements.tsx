import { AchievementsJSON, hasAchievement } from '../../content/achievements'
import Panel from '../components/Panel'
import { useGameState } from '../state/GameContext'

const gridSize = '42.6px'

function Achievements() {
    const state = useGameState()

    return (
        <Panel title="Achievements">
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {AchievementsJSON.map((achievement) => {
                    const achieved = hasAchievement(achievement.name, state)

                    return (
                        <span className="help-marker" data-tooltip={achievement.description} data-tooltip-align="">
                            <div
                                style={{
                                    width: gridSize,
                                    height: gridSize,
                                    backgroundColor: '#011e15',
                                    position: 'relative',
                                    color: 'var(--text-muted)',
                                    border: '2px solid var(--text-muted)',
                                    opacity: achieved ? '1' : '.3',
                                    cursor: 'pointer',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '4px',
                                        textAlign: 'left',
                                        top: '0px',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                    }}
                                >
                                    {achievement.gridPrimaryName}
                                </div>
                                <div style={{ position: 'absolute', right: '4px', bottom: 0, fontWeight: '600' }}>
                                    {achievement.gridSecondaryName}
                                </div>
                            </div>
                        </span>
                    )
                })}
            </div>
        </Panel>
    )
}

export default Achievements
