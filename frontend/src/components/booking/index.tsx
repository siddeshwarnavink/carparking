import React, { useEffect } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import moment from 'moment'
import { useMutation, useQuery } from '@tanstack/react-query'

import * as bookingServices from '../../services/booking'
import { delay } from '../../util'
import PageCard from '../ui/pageCard'
import Button from '../ui/button'
import SelectInput, { SelectInputSize } from '../ui/selectInput'
import VehicleInput from './vehicleInput'
import ResponseStatus from '../ui/responseStatus'
import { useDispatch } from 'react-redux'
import { setCurrentBooking } from '../../store/bookingSlice'

export interface BookingFormData {
    date: string
    vehicleType: 'Car' | 'Bike' | 'Cycle'
}

const Booking: React.FC = () => {
    const dispatch = useDispatch()
    const bookingMutation = useMutation({
        mutationFn: bookingServices.bookSlot
    })
    useEffect(() => {
        if (!bookingMutation.isError && bookingMutation.isSuccess) {
            dispatch(setCurrentBooking({ booking: bookingMutation.data.booking }))
        }
    }, [bookingMutation])



    const schema = yup.object().shape({
        date: yup
            .string()
            .required('Date is required')
            .matches(
                /^(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])-\d{4}$/,
                'Date must be in the format MM-dd-YYYY'
            ),
        vehicleType: yup
            .string()
            .required('VehicleType is required')
            .oneOf(['Car', 'Bike', 'Cycle'], 'Invalid vehicle type')
    })

    const todaysDate = moment().format('MM-DD-YYYY')
    const tomorrowsDate = moment().add(1, 'days').format('MM-DD-YYYY')

    return (
        <PageCard
            icon={<img src='/icons/CheckinIcon.svg' alt='' />}
            caption='Book parking slot'
        >
            <Formik
                validationSchema={schema}
                onSubmit={bookingMutation.mutate}
                initialValues={{ date: todaysDate, vehicleType: 'Car' } as BookingFormData}
            >
                {({ handleSubmit, values, touched, handleChange, errors }) => {
                    const checkAvailabilityQuery = useQuery({
                        queryKey: ['checkBookingAvailability', JSON.stringify(values)],
                        queryFn: async () => {
                            const startTime = Date.now()

                            const response = await bookingServices.checkAvailability(values)

                            const elapsedTime = Date.now() - startTime
                            const remainingTime = Math.max(1000 - elapsedTime, 0)
                            await delay(remainingTime)

                            return response
                        }
                    })

                    return (
                        <form onSubmit={handleSubmit}>
                            <SelectInput
                                name='date'
                                value={values.date}
                                onChange={handleChange}
                                icon={<img alt='' src='/icons/CalendarIcon.svg' />}
                                label='Booking date:'
                                isInvalid={(touched.date && errors.date) ? true : false}
                                size={SelectInputSize.small}
                            >
                                <option value={tomorrowsDate}>Tomorrow</option>
                                <option value={todaysDate}>Today</option>
                            </SelectInput>
                            <VehicleInput
                                value={values.vehicleType}
                            />
                            <ResponseStatus
                                message={`${checkAvailabilityQuery.data?.message}`}
                                loading={checkAvailabilityQuery.isLoading}
                                success={checkAvailabilityQuery.data?.available}
                            />
                            <Button
                                type='submit'
                                loading={bookingMutation.isLoading}
                                disabled={checkAvailabilityQuery.isLoading || !checkAvailabilityQuery.data?.available}
                                fullWidth
                                icon={<img alt='' src='/icons/TicketIcon.svg' />}
                            >
                                Book a parking slot
                            </Button>
                        </form>
                    )
                }}
            </Formik>
        </PageCard>
    )
}

export default Booking