import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") ?? "";

  try {
    const apiRes = await api.post(
      "/auth/logout",
      {},
      { headers: { cookie: cookieHeader } },
    );

    const res =
      apiRes.status === 204
        ? new NextResponse(null, { status: 204 })
        : NextResponse.json(apiRes.data ?? { ok: true }, {
            status: apiRes.status,
          });

    res.cookies.delete("accessToken");
    res.cookies.delete("refreshToken");
    res.cookies.delete("sessionId");

    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      const res = NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 },
      );

      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      res.cookies.delete("sessionId");

      return res;
    }

    logErrorResponse({ message: (error as Error).message });

    const res = NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
    res.cookies.delete("accessToken");
    res.cookies.delete("refreshToken");
    res.cookies.delete("sessionId");
    return res;
  }
}
