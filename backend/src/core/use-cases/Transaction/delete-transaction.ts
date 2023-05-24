import moment from 'moment'
import { Transaction } from '../../entities/Transaction'

export const DeleteTransaction = (
  transaction: Omit<Transaction, 'amount' | 'type' | 'clientId'>
): Transaction | { error: boolean; message: string } | any => {
  const { dueDateTime } = transaction

  if (
    moment(moment(dueDateTime).format('YYYY-MM-DD')).isBefore(
      moment(moment.now()).format('YYYY-MM-DD')
    )
  ) {
    return {
      error: true,
      message: 'The transaction cannot be deleted before due date time.'
    }
  }

  return {
    error: false
  }
}
