import React from 'react'
import {
  Route,
  Navigate,
  BrowserRouter,
  Routes
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { State } from './store'
import Auth from './components/auth'
import Layout from './components/layout'


const queryClient = new QueryClient()

const App: React.FC = () => {
  const isAuth = useSelector((state: State) => state.auth.isAuth)
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          {isAuth ? (
            <Routes>
              <Route path='/' element={<h1>Welcome user</h1>} />
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
