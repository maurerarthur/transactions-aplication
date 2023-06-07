import { createBrowserRouter } from 'react-router-dom'

import ErrorFallback from '../pages/ErrorFallback'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

export const router = createBrowserRouter([
  { path: '/', element: <Login />, errorElement: <ErrorFallback /> },
  { path: '/signin', element: <Login />, errorElement: <ErrorFallback /> },
  { path: '/signup', element: <Signup />, errorElement: <ErrorFallback /> }
])