import { describe, it, expect } from 'vitest'
import { removeObjectAttributes } from './common'

describe('removeObjectAttributes', () => {
  it('should not remove any attribute from object', () => {
    const obj = removeObjectAttributes({ age: 10 }, [''])
    expect(obj).toContain({ age: 10 })
  })

  it('should remove 1 attribute from object', () => {
    const obj = removeObjectAttributes({ name: '...', age: 10 }, ['age'])
    expect(obj).not.toContain({ age: 10 })
  })

  it('should remove 2 attributes from object', () => {
    const obj = removeObjectAttributes({ name: '...', age: 10, email: '...@gmail.com' }, ['age', 'email'])
    expect(obj).not.toContain({ age: 10, email: '...@gmail.com' })
  })
})