
export interface User {
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  description: string;
  articlesAmount: number;
  savedArticles: string[];
  _id: string;
}