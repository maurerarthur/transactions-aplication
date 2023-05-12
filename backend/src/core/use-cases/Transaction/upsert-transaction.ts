import { Transaction } from '../../entities/Transaction'

export const UpsertTransaction = (
  transaction: Transaction
): Transaction | { error: boolean; message: string } | any => {
  const { amount, type, clientId, dueDateTime } = transaction

  const validTransactionTypes = ['sent', 'received']

  if (amount <= 0) {
    return {
      error: true,
      message: 'The amount should be higher than zero.'
    }
  }

  if (!type || !validTransactionTypes.includes(type)) {
    return {
      error: true,
      message: 'The type of the transaction should be sent or received'
    }
  }

  return {
    amount: +amount,
    clientId: +clientId,
    dueDateTime: new Date(dueDateTime).toISOString(),
    type
  }
}
