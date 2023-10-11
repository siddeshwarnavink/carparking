import React, { useEffect } from 'react'
import {
  Route,
  Navigate,
  BrowserRouter,
  Routes
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { State } from './store'
import * as authServices from './services/auth'
import * as bookingServices from './services/booking'
import { setAuthUser } from './store/authSlice'
import Auth from './components/auth'
import Layout from './components/layout'
import Booking from './components/booking'
import { setCurrentBooking } from './store/bookingSlice'
import PendingBooking from './components/booking/pendingBooking'
import BookingCheckedin from './components/booking/bookingCheckedin'
import ProcessBooking from './components/processBooking'


const queryClient = new QueryClient()

const App: React.FC = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state: State) => state.auth.isAuth)
  const authUser = useSelector((state: State) => state.auth.user)
  const currentBooking = useSelector((state: State) => state.booking.currentBooking)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      onVerifySessionHandler()
    }
  }, [])


  const handleGetUserBooking = async () => {
    try {
      const { booking } = await bookingServices.getUserBooking()
      dispatch(setCurrentBooking({ booking }))
    } catch (error) {
      dispatch(setCurrentBooking({ booking: null }))
    }
  }

  const onVerifySessionHandler = async () => {
    try {
      const response = await authServices.verifySession()
      dispatch(setAuthUser({ user: response.data.user }))
      await handleGetUserBooking()
    } catch (error) {
      localStorage.removeItem('token')
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          {isAuth ? authUser?.role === 'Customer' ? (
            <Routes>
              <Route path='/' element={currentBooking ? currentBooking.pending ? <PendingBooking /> : <BookingCheckedin /> : <Booking />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/' element={<ProcessBooking />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/' element={<Navigate to='/auth' replace />} />
              <Route path='/auth' element={<Auth />} />
            </Routes>
          )}
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
