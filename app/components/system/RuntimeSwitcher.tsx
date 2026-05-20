"use client"

type RuntimeSwitcherColor = "lime" | "amber" | "blue" | "red"

type RuntimeSwitcherItem<T extends string> = {
  id: T
  label: string
  description?: string
}

type RuntimeSwitcherProps<T extends string> = {
  eyebrow?: string
  title?: string
  items: RuntimeSwitcherItem<T>[]
  activeId: T
  onChange: (id: T) => void
  color?: RuntimeSwitcherColor
}

const colorStyles = {
  lime: {
    eyebrow: "text-[#CCFF33]",
    active:
      "border-[#CCFF33]/35 bg-[#CCFF33]/12 text-[#CCFF33] shadow-[0_0_28px_rgba(204,255,51,0.08)]",
    hover: "hover:border-[#CCFF33]/20 hover:bg-[#CCFF33]/[0.04]",
  },
  amber: {
    eyebrow: "text-amber-300",
    active:
      "border-amber-400/40 bg-amber-400/15 text-amber-300 shadow-[0_0_28px_rgba(251,191,36,0.10)]",
    hover: "hover:border-amber-400/25 hover:bg-amber-400/[0.05]",
  },
  blue: {
    eyebrow: "text-cyan-300",
    active:
      "border-cyan-400/40 bg-cyan-400/15 text-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.10)]",
    hover: "hover:border-cyan-400/25 hover:bg-cyan-400/[0.05]",
  },
  red: {
    eyebrow: "text-red-300",
    active:
      "border-red-400/40 bg-red-400/15 text-red-300 shadow-[0_0_28px_rgba(248,113,113,0.10)]",
    hover: "hover:border-red-400/25 hover:bg-red-400/[0.05]",
  },
}

export default function RuntimeSwitcher<T extends string>({
  eyebrow = "Runtime Switcher",
  title = "Choose the operating layer.",
  items,
  activeId,
  onChange,
  color = "lime",
}: RuntimeSwitcherProps<T>) {
  const styles = colorStyles[color]

  return (
    <section className="rounded-[26px] border border-white/10 bg-white/[0.03] p-3 shadow-[0_18px_55px_rgba(0,0,0,0.25)] md:p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p
            className={`text-[9px] font-black uppercase tracking-[0.22em] ${styles.eyebrow}`}
          >
            {eyebrow}
          </p>

          <h2 className="mt-2 text-[24px] font-black tracking-[-0.055em] text-white">
            {title}
          </h2>
        </div>

        <div
          className={`grid gap-2 ${
            items.length >= 4
              ? "sm:grid-cols-4 xl:min-w-[680px]"
              : "sm:grid-cols-3 xl:min-w-[560px]"
          }`}
        >
          {items.map((item) => {
            const active = activeId === item.id

            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={`rounded-[18px] border px-3 py-3 text-left transition-all duration-300 ${
                  active
                    ? styles.active
                    : `border-white/10 bg-white/[0.03] text-white/45 ${styles.hover}`
                }`}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.14em]">
                  {item.label}
                </p>

                {item.description && (
                  <p className="mt-1 text-[10px] font-semibold text-white/35">
                    {item.description}
                  </p>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}