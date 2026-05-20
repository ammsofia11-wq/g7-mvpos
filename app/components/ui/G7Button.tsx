export function G7Button({
  children,
  active,
  onClick
}: {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-3 rounded-2xl
        border transition-all duration-300
        bg-white/5 border-white/10
        hover:scale-[1.03]
        ${active ? "ring-2 ring-cyan-400 shadow-lg" : ""}
      `}
    >
      {children}
    </button>
  )
}