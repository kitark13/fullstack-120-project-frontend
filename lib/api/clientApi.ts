import { api } from './api';
import { User } from '@/types/user';
import { Story } from '@/types/index';
import { Category } from '@/types/category';

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
  const response = await api.get('/users', options);
  return response.data;
}

// створення історії

export async function createStory(payload: FormData): Promise<Story> {
  const res = await api.post<{ data: Story }>('/stories', payload);
  return res.data.data;
}

// отримання всіх категорій

// export interface Category {
//   _id: string;
//   name: string;
// }

export async function getCategories(): Promise<Category[]> {
  const res = await api.get<{ data: Category[] }>('/categories');
  // якщо вертає масив - .data
  return res.data.data;
}

export type StoriesListResponse = {
  data: Story[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

interface GetStoriesByCategoryProps {
  limit?: number;
  category?: string | null;
  page: number;
}

export const getStoriesByCategory = async ({
  limit = 9,
  category,
  page = 1,
}: GetStoriesByCategoryProps) => {
  const res = await api.get<StoriesListResponse>('/stories', {
    params: { page, limit, sortBy: 'popular', category },
  });
  return res.data;
};
