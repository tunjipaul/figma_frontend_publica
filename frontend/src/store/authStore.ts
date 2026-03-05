import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Admin } from '../types/patient';

interface AuthState {
  user: Admin | null;
  isAuthenticated: boolean;
  login: (user: Admin) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
