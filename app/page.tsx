"use client"

const runtimeFlow = [
  {
    step: "01",
    title: "Demand Lock",
    text: "Locked daily demand becomes the operating input.",
  },
  {
    step: "02",
    title: "Production Plan",
    text: "Dish counts, program splits, prep, cooking, and packaging reports.",
  },
  {
    step: "03",
    title: "Station Tasks",
    text: "Each station receives controlled batch work and SOP instructions.",
  },
  {
    step: "04",
    title: "Worker Execution",
    text: "Mobile/tablet task flow with visual SOPs, checks, and escalation.",
  },
  {
    step: "05",
    title: "Cooling + QA",
    text: "Cold chain, cooling checks, QA hold, and release control.",
  },
  {
    step: "06",
    title: "Packaging Handoff",
    text: "Released batches move to portioning, packing, barcode, and dispatch.",
  },
]

const operatingSystems = [
  {
    title: "Recipe Studio",
    text: "Master dishes, component slots, variants, SOPs, and approval.",
  },
  {
    title: "Kitchen Runtime",
    text: "Batch execution, station control, cooling, QA, and release gates.",
  },
  {
    title: "Workforce OS",
    text: "Worker tasks, station pressure, support movement, and escalation.",
  },
  {
    title: "Inventory OS",
    text: "Supplier logic, stock movement, prep needs, and procurement control.",
  },
]

export default function Home() {
  return (
    <main className="g7-page overflow-hidden">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1220px] items-center px-5 py-8 sm:px-6 lg:py-10">
        <div className="pointer-events-none absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-cyan-300/10 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-[-220px] right-[-180px] h-[520px] w-[520px] rounded-full bg-[#FFD86B]/10 blur-[110px]" />

        <div className="relative grid w-full items-center gap-8 lg:grid-cols-[0.92fr_0.88fr]">
          <section className="max-w-2xl">
            <div className="mb-8 flex items-center gap-5">
              <div className="flex h-[88px] w-[108px] items-center justify-center">
                <img
                  src="/images/g7-logo-clean.png"
                  alt="G7 Culinary Intelligence"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p className="text-[13px] font-black uppercase tracking-[0.34em] text-cyan-300">
                  G7 Culinary Intelligence
                </p>

                <p className="mt-2 text-[12px] uppercase tracking-[0.28em] text-slate-500">
                  Chef-Based Intelligent Culinary OS
                </p>
              </div>
            </div>

            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
              The POS for central kitchen production
            </div>

            <h1
              dir="rtl"
              className="mt-6 text-right text-[34px] font-black leading-[1.16] tracking-[-0.03em] text-white sm:text-[46px] lg:text-[60px]"
            >
              <span className="bg-gradient-to-l from-[#FFD86B] via-[#FFF1B8] to-white bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(255,214,107,0.5)]">
                نظام تشغيل ذكي للمطابخ المركزية
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[20px] font-black leading-7 text-white">
              POS systems control sales. G7 controls production.
            </p>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-300">
              G7 turns locked demand into controlled production tasks, visual
              SOPs, worker execution, cooling checks, QA release, packaging
              readiness, inventory logic, and management command visibility.
            </p>

            <div className="mt-6 rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.045] p-4 shadow-[0_0_28px_rgba(34,211,238,0.08)]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
                Founder-Proven Model
              </p>

              <p className="mt-2 text-[13px] font-bold leading-6 text-slate-200">
                Scaled from 4,000 to 5,000 meals daily with food cost at 21%.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/dashboard" className="g7-button-primary">
                Enter Kitchen OS
              </a>

              <a href="/kitchen" className="g7-button-secondary">
                Open Runtime Floor
              </a>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {operatingSystems.map((item) => (
                <MiniCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </section>

          <section className="g7-card g7-card-cyan p-4 sm:p-5">
            <div className="rounded-[30px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_32%),linear-gradient(135deg,#0f172a,#020617)] p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Central Kitchen Runtime OS
                  </p>

                  <h2 className="mt-3 text-[30px] font-black leading-[1] tracking-[-0.04em] text-white sm:text-[36px]">
                    Operating
                    <span className="block text-cyan-300">Command Brain</span>
                  </h2>
                </div>

                <div className="rounded-2xl border border-[#FFD86B]/25 bg-[#FFD86B]/10 px-4 py-3 text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#FFD86B]">
                    Category
                  </p>
                  <p className="mt-1 text-sm font-black text-white">
                    New Market Layer
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-xl text-[14px] leading-6 text-slate-300">
                The missing operating layer between demand, recipes, workers,
                inventory, QA, packaging, and dispatch.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Metric label="Runtime" value="Live" note="control" />
                <Metric label="Scope" value="360°" note="operation" />
                <Metric label="Chain" value="Cold" note="tracked" />
              </div>

              <div className="mt-6 rounded-[26px] border border-white/10 bg-black/20 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
                    Production Flow
                  </p>

                  <p className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Supplier → Customer
                  </p>
                </div>

                <div className="grid gap-3">
                  {runtimeFlow.map((item) => (
                    <RuntimeStep
                      key={item.step}
                      step={item.step}
                      title={item.title}
                      text={item.text}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-[#FFD86B]/20 bg-[#FFD86B]/[0.06] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FFD86B]">
                  G7 Philosophy
                </p>

                <p className="mt-2 text-[13px] leading-6 text-slate-300">
                  Not a restaurant POS. Not a recipe app. G7 is a chef-based
                  operating system designed to make central kitchen execution
                  repeatable, intelligent, and scalable.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

function MiniCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.03]">
      <p className="text-sm font-black text-white">{title}</p>
      <p className="mt-1 text-xs leading-5 text-slate-400">{text}</p>
    </div>
  )
}

function RuntimeStep({
  step,
  title,
  text,
}: {
  step: string
  title: string
  text: string
}) {
  return (
    <div className="grid grid-cols-[46px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.06] text-[11px] font-black text-cyan-300">
        {step}
      </div>

      <div>
        <p className="text-sm font-black text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">{text}</p>
      </div>
    </div>
  )
}

function Metric({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-[24px] font-black leading-none text-white">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-slate-500">{note}</p>
    </div>
  )
}