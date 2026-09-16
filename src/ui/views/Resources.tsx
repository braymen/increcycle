import Panel from '../components/Panel'
import ResourceLine from '../components/ResourceLine'

function Resources() {
    return (
        <Panel title="Resources">
            <ResourceLine primaryText="Garbage" amount={0} ratePerSecond={1} helperText="Test" />
            <button>Sound</button>
        </Panel>
    )
}

export default Resources
