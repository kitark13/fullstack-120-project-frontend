import { Story } from '@/types/index';
import { User } from '@/types/user';
import axios from 'axios';

export const apiServer = axios.create({
  baseURL: 'https://fullstack-120-project-group-1-backend.onrender.com', //process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export type StoriesListResponse = {
  data: Story[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const getTopStoriesServer = async (limit = 3) => {
  const res = await apiServer.get<StoriesListResponse>('/stories', {
    params: {
      page: 1,
      limit,
      sortBy: 'popular',
    },
  });
  return res.data;
};

export type GetUsersResponse = {
  data: User[];
  pagination: { total: number; page: number; limit: number; pages: number };
};

export async function getUsersServer(page = 1, limit = 4) {
  const res = await apiServer.get<GetUsersResponse>('/users', {
    params: {
      page,
      limit,
    },
  });

  return res.data;
}

export interface StoryDetailResponse {
  data: Story;
  isSaved: boolean;
}

export async function getStoryByIdServer(storyId: string) {
  const { data } = await apiServer.get<StoryDetailResponse>(
    `/stories/${storyId}`,
  );

  return data;
}

interface GetStoriesByCategoryProps {
  limit?: number;
  category?: string | null;
  page: number;
}

export const getStoriesByCategoryServer = async ({
  limit = 9,
  category,
  page = 1,
}: GetStoriesByCategoryProps) => {
  const res = await apiServer.get<StoriesListResponse>('/stories', {
    params: { page, limit, sortBy: 'popular', category },
  });
  return res.data;
};
