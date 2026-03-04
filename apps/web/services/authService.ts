import api from './api';
import { User } from '@/types/user';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login', payload);
    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post('/auth/register', payload);
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get('/account/profile');
    return data;
  },

  async updateProfile(payload: Partial<User>): Promise<User> {
    const { data } = await api.put('/account/profile', payload);
    return data;
  },
};
