import moment from 'moment'
import { Transaction } from '../../entities/Transaction'

export const DeleteTransaction = (
  transaction: Omit<Transaction, 'amount' | 'type' | 'clientId'>
): Transaction | { error: boolean; message: string } | any => {
  const { dueDate } = transaction

  if (moment(moment.now()).isBefore(dueDate)) {
    return {
      error: true,
      message: 'The transaction cannot be deleted before due date.'
    }
  }

  return {
    error: false
  }
}
