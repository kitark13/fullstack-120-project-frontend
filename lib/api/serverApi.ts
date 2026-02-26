import { Story } from "@/types/index";
import { User } from "@/types/user";
// import { api } from '@/lib/api/api';
import axios from "axios";

export const apiServer = axios.create({
  //   baseURL: "http://localhost:3000",
  baseURL: "https://fullstack-120-project-group-1-backend.onrender.com", //process.env.NEXT_PUBLIC_API_URL,
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
  const res = await apiServer.get<StoriesListResponse>("/stories", {
    params: {
      page: 1,
      limit,
      sortBy: "popular",
    },
  });
  return res.data;
};

export type GetUsersResponse = {
  data: User[];
  pagination: { total: number; page: number; limit: number; pages: number };
};

export async function getUsersServer(page = 1, limit = 3) {
  const res = await apiServer.get<GetUsersResponse>("/users", {
    params: { page, limit },
  });

  // return res.data.data ?? [];
  return res.data;
}
