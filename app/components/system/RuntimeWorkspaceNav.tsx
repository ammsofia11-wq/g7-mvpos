"use client"

import Link from "next/link"

type RuntimeWorkspace = {
  label: string
  href: string
  status?: string
  color?: "lime" | "amber" | "green" | "blue" | "red" | "white"
}

type RuntimeWorkspaceNavProps = {
  active: string
  items: RuntimeWorkspace[]
}

const colorStyles = {
  lime: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  green: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  amber: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  blue: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  red: "border-red-400/20 bg-red-400/10 text-red-300",
  white: "border-white/10 bg-white/[0.05] text-white/70",
}

export default function RuntimeWorkspaceNav({
  active,
  items,
}: RuntimeWorkspaceNavProps) {
  return (
    <nav className="rounded-[24px] border border-white/10 bg-white/[0.035] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <div className="flex gap-2 overflow-x-auto">
        {items.map((item) => {
          const isActive = active === item.label.toLowerCase()
          const color = item.color ?? "white"

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`min-w-fit rounded-[18px] border px-4 py-3 transition-all duration-300 ${
                isActive
                  ? colorStyles[color]
                  : "border-white/10 bg-black/20 text-white/45 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.18em]">
                {item.label}
              </p>

              {item.status && (
                <p className="mt-1 text-[9px] font-bold opacity-60">
                  {item.status}
                </p>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}