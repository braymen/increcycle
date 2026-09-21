import EmployeeLine from '../components/EmployeeLine'
import Panel from '../components/Panel'
import { useGameDerived, useGameDispatch, useGameState } from '../state/GameContext'
import { getAssigned, getLevel } from '../../content/levels'
import { hasUnlock } from '../../content/unlocks'
import { CONFIGS } from '../../scripts/configs'

function Logistics() {
    const state = useGameState()
    const derived = useGameDerived()
    const dispatch = useGameDispatch()

    return (
        <Panel title="Logistics">
            <div className="level-lines-container">
                <EmployeeLine
                    title="Truck Drivers"
                    assigned={getAssigned('Truck Driver', state)}
                    max={getLevel('Truck Driver', state)}
                    callback={(amount) => dispatch({ type: 'ASSIGN_EMPLOYEES', payload: { key: 'Truck Driver', amount } })}
                />
                {hasUnlock('Organizer', state) && (
                    <EmployeeLine
                        title="Organizers"
                        assigned={getAssigned('Organizer', state)}
                        max={getLevel('Organizer', state)}
                        callback={(amount) => dispatch({ type: 'ASSIGN_EMPLOYEES', payload: { key: 'Organizer', amount } })}
                    />
                )}
                {hasUnlock('Employee Costs', state) && (
                    <div className="level-line fade-in">
                        <div className="level-line-title">
                            Employee Costs{' '}
                            <span
                                className="help-marker"
                                data-tooltip={`Employees are not free... Each working employee costs $${CONFIGS.EMPLOYEES.BASE_EMPLOYEE_PAY.toFixed(2)} a second. If you run out of money, they stop.`}
                                data-tooltip-align=""
                            >
                                (?)
                            </span>
                        </div>
                        <div className="level-line-button" style={{ color: '#dc9b9b' }}>
                            -${derived.employeeCosts.toFixed(2)}/s
                        </div>
                    </div>
                )}
            </div>
        </Panel>
    )
}

export default Logistics
