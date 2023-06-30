import { useEffect } from 'react'
import { useLoginStore } from '../Login/store'
import Sidebar from '../../components/Sidebar'

interface LayoutRouteProps {
  children: React.ReactElement
}

const LayoutRoute: React.FC<LayoutRouteProps> = props => {
  const { token } = useLoginStore()

  useEffect(() => {
    if(!token) {
      localStorage.clear()
      window.location.href = '/'
    }
  }, [token])

  return(
    <div className='w-screen min-h-screen flex flex-row default-bg'>
      <div className='md:w-1/12 w-3/12'>
        <Sidebar />
      </div>
      <div className='md:w-11/12 w-9/12'>
        {props.children}
      </div>
    </div>
  )
}

export default LayoutRoute