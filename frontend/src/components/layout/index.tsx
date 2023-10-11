import React from 'react'
import { useSelector } from 'react-redux'

import styles from './layout.module.scss'
import Toolbar from './toolbar'
import { State } from '../../store'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const isAuth = useSelector((state: State) => state.auth.isAuth)
    return (
        <div className={styles.layout}>
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                {isAuth ? (
                    <Toolbar />
                ) : null}
                {children}
            </div>
        </div>
    )
}

export default Layout