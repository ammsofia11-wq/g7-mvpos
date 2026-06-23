import { NextResponse } from "next/server";
import {
  G7_SESSION_COOKIE,
  createSessionToken,
  findPilotUser,
  getRoleHome,
} from "@/lib/g7-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      clientId?: string;
      username?: string;
      password?: string;
    };

    const clientId = body.clientId || "";
    const username = body.username || "";
    const password = body.password || "";

    const user = findPilotUser(clientId, username, password);

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Invalid Client ID, username, or password." },
        { status: 401 }
      );
    }

    const token = await createSessionToken({
      clientId: user.clientId,
      username: user.username,
      role: user.role,
    });

    const response = NextResponse.json({
      ok: true,
      role: user.role,
      redirectTo: getRoleHome(user.role),
    });

    response.cookies.set(G7_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60,
    });

    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to login." },
      { status: 500 }
    );
  }
}
