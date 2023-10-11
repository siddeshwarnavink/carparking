import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import swal from 'sweetalert'
import { AxiosError } from 'axios'
import { useDispatch } from 'react-redux'

import * as authServices from '../../services/auth'
import { setAuthUser } from '../../store/authSlice'
import PageCard from '../ui/pageCard'
import TextInput from '../ui/textInput'
import Button from '../ui/button'

const Auth: React.FC = () => {
    const dispatch = useDispatch()

    const schema = yup.object().shape({
        email: yup.string().required('Email is a required'),
        password: yup.string().required('Password is a required'),
    })

    const onAuthenticationHandler = async ({ email, password }: { email: string, password: string }) => {
        try {
            const response = await authServices.loginUser(email, password)
            localStorage.setItem('token', response.data.token)
            dispatch(setAuthUser({ user: response.data.user }))
        } catch (error) {
            const axiosError = error as AxiosError<{ errorMessage: string }>
            if (axiosError.response) {
                swal({
                    title: axiosError.response.data.errorMessage,
                    icon: 'error',
                })
            } else {
                swal({
                    title: axiosError.message,
                    icon: 'error',
                })
            }
        }
    }


    return (
        <PageCard
            caption='Secure authentication'
            icon={(
                <img src='/icons/AuthKeyIcon.svg' alt='' />
            )}
        >
            <Formik
                validationSchema={schema}
                onSubmit={onAuthenticationHandler}
                initialValues={{ email: '', password: '' }}
            >
                {({ handleSubmit, values, touched, handleChange, errors }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <TextInput
                                name='email'
                                placeholder='E-mail address'
                                icon={<img alt='' src='/icons/EmailIcon.svg' />}
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={(touched.email && errors.email) ? true : false}
                            />
                            <TextInput
                                name='password'
                                placeholder='Password'
                                icon={<img alt='' src='/icons/KeyIcon.svg' />}
                                type='password'
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={(touched.password && errors.password) ? true : false}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button type='submit'>Login now</Button>
                            </div>
                        </form>
                    )
                }}
            </Formik>
        </PageCard>
    )
}

export default Auth