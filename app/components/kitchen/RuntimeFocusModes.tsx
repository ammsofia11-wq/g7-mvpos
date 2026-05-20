"use client"

type RuntimeFocusMode =
  | "execution"
  | "analysis"
  | "workforce"
  | "command"

const modes: {
  id: RuntimeFocusMode
  label: string
  description: string
}[] = [
  {
    id: "execution",
    label: "Execution",
    description: "Live pressure",
  },
  {
    id: "analysis",
    label: "Analysis",
    description: "AI intelligence",
  },
  {
    id: "workforce",
    label: "Workforce",
    description: "Staff focus",
  },
  {
    id: "command",
    label: "Command",
    description: "Control layer",
  },
]

type RuntimeFocusModesProps = {
  activeMode: RuntimeFocusMode
  onChange: (mode: RuntimeFocusMode) => void
}

export default function RuntimeFocusModes({
  activeMode,
  onChange,
}: RuntimeFocusModesProps) {
  return (
    <section className="rounded-[26px] border border-[#CCFF33]/10 bg-[#0B1108]/85 p-3 shadow-[0_18px_55px_rgba(0,0,0,0.28)] md:p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Runtime Focus
            </p>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-white/40">
              {activeMode}
            </span>
          </div>

          <h2 className="mt-2 text-[24px] font-black tracking-[-0.055em] text-white">
            Choose the operating personality.
          </h2>

          <p className="mt-1 max-w-xl text-[11px] font-medium leading-5 text-white/45">
            Switch the Kitchen OS between execution, analysis, workforce, and
            command views without loading a long dashboard.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-4 xl:min-w-[620px]">
          {modes.map((mode) => {
            const active = activeMode === mode.id

            return (
              <button
                key={mode.id}
                onClick={() => onChange(mode.id)}
                className={`rounded-[18px] border px-3 py-3 text-left transition-all duration-300 ${
                  active
                    ? "border-[#CCFF33]/35 bg-[#CCFF33]/12 shadow-[0_0_28px_rgba(204,255,51,0.08)]"
                    : "border-white/10 bg-white/[0.03] hover:border-[#CCFF33]/20 hover:bg-[#CCFF33]/[0.04]"
                }`}
              >
                <p
                  className={`text-[10px] font-black uppercase tracking-[0.14em] ${
                    active ? "text-[#CCFF33]" : "text-white/45"
                  }`}
                >
                  {mode.label}
                </p>

                <p className="mt-1 text-[10px] font-semibold text-white/35">
                  {mode.description}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}