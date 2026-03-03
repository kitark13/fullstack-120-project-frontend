import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

function forwardSetCookie(
  res: NextResponse,
  setCookie: string[] | string | undefined,
) {
  if (!setCookie) return;
  const arr = Array.isArray(setCookie) ? setCookie : [setCookie];
  for (const c of arr) res.headers.append("set-cookie", c);
}

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") ?? "";

  try {
    const apiRes = await api.post(
      "/auth/refresh",
      {},
      { headers: { cookie: cookieHeader } },
    );

    const res = NextResponse.json(apiRes.data, { status: apiRes.status });
    forwardSetCookie(res, apiRes.headers["set-cookie"]);

    return res;
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
