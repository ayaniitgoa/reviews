// src/middleware.js
import { NextResponse } from "next/server";
import * as Global from "./constants/global.jsx";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const protectedRoutes = ["/homepage"];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const response = await fetch(
      `${Global.default.BACKEND_URL}/auth/current_user`,
      {
        credentials: "include",
        headers: {
          Cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
