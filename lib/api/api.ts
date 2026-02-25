import axios from 'axios';

export const api = axios.create({
  //   baseURL: "http://localhost:3000",
  // baseURL: "/api",
  // withCredentials: true,
  baseURL: 'https://fullstack-120-project-group-1-backend.onrender.com/', //process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
