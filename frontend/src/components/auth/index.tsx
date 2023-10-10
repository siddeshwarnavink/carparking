import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import PageCard from '../ui/pageCard'
import TextInput from '../ui/textInput'
import Button from '../ui/button'

const Auth: React.FC = () => {
    const schema = yup.object().shape({
        email: yup.string().required('Email is a required'),
        password: yup.string().required('Email is a required'),
    })

    const onAuthenticationHandler = ({ email, password }: { email: string, password: string }) => {
        console.log({ email, password });
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

                            <div style={{ textAlign: 'center' }}>
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