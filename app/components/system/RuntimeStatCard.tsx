"use client"

type RuntimeStatCardProps = {
  label: string
  value: string | number
  note?: string
  color?: "lime" | "amber" | "blue" | "red" | "white"
}

const colorStyles = {
  lime: "border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] text-[#CCFF33]",
  amber: "border-amber-400/20 bg-amber-400/[0.08] text-amber-300",
  blue: "border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300",
  red: "border-red-400/20 bg-red-500/[0.08] text-red-300",
  white: "border-white/10 bg-white/[0.035] text-white/60",
}

export default function RuntimeStatCard({
  label,
  value,
  note,
  color = "white",
}: RuntimeStatCardProps) {
  return (
    <div className={`rounded-[20px] border p-4 ${colorStyles[color]}`}>
      <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-80">
        {label}
      </p>

      <p className="mt-2 text-[22px] font-black text-white">
        {value}
      </p>

      {note && (
        <p className="mt-1 truncate text-[10px] font-semibold text-white/45">
          {note}
        </p>
      )}
    </div>
  )
}