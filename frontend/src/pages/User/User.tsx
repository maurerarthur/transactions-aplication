import { FormEvent, useState } from 'react'

import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Check, X } from 'lucide-react'
import { useLoginStore } from '../Login/store'
import { updateUser, deleteUser } from './services'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Input from '../../components/Input'
import Button from '../../components/Button'

const userFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
})

export type IUserForm = z.infer<typeof userFormSchema>

const User: React.FC = () => {
  const { id, name, email, setLogin } = useLoginStore()

  const { register, handleSubmit } = useForm<IUserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: name ?? '',
      email: email ?? ''
    }
  })

  const [isDeleteAccountConfirm, setIsDeleteAccountConfirm] = useState<boolean>(false)

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

  const submitUpdate = (data: IUserForm) => {
    return editUser.mutate({ clientId: id, params: data })
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
        onSubmit={
          isDeleteAccountConfirm
            ? submitRemove
            : handleSubmit(submitUpdate)
        }
      >
        <Input
          label={<span className='text-white'>Name</span>}
          id='edit-user-name'
          type='text'
          hook={{...register('name')}}
        />
        <Input
          label={<span className='text-white'>Email</span>}
          id='edit-user-email'
          type='text'
          hook={{...register('email')}}
        />
        <Input
          label={<span className='text-white'>Type your new password</span>}
          id='edit-user-password'
          type='password'
          hook={{...register('password')}}
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