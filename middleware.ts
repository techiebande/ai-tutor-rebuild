import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const url = req.nextUrl.clone();

  if (token && (url.pathname === "/signup" || url.pathname === "/signin")) {
    url.pathname = "/dashboard"; // Or wherever you want to redirect
    return NextResponse.redirect(url);
  }

  if (
    !token &&
    (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/chat"))
  ) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signup", "/signin"], // Include signup and signin
};
