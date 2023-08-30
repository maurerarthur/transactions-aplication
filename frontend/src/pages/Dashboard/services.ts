import { api } from '../../../services/api'

import { Transaction } from '../Transactions/services'

export const fetchTransactionsResume = async (clientId: string) => {
  const response = await api.get<Transaction[]>(`/client/${clientId}/transaction/resume`)
  return response.data
}