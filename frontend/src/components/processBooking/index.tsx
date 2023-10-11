import React, { useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import swal from 'sweetalert'

import styles from './processBooking.module.scss'
import * as bookingServices from '../../services/booking'
import PageCard from '../ui/pageCard'
import Button from '../ui/button'
import TextInput from '../ui/textInput'
import { IBooking } from '../../store/bookingSlice'
import BookingSlot from '../booking/bookingSlot'
import useCountdown from '../../hooks/useCountdown'

const ProcessBooking: React.FC = () => {
    const [isCheckout, setIsCheckout] = useState(false)
    const [booking, setBooking] = useState<IBooking | null>(null)
    const checkinMutation = useMutation({
        mutationFn: bookingServices.checkinBooking
    })
    const schema = yup.object().shape({
        bookingCode: yup.string().required('Booking code is a required')
    })
    const autoBackCountdown = useCountdown(3, () => setBooking(null))

    const onProcessBookingHandler = async ({ bookingCode }: { bookingCode: string }) => {
        try {
            const { booking } = await checkinMutation.mutateAsync(bookingCode)
            setBooking(booking)
            autoBackCountdown.startCountdown()
        } catch (error) {
            const axiosError = error as AxiosError<{ errorMessage: string }>
            if (axiosError.response) {
                swal({
                    icon: 'error',
                    title: axiosError.response.data.errorMessage,
                })
            } else {
                swal({
                    icon: 'error',
                    title: axiosError.message,
                })
            }
        }
    }

    if (booking !== null) {
        return (
            <PageCard
                caption='Booking checked-in'
                icon={(
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path d="M30 33.3333L40.8603 41.4787C42.2553 42.5247 44.2207 42.319 45.369 41.007L66.6667 16.6667" stroke="#33363F" stroke-width="5" stroke-linecap="round" />
                        <path d="M70 40C70 46.2683 68.0367 52.379 64.3853 57.4743C60.7343 62.5697 55.5787 66.393 49.6433 68.408C43.7077 70.4227 37.29 70.5277 31.2915 68.7083C25.2931 66.8887 20.0153 63.2357 16.1994 58.263C12.3835 53.29 10.2212 47.2467 10.0161 40.9817C9.81097 34.7167 11.5734 28.5448 15.0559 23.3329C18.5384 18.121 23.566 14.1308 29.4325 11.9228C35.299 9.71481 41.71 9.39987 47.7647 11.0222" stroke="#33363F" stroke-width="5" stroke-linecap="round" />
                    </svg>
                )}
            >
                <BookingSlot slotName={booking.bookedSlot.spot} location={booking.bookedSlot.location} />
                <Button fullWidth type='submit' onClick={() => setBooking(null)}>
                    Go back
                </Button>
                <div className={styles.autoback}>
                    <span className='dimmed'>Automatically going back in {autoBackCountdown.timeLeft}s...</span>
                </div>
            </PageCard>
        )
    }

    return (
        <PageCard
            caption='Process booking'
            icon={(
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <g clip-path="url(#clip0_221_770)">
                        <path d="M13.3333 13.3333H33.3333V33.3333H13.3333V13.3333ZM66.6667 13.3333V33.3333H46.6667V13.3333H66.6667ZM46.6667 50H53.3333V43.3333H46.6667V36.6667H53.3333V43.3333H60V36.6667H66.6667V43.3333H60V50H66.6667V60H60V66.6667H53.3333V60H43.3333V66.6667H36.6667V53.3333H46.6667V50ZM53.3333 50V60H60V50H53.3333ZM13.3333 66.6667V46.6667H33.3333V66.6667H13.3333ZM20 20V26.6667H26.6667V20H20ZM53.3333 20V26.6667H60V20H53.3333ZM20 53.3333V60H26.6667V53.3333H20ZM13.3333 36.6667H20V43.3333H13.3333V36.6667ZM30 36.6667H43.3333V50H36.6667V43.3333H30V36.6667ZM36.6667 20H43.3333V33.3333H36.6667V20ZM6.66667 6.66667V20H0V6.66667C0 4.89856 0.702379 3.20286 1.95262 1.95262C3.20286 0.702379 4.89856 0 6.66667 0L20 0V6.66667H6.66667ZM73.3333 0C75.1014 0 76.7971 0.702379 78.0474 1.95262C79.2976 3.20286 80 4.89856 80 6.66667V20H73.3333V6.66667H60V0H73.3333ZM6.66667 60V73.3333H20V80H6.66667C4.89856 80 3.20286 79.2976 1.95262 78.0474C0.702379 76.7971 0 75.1014 0 73.3333V60H6.66667ZM73.3333 73.3333V60H80V73.3333C80 75.1014 79.2976 76.7971 78.0474 78.0474C76.7971 79.2976 75.1014 80 73.3333 80H60V73.3333H73.3333Z" fill="black" />
                    </g>
                    <defs>
                        <clipPath id="clip0_221_770">
                            <rect width="80" height="80" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            )}
        >
            <Formik
                validationSchema={schema}
                onSubmit={onProcessBookingHandler}
                initialValues={{ bookingCode: '' }}
            >
                {({ handleSubmit, values, touched, handleChange, errors }) => {
                    return (
                        <form onSubmit={handleSubmit} className={styles.processBooking}>
                            <span className='dimmed'>Scan the QR code or use the code to access process the booking</span>

                            <TextInput
                                label='Enter Code'
                                name='bookingCode'
                                placeholder='XXXXXX'
                                value={values.bookingCode}
                                onChange={handleChange}
                                isInvalid={(touched.bookingCode && errors.bookingCode) ? true : false}
                            />
                            <div className={styles.button}>
                                <Button fullWidth type='submit'>
                                    Verify booking
                                </Button>
                            </div>
                        </form>
                    )
                }}
            </Formik>
        </PageCard>
    )
}

export default ProcessBooking