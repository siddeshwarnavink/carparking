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
import { setAuthUser } from './store/authSlice'
import Auth from './components/auth'
import Layout from './components/layout'
import Booking from './components/booking'


const queryClient = new QueryClient()

const App: React.FC = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state: State) => state.auth.isAuth)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      onVerifySessionHandler()
    }
  }, [])


  const onVerifySessionHandler = async () => {
    try {
      const response = await authServices.verifySession()
      dispatch(setAuthUser({ user: response.data.user }))
    } catch (error) {
      // localStorage.removeItem('token')
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          {isAuth ? (
            <Routes>
              <Route path='/' element={<Booking />} />
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
