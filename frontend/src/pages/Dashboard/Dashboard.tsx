import { useQuery } from '@tanstack/react-query'
// import { LineChart } from 'react-chartkick'
// import 'chartkick/chart.js'

import { useLoginStore } from '../Login/store'
import { fetchTransactionsResume } from './services'

const Dashboard: React.FC = () => {
  const { id } = useLoginStore()

  const transactionsResume = useQuery({
    retry: false,
    refetchOnMount: true,
    queryKey: ['transactionsResume'],
    queryFn: () => fetchTransactionsResume(id)
  })

  // const resume = transactionsResume.data?.reduce((a, transaction) => ({
  //   ...a, [transaction.dueDate]: transaction.type == 'received' ? +transaction.amount : -Math.abs(transaction.amount)
  // }), {})

  return(
    <div className='p-2'>
      <h1 className='text-white text-4xl font-bold'>Dashboard</h1>
      <h1 className='text-white text-2xl font-bold'>Your last 10 transactions</h1>
      <div className='bg-white rounded-lg mt-5 p-5'>
      {/* <LineChart data={resume} /> */}
      </div>
    </div>
  )
}

export default Dashboard
