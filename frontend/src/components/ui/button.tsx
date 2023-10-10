import React from 'react'

import styles from './button.module.scss'
import { joinClasses } from '../../util'

interface ButtonProps {
    children: React.ReactNode
    type?: 'button' | 'submit'
}

const Button: React.FC<ButtonProps> = ({
    children,
    type
}) => {
    return (
        <button
            type={type}
            className={joinClasses(styles.button)}
        >
            {children}
        </button>
    )
}

Button.defaultProps = {
    type: 'button'
}

export default Button