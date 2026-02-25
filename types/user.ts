export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  description?: string;
  articlesAmount?: number;
  savedStories?: string[];
  createdAt?: string;
  updatedAt?: string;
}
