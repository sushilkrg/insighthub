import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// export const config = {
//   matcher: ["/dashboard/:path*", "/signin", "/signup", "/", "/verify/:path*"],
// };

export async function middleware(request: NextRequest) {
  // const session = await getServerSession();
  // console.log(session);

  // const token = await getToken({ req: request });
  // const url = request.nextUrl;

  // console.log("middleware - ", token);

  // Redirect to dashboard if hte user is already authenticated
  // and trying to access signin, signup, or home page

  // if (
  //   token &&
  //   (url.pathname.startsWith("/signin") ||
  //     url.pathname.startsWith("/signup") ||
  //     url.pathname.startsWith("/verify") ||
  //     url.pathname === "/")
  // ) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // if (
  //   !token &&
  //   (url.pathname.startsWith("/dashboard") ||
  //     url.pathname.startsWith("/create") ||
  //     url.pathname.startsWith("/insight/*"))
  // ) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }
  return NextResponse.next();
}
