import { describe, it, expect } from 'vitest'
import { CreateTransaction } from './create-transaction'

describe('create-transaction', () => {
  it('should allow to create transaction', () => {
    const transaction = CreateTransaction({
      amount: 10,
      type: 'sent',
      clientId: 1
    })

    expect(transaction).toEqual({
      amount: 10,
      type: 'sent',
      clientId: 1
    })
  })

  it('should not allow to create transaction with negative value', () => {
    const transaction = CreateTransaction({
      amount: -10,
      type: 'sent',
      clientId: 1
    })

    expect(transaction).toContain({
      error: true
    })
  })

  it('should not allow to create transaction with zero value', () => {
    const transaction = CreateTransaction({
      amount: 0,
      type: 'sent',
      clientId: 1
    })

    expect(transaction).toContain({
      error: true
    })
  })
})
