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
    label: "AI Chef",
    href: "/generate",
    icon: "⚡",
    description: "Meal intelligence",
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
    description: "Nutrition systems",
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
    <div className="min-h-screen overflow-hidden bg-[#050814] text-white">
      <div className="hidden lg:grid lg:min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="sticky top-0 h-screen overflow-hidden border-r border-white/10 bg-[#060912]/96 backdrop-blur-2xl">
          <div className="flex h-full flex-col px-4 py-4">
            <div className="shrink-0">
              <Link
                href="/"
                className="group flex items-center gap-3 rounded-[22px] border border-white/5 bg-white/[0.02] p-2.5 transition hover:border-cyan-300/20 hover:bg-cyan-300/[0.04]"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-cyan-300 shadow-[0_0_34px_rgba(34,211,238,0.22)] transition group-hover:scale-[1.03]">
                  <span className="text-[28px] font-black tracking-[-0.08em] text-[#020617]">
                    G7
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase leading-4 tracking-[0.22em] text-cyan-300">
                    Culinary
                    <br />
                    Intelligence
                  </p>

                  <p className="mt-1 truncate text-[9px] uppercase tracking-[0.14em] text-white/75">
                    Chef-Based Nutrition OS
                  </p>
                </div>
              </Link>

              <div className="mt-4 rounded-[24px] border border-white/10 bg-gradient-to-br from-cyan-300/[0.08] to-white/[0.02] p-4">
                <p className="text-[8px] font-black uppercase tracking-[0.24em] text-cyan-300">
                  G7 SYSTEM
                </p>

                <h3 className="mt-2 text-[20px] font-black leading-[1] tracking-[-0.05em] text-white">
                  AI Culinary
                  <br />
                  Operating System
                </h3>

                <p className="mt-3 text-[11px] leading-5 text-slate-400">
                  Nutrition intelligence built around flavor, identity,
                  kitchen execution, inventory control, procurement, workforce,
                  approval governance, and recipe documentation.
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[
                    "AI Chef",
                    "I Chef",
                    "Approval OS",
                    "Kitchen OS",
                    "Employees OS",
                    "Inventory OS",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-cyan-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
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
                          ? "border-cyan-300/55 bg-cyan-300 text-[#001018] shadow-[0_0_28px_rgba(34,211,238,0.16)]"
                          : "border-white/5 bg-white/[0.02] text-slate-400 hover:border-cyan-300/25 hover:bg-cyan-300/[0.05] hover:text-white"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border text-sm font-black transition ${
                            active
                              ? "border-black/10 bg-white/20"
                              : "border-white/10 bg-black/20 group-hover:border-cyan-300/20"
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
          </div>
        </aside>

        <main className="min-w-0 overflow-x-hidden bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_30%),#050814]">
          {children}
        </main>
      </div>

      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#050814]/92 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[18px] bg-cyan-300 shadow-[0_0_26px_rgba(34,211,238,0.22)]">
            <span className="text-[24px] font-black tracking-[-0.08em] text-[#020617]">
              G7
            </span>
          </div>

          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300">
              Culinary OS
            </p>

            <p className="mt-1 text-[9px] text-white/80">
              Chef-Based Nutrition OS
            </p>
          </div>
        </Link>

        <Link
          href="/approval"
          className="rounded-full bg-cyan-300 px-4 py-2 text-xs font-black text-[#001018]"
        >
          Approval OS
        </Link>
      </div>

      <main className="min-w-0 overflow-x-hidden lg:hidden">
        {children}
      </main>
    </div>
  )
}