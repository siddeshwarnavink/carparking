import React from 'react'

import styles from './button.module.scss'
import { joinClasses } from '../../util'
import Spinner from './spinner'

interface ButtonProps {
    children: React.ReactNode
    type?: 'button' | 'submit'
    fullWidth?: boolean
    icon?: React.ReactNode
    disabled?: boolean
    loading?: boolean
    onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
    children,
    type,
    fullWidth,
    icon,
    loading,
    disabled,
    onClick
}) => {
    return (
        <button
            type={type}
            className={joinClasses(
                styles.button,
                loading && styles.loading,
                (fullWidth || loading) && styles.fullWidth,
                (icon ? true : false) && styles.withIcon
            )}
            disabled={disabled}
            onClick={onClick}
        >
            {(icon || loading) ? (
                <div className={styles.icon}>
                    {loading ? <Spinner /> : icon}
                </div>
            ) : null}
            <div className={styles.label}>
                {loading ? 'Loading...' : children}
            </div>
        </button>
    )
}

Button.defaultProps = {
    type: 'button',
    fullWidth: false,
    disabled: false,
    loading: false,
    onClick() {}
}

export default Button