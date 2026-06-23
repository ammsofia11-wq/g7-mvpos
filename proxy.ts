import { NextRequest, NextResponse } from "next/server";
import {
  G7_SESSION_COOKIE,
  getRoleHome,
  isPathAllowedForRole,
  isProtectedPilotPath,
  verifySessionToken,
} from "./lib/g7-auth";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get(G7_SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL(getRoleHome(session.role), request.url));
  }

  if (!isProtectedPilotPath(pathname)) {
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!isPathAllowedForRole(pathname, session.role)) {
    return NextResponse.redirect(new URL(getRoleHome(session.role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
