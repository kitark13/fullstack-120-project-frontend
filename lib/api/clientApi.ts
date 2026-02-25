import { api } from './api';
import { User } from '@/types/user';

export type LoginRequest = { email: string; password: string };

export async function login(payload: LoginRequest): Promise<User> {
  const res = await api.post<User>('/auth/login', payload);
  return res.data;
}

export async function logout(): Promise<void> {
  const res = await api.post('/auth/logout');
  if (res.status >= 400) {
    throw new Error('Logout failed');
  }
}

export async function checkSession(): Promise<User | null> {
  try {
    const res = await api.get<User>('/users/me');
    return res.data;
  } catch {
    try {
      await api.post('/auth/refresh');
      const res = await api.get<User>('/users/me');
      return res.data;
    } catch {
      return null;
    }
  }
}

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export async function register(payload: RegisterRequest): Promise<User> {
  const res = await api.post<User>('/auth/register', payload);
  return res.data;
}

export async function addToFavorite(storyId: string): Promise<string[]> {
  const res = await api.post(`/stories/${storyId}/save`);
  return res.data;
}

export async function removeFromFavorite(storyId: string): Promise<string[]> {
  const res = await api.delete(`/stories/${storyId}/save`);
  return res.data;
}

// отримання всіх юзерів

interface GetUsersProps {
  page?: number;
  perPage?: number;
}

interface GetUsersResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}

export async function getUsers({
  page = 1,
  perPage = 4,
}: GetUsersProps): Promise<GetUsersResponse> {
  const options = {
    params: {
      page,
      perPage,
    },
  };
  const response = await api.get("/users", options);
  return response.data;
}
