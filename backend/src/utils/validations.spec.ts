import { describe, it, expect } from 'vitest'

import { validateEmail } from './validations'

describe('validateEmail', () => {
  it('should validate email successfully', () => {
    const email = '123@gmail.com'
    expect(validateEmail(email)).toBeTruthy()
  })

  it('should not validate email', () => {
    const email = '123@gmail'
    expect(validateEmail(email)).toBeFalsy()
  })
})
