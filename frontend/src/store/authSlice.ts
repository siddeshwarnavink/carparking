import { createSlice } from '@reduxjs/toolkit'

export interface IUser {
    name: string
    email: string
    role: 'CheckinStaff' | 'Customer'
}

export interface AuthState {
    isAuth: boolean
    user: IUser | null
}

const initialState: AuthState = {
    isAuth: false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action: { payload: { user: IUser } }) => {
            let updatedState: AuthState = {
                ...state
            }
            updatedState.isAuth = true
            updatedState.user = action.payload.user
            return updatedState
        }
    }
})

export const {
    setAuthUser
} = authSlice.actions

export default authSlice.reducer