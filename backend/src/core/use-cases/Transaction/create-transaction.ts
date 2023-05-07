import { Transaction } from '../../entities/Transaction'

export const CreateTransaction = (transaction: Transaction): Transaction | { error: boolean, message: string } => {
	const { amount, type, clientId } = transaction

	if(!amount || amount === 0) {
		return {
			error: true,
			message: 'The amount should be higher than zero.'
		}
	}

	if(!type) {
		return {
			error: true,
			message: 'The type should be sent or received.'
		}
	}

  if(!clientId) {
    return {
      error: true,
      message: 'The transaction should have a client.'
    }
  }

	return {
		amount,
		type,
    clientId
	}
}