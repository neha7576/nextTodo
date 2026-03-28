import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request) {
  const token = request.cookies.get("token")?.value;

  const isLoginPage = request.nextUrl.pathname === "/login";

  // ❌ No token → redirect to login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ If token exists → verify it
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);

      // ❌ If already logged in → block login page
      if (isLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      // ❌ Invalid token → redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/","/home","/tasks/add_task", "/about", "/todo/:path*"],
};