import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

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
        // In a real app, this would call an API
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          createdAt: new Date()
        };

        // Store hashed password (In production, use proper authentication)
        localStorage.setItem(`user_${email}`, JSON.stringify({
          ...newUser,
          password: password // Never do this in production!
        }));

        set({ user: newUser, isAuthenticated: true });
      },

      login: async (email, password) => {
        // In a real app, this would call an API
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