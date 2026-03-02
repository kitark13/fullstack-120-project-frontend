import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";
import {
  getCookieHeaderForBackend,
  setCookiesFromAxiosResponse,
} from "../../_utils/cookies";

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = await getCookieHeaderForBackend();

    const apiRes = await api.post(
      "/auth/refresh",
      {},
      { headers: { cookie: cookieHeader } },
    );

    const ok = await setCookiesFromAxiosResponse(apiRes.headers["set-cookie"]);
    if (!ok)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
