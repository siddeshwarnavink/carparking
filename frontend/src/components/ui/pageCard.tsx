import React from 'react'

import styles from './pageCard.module.scss'

interface PageCardProps {
    children: React.ReactNode
    caption: string
    icon?: React.ReactNode
}

const PageCard: React.FC<PageCardProps> = ({ children, icon, caption }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div>
                        {icon ? (
                            <div className={styles.icon}>
                                {icon}
                            </div>
                        ) : null}
                        <span className={styles.caption}>{caption}</span>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default PageCard