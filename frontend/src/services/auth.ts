import axiosWihoutAuth from '../axios'
import axios from '../axios-auth'
import { IUser } from '../store/authSlice'


export const loginUser = async (email: string, password: string) => {
    interface LoginUserResponse {
        message: string
        user: IUser
        token: string
    }
    try {
        const response = await axiosWihoutAuth.post<LoginUserResponse>('/auth/login', { email, password })
        return response
    } catch (error) {
        throw error
    }
}

export const verifySession = async () => {
    interface VerifySessionResponse {
        message: string
        user: IUser
    }
    try {
        const response = await axios.post<VerifySessionResponse>('/auth/verify')
        return response
    } catch (error) {
        throw error
    }
}