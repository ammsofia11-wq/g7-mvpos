"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "✦",
    description: "System overview",
  },
  {
    label: "Recipe Studio",
    href: "/recipe-studio",
    icon: "◬",
    description: "Protected recipe lifecycle",
  },
  {
    label: "AI Chef",
    href: "/generate",
    icon: "⚡",
    description: "Culinary intelligence",
  },
  {
    label: "I Chef",
    href: "/ichef",
    icon: "✎",
    description: "Recipe documentation",
  },
  {
    label: "Approval OS",
    href: "/approval",
    icon: "⬢",
    description: "Chef approval center",
  },
  {
    label: "Kitchen OS",
    href: "/kitchen",
    icon: "◈",
    description: "Production runtime",
  },
  {
    label: "Employees OS",
    href: "/workforce",
    icon: "◉",
    description: "Workforce structure",
  },
  {
    label: "Weekly OS",
    href: "/weekly",
    icon: "▣",
    description: "7-day orchestration",
  },
  {
    label: "Inventory OS",
    href: "/inventory",
    icon: "▤",
    description: "Procurement logic",
  },
  {
    label: "Systems",
    href: "/plans",
    icon: "◇",
    description: "Operating systems",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "◌",
    description: "Preferences",
  },
]

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#050814] text-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[292px] border-r border-white/10 bg-[#060912] shadow-[18px_0_60px_rgba(0,0,0,0.32)] lg:flex">
        <div className="flex min-h-0 w-full flex-col">
          <div className="shrink-0 border-b border-white/10 px-4 py-4">
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.03] p-2.5 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.05]"
            >
              <div className="flex h-14 w-16 shrink-0 items-center justify-center transition group-hover:scale-[1.03]">
                <img
                  src="/images/g7-logo-clean.png"
                  alt="G7 Culinary Intelligence"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase leading-4 tracking-[0.22em] text-cyan-300">
                  Culinary
                  <br />
                  Intelligence
                </p>

                <p className="mt-1 truncate text-[9px] uppercase tracking-[0.14em] text-white/75">
                  Kitchen Operations OS
                </p>
              </div>
            </Link>

            <div className="mt-4 rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.06] px-4 py-3">
              <p className="text-[8px] font-black uppercase tracking-[0.24em] text-cyan-300">
                G7 COMMAND SHELL
              </p>

              <h3 className="mt-2 text-[18px] font-black leading-[1.05] tracking-[-0.05em] text-white">
                Central Kitchen
                <br />
                Runtime OS
              </h3>

              <p className="mt-2 text-[10px] leading-4 text-slate-400">
                Recipe, production, workforce, QA, inventory, dispatch, and
                runtime control in one operating layer.
              </p>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <p className="px-2 text-[8px] font-black uppercase tracking-[0.30em] text-slate-500">
              Navigation
            </p>

            <nav className="mt-3 space-y-2">
              {navItems.map((item) => {
                const active = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-[18px] border px-3 py-2.5 transition-all duration-300 ${
                      active
                        ? "border-cyan-300/60 bg-cyan-300 text-[#001018] shadow-[0_0_28px_rgba(34,211,238,0.18)]"
                        : "border-white/10 bg-white/[0.025] text-slate-400 hover:border-cyan-300/25 hover:bg-cyan-300/[0.05] hover:text-white"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border text-sm font-black transition ${
                          active
                            ? "border-black/10 bg-white/20"
                            : "border-white/10 bg-black/25 group-hover:border-cyan-300/20"
                        }`}
                      >
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-black tracking-wide">
                          {item.label}
                        </p>

                        <p
                          className={`truncate text-[10px] ${
                            active
                              ? "text-[#01202c]/70"
                              : "text-slate-500 group-hover:text-slate-300"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {active && <span className="text-sm font-black">→</span>}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="shrink-0 border-t border-white/10 px-4 py-4">
            <div className="rounded-[20px] border border-lime-300/15 bg-lime-300/[0.06] p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.22em] text-lime-300">
                    Runtime
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-slate-300">
                    Command shell ready
                  </p>
                </div>

                <span className="h-2.5 w-2.5 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.65)]" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="hidden min-h-screen min-w-0 overflow-x-hidden bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_30%),#050814] lg:block lg:pl-[292px]">
        {children}
      </main>

      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#050814]/92 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-[52px] w-[64px] shrink-0 items-center justify-center">
              <img
                src="/images/g7-logo-clean.png"
                alt="G7 Culinary Intelligence"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300">
                Culinary Intelligence
              </p>

              <p className="mt-1 truncate text-[9px] text-white/80">
                Kitchen Operations OS
              </p>
            </div>
          </Link>

          <Link
            href="/recipe-studio"
            className="shrink-0 rounded-full bg-cyan-300 px-4 py-2 text-xs font-black text-[#001018]"
          >
            Recipe Studio
          </Link>
        </div>

        <div className="flex gap-2 overflow-x-auto px-4 pb-3">
          {navItems.map((item) => {
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-full border px-3 py-2 text-[11px] font-black transition ${
                  active
                    ? "border-cyan-300 bg-cyan-300 text-[#001018]"
                    : "border-white/10 bg-white/[0.03] text-slate-300"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      <main className="min-w-0 overflow-x-hidden lg:hidden">
        {children}
      </main>
    </div>
  )
}
