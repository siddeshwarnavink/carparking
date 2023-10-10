import axios from '../axios'
import { IUser } from '../store/authSlice'

interface LoginUserResponse {
    message: string
    user: IUser
    token: string
}

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post<LoginUserResponse>('/auth/login', { email, password })
        return response
    } catch (error) {
        throw error
    }
}