import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Store {
  id: string
  email: string
  name: string
  token: string
  setLogin: (response: any) => void
  clear: () => void
}

const initialState: Omit<Store, 'clear' | 'setLogin'> = {
  id: '',
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