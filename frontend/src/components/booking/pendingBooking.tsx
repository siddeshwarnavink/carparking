import React from 'react'
import { useSelector } from 'react-redux'

import styles from './pendingBooking.module.scss'
import { State } from '../../store'
import PageCard from '../ui/pageCard'
import Button from '../ui/button'
import QRCode from 'react-qr-code'
import BookingSlot from './bookingSlot'

const PendingBooking: React.FC = () => {
    const currentBooking = useSelector((state: State) => state.booking.currentBooking)
    return (
        <PageCard
            caption='Your booking is completed'
        >
            <div className={styles.pendingBooking}>
                {currentBooking?.bookingCode ? (
                    <div className={styles.qrCode}>
                        <QRCode value={currentBooking?.bookingCode} />
                    </div>
                ) : null}
                <span className={styles.bookingCode}>{currentBooking?.bookingCode}</span>
                {currentBooking ? (
                    <BookingSlot
                        slotName={currentBooking.bookedSlot.spot}
                        location={currentBooking.bookedSlot.location}
                    />
                ) : null}
                <span className='dimmed'>Scan this QR code or use the code to access your parking space</span>
            </div>
            <Button
                fullWidth
                icon={(
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M20 3.00001C16.6377 3.00001 13.3509 3.99704 10.5553 5.86502C7.75968 7.73301 5.58075 10.388 4.29406 13.4944C3.00737 16.6007 2.67071 20.0189 3.32666 23.3165C3.98261 26.6142 5.6017 29.6433 7.97919 32.0208C10.3567 34.3983 13.3858 36.0174 16.6835 36.6734C19.9811 37.3293 23.3993 36.9926 26.5056 35.706C29.612 34.4193 32.267 32.2403 34.135 29.4447C36.003 26.6491 37 23.3623 37 20C37.0019 17.767 36.5634 15.5556 35.7097 13.4922C34.856 11.4288 33.6039 9.55405 32.0249 7.97508C30.446 6.39612 28.5712 5.14398 26.5078 4.2903C24.4444 3.43663 22.233 2.99816 20 3.00001ZM20 33C17.4288 33 14.9154 32.2376 12.7776 30.8091C10.6398 29.3807 8.97351 27.3503 7.98957 24.9749C7.00563 22.5994 6.74819 19.9856 7.2498 17.4638C7.75141 14.9421 8.98954 12.6257 10.8076 10.8076C12.6257 8.98953 14.9421 7.75141 17.4638 7.2498C19.9856 6.74819 22.5995 7.00563 24.9749 7.98957C27.3503 8.97351 29.3807 10.6398 30.8091 12.7776C32.2376 14.9154 33 17.4288 33 20C33.0034 21.7082 32.6695 23.4002 32.0174 24.9789C31.3653 26.5577 30.4079 27.9922 29.2 29.2C27.9922 30.4079 26.5577 31.3653 24.9789 32.0174C23.4002 32.6695 21.7082 33.0034 20 33Z" fill="black" />
                        <path d="M25.7 14.8C25.5193 14.6105 25.3021 14.4596 25.0615 14.3566C24.8208 14.2535 24.5618 14.2003 24.3 14.2003C24.0382 14.2003 23.7791 14.2535 23.5384 14.3566C23.2978 14.4596 23.0806 14.6105 22.9 14.8L20 17.7L17.2 14.9C16.8274 14.5349 16.3258 14.3316 15.8041 14.3342C15.2824 14.3368 14.7829 14.5452 14.414 14.9141C14.0452 15.283 13.8368 15.7825 13.8341 16.3042C13.8315 16.8258 14.0348 17.3274 14.4 17.7L17.2 20.5L14.4 23.3C14.0348 23.6726 13.8315 24.1742 13.8341 24.6959C13.8368 25.2175 14.0452 25.7171 14.414 26.0859C14.7829 26.4548 15.2824 26.6632 15.8041 26.6659C16.3258 26.6685 16.8274 26.4651 17.2 26.1L20 23.3L22.8 26.1C23.1725 26.4651 23.6742 26.6685 24.1958 26.6659C24.7175 26.6632 25.217 26.4548 25.5859 26.0859C25.9548 25.7171 26.1632 25.2175 26.1658 24.6959C26.1684 24.1742 25.9651 23.6726 25.6 23.3L22.8 20.5L25.6 17.7C25.975 17.316 26.1931 16.8058 26.2116 16.2694C26.23 15.733 26.0476 15.209 25.7 14.8Z" fill="black" />
                    </svg>
                )}
            >
                Cancel your booking
            </Button>
        </PageCard>
    )
}

export default PendingBooking