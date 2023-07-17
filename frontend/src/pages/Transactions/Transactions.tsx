import { Eye, Pen, Trash } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchTransactions } from './services'
import { useLoginStore } from '../Login/store'

const Transactions: React.FC = () => {
  const { id } = useLoginStore()

  const transactions = useQuery({
    queryKey: ['transactions'],
    queryFn: () => fetchTransactions(id)
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
                    <button type='button' onClick={() => null}>
                      <Eye />
                    </button>
                    <button type='button' onClick={() => null}>
                      <Pen />
                    </button>
                    <button type='button' onClick={() => null}>
                      <Trash />
                    </button>
                  </div>
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