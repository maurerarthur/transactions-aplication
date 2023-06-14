import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Store {
  id: number
  email: string
  name: string
  token: string
  setLogin: (response: any) => void
  clear: () => void
}

const initialState: Omit<Store, 'clear' | 'setLogin'> = {
  id: 0,
  email: '',
  name: '',
  token: ''
}

export const useLoginStore = create(
  persist<Store>(
    (set) => ({
      ...initialState,
      setLogin: (response) => set(response),
      clear: () => set(initialState)
    }),
    {
      name: 'login-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)