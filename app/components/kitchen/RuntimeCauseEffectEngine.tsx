"use client"

const causeEffectChains = [
  {
    cause: "Blocked Stage",
    effect: "AI Alerts priority increases",
    impact: "Critical escalation becomes the dominant runtime focus.",
    strength: 96,
  },
  {
    cause: "Delayed Cooking",
    effect: "Production Control expands",
    impact: "The OS increases floor visibility to protect output flow.",
    strength: 84,
  },
  {
    cause: "Low Efficiency",
    effect: "Workforce attention increases",
    impact: "The system recommends reallocating support capacity.",
    strength: 78,
  },
  {
    cause: "Dispatch Pressure",
    effect: "Delivery risk rises",
    impact: "Dispatch intelligence becomes more important near cut-off time.",
    strength: 69,
  },
]

export default function RuntimeCauseEffectEngine() {
  return (
    <section className="rounded-[30px] border border-white/10 bg-[#10140f]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-5">
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
          Runtime Cause & Effect Engine
        </p>

        <h2 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white md:text-[34px]">
          The OS understands why pressure is spreading.
        </h2>

        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/55">
          Every runtime signal creates downstream consequences. This engine maps
          how operational pressure moves through the kitchen.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {causeEffectChains.map((chain) => (
          <div
            key={chain.cause}
            className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 transition-all duration-500 hover:border-[#CCFF33]/25 hover:bg-[#CCFF33]/[0.04]"
          >
            <div className="grid gap-3 md:grid-cols-[1fr_40px_1fr] md:items-center">
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-3">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-red-300">
                  Cause
                </p>

                <p className="mt-2 text-sm font-black text-white">
                  {chain.cause}
                </p>
              </div>

              <div className="text-center text-xl font-black text-[#CCFF33]">
                →
              </div>

              <div className="rounded-2xl border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-3">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#CCFF33]">
                  Effect
                </p>

                <p className="mt-2 text-sm font-black text-white">
                  {chain.effect}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs font-semibold leading-5 text-white/55">
              {chain.impact}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#CCFF33]"
                  style={{ width: `${chain.strength}%` }}
                />
              </div>

              <p className="text-[10px] font-black text-[#CCFF33]">
                {chain.strength}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}