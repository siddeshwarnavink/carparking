import React from 'react'

import styles from './loadingOverlay.module.scss'
import Spinner from './spinner'

const LoadingOverlay: React.FC = () => {
    return (
        <div className={styles.overlay}>
            <Spinner />
        </div>
    )
}

export default LoadingOverlay