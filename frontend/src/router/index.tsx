import { createBrowserRouter } from 'react-router-dom'

import ErrorFallback from '../pages/ErrorFallback'
import LayoutRoute from '../pages/LayoutRoute'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import User from '../pages/User'
import Transactions from '../pages/Transactions'

import {
  ROOT,
  SIGNIN,
  SIGNUP,
  DASHBOARD,
  USER,
  TRANSACTIONS
} from './routes'

export const router = createBrowserRouter([
  { path: ROOT, element: <Login />, errorElement: <ErrorFallback /> },
  { path: SIGNIN, element: <Login />, errorElement: <ErrorFallback /> },
  { path: SIGNUP, element: <Signup />, errorElement: <ErrorFallback /> },
  {
    path: DASHBOARD,
    element: (
      <LayoutRoute>
        <Dashboard />
      </LayoutRoute>
    ),
    errorElement: <ErrorFallback />
  },
  {
    path: USER,
    element: (
      <LayoutRoute>
        <User />
      </LayoutRoute>
    ),
    errorElement: <ErrorFallback />
  },
  {
    path: TRANSACTIONS,
    element: (
      <LayoutRoute>
        <Transactions />
      </LayoutRoute>
    ),
    errorElement: <ErrorFallback />
  }
])