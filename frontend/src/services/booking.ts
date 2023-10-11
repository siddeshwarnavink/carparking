import axios from '../axios-auth'
import { BookingFormData } from '../components/booking'

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
    interface CheckAvailabilityResponse {
        message: string
        available: boolean
    }
    try {
        const response = await axios.post<CheckAvailabilityResponse>('/booking/bookSlot', data)
        return response.data
    } catch (error) {
        throw error
    }
}