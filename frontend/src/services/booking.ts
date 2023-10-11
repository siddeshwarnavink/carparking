import { AxiosError } from 'axios'
import axios from '../axios-auth'
import { BookingFormData } from '../components/booking'
import { IBooking } from '../store/bookingSlice'
import swal from 'sweetalert'

export const getUserBooking = async () => {
    interface UserBookingResponse {
        booking: IBooking
    }
    try {
        const response = await axios.get<UserBookingResponse>('/booking/userBooking')
        return response.data
    } catch (error) {
        throw error
    }
}

export const checkAvailability = async (data: BookingFormData) => {
    interface CheckAvailabilityResponse {
        message: string
        available: boolean
    }
    try {
        const response = await axios.post<CheckAvailabilityResponse>('/booking/checkAvailability', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const bookSlot = async (data: BookingFormData) => {
    interface BookSlotResponse {
        booking: IBooking
    }
    try {
        const response = await axios.post<BookSlotResponse>('/booking/bookSlot', data)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<{ errorMessage: string }>
        swal({
            icon: 'error',
            title: axiosError.response?.data.errorMessage
        })
        throw error
    }
}

export interface BookingCheckoutResponse {
    message: string
}

export const checkoutBooking = async (bookingCode: string) => {

    try {
        const response = await axios.patch<BookingCheckoutResponse>('/booking/checkin/checkoutBooking', { bookingCode })
        return response.data
    } catch (error) {
        throw error
    }
}

export interface BookingCheckinResponse {
    message: string
    booking: IBooking
}
export const checkinBooking = async (bookingCode: string) => {  
    try {
        const response = await axios.patch<BookingCheckinResponse>('/booking/checkin/checkinBooking', { bookingCode })
        return response.data
    } catch (error) {
        throw error
    }
}
