import React from 'react'

import styles from './selectInput.module.scss'
import { joinClasses } from '../../util'

export enum SelectInputSize {
    default,
    small
}

interface SelectInputProps {
    children: React.ReactNode
    size?: SelectInputSize
    label?: string
    icon?: React.ReactNode
    name?: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    isInvalid?: boolean
}

const SelectInput: React.FC<SelectInputProps> = ({
    icon,
    size,
    label,
    name,
    value,
    onChange,
    isInvalid,
    children
}) => {
    return (
        <>
            {label ? (
                <label className={styles.label}>{label}</label>
            ) : null}
            <div
                className={joinClasses(
                    styles.selectInput,
                    isInvalid && styles.invalid,
                    size === SelectInputSize.small && styles.sizeSamll
                )}>
                {icon ? (
                    <div className={styles.icon}>
                        {icon}
                    </div>
                ) : null}
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    {children}
                </select>
            </div>
        </>
    )
}

SelectInput.defaultProps = {
    isInvalid: false,
    size: SelectInputSize.default
}

export default SelectInput