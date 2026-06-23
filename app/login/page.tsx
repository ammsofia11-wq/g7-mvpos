"use client";

import { FormEvent, useState } from "react";

type LoginResult = {
  ok?: boolean;
  error?: string;
  redirectTo?: string;
};

export default function LoginPage() {
  const [clientId, setClientId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId, username, password }),
      });

      const data = (await response.json()) as LoginResult;

      if (!response.ok || !data.redirectTo) {
        setError(data.error || "Login failed.");
        return;
      }

      window.location.href = data.redirectTo;
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#06131f] text-white flex items-center justify-center px-6 py-10">
      <section className="w-full max-w-md rounded-[28px] border border-cyan-300/20 bg-white/[0.06] p-7 shadow-2xl backdrop-blur">
        <div className="mb-7">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">
            G7 Kitchen OS
          </p>
          <h1 className="mt-3 text-3xl font-semibold">
            Pilot Workspace Login
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Protected access for client pilot workspaces. Enter your Client ID,
            username, and password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-slate-200">Client ID</span>
            <input
              value={clientId}
              onChange={(event) => setClientId(event.target.value)}
              autoComplete="organization"
              className="w-full rounded-2xl border border-cyan-300/20 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-300"
              placeholder="founding-pilot-001"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-200">Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              className="w-full rounded-2xl border border-cyan-300/20 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-300"
              placeholder="admin@client.com"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-200">Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              type="password"
              className="w-full rounded-2xl border border-cyan-300/20 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-300"
              placeholder="Password"
              required
            />
          </label>

          {error ? (
            <div className="rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Checking access..." : "Enter Pilot Workspace"}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-xs leading-5 text-slate-400">
          Worker users only see their assigned execution screen. Chef and admin
          users receive broader operational access.
        </div>
      </section>
    </main>
  );
}
