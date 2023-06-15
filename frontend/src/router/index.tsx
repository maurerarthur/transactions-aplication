import { createBrowserRouter } from 'react-router-dom'

import ErrorFallback from '../pages/ErrorFallback'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'

import {
  ROOT,
  SIGNIN,
  SIGNUP,
  DASHBOARD
} from './routes'

export const router = createBrowserRouter([
  { path: ROOT, element: <Login />, errorElement: <ErrorFallback /> },
  { path: SIGNIN, element: <Login />, errorElement: <ErrorFallback /> },
  { path: SIGNUP, element: <Signup />, errorElement: <ErrorFallback /> },
  { path: DASHBOARD, element: <Dashboard />, errorElement: <ErrorFallback /> }
])