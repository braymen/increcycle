import ResourceLine from '../components/ResourceLine'
import '../styles/App.css'

function Resources() {
    return (
        <div className="panel">
            <h2>Resources</h2>
            <ResourceLine primaryText="Garbage" amount={0} ratePerSecond={1} helperText="Test" />
        </div>
    )
}

export default Resources
