import React from 'react'

import styles from './layout.module.scss'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}

export default Layout