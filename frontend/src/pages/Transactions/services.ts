import { api } from '../../../services/api'

interface Transaction {
  id: string
  amount: number
  type: 'received' | 'sent'
  clientId: string
  dueDateTime: string
  createdAt: string
  updatedAt: string
}

export const fetchTransactions = async (clientId: string) => {
  const response = await api.get<Transaction[]>(`/client/${clientId}/transaction`)
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