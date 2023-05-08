import { describe, it, expect } from 'vitest'
import { CreateClient } from './create-client'

describe('create-client', () => {
  it('should create a client', async () => {
    const client = await CreateClient({
      email: 'client@gmail.com',
      name: 'Client',
      password: '12345678'
    })

    //@ts-ignore
    const { password } = client

    expect(client).toEqual({
      email: 'client@gmail.com',
      name: 'Client',
      password
    })
  })

  it('should not create client because the password is too short', async () => {
    const client = await CreateClient({
      email: 'client@gmail.com',
      name: 'Client',
      password: '123'
    })

    expect(client).toContain({
      error: true
    })
  })

  it('should not create client because the password includes the client name', async () => {
    const client = await CreateClient({
      email: 'client@gmail.com',
      name: 'Client',
      password: 'Client123'
    })

    expect(client).toContain({
      error: true
    })
  })
})
