import { NextResponse } from "next/server";
import { isAxiosError, type AxiosRequestConfig } from "axios";
import { api } from "../api";
import {
  getCookieHeaderForBackend,
  setCookiesFromAxiosResponse,
} from "./cookies";
import { logErrorResponse } from "./utils";

export async function backendRequest<T = unknown>(config: AxiosRequestConfig) {
  const cookieHeader = await getCookieHeaderForBackend();

  const apiRes = await api.request<T>({
    ...config,
    headers: {
      ...(config.headers ?? {}),
      cookie: cookieHeader,
    },
    withCredentials: true,
  });

  await setCookiesFromAxiosResponse(apiRes.headers["set-cookie"]);

  return apiRes;
}

export function handleApiError(error: unknown) {
  if (isAxiosError(error)) {
    logErrorResponse(error.response?.data);
    return NextResponse.json(
      { error: error.message, response: error.response?.data },
      { status: error.response?.status ?? 500 },
    );
  }

  logErrorResponse({ message: (error as Error).message });
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
