"use client"

import Link from "next/link"

type RuntimeDockItem = {
  label: string
  href: string
  icon: string
  color?: "lime" | "amber" | "green" | "blue" | "red" | "white"
}

type RuntimeDockProps = {
  active: string
  items: RuntimeDockItem[]
}

const colorStyles = {
  lime: "border-[#CCFF33]/25 bg-[#CCFF33]/15 text-[#CCFF33]",
  green: "border-emerald-400/25 bg-emerald-400/15 text-emerald-300",
  amber: "border-amber-400/25 bg-amber-400/15 text-amber-300",
  blue: "border-cyan-400/25 bg-cyan-400/15 text-cyan-300",
  red: "border-red-400/25 bg-red-400/15 text-red-300",
  white: "border-white/10 bg-white/[0.06] text-white/70",
}

export default function RuntimeDock({
  active,
  items,
}: RuntimeDockProps) {
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3 xl:hidden">
      <nav className="flex max-w-full gap-2 overflow-x-auto rounded-[24px] border border-white/10 bg-black/75 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        {items.map((item) => {
          const isActive = active === item.label.toLowerCase()
          const color = item.color ?? "white"

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-[76px] flex-col items-center justify-center rounded-[18px] border px-3 py-2 transition-all duration-300 ${
                isActive
                  ? colorStyles[color]
                  : "border-white/10 bg-white/[0.04] text-white/45"
              }`}
            >
              <span className="text-lg leading-none">
                {item.icon}
              </span>

              <span className="mt-1 text-[9px] font-black uppercase tracking-[0.12em]">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}