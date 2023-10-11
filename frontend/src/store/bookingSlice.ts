import { createSlice } from '@reduxjs/toolkit'

export interface IBooking {
    bookingCode: string,
    bookedSlot: {
        location: string
        spot: string
    }
}

export interface BookingState {
    currentBooking: IBooking | null
    isFetched: boolean
}

const initialState: BookingState = {
    currentBooking: null,
    isFetched: false
}

export const bookingSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentBooking: (state, action: { payload: { booking: IBooking | null } }) => {
            let updatedState: BookingState = {
                ...state
            }
            updatedState.isFetched = true
            updatedState.currentBooking = action.payload.booking
            return updatedState
        }
    }
})

export const {
    setCurrentBooking
} = bookingSlice.actions

export default bookingSlice.reducer