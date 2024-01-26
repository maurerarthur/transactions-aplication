import moment from 'moment'
import { Transaction } from '../../entities/Transaction'

export const UpsertTransaction = (
  transaction: Transaction
): Transaction | { error: boolean; message: string } | any => {
  const { amount, type, clientId, dueDate } = transaction

  const validTransactionTypes = ['sent', 'received']

  if(amount <= 0) {
    return {
      error: true,
      message: 'The amount should be higher than zero.'
    }
  }

  if(!type || !validTransactionTypes.includes(type)) {
    return {
      error: true,
      message: 'The type of the transaction should be sent or received.'
    }
  }

  if(!moment(dueDate, 'YYYY-MM-DD', true).isValid()) {
    return {
      error: true,
      message: 'The due date should be in year-month-day (yyyy-mm-dd) format.'
    }
  }

  return {
    amount: +amount,
    dueDate: moment(dueDate).format('YYYY-MM-DD'),
    clientId,
    type
  }
}