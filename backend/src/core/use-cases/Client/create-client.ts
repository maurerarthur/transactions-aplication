import { Client } from '../../entities/Client'
import { hash } from 'bcrypt'

export const CreateClient = async (
  client: Client
): Promise<Client | { error: boolean; message: string }> => {
  const { email, name, password } = client

  if (password.length < 8) {
    return {
      error: true,
      message: 'The password needs to be at least 8 characters long.'
    }
  }

  if (password.includes(name)) {
    return {
      error: true,
      message: 'Your name cannot be a part of the password.'
    }
  }

  return {
    email,
    name,
    password: await hash(password, 10)
  }
}
