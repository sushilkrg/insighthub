import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/insight/:path*", "/signup", "/create", "/", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
  
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    !token &&
    (url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/create") ||
      url.pathname.startsWith("/insight"))
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}
