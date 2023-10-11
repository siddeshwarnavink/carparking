import React from 'react'

import styles from './button.module.scss'
import { joinClasses } from '../../util'

interface ButtonProps {
    children: React.ReactNode
    type?: 'button' | 'submit'
    fullWidth?: boolean
    icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
    children,
    type,
    fullWidth,
    icon
}) => {
    return (
        <button
            type={type}
            className={joinClasses(
                styles.button,
                fullWidth && styles.fullWidth,
                (icon ? true : false) && styles.withIcon
            )}
        >
            {icon ? (
                <div className={styles.icon}>{icon}</div>
            ) : null}
            <div className={styles.label}>
                {children}
            </div>
        </button>
    )
}

Button.defaultProps = {
    type: 'button',
    fullWidth: false
}

export default Button