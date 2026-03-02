import { NextRequest, NextResponse } from "next/server";
import { backendRequest, handleApiError } from "../../_utils/backendRequest";

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());

    const apiRes = await backendRequest({
      method: "GET",
      url: "/stories/saved",
      params,
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    return handleApiError(error);
  }
}
