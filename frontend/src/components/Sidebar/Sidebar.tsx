import { useNavigate } from 'react-router-dom'
import { BarChart3, User, CircleDollarSign } from 'lucide-react'
import MenuButton from '../MenuButton'

import { DASHBOARD, USER } from '../../router/routes'

const Sidebar: React.FC = () => {
  const navigate = useNavigate()

  return(
    <div className='flex flex-col gap-2 h-screen bg-black p-2'>
      <MenuButton
        id='menu-button-dashboard'
        title='Dashboard'
        icon={<BarChart3 />}
        onClick={() => navigate(DASHBOARD)}
      />
      <MenuButton
        id='menu-button-user'
        title='User'
        icon={<User />}
        onClick={() => navigate(USER)}
      />
      <MenuButton
        id='menu-button-transactions'
        title='Transactions'
        icon={<CircleDollarSign />}
        onClick={() => null}
      />
    </div>
  )
}

export default Sidebar