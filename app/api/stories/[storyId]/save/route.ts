import { NextRequest, NextResponse } from "next/server";
import { backendRequest, handleApiError } from "../../../_utils/backendRequest";

type Ctx = { params: Promise<{ storyId: string }> };

export async function POST(_req: NextRequest, ctx: Ctx) {
  try {
    const { storyId } = await ctx.params;

    const apiRes = await backendRequest({
      method: "POST",
      url: `/stories/${storyId}/save`,
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
      url: `/stories/${storyId}/save`,
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    return handleApiError(error);
  }
}
