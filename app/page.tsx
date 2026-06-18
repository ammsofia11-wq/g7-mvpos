"use client"

const commandSignals = [
  { label: "Demand", value: "Locked" },
  { label: "Runtime", value: "Live" },
  { label: "QA", value: "Gated" },
  { label: "Chain", value: "Tracked" },
]

const orbitNodes = [
  { title: "Demand", className: "left-5 top-6" },
  { title: "Recipe", className: "right-5 top-6" },
  { title: "Worker", className: "left-5 bottom-6" },
  { title: "QA", className: "right-5 bottom-6" },
]

export default function Home() {
  return (
    <main
      className="g7-page overflow-hidden"
      style={{ height: "100svh", maxHeight: "100svh" }}
    >
      <section className="relative mx-auto flex h-full w-full max-w-[1240px] items-center px-5 py-4 sm:px-6">
        <div className="pointer-events-none absolute left-[-260px] top-[-260px] h-[560px] w-[560px] rounded-full bg-cyan-300/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-280px] right-[-240px] h-[580px] w-[580px] rounded-full bg-[#FFD86B]/10 blur-[130px]" />
        <div className="pointer-events-none absolute left-[28%] top-[18%] h-[320px] w-[320px] rounded-full bg-lime-300/[0.05] blur-[100px]" />

        <div className="relative grid w-full items-center gap-7 lg:grid-cols-[0.9fr_0.84fr]">
          <section className="max-w-[620px]">
            <div className="mb-5 flex items-center gap-5">
              <div className="flex h-[98px] w-[128px] shrink-0 items-center justify-center">
                <img
                  src="/images/g7-logo-clean.png"
                  alt="G7 Culinary Intelligence"
                  className="h-full w-full object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[12px] font-black uppercase tracking-[0.34em] text-cyan-300">
                  G7 Culinary Intelligence
                </p>

                <p className="mt-2 text-[11px] font-black uppercase leading-5 tracking-[0.2em] text-lime-300 drop-shadow-[0_0_10px_rgba(190,242,100,0.14)]">
                  G7 Intelligent Culinary System
                </p>

                <p className="mt-1.5 max-w-md text-[10px] uppercase leading-5 tracking-[0.22em] text-slate-500">
                  Chef-Based OS for Central Kitchen Production
                </p>
              </div>
            </div>

            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[0.055] px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-300">
              The POS for central kitchen production
            </div>

            <h1 className="mt-5 max-w-2xl text-[40px] font-black leading-[0.94] tracking-[-0.06em] text-white sm:text-[52px] lg:text-[58px]">
              Control every batch
              <span className="block bg-gradient-to-r from-cyan-300 via-lime-300 to-[#FFD86B] bg-clip-text text-transparent">
                from demand
              </span>
              to dispatch.
            </h1>

            <p className="mt-4 max-w-xl text-[19px] font-black leading-7 text-white">
              POS systems control sales. G7 controls production.
            </p>

            <p className="mt-3 max-w-xl text-[13px] leading-6 text-slate-300">
              A chef-based command system that turns locked demand into recipe
              intelligence, station tasks, worker SOPs, cooling checks, QA
              release, packaging readiness, and owner visibility.
            </p>

            <div className="mt-4 rounded-[20px] border border-lime-300/20 bg-lime-300/[0.04] px-4 py-3 shadow-[0_0_28px_rgba(190,242,100,0.06)]">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-lime-300">
                Founder-Proven Model
              </p>

              <p className="mt-1.5 text-[12px] font-bold leading-5 text-slate-200">
                Scaled from 4,000 to 5,000 meals daily with food cost at 21%.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/dashboard" className="g7-button-primary">
                Enter Kitchen OS
              </a>

              <a href="/kitchen" className="g7-button-secondary">
                Open Runtime Floor
              </a>
            </div>
          </section>

          <section className="g7-card g7-card-cyan p-4">
            <div className="relative h-[484px] overflow-hidden rounded-[30px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),linear-gradient(135deg,#0f172a,#020617)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Genius Command Core
                  </p>

                  <h2 className="mt-2 text-[30px] font-black leading-[0.95] tracking-[-0.04em] text-white">
                    From Demand
                    <span className="block text-cyan-300">To Execution</span>
                  </h2>
                </div>

                <div className="rounded-2xl border border-[#FFD86B]/25 bg-[#FFD86B]/10 px-4 py-3 text-right">
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#FFD86B]">
                    G7
                  </p>
                  <p className="mt-1 text-sm font-black text-white">
                    Genius Layer
                  </p>
                </div>
              </div>

              <p className="mt-3 max-w-xl text-[12px] leading-5 text-slate-300">
                The intelligent layer between demand, culinary logic, workers,
                QA, packaging, and dispatch.
              </p>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {commandSignals.map((item) => (
                  <SignalCard
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>

              <div className="relative mt-4 h-[232px] rounded-[28px] border border-white/10 bg-black/20 p-4">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[144px] w-[144px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime-300/10 bg-cyan-300/[0.02]" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-[30px]" />

                <div className="absolute left-1/2 top-1/2 flex h-[112px] w-[148px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[26px] border border-cyan-300/25 bg-[#020617]/90 p-4 text-center shadow-[0_0_34px_rgba(34,211,238,0.1)]">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-300">
                    G7 Core
                  </p>
                  <p className="mt-2 text-[19px] font-black leading-none text-white">
                    Culinary
                    <span className="block text-lime-300">Command</span>
                  </p>
                  <p className="mt-2 text-[9px] leading-4 text-slate-500">
                    every batch under control
                  </p>
                </div>

                {orbitNodes.map((item) => (
                  <CoreNode
                    key={item.title}
                    title={item.title}
                    className={item.className}
                  />
                ))}
              </div>

              <div className="mt-4 rounded-[22px] border border-[#FFD86B]/20 bg-[#FFD86B]/[0.055] px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#FFD86B]">
                      Category Truth
                    </p>

                    <p className="mt-1 text-[12px] leading-5 text-slate-300">
                      Not a POS. Not a recipe app. G7 controls production.
                    </p>
                  </div>

                  <p className="rounded-full border border-[#FFD86B]/20 bg-black/20 px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#FFD86B]">
                    Supplier → Customer
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
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
    <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
      <p className="text-[8px] uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-1.5 text-[17px] font-black leading-none text-white">
        {value}
      </p>
    </div>
  )
}

function CoreNode({ title, className }: { title: string; className: string }) {
  return (
    <div
      className={`absolute rounded-2xl border border-white/10 bg-[#020617]/88 px-4 py-3 text-center shadow-[0_14px_30px_rgba(0,0,0,0.18)] ${className}`}
    >
      <p className="text-[11px] font-black text-white">{title}</p>
    </div>
  )
}