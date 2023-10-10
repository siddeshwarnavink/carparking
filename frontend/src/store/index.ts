import { configureStore } from '@reduxjs/toolkit'

import authSlice, { AuthState } from './authSlice'

export interface State {
    auth: AuthState
}

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store