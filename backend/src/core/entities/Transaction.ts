export interface Transaction {
  amount: number
  type: 'sent' | 'received'
  clientId: string
  dueDateTime: string
}
