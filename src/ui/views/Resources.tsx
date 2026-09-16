import { getResource, ResourcesJSON } from '../../content/resources'
import Panel from '../components/Panel'
import ResourceLine from '../components/ResourceLine'
import { useGameState } from '../state/GameContext'

function Resources() {
    const state = useGameState()

    return (
        <Panel title="Resources">
            {ResourcesJSON.map((r) => {
                const playerResource = getResource(r.name, state)
                return <ResourceLine primaryText={r.name} amount={playerResource} ratePerSecond={0} helperText={r.description} />
            })}
        </Panel>
    )
}

export default Resources
