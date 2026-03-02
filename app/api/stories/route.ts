import { NextRequest, NextResponse } from "next/server";
import { backendRequest, handleApiError } from "../_utils/backendRequest";

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());

    const apiRes = await backendRequest({
      method: "GET",
      url: "/stories",
      params,
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      const apiRes = await backendRequest({
        method: "POST",
        url: "/stories",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      return NextResponse.json(apiRes.data, { status: apiRes.status });
    }

    const body = await req.json();
    const apiRes = await backendRequest({
      method: "POST",
      url: "/stories",
      data: body,
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    return handleApiError(error);
  }
}
