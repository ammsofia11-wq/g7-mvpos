import { NextRequest, NextResponse } from "next/server";
import { G7_SESSION_COOKIE } from "@/lib/g7-auth";

function clearSession(response: NextResponse) {
  response.cookies.set(G7_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}

export async function POST() {
  return clearSession(NextResponse.json({ ok: true }));
}

export async function GET(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  return clearSession(NextResponse.redirect(loginUrl));
}
