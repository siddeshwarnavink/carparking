import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import moment from 'moment'
import { useMutation, useQuery } from '@tanstack/react-query'

import * as bookingServices from '../../services/booking'
import PageCard from '../ui/pageCard'
import Button from '../ui/button'
import SelectInput, { SelectInputSize } from '../ui/selectInput'
import VehicleInput from './vehicleInput'
import ResponseStatus from '../ui/responseStatus'

export interface BookingFormData {
    date: string
    vehicleType: 'Car' | 'Bike' | 'Cycle'
}

const Booking: React.FC = () => {
    const bookingMutation = useMutation({
        mutationFn: bookingServices.bookSlot
    })

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
                        queryFn: () => bookingServices.checkAvailability(values)
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