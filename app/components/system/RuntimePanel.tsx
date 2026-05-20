"use client"

type RuntimePanelProps = {
  children: React.ReactNode
  color?: "lime" | "amber" | "blue" | "red" | "white"
  compact?: boolean
  className?: string
}

const colorStyles = {
  lime: "border-[#CCFF33]/15 bg-[#0B1108]/90",
  amber: "border-amber-400/20 bg-amber-400/[0.04]",
  blue: "border-cyan-400/20 bg-cyan-400/[0.04]",
  red: "border-red-400/20 bg-red-500/[0.05]",
  white: "border-white/10 bg-white/[0.035]",
}

export default function RuntimePanel({
  children,
  color = "white",
  compact = false,
  className = "",
}: RuntimePanelProps) {
  return (
    <section
      className={`rounded-[26px] border shadow-[0_20px_60px_rgba(0,0,0,0.28)] ${
        colorStyles[color]
      } ${compact ? "p-3 md:p-4" : "p-4 md:p-5"} ${className}`}
    >
      {children}
    </section>
  )
}