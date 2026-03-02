import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "/api",
  //process.env.NEXT_PUBLIC_API_URL
  // baseURL: "https://fullstack-120-project-group-1-backend.onrender.com/",
  withCredentials: true,
});
