import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { PrismaClient, Prisma } from '@prisma/client'
import { UpsertClient } from './upsert-client'
import { removeObjectAttributes } from '../../../utils/common'

const prisma = new PrismaClient()

export const ClientSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const client = await UpsertClient({ name, email, password })

  if (client.error) {
    return res.status(400).send(client)
  }

  const create = async () => {
    try {
      const createdClient = await prisma.client.create({
        data: client
      })

      const createdClientWithoutPassword = removeObjectAttributes(createdClient, ['password'])

      return res.status(201).send(createdClientWithoutPassword)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(409).send({ error: true, message: 'The email already exists.' })
        }

        throw error
      }
    }
  }

  create().finally(async () => await prisma.$disconnect())
}

export const ClientSignin = (req: Request, res: Response) => {
  const { email, password } = req.body

  const find = async () => {
    try {
      const client = await prisma.client.findUnique({
        where: {
          email
        }
      })

      if (!client) {
        return res.status(404).send({
          error: true,
          message: 'Client not found.'
        })
      }

      const clientData = {
        id: client.id,
        email: client.email,
        name: client.name
      }

      const token = sign(clientData, process.env.JWT_SECRET!.toString(), {
        expiresIn: process.env.JWT_EXPIRY!.toString()
      })

      if (await compare(password, client?.password)) {
        return res.status(200).send({
          ...clientData,
          token
        })
      }

      return res.status(403).send({
        error: true,
        message: 'Wrong email or password.'
      })
    } catch (error) {
      throw error
    }
  }

  find().finally(async () => await prisma.$disconnect())
}

export const ClientView = (req: Request, res: Response) => {
  const { id } = req.params

  const view = async () => {
    try {
      const client = await prisma.client.findUnique({
        where: {
          id: +id
        }
      })

      const clientWithoutPassword = removeObjectAttributes(client, ['password'])

      return res.status(200).send(clientWithoutPassword)
    } catch (error) {
      throw error
    }
  }

  view().finally(async () => await prisma.$disconnect())
}

export const ClientUpdate = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, email, password } = req.body

  const client = await UpsertClient({ name, email, password })

  if (client.error) {
    return res.status(400).send(client)
  }

  const update = async () => {
    try {
      const updatedClient = await prisma.client.update({
        where: {
          id: +id
        },
        data: client
      })

      const updatedClientWithoutPassword = removeObjectAttributes(updatedClient, ['password'])

      return res.status(200).send(updatedClientWithoutPassword)
    } catch (error) {
      throw error
    }
  }

  update().finally(async () => await prisma.$disconnect())
}

export const ClientDelete = async (req: Request, res: Response) => {
  const { id } = req.params

  const deleteClient = async () => {
    try {
      await prisma.client.delete({
        where: {
          id: +id
        }
      })

      return res.status(200).send({ error: false, message: `Client with ID ${id} deleted.` })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return res.status(404).send({ error: true, message: 'Client not found.' })
        }

        throw error
      }
    }
  }

  deleteClient().finally(async () => await prisma.$disconnect())
}
