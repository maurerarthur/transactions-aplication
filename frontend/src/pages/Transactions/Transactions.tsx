import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

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

const Transactions: React.FC = () => {
  const { id } = useLoginStore()

  const [openedTransactionId, setOpenedTransactionId] = useState<string>('')
  const [editingTransactionId, setEditingTransactionId] = useState<string>('')

  const [transactionForm, setTransactionForm] = useState<ITransactionForm>({
    amount: 0,
    type: 'sent',
    dueDate: ''
  })

  const [newTransactionForm, setNewTransactionForm] = useState<ITransactionForm>({ ...transactionForm })

  const transactions = useQuery({
    retry: false,
    refetchOnMount: true,
    queryKey: ['transactions'],
    queryFn: () => fetchTransactions(id)
  })

  const createTransaction = useMutation(addTransaction, {
    onSuccess: () => {
      transactions.refetch()
      setNewTransactionForm({
        amount: 0,
        type: 'sent',
        dueDate: ''
      })
    },
    onError: (error: AxiosError<any>) => {
      const { message } = error.response?.data
      return toast.error(message)      
    }
  })

  const updateTransaction = useMutation(editTransaction, {
    onSuccess: () => transactions.refetch(),
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

  return(
    <div className='p-2'>
      <h1 className='text-white text-4xl font-bold'>Transactions</h1>
      <div className='mt-5'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row'>
            <Input
              id='edit-amount'
              type='number'
              placeholder='Amount'
              value={newTransactionForm.amount}
              onChange={event => setNewTransactionForm({ ...newTransactionForm, amount: +event.target.value })}
            />
            <Select
              id='edit-type'
              options={[
                { value: 'sent', label: 'Sent' },
                { value: 'received', label: 'Received' }
              ]}
              value={newTransactionForm.type}
              onChange={event => setNewTransactionForm({ ...newTransactionForm, type: event.target.value })}
            />
            <Input
              id='edit-due-date'
              type='date'
              placeholder='Due date'
              value={newTransactionForm.dueDate}
              onChange={event => setNewTransactionForm({ ...newTransactionForm, dueDate: event.target.value })}
            />
          </div>
          <div className='w-100 md:w-1/3'>
            <Button
              id='edit-submit'
              type='button'
              title='Create new transaction'
              isLoading={false}
              onClick={() => createTransaction.mutate({ clientId: id, data: newTransactionForm })}
            />
          </div>
        </div>
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
                <>
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
                          if(editingTransactionId === transaction.id) {
                            return setEditingTransactionId('')
                          }

                          setTransactionForm({ amount: transaction.amount, type: transaction.type, dueDate: transaction.dueDate })
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
                    <div className='flex flex-col gap-y-3 bg-white rounded-md p-2'>
                      <div className='flex flex-row justify-between w-100 md:w-1/3'>
                        <p className='mr-3'>Amount:</p>
                        <Input
                          id='edit-amount'
                          type='number'
                          placeholder='Amount'
                          value={transactionForm.amount}
                          onChange={event => setTransactionForm({ ...transactionForm, amount: +event.target.value })}
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
                          value={transactionForm.type}
                          onChange={event => setTransactionForm({ ...transactionForm, type: event.target.value })}
                        />
                      </div>
                      <div className='flex flex-row justify-between w-100 md:w-1/3'>
                        <p className='mr-3'>Due date:</p>
                        <Input
                          id='edit-due-date'
                          type='date'
                          placeholder='Due date'
                          value={transactionForm.dueDate}
                          onChange={event => setTransactionForm({ ...transactionForm, dueDate: event.target.value })}
                        />
                      </div>
                      <div className='flex flex-row justify-between w-100 md:w-1/3'>
                        <Button
                          id='edit-submit'
                          type='button'
                          title='Save'
                          isLoading={false}
                          onClick={() => updateTransaction.mutate({ clientId: id, transactionId: transaction.id, data: transactionForm })}
                        />
                      </div>
                    </div>
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
                </>
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