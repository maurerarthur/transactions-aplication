import { describe, it, expect } from 'vitest'
import { UpsertTransaction } from './upsert-transaction'

describe('create-transaction', () => {
  it('should allow to create transaction', () => {
    const transaction = UpsertTransaction({
      amount: 10,
      type: 'sent',
      clientId: '1',
      dueDate: '2025-01-30'
    })

    expect(transaction).toEqual({
      amount: 10,
      type: 'sent',
      clientId: '1',
      dueDate: '2025-01-30'
    })
  })

  it('should not allow to create transaction with negative value', () => {
    const transaction = UpsertTransaction({
      amount: -10,
      type: 'sent',
      clientId: '1',
      dueDate: '2025-01-30'
    })

    expect(transaction).toContain({
      error: true
    })
  })

  it('should not allow to create transaction with zero value', () => {
    const transaction = UpsertTransaction({
      amount: 0,
      type: 'sent',
      clientId: '1',
      dueDate: '2025-01-30'
    })

    expect(transaction).toContain({
      error: true
    })
  })

  it('should not allow to create transaction with type different than sent or received', () => {
    const transaction = UpsertTransaction({
      //@ts-ignore
      type: '',
      amount: 0,
      clientId: '1',
      dueDate: '2025-01-30'
    })

    expect(transaction).toContain({
      error: true
    })
  })

  it('should not allow to create transaction with wrong dueDate format', () => {
    const transaction = UpsertTransaction({
      amount: 0,
      type: 'sent',
      clientId: '1',
      dueDate: '2025-01'
    })

    expect(transaction).toContain({
      error: true
    })
  })
})
