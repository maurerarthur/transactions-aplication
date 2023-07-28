import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Eye, Pen, Trash } from 'lucide-react'
import Input from '../../components/Input'
import { useLoginStore } from '../Login/store'
import { fetchTransactions, deleteTransaction } from './services'

const Transactions: React.FC = () => {
  const { id } = useLoginStore()

  const [openedTransactionId, setOpenedTransactionId] = useState<string>('')
  const [editingTransactionId, setEditingTransactionId] = useState<string>('')

  const transactions = useQuery({
    queryKey: ['transactions'],
    queryFn: () => fetchTransactions(id)
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
                      <p>{new Date(transaction.dueDateTime).toLocaleDateString('pt-BR')}</p>
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
                      <div className='flex flex-row'>
                        <p className='mr-3'>Amount:</p>
                        <Input
                          id='edit-amount'
                          type='number'
                          placeholder='Amount'
                          value={null}
                          onChange={() => null}
                        />
                      </div>
                      <div className='flex flex-row'>
                        <p className='mr-3'>Type:</p>
                        <select name='edit-type'>
                          <option value='sent'>Sent</option>
                          <option value='received'>Received</option>
                        </select>
                      </div>
                      <div className='flex flex-row'>
                        <p className='mr-3'>Due date:</p>
                        <Input
                          id='edit-amount'
                          type='date'
                          placeholder='Amount'
                          value={null}
                          onChange={() => null}
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
                        <p>Due date time: {new Date(transaction.dueDateTime).toLocaleDateString('pt-BR')}</p>
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