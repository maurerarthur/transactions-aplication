import { api } from '../../../services/api'

import { signup } from './Signup'

export const requestSignup = async (data: signup) => {
  const response = await api.post('/signup', data)
  return response.data
}