import { NextResponse } from "next/server";

export function setToken(token: string) {
  if (typeof window !== "undefined") {
    document.cookie = `token=${token}; path=/; secure; samesite=strict;`;
  } else {
    const res = NextResponse.next();
    res.cookies.set("token", token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    return res;
  }
}

export function getToken() {
  if (typeof window !== "undefined") {
    const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
    return match ? decodeURIComponent(match[2]) : null;
  } else {
    return null;
  }
}

export async function clearToken() {
  if (typeof window !== "undefined") {
    await fetch("/api/auth/logout", { method: "GET" });
  }
}
