import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Eye, Pen, Trash } from 'lucide-react'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'

import { useLoginStore } from '../Login/store'

import {
  fetchTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction
} from './services'

export interface ITransactionForm {
  amount: number
  type: string
  dueDate: string
}

const transactionSchema = z.object({
  amount: z.string(),
  type: z.string(),
  dueDate: z.string()
})

export type transaction = z.infer<typeof transactionSchema>

const Transactions: React.FC = () => {
  const { id } = useLoginStore()

  const [openedTransactionId, setOpenedTransactionId] = useState<string>('')
  const [editingTransactionId, setEditingTransactionId] = useState<string>('')

  const { register, handleSubmit, reset, setValue } = useForm<transaction>({
    resolver: zodResolver(transactionSchema)
  })

  const transactions = useQuery({
    retry: false,
    refetchOnMount: true,
    queryKey: ['transactions'],
    queryFn: () => fetchTransactions(id)
  })

  const createTransaction = useMutation(addTransaction, {
    onSuccess: () => {
      transactions.refetch()
      reset()
      return toast.success('Transaction successfully created.')
    },
    onError: (error: AxiosError<any>) => {
      const { message } = error.response?.data
      return toast.error(message)      
    }
  })

  const updateTransaction = useMutation(editTransaction, {
    onSuccess: () => {
      transactions.refetch()
      setEditingTransactionId('')
      reset()
      return toast.success('Transaction successfully edited.')
    },
    onError: (error: AxiosError<any>) => {
      const { message } = error.response?.data
      return toast.error(message)      
    }
  })

  const removeTransaction = useMutation(deleteTransaction, {
    onSuccess: () => {
      toast.success('Transaction successfully deleted.')
      return transactions.refetch()
    },
    onError: (error: AxiosError<any>) => {
      const { message } = error.response?.data
      return toast.error(message)
    }
  })

  const handleCreateTransaction = (data: transaction) => {
    return createTransaction.mutate({ clientId: id, data })
  }

  const handleUpdateTransaction = (data: transaction) => {
    return updateTransaction.mutate({ clientId: id, transactionId: editingTransactionId, data })
  }

  return(
    <div className='p-2'>
      <h1 className='text-white text-4xl font-bold'>Transactions</h1>
      <div className='mt-5'>
        <form
          className='flex flex-col gap-3'
          onSubmit={handleSubmit(handleCreateTransaction)}
        >
          <div className='flex flex-row'>
            <Input
              id='edit-amount'
              type='number'
              placeholder='Amount'
              hook={{...register('amount')}}
            />
            <Select
              id='edit-type'
              options={[
                { value: 'sent', label: 'Sent' },
                { value: 'received', label: 'Received' }
              ]}
              hook={{...register('type')}}
            />
            <Input
              id='edit-due-date'
              type='date'
              placeholder='Due date'
              hook={{...register('dueDate')}}
            />
          </div>
          <div className='w-100 md:w-1/3'>
            <Button
              id='edit-submit'
              type='submit'
              title='Create new transaction'
              isLoading={false}
            />
          </div>
        </form>
      </div>
      <div className='mt-5'>
        {transactions.data && transactions.data?.length > 0 ? (
          <div className='flex flex-col'>
            <div className='flex flex-row justify-between bg-white rounded-md p-1 mb-2'>
              <div className='w-1/4 flex flex-row justify-start'>
                <p>Amount</p>
              </div>
              <div className='w-1/4 flex flex-row justify-start'>
                <p>Type</p>
              </div>
              <div className='w-1/4 flex flex-row justify-start'>
                <p>Due date</p>
              </div>
              <div className='w-1/4 flex flex-row justify-start'>
                <p>Actions</p>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              {transactions.data?.map(transaction => (
                <div key={transaction.id}>
                  <div className='flex flex-row justify-between bg-white rounded-md p-1'>
                    <div className='w-1/4 flex flex-row justify-start'>
                      <p>$ {transaction.amount}</p>
                    </div>
                    <div className='w-1/4 flex flex-row justify-start'>
                      <p className='capitalize'>{transaction.type}</p>
                    </div>
                    <div className='w-1/4 flex flex-row justify-start'>
                      <p>{new Date(transaction.dueDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className='w-1/4 flex flex-row gap-2 justify-start'>
                      <button
                        type='button'
                        onClick={() => {
                          if(openedTransactionId === transaction.id) {
                            return setOpenedTransactionId('')
                          }

                          setOpenedTransactionId(transaction.id)
                        }}
                      >
                        <Eye />
                      </button>
                      <button
                        type='button'
                        onClick={() => {
                          setValue('amount', transaction.amount?.toString())
                          setValue('type', transaction.type)
                          setValue('dueDate', transaction.dueDate)

                          if(editingTransactionId === transaction.id) {
                            return setEditingTransactionId('')
                          }

                          setEditingTransactionId(transaction.id)
                        }}
                      >
                        <Pen />
                      </button>
                      <button
                        type='button'
                        onClick={() => removeTransaction.mutate({ clientId: id, transactionId: transaction.id })}
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>
                  {(editingTransactionId === transaction.id) && (
                    <form
                      className='flex flex-col gap-y-3 bg-white rounded-md p-2'
                      onSubmit={handleSubmit(handleUpdateTransaction)}
                    >
                      <div className='flex flex-row justify-between w-100 md:w-1/3'>
                        <p className='mr-3'>Amount:</p>
                        <Input
                          id='edit-amount'
                          type='number'
                          placeholder='Amount'
                          hook={{...register('amount')}}
                        />
                      </div>
                      <div className='flex flex-row justify-between w-100 md:w-1/3'>
                        <p className='mr-3'>Type:</p>
                        <Select
                          id='edit-type'
                          options={[
                            { value: 'sent', label: 'Sent' },
                            { value: 'received', label: 'Received' }
                          ]}
                          hook={{...register('type')}}
                        />
                      </div>
                      <div className='flex flex-row justify-between w-100 md:w-1/3'>
                        <p className='mr-3'>Due date:</p>
                        <Input
                          id='edit-due-date'
                          type='date'
                          placeholder='Due date'
                          hook={{...register('dueDate')}}
                        />
                      </div>
                      <div className='flex flex-row justify-between w-100 md:w-1/3'>
                        <Button
                          id='edit-submit'
                          type='submit'
                          title='Save'
                          isLoading={false}
                        />
                      </div>
                    </form>
                  )}
                  {(openedTransactionId === transaction.id) && (
                    <div className='flex flex-col bg-white rounded-md p-1'>
                      <div className='mb-3'>
                        <p>ID: {transaction.id}</p>
                      </div>
                      <div className='flex flex-col mb-3'>
                        <p>Amount: $ {transaction.amount}</p>
                        <p className='capitalize'>Type: {transaction.type}</p>
                      </div>
                      <div className='flex flex-col'>
                        <p>Created at: {new Date(transaction.createdAt).toLocaleDateString('pt-BR')}</p>
                        <p>Updated at: {new Date(transaction.updatedAt).toLocaleDateString('pt-BR')}</p>
                        <p>Due date: {new Date(transaction.dueDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h1 className='text-white text-2xl font-bold'>No transactions were found.</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Transactions