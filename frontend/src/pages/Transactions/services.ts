import { api } from '../../../services/api'

interface Transaction {
  id: string
  amount: number
  type: 'received' | 'sent'
  clientId: string
  dueDate: string
  createdAt: string
  updatedAt: string
}

export const fetchTransactions = async (clientId: string) => {
  const response = await api.get<Transaction[]>(`/client/${clientId}/transaction`)
  return response.data
}

export const addTransaction = async({
  clientId,
  data
}: {
  clientId: string
  data: {
    amount: number
    type: string
    dueDate: string
  }
}) => {
  const response = await api.post(`client/${clientId}/transaction`, data)
  return response.data
}

export const editTransaction = async({
  clientId,
  transactionId,
  data
}: {
  clientId: string
  transactionId: string
  data: {
    amount: number
    type: string
    dueDate: string
  }
}) => {
  const response = await api.put(`client/${clientId}/transaction/${transactionId}`, data)
  return response.data
}

export const deleteTransaction = async({
  clientId,
  transactionId
}: {
  clientId: string
  transactionId: string
}) => {
  const response = await api.delete(`/client/${clientId}/transaction/${transactionId}`)
  return response.data
}