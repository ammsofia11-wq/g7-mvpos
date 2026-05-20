import React from "react"

type G7CardProps = {
  children: React.ReactNode
  className?: string
}

export function G7Card({ children, className = "" }: G7CardProps) {
  return (
    <div
      className={`
        rounded-3xl
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        shadow-2xl
        p-6
        space-y-4
        transition-all duration-300
        hover:border-white/20
        hover:bg-white/[0.07]
        ${className}
      `}
    >
      {children}
    </div>
  )
}