import { NextResponse } from "next/server";
import * as Global from "@/app/constants/global";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log(`[Middleware] Path: ${pathname}`);

  // 1. Define all route types
  const protectedRoutes = ["/home", "/reviews"];
  const authRoutes = ["/sign-up"];
  const oauthRoutes = ["/auth/google", "/auth/google/callback"];
  const apiAuthRoutes = ["/api/auth"];

  // 2. Skip middleware for OAuth and API auth routes
  if (
    [...oauthRoutes, ...apiAuthRoutes].some((route) =>
      pathname.startsWith(route)
    )
  ) {
    console.log("[Middleware] Skipping OAuth/API route");
    return NextResponse.next();
  }

  // 3. Check if user is authenticated
  let isAuthenticated = false;
  const token = request.cookies.get("token")?.value;

  if (token) {
    try {
      const verify = await fetch(
        `${Global.default.BACKEND_URL}/auth/current_user`,
        {
          credentials: "include",
          headers: { Cookie: `token=${token}` },
        }
      );
      isAuthenticated = verify.ok;
    } catch (error) {
      console.error("[Middleware] Auth verification failed:", error);
    }
  }

  // 4. Handle auth routes (sign-up) for authenticated users
  if (
    authRoutes.some((route) => pathname.startsWith(route)) &&
    isAuthenticated
  ) {
    console.log(
      "[Middleware] Authenticated user trying to access auth route - redirecting home"
    );
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 5. Handle protected routes for unauthenticated users
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !isAuthenticated
  ) {
    console.log(
      "[Middleware] Unauthenticated user trying to access protected route"
    );
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/reviews/:path*", "/sign-up"],
};
