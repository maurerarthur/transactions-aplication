import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
import { UpsertTransaction } from './upsert-transaction'

const prisma = new PrismaClient()

export const CreateTransaction = (req: Request, res: Response) => {
  const { amount, type, clientId, dueDateTime } = req.body

  const transaction = UpsertTransaction({ amount, type, clientId, dueDateTime })

  if (transaction.error) {
    return res.status(400).send(transaction)
  }

  const create = async () => {
    try {
      const createdTransaction = await prisma.transaction.create({
        data: transaction
      })

      res.status(201).send(createdTransaction)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          return res.status(409).send({
            error: true,
            message: 'A client ID is required in order to create a transaction.'
          })
        }

        throw error
      }
    }
  }

  create().finally(async () => await prisma.$disconnect())
}
