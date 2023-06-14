import { useState, FormEvent } from 'react'

import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useLoginStore } from './store'
import { setApiHeaderToken } from '../../../services/api'
import { requestSignin } from './services'

import { version } from '../../../package.json'

export interface signin {
  email: string
  password: string
}

const Login: React.FC = () => {
  const { setLogin } = useLoginStore()

  const [signinForm, setSigninForm] = useState<signin>({
    email: '',
    password: ''
  })

  const { isLoading, mutate } = useMutation(requestSignin, {
    onSuccess: data => {
      setApiHeaderToken(data?.token)
      setLogin(data)
    },
    onError: (error: AxiosError<any>) => {
      const { message } = error.response?.data
      return toast.error(message)
    }
  })

  const submit = (event: FormEvent, data: signin) => {
    event.preventDefault()
    mutate(data)
  }

  return(
    <div className='w-screen min-h-screen p-2 flex flex-col justify-center items-center default-bg'>
      <div className='w-3/4 md:w-1/4 h-fit bg-neutral-50 border-none rounded-xl p-10'>
        <h1 className='text-slate-950 text-5xl font-bold'>Welcome</h1>
        <p className='text-gray-600 text-lg'>Please enter your details</p>
        <form
          onSubmit={event => submit(event, signinForm)}
          className='flex flex-col mt-5'
        >
          <div>
            <Input
              id='login-email'
              type='text'
              placeholder='Email'
              label='Enter your email'
              value={signinForm.email}
              onChange={event => setSigninForm({ ...signinForm, email: event.target.value })}
            />
          </div>
          <div className='mt-5'>
            <Input
              id='login-password'
              type='password'
              placeholder='Password'
              label='Enter your password'
              value={signinForm.password}
              onChange={event => setSigninForm({ ...signinForm, password: event.target.value })}
            />
          </div>
          <div className='mt-5'>
            <Button
              id='login-submit'
              type='submit'
              isLoading={isLoading}
              title={<p className='text-lg'>Sign in</p>}
            />
          </div>
          <div className='flex justify-center mt-5'>
            <Link to='/signup'>Create Account</Link>
          </div>
        </form>
      </div>
      <h2 className='mt-5 text-white text-2xl'>Version {version}</h2>
    </div>
  )
}

export default Login