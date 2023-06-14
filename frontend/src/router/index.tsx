import { createBrowserRouter } from 'react-router-dom'

import ErrorFallback from '../pages/ErrorFallback'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

import {
  ROOT,
  SIGNIN,
  SIGNUP
} from './routes'

export const router = createBrowserRouter([
  { path: ROOT, element: <Login />, errorElement: <ErrorFallback /> },
  { path: SIGNIN, element: <Login />, errorElement: <ErrorFallback /> },
  { path: SIGNUP, element: <Signup />, errorElement: <ErrorFallback /> }
])