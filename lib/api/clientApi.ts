import { api } from "./api";
import { User } from "@/types/user";

export type LoginRequest = { email: string; password: string };

export async function login(payload: LoginRequest): Promise<User> {
  const res = await api.post<User>("/auth/login", payload);
  return res.data;
}

export async function logout(): Promise<void> {
  const res = await api.post("/auth/logout");
  if (res.status >= 400) {
    throw new Error("Logout failed");
  }
}

export async function checkSession(): Promise<User | null> {
  const res = await api.get<User | null>("/auth/session");
  return res.data ?? null;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export async function register(payload: RegisterRequest): Promise<User> {
  const res = await api.post<User>("/auth/register", payload);
  return res.data;
}
