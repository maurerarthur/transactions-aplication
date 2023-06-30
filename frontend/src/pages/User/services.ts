import { api } from '../../../services/api'

import { IUserForm } from './User'

export const updateUser = async({
  clientId,
  params
}: {
  clientId: string
  params: IUserForm
}) => {
  const response = await api.put(`/client/${clientId}`, params)
  return response.data
}

export const deleteUser = async (clientId: string) => {
  const response = await api.delete(`/client/${clientId}`)
  return response.data
}