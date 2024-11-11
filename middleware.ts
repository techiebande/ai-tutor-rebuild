import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const url = req.nextUrl.clone();

  // Redirect logged-in users away from signup or signin pages
  if (token && (url.pathname === "/signup" || url.pathname === "/signin")) {
    url.pathname = "/dashboard"; // Or wherever you want to redirect
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users to signin page if accessing protected routes
  if (
    !token &&
    (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/chat"))
  ) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed if conditions are met
  return NextResponse.next();
}

// Apply the middleware to all relevant routes
export const config = {
  matcher: ["/dashboard/:path*", "/chat/:path*", "/signup", "/signin"], // Include signup and signin
};
