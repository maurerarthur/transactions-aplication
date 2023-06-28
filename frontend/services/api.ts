import Axios, { AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const api: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (res) => res.data,
  (error: AxiosError<any>) => {
    if(error.response?.status == 401) {
      toast.error(error.response?.data?.message)
      localStorage.clear()
      window.location.href = '/'
    }

    return Promise.reject(error)
  }
)

export const setApiHeaderToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = token
}