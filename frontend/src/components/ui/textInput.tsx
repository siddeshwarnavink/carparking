import React from 'react'

import styles from './textInput.module.scss'
import { joinClasses } from '../../util'

interface TextInputProps {
    icon?: React.ReactNode
    name?: string
    type?: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    isInvalid?: boolean
    label?: string
}

const TextInput: React.FC<TextInputProps> = ({
    icon,
    type,
    name,
    value,
    onChange,
    placeholder,
    isInvalid,
    label
}) => {
    return (
        <div className={styles.formControl}>
            {label ? (
                <label className={styles.label}>{label}:</label>
            ) : null}
            <div className={joinClasses(styles.textInput, isInvalid && styles.invalid)}>
                {icon ? (
                    <div className={styles.icon}>
                        {icon}
                    </div>
                ) : null}
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}

TextInput.defaultProps = {
    isInvalid: false,
    type: 'text'
}

export default TextInput