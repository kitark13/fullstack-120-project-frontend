import { NextRequest, NextResponse } from "next/server";
import { backendRequest, handleApiError } from "../../_utils/backendRequest";

type Ctx = { params: Promise<{ storyId: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  try {
    const { storyId } = await ctx.params;

    const apiRes = await backendRequest({
      method: "GET",
      url: `/stories/${storyId}`,
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  try {
    const { storyId } = await ctx.params;

    const contentType = req.headers.get("content-type") || "";

    // 1) multipart/form-data (коли є файл)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      const apiRes = await backendRequest({
        method: "PATCH",
        url: `/stories/${storyId}`,
        data: formData,
      });

      return NextResponse.json(apiRes.data, { status: apiRes.status });
    }

    // 2) application/json (коли без файлу)
    const body = await req.json();

    const apiRes = await backendRequest({
      method: "PATCH",
      url: `/stories/${storyId}`,
      data: body,
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  try {
    const { storyId } = await ctx.params;

    const apiRes = await backendRequest({
      method: "DELETE",
      url: `/stories/${storyId}`,
    });

    return new NextResponse(null, { status: apiRes.status });
  } catch (error) {
    return handleApiError(error);
  }
}
