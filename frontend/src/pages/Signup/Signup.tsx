import { useState, useEffect, FormEvent } from 'react'

import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { requestSignup } from './services'
import { useLoginStore } from '../Login/store'

import { DASHBOARD, SIGNIN } from '../../router/routes'

export interface signup {
  name: string
  email: string
  password: string
}

const Signup: React.FC = () => {
  const navigate = useNavigate()

  const { token } = useLoginStore()

  const [signupForm, setSignupForm] = useState<signup>({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if(token) {
      navigate(DASHBOARD)
    }
  }, [token])

  const signup = useMutation(requestSignup, {
    onSuccess: () => {
      toast.success('Account successfully created! Please signin.')
      return navigate(SIGNIN)
    },
    onError: (error: AxiosError<any>) => {
      const { message } = error.response?.data
      return toast.error(message)
    }
  })

  const submit = (event: FormEvent, data: signup) => {
    event.preventDefault()
    signup.mutate(data)
  }

  return(
    <div className='w-screen min-h-screen p-2 overflow-y-scroll flex justify-center items-center default-bg'>
      <div className='w-3/4 md:w-1/4 h-fit bg-neutral-50 border-none rounded-xl p-10'>
        <h1 className='text-slate-950 text-5xl font-bold'>Create Account</h1>
        <p className='text-gray-600 text-lg'>Please enter your details</p>
        <form
          onSubmit={event => submit(event, signupForm)}
          className='flex flex-col mt-5'
        >
          <div>
            <Input
              id='signup-email'
              type='text'
              placeholder='Name'
              label='Enter your name'
              onChange={event => setSignupForm({ ...signupForm, name: event.target.value })}
            />
          </div>
          <div className='mt-5'>
            <Input
              id='signup-email'
              type='text'
              placeholder='Email'
              label='Enter your email'
              onChange={event => setSignupForm({ ...signupForm, email: event.target.value })}
            />
          </div>
          <div className='mt-5'>
            <Input
              id='signup-password'
              type='password'
              placeholder='Password'
              label='Enter your password'
              onChange={event => setSignupForm({ ...signupForm, password: event.target.value })}
            />
          </div>
          <div className='mt-5'>
            <Button
              id='signup-submit'
              type='submit'
              isLoading={signup.isLoading}
              title={<p className='text-lg'>Sign up</p>}
            />
          </div>
          <div className='flex justify-center mt-5'>
            <Link to={SIGNIN}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup