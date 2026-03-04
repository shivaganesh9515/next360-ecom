'use client';

import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const store = useAuthStore();

  return {
    user: store.user,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    login: store.login,
    logout: store.logout,
    updateUser: store.updateUser,
  };
}
