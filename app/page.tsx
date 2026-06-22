"use client"

const commandSignals = [
  { label: "Demand", value: "Known" },
  { label: "Yield", value: "Smart" },
  { label: "QA", value: "Gated" },
  { label: "Dispatch", value: "Ready" },
]

const intelligenceLayers = [
  "Chef Logic",
  "Yield Chain",
  "Cooling Gate",
  "Fridge Call-Off",
]

export default function Home() {
  return (
    <main
      className="g7-page overflow-hidden"
      style={{ height: "100svh", maxHeight: "100svh" }}
    >
      <section className="relative mx-auto flex h-full w-full max-w-[1220px] items-center px-6 py-5">
        <div className="pointer-events-none absolute left-[-260px] top-[-260px] h-[560px] w-[560px] rounded-full bg-cyan-300/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-280px] right-[-240px] h-[580px] w-[580px] rounded-full bg-[#FFD86B]/10 blur-[130px]" />
        <div className="pointer-events-none absolute left-[28%] top-[18%] h-[320px] w-[320px] rounded-full bg-lime-300/[0.05] blur-[100px]" />

        <div className="relative grid w-full items-center gap-8 lg:grid-cols-[0.95fr_0.82fr]">
          <section className="max-w-[650px]">
            <div className="mb-7 flex items-center gap-5">
              <div className="flex h-[102px] w-[132px] shrink-0 items-center justify-center">
                <img
                  src="/images/g7-logo-clean.png"
                  alt="G7 Culinary Intelligence"
                  className="h-full w-full object-contain drop-shadow-[0_0_34px_rgba(34,211,238,0.28)]"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[13px] font-black uppercase tracking-[0.36em] text-cyan-300">
                  G7 Culinary Intelligence
                </p>

                <p className="mt-2 text-[13px] font-black uppercase leading-5 tracking-[0.2em] text-lime-300 drop-shadow-[0_0_12px_rgba(190,242,100,0.16)]">
                  Genius Kitchen by G7
                </p>

                <p className="mt-2 max-w-md text-[12px] font-bold uppercase leading-5 tracking-[0.2em] text-slate-300">
                  Chef-Based Kitchen Operating Intelligence
                </p>
              </div>
            </div>

            <div className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.065] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.08)]">
              The Genius Layer for Real Kitchen Execution
            </div>

            <h1 className="mt-6 max-w-2xl text-[50px] font-black leading-[0.92] tracking-[-0.065em] text-white sm:text-[68px] lg:text-[76px]">
              Control every
              <span className="block bg-gradient-to-r from-cyan-300 via-lime-300 to-[#FFD86B] bg-clip-text text-transparent">
                kitchen batch
              </span>
              end to end.
            </h1>

            <p className="mt-6 max-w-xl text-[24px] font-black leading-8 text-white">
              Chef intelligence becomes controlled execution.
            </p>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-300">
              Genius Kitchen turns meal demand into chef-approved production
              logic, worker tasks, yield control, QA gates, cooling, packaging,
              fridge call-off, and dispatch readiness.
            </p>

            <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
              <ProofCard label="Chef Logic" value="Captured" />
              <ProofCard label="Execution" value="Controlled" />
              <ProofCard label="Handoffs" value="Tracked" />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/dashboard" className="g7-button-primary">
                Enter Kitchen OS
              </a>

              <a href="/kitchen" className="g7-button-secondary">
                Open Runtime Floor
              </a>
            </div>
          </section>

          <section className="g7-card g7-card-cyan p-4">
            <div className="relative h-[500px] overflow-hidden rounded-[32px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),linear-gradient(135deg,#0f172a,#020617)] p-6 shadow-[0_0_55px_rgba(34,211,238,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Genius Command Core
                  </p>

                  <h2 className="mt-3 text-[38px] font-black leading-[0.92] tracking-[-0.045em] text-white">
                    From Demand
                    <span className="block text-cyan-300">To Dispatch</span>
                  </h2>
                </div>

                <div className="rounded-2xl border border-[#FFD86B]/25 bg-[#FFD86B]/10 px-4 py-3 text-right shadow-[0_0_22px_rgba(255,216,107,0.08)]">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#FFD86B]">
                    G7
                  </p>
                  <p className="mt-1 text-[15px] font-black leading-4 text-white">
                    Genius
                    <span className="block">Layer</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-2.5">
                {commandSignals.map((item) => (
                  <SignalCard
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>

              <div className="relative mt-7 h-[250px] rounded-[30px] border border-white/10 bg-black/25 p-5">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[226px] w-[226px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[164px] w-[164px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime-300/10 bg-cyan-300/[0.025]" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-[32px]" />

                <div className="absolute left-1/2 top-1/2 flex h-[126px] w-[170px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[28px] border border-cyan-300/25 bg-[#020617]/92 p-4 text-center shadow-[0_0_38px_rgba(34,211,238,0.12)]">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
                    G7 Core
                  </p>

                  <p className="mt-2 text-[23px] font-black leading-none text-white">
                    Culinary
                    <span className="block text-lime-300">Command</span>
                  </p>

                  <p className="mt-2 text-[10px] font-bold leading-4 text-slate-400">
                    every batch under control
                  </p>
                </div>

                <CoreNode title="Demand" className="left-5 top-6" />
                <CoreNode title="Chef Logic" className="right-5 top-6" />
                <CoreNode title="Worker" className="left-5 bottom-6" />
                <CoreNode title="QA" className="right-5 bottom-6" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {intelligenceLayers.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3"
                  >
                    <p className="text-[12px] font-black text-white">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[24px] border border-[#FFD86B]/20 bg-[#FFD86B]/[0.055] px-5 py-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#FFD86B]">
                  Category Truth
                </p>

                <p className="mt-2 text-[14px] font-bold leading-6 text-slate-200">
                  Not a POS. Not a recipe app. A chef-based operating
                  intelligence layer for real kitchen production.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

function ProofCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-lime-300/20 bg-lime-300/[0.04] px-4 py-3 shadow-[0_0_28px_rgba(190,242,100,0.06)]">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-lime-300">
        {label}
      </p>

      <p className="mt-2 text-[15px] font-black leading-none text-white">
        {value}
      </p>
    </div>
  )
}

function SignalCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/25 p-3.5">
      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-[16px] font-black leading-none text-white">
        {value}
      </p>
    </div>
  )
}

function CoreNode({ title, className }: { title: string; className: string }) {
  return (
    <div
      className={`absolute rounded-2xl border border-white/10 bg-[#020617]/90 px-4 py-3 text-center shadow-[0_14px_30px_rgba(0,0,0,0.2)] ${className}`}
    >
      <p className="text-[12px] font-black text-white">{title}</p>
    </div>
  )
}