import { cookies } from "next/headers";
import { parse } from "cookie";

type CookieOptions = {
  expires?: Date;
  path?: string;
  maxAge?: number;
};

export async function setCookiesFromAxiosResponse(
  setCookieHeader?: string[] | string,
) {
  if (!setCookieHeader) return false;

  const cookieStore = await cookies();
  const cookieArray = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : [setCookieHeader];

  for (const cookieStr of cookieArray) {
    const parsed = parse(cookieStr);

    const options: CookieOptions = {
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      path: parsed.Path,
      maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
    };

    if (parsed.accessToken)
      cookieStore.set("accessToken", parsed.accessToken, options);
    if (parsed.refreshToken)
      cookieStore.set("refreshToken", parsed.refreshToken, options);
    if (parsed.sessionId)
      cookieStore.set("sessionId", parsed.sessionId, options);
  }

  return true;
}

export async function getCookieHeaderForBackend() {
  const cookieStore = await cookies();
  return cookieStore.toString();
}
