import { describe, it, expect } from 'vitest'
import moment from 'moment'
import { DeleteTransaction } from './delete-transaction'

describe('delete-transaction', () => {
  it('should not be able to delete transaction before due date', () => {
    const deletedTransaction = DeleteTransaction({
      dueDate: moment().add(10, 'days').format('YYYY-MM-DD')
    })

    expect(deletedTransaction).toContain({
      error: true
    })
  })

  it('should be able to delete transaction after due date', () => {
    const deletedTransaction = DeleteTransaction({
      dueDate: moment().subtract(10, 'days').format('YYYY-MM-DD')
    })

    expect(deletedTransaction).toContain({
      error: false
    })
  })
})