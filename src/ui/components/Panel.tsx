import type { ReactNode } from 'react'
import '../styles/App.css'

interface Props {
    title: string
    children?: ReactNode | ReactNode[]
}

function Panel({ title, children }: Props) {
    return (
        <div className={'panel ' + (title !== 'Actions' && 'fade-in')}>
            <h2 className="panel-header">{title}</h2>
            <div className="panel-container">{children}</div>
        </div>
    )
}

export default Panel
