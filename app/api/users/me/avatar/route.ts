import { NextRequest, NextResponse } from "next/server";
import { logErrorResponse } from "../../../_utils/utils";
import { getCookieHeaderForBackend } from "../../../_utils/cookies";

export async function PATCH(req: NextRequest) {
  try {
    const cookieHeader = await getCookieHeaderForBackend();

    const formData = await req.formData();

    const backendUrl = new URL(
      "/users/me/avatar",
      process.env.NEXT_PUBLIC_API_URL,
    ).toString();

    const res = await fetch(backendUrl, {
      method: "PATCH",
      headers: {
        cookie: cookieHeader,
        // content-type НЕ ставимо вручну — fetch сам поставить boundary
      },
      body: formData,
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
