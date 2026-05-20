"use client"

type RuntimeHeroProps = {
  eyebrow: string
  title: string
  accentTitle?: string
  description: string

  badge?: string

  color?: "lime" | "amber" | "blue" | "red"

  rightContent?: React.ReactNode
}

const colorStyles = {
  lime: {
    shell:
      "border-[#CCFF33]/15 bg-[linear-gradient(135deg,rgba(204,255,51,0.12),rgba(255,255,255,0.03))]",
    accent: "text-[#CCFF33]",
    badge:
      "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  },

  amber: {
    shell:
      "border-amber-400/20 bg-[linear-gradient(135deg,rgba(251,191,36,0.13),rgba(255,255,255,0.03))]",
    accent: "text-amber-300",
    badge:
      "border-amber-400/20 bg-amber-400/10 text-amber-300",
  },

  blue: {
    shell:
      "border-cyan-400/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.13),rgba(255,255,255,0.03))]",
    accent: "text-cyan-300",
    badge:
      "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  },

  red: {
    shell:
      "border-red-400/20 bg-[linear-gradient(135deg,rgba(248,113,113,0.13),rgba(255,255,255,0.03))]",
    accent: "text-red-300",
    badge:
      "border-red-400/20 bg-red-400/10 text-red-300",
  },
}

export default function RuntimeHero({
  eyebrow,
  title,
  accentTitle,
  description,
  badge,
  color = "lime",
  rightContent,
}: RuntimeHeroProps) {
  const styles = colorStyles[color]

  return (
    <section
      className={`rounded-[32px] border p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-6 ${styles.shell}`}
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p
              className={`text-[9px] font-black uppercase tracking-[0.24em] ${styles.accent}`}
            >
              {eyebrow}
            </p>

            {badge && (
              <div
                className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.16em] ${styles.badge}`}
              >
                {badge}
              </div>
            )}
          </div>

          <h1 className="mt-2 text-[38px] font-black leading-[0.9] tracking-[-0.07em] text-white sm:text-[52px]">
            {title}

            {accentTitle && (
              <span className={`block ${styles.accent}`}>
                {accentTitle}
              </span>
            )}
          </h1>

          <p className="mt-4 max-w-3xl text-[13px] leading-6 text-slate-300">
            {description}
          </p>
        </div>

        {rightContent && (
          <div className="xl:min-w-[420px]">
            {rightContent}
          </div>
        )}
      </div>
    </section>
  )
}