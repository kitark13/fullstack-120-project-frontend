import axios from "axios";

export const api = axios.create({
  //   baseURL: "http://localhost:3000",
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  //   withCredentials: true,
});
