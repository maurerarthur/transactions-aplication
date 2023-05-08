import { Transaction } from '../../entities/Transaction'

export const CreateTransaction = (
  transaction: Transaction
): Transaction | { error: boolean; message: string } => {
  const { amount, type, clientId } = transaction

  if (amount <= 0) {
    return {
      error: true,
      message: 'The amount should be higher than zero.'
    }
  }

  return {
    amount,
    type,
    clientId
  }
}
