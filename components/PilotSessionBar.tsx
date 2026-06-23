"use client";

import { useEffect, useState } from "react";

type SessionState = {
  authenticated: boolean;
  clientId?: string;
  username?: string;
  role?: "admin" | "chef" | "worker";
};

const protectedPrefixes = [
  "/genius-kitchen",
  "/pilot-onboarding",
  "/pilot-intake",
  "/client-activation",
  "/production-tasks",
  "/worker-task",
  "/kitchen",
  "/recipe-studio",
  "/command",
  "/approval",
  "/inventory",
  "/workforce",
];

function roleLabel(role?: string) {
  if (role === "admin") return "Admin";
  if (role === "chef") return "Chef";
  if (role === "worker") return "Worker";
  return "Pilot User";
}

export default function PilotSessionBar() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);

    let isMounted = true;

    fetch("/api/session", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return { authenticated: false };
        return (await response.json()) as SessionState;
      })
      .then((data) => {
        if (isMounted) setSession(data);
      })
      .catch(() => {
        if (isMounted) setSession({ authenticated: false });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const isProtectedPage = protectedPrefixes.some((prefix) => {
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });

  if (!isProtectedPage || !session?.authenticated) return null;

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] rounded-2xl border border-cyan-300/25 bg-slate-950/90 px-4 py-3 text-xs text-white shadow-2xl backdrop-blur">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-200">
            G7 Pilot Access
          </p>
          <p className="mt-1 text-sm font-semibold">
            {roleLabel(session.role)}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
