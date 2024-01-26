import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
import { UpsertTransaction } from '../use-cases/Transaction/upsert-transaction'
import { DeleteTransaction } from '../use-cases/Transaction/delete-transaction'

const prisma = new PrismaClient()

export const TransactionView = (req: Request, res: Response) => {
  const { id } = req.params

  const view = async () => {
    try {
      const transaction = await prisma.transaction.findUnique({
        where: {
          id
        }
      })

      return res.status(200).send(transaction)
    } catch(error) {
      throw error
    }
  }

  view().finally(async () => await prisma.$disconnect())
}

export const TransactionViewAll = (req: Request, res: Response) => {
  const { clientId } = req.params

  const view = async () => {
    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          clientId
        }
      })

      return res.status(200).send(transactions)
    } catch(error) {
      throw error
    }
  }

  view().finally(async () => await prisma.$disconnect())
}

export const TransactionCreate = (req: Request, res: Response) => {
  const { clientId } = req.params
  const { amount, type, dueDate } = req.body

  const transaction = UpsertTransaction({ amount, type, clientId, dueDate })

  if(transaction.error) {
    return res.status(400).send(transaction)
  }

  const create = async () => {
    try {
      const createdTransaction = await prisma.transaction.create({
        data: transaction
      })

      res.status(201).send(createdTransaction)
    } catch(error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if(error.code === 'P2003') {
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

export const TransactionUpdate = async (req: Request, res: Response) => {
  const { id, clientId } = req.params
  const { amount, type, dueDate } = req.body

  const transaction = UpsertTransaction({ amount, type, clientId, dueDate })

  if(transaction.error) {
    return res.status(400).send(transaction)
  }

  const update = async () => {
    try {
      const updatedTransaction = await prisma.transaction.update({
        where: {
          id: id
        },
        data: transaction
      })

      return res.status(200).send(updatedTransaction)
    } catch(error) {
      throw error
    }
  }

  update().finally(async () => await prisma.$disconnect())
}

export const TransactionDelete = async (req: Request, res: Response) => {
  const { id } = req.params

  const remove = async () => {
    try {
      const toBeRemovedTransaction = await prisma.transaction.findUnique({
        where: {
          id
        }
      })

      const transaction = toBeRemovedTransaction
        ? DeleteTransaction({ dueDate: toBeRemovedTransaction!.dueDate })
        : {}

      if(transaction?.error) {
        return res.status(400).send(transaction)
      }

      await prisma.transaction.delete({
        where: {
          id
        }
      })

      return res.status(200).send({
        error: false,
        message: `Transaction with ID ${id} deleted.`
      })
    } catch(error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if(error.code === 'P2025') {
          return res.status(404).send({ error: true, message: 'Transaction not found.' })
        }

        throw error
      }
    }
  }

  remove().finally(async () => await prisma.$disconnect())
}

export const TransactionResume = (req: Request, res: Response) => {
  const { clientId } = req.params

  const resume = async () => {
    try {
      const resumeList = await prisma.transaction.findMany({
        where: {
          clientId
        },
        take: 10
      })

      return res.status(200).send(resumeList)
    } catch(error) {
      throw error
    }
  }

  resume().finally(async () => await prisma.$disconnect())
}