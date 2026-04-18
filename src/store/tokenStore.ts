import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenStore {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      token: '',
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: '' }),
    }),
    {
      name: 'gorest-token',
    }
  )
);