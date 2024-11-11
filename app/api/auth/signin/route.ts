import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Sign in failed. Please try again" },
        { status: response.status }
      );
    }

    const responseData = await response.json();

    const token = responseData.data.token;

    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An Error occured. Please try again" },
      { status: 500 }
    );
  }
}