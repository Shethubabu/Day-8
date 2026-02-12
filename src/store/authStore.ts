import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      signup: async (email, password, name) => {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          createdAt: new Date()
        };

        localStorage.setItem(`user_${email}`, JSON.stringify({
          ...newUser,
          password
        }));

        set({ user: newUser, isAuthenticated: true });
      },

      login: async (email, password) => {
        const userData = localStorage.getItem(`user_${email}`);
        if (!userData) {
          throw new Error('User not found');
        }

        const user = JSON.parse(userData);
        if (user.password !== password) {
          throw new Error('Invalid password');
        }

        set({ user: { ...user }, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);