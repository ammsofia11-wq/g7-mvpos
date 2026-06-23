import { NextRequest, NextResponse } from "next/server";
import { G7_SESSION_COOKIE, verifySessionToken } from "@/lib/g7-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(G7_SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    clientId: session.clientId,
    username: session.username,
    role: session.role,
  });
}
