import React from 'react'
import { useSelector } from 'react-redux'

import Button from '../ui/button'
import PageCard from '../ui/pageCard'
import BookingSlot from './bookingSlot'
import { State } from '../../store'

const BookingCheckedin: React.FC = () => {
    const currentBooking = useSelector((state: State) => state.booking.currentBooking)

    return (
        <PageCard
            icon={(
                <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80' fill='none'>
                    <path d='M30 33.3333L40.8603 41.4786C42.2553 42.5246 44.2207 42.319 45.369 41.007L66.6667 16.6666' stroke='#33363F' stroke-width='5' stroke-linecap='round' />
                    <path d='M70 40C70 46.2683 68.0367 52.379 64.3853 57.4743C60.7343 62.5697 55.5787 66.393 49.6433 68.408C43.7077 70.4227 37.29 70.5277 31.2915 68.7083C25.2931 66.8887 20.0153 63.2357 16.1994 58.263C12.3835 53.29 10.2212 47.2467 10.0161 40.9817C9.81097 34.7167 11.5734 28.5448 15.0559 23.3329C18.5384 18.121 23.566 14.1308 29.4325 11.9228C35.299 9.71481 41.71 9.39987 47.7647 11.0222' stroke='#33363F' stroke-width='5' stroke-linecap='round' />
                </svg>
            )}
            caption='Booking checked-in'
        >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <span className='dimmed'>Your vehicle is parked on</span>
                {currentBooking ? (
                    <BookingSlot
                        slotName={currentBooking.bookedSlot.spot}
                        location={currentBooking.bookedSlot.location}
                    />
                ) : null}
            </div>
            <Button
                fullWidth
            >
                Checkout
            </Button>
        </PageCard>
    )
}

export default BookingCheckedin