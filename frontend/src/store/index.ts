import { configureStore } from '@reduxjs/toolkit'

import authSlice, { AuthState } from './authSlice'
import bookingSlice, { BookingState } from './bookingSlice'

export interface State {
    auth: AuthState,
    booking: BookingState
}

const store = configureStore({
    reducer: {
        auth: authSlice,
        booking: bookingSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store