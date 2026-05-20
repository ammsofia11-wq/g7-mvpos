"use client"

import RuntimeBadge from "./RuntimeBadge"

type RuntimeSectionHeaderProps = {
  eyebrow: string
  title: string
  badge?: string
  color?: "lime" | "amber" | "blue" | "red" | "white"
  rightContent?: React.ReactNode
}

const titleColors = {
  lime: "text-[#CCFF33]",
  amber: "text-amber-300",
  blue: "text-cyan-300",
  red: "text-red-300",
  white: "text-white/70",
}

export default function RuntimeSectionHeader({
  eyebrow,
  title,
  badge,
  color = "white",
  rightContent,
}: RuntimeSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={`text-[9px] font-black uppercase tracking-[0.25em] ${titleColors[color]}`}
          >
            {eyebrow}
          </p>

          {badge && (
            <RuntimeBadge color={color}>
              {badge}
            </RuntimeBadge>
          )}
        </div>

        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
          {title}
        </h2>
      </div>

      {rightContent && (
        <div className="shrink-0">
          {rightContent}
        </div>
      )}
    </div>
  )
}