import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Check, X } from 'lucide-react'
import { useLoginStore } from '../Login/store'
import { updateUser, deleteUser } from './services'

import Input from '../../components/Input'
import Button from '../../components/Button'

export interface IUserForm {
  name: string
  email: string
  password: string
}

const User: React.FC = () => {
  const { id, name, email, setLogin } = useLoginStore()

  const [isDeleteAccountConfirm, setIsDeleteAccountConfirm] = useState<boolean>(false)

  const [userForm, setUserForm] = useState<IUserForm>({
    name,
    email,
    password: ''
  })

  const editUser = useMutation(updateUser, {
    onSuccess: data => {
      setLogin(data)
      return toast.success('User updated!')
    },
    onError: (error: AxiosError<any>) => {
      const { message } = error.response?.data
      return toast.error(message)
    }
  })

  const removeUser = useMutation(deleteUser, {
    onSuccess: () => {
      localStorage.clear()
      return window.location.href = '/'
    },
    onError: (error: AxiosError<any>) => {
      const { message } = error.response?.data
      return toast.error(message)
    }
  })

  const submitUpdate = (event: FormEvent) => {
    event.preventDefault()
    editUser.mutate({ clientId: id, params: userForm })
  }

  const submitRemove = (event: FormEvent) => {
    event.preventDefault()
    removeUser.mutate(id)
  }

  return(
    <div className='w-full p-2'>
      <h1 className='text-white text-4xl font-bold'>Edit user settings</h1>
      <form
        className='mt-5'
        onSubmit={isDeleteAccountConfirm ? submitRemove : submitUpdate}
      >
        <Input
          label={<span className='text-white'>Name</span>}
          id='edit-user-name'
          type='text'
          value={userForm.name}
          onChange={event => setUserForm({ ...userForm, name: event.target.value })}
        />
        <Input
          label={<span className='text-white'>Email</span>}
          id='edit-user-email'
          type='text'
          value={userForm.email}
          onChange={event => setUserForm({ ...userForm, email: event.target.value })}
        />
        <Input
          label={<span className='text-white'>Type your new password</span>}
          id='edit-user-password'
          type='password'
          value={userForm.password}
          onChange={event => setUserForm({ ...userForm, password: event.target.value })}
        />
        <div className='mt-5'>
          <Button
            id='user-edit-submit'
            type='submit'
            title='Submit'
            isLoading={editUser.isLoading}
          />
        </div>
        <div className='mt-5'>
          {isDeleteAccountConfirm ? (
            <div className='flex flex-row gap-1'>
              <Button
                id='user-remove-submit'
                type='submit'
                title={<Check />}
              />
              <Button
                id='user-remove-submit'
                type='button'
                title={<X />}
                onClick={() => setIsDeleteAccountConfirm(false)}
              />
            </div>
          ) : (
            <Button
              id='user-remove-submit'
              type='submit'
              title='Delete account'
              onClick={() => setIsDeleteAccountConfirm(true)}
            />
          )}
        </div>
      </form>
    </div>
  )
}

export default User