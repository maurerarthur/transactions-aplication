import Axios, { AxiosInstance } from 'axios'

export const api: AxiosInstance = Axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const setApiHeaderToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = token
}