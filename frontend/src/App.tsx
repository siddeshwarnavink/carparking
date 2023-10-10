import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Auth from './components/auth'
import Layout from './components/layout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navigate to='/auth' replace />} />
      <Route path='/auth' element={<Auth />} />
    </>
  )
)

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Layout>
    </QueryClientProvider>
  )
}

export default App
