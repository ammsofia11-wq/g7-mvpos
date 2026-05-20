"use client"

type RuntimeBadgeProps = {
  children: React.ReactNode
  color?: "lime" | "amber" | "blue" | "red" | "white"
}

const colorStyles = {
  lime: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  amber: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  blue: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  red: "border-red-400/20 bg-red-400/10 text-red-300",
  white: "border-white/10 bg-white/[0.05] text-white/70",
}

export default function RuntimeBadge({
  children,
  color = "lime",
}: RuntimeBadgeProps) {
  return (
    <div
      className={`rounded-full border px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.14em] ${colorStyles[color]}`}
    >
      {children}
    </div>
  )
}