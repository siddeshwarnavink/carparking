import React from 'react'

import styles from './bookingSlot.module.scss'

interface BookingSlotProps {
    slotName: string
    location: string
}

const BookingSlot: React.FC<BookingSlotProps> = ({ slotName, location }) => {
    return (
        <div className={styles.bookingSlot}>
            <div>
                <div className={styles.item}>
                    <div className={styles.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83333 3.5H22.1667C23.45 3.5 24.5 4.55 24.5 5.83333V22.1667C24.5 23.45 23.45 24.5 22.1667 24.5H5.83333C4.55 24.5 3.5 23.45 3.5 22.1667V5.83333C3.5 4.55 4.55 3.5 5.83333 3.5ZM22.1667 22.1667V5.83333H5.83333V22.1667H22.1667Z" fill="#2F2D3D" />
                        </svg>
                    </div>
                    <div className={styles.value}>{slotName}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14 2.33337C9.48504 2.33337 5.83337 5.98504 5.83337 10.5C5.83337 16.625 14 25.6667 14 25.6667C14 25.6667 22.1667 16.625 22.1667 10.5C22.1667 5.98504 18.515 2.33337 14 2.33337ZM8.16671 10.5C8.16671 7.28004 10.78 4.66671 14 4.66671C17.22 4.66671 19.8334 7.28004 19.8334 10.5C19.8334 13.86 16.4734 18.8884 14 22.0267C11.5734 18.9117 8.16671 13.825 8.16671 10.5ZM11.0834 10.5C11.0834 8.88921 12.3892 7.58337 14 7.58337C15.0421 7.58337 16.0049 8.13929 16.5259 9.04171C17.047 9.94413 17.047 11.056 16.5259 11.9584C16.0049 12.8608 15.0421 13.4167 14 13.4167C12.3892 13.4167 11.0834 12.1109 11.0834 10.5Z" fill="#2F2D3D" />
                        </svg>
                    </div>
                    <div className={styles.value}>{location}</div>
                </div>
            </div>
        </div>
    )
}


export default BookingSlot