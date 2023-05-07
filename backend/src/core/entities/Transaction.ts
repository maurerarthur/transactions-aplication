export interface Transaction {
	amount: number
	type: 'sent' | 'received'
  clientId: number
}