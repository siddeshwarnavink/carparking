import axios from '../axios-auth'
import { BookingFormData } from '../components/booking'
import { IBooking } from '../store/bookingSlice'

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
        throw error
    }
}

export const checkoutBooking = async (bookingCode: string) => {
    interface BookingCheckoutResponse {
        message: string
    }
    try {
        const response = await axios.patch<BookingCheckoutResponse>('/booking/checkin/checkoutBooking', { bookingCode })
        return response.data
    } catch (error) {
        throw error
    }
}
