import { api } from '../../../services/api'

import { signin } from './Login'

export const requestSignin = async (data: signin) => {
  const response = await api.post('/signin', data)
  return response.data
}