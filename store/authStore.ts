'use client';

import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),

  updateUser: (data) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, ...data } });
    }
  },
}));
