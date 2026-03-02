import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";
import { getCookieHeaderForBackend } from "../../_utils/cookies";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = await getCookieHeaderForBackend();
    const apiRes = await api.post(
      "/auth/logout",
      {},
      { headers: { cookie: cookieHeader } },
    );

    // на всяк випадок — чистимо cookies у Next
    const store = await cookies();
    store.delete("accessToken");
    store.delete("refreshToken");
    store.delete("sessionId");

    return NextResponse.json(apiRes.data ?? { ok: true }, {
      status: apiRes.status,
    });
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
