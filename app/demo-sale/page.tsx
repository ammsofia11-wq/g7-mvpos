import Link from "next/link"

type DemoStage = {
  step: string
  title: string
  subtitle: string
  signal: string
  ownerView: string
  kitchenAction: string
}

const demoStages: DemoStage[] = [
  {
    step: "01",
    title: "Demand Lock",
    subtitle: "Daily production demand is locked before the kitchen starts.",
    signal: "Orders translated into production volume",
    ownerView: "Knows what must be produced before labor, prep, and purchasing move.",
    kitchenAction: "Lock demand by menu, program, portion size, batch, and dispatch window.",
  },
  {
    step: "02",
    title: "Recipe Runtime",
    subtitle: "Approved recipes become controlled production instructions.",
    signal: "Master Dish + component slots + batch rules",
    ownerView: "Recipes are not loose documents. They become operational production logic.",
    kitchenAction: "Convert approved recipe data into batch yield, station needs, SOPs, and QA gates.",
  },
  {
    step: "03",
    title: "Station Tasks",
    subtitle: "Production is broken into station-level execution.",
    signal: "Prep, cook, cooling, portioning, packaging",
    ownerView: "Every station knows what to do, when to do it, and what can block release.",
    kitchenAction: "Assign clear station tasks with timing, capacity, and pressure visibility.",
  },
  {
    step: "04",
    title: "Worker SOP",
    subtitle: "Workers receive simple task guidance instead of complex recipe documents.",
    signal: "Mobile-first SOP execution",
    ownerView: "The system helps workers perform correctly even when the chef is not beside them.",
    kitchenAction: "Show task steps, visual method guidance, safety notes, and completion checks.",
  },
  {
    step: "05",
    title: "Cooling Checks",
    subtitle: "Cooling becomes a mandatory control point, not an afterthought.",
    signal: "Temperature + timestamp compliance",
    ownerView: "Food safety is controlled before QA release and packaging readiness.",
    kitchenAction: "Track cooling entry, exit, temperature checks, hold status, and exceptions.",
  },
  {
    step: "06",
    title: "QA Release",
    subtitle: "Production cannot move forward until quality gates are cleared.",
    signal: "Chef approval + QA hold + release authority",
    ownerView: "No batch is released because someone guessed it was ready.",
    kitchenAction: "Approve, hold, reject, or escalate batches based on defined QA rules.",
  },
  {
    step: "07",
    title: "Packaging Readiness",
    subtitle: "Approved food moves into controlled portioning and packaging.",
    signal: "Labels, portions, packaging rules, dispatch readiness",
    ownerView: "The system connects production quality to customer handoff.",
    kitchenAction: "Confirm portion accuracy, packaging rules, batch identity, and dispatch status.",
  },
  {
    step: "08",
    title: "Command View",
    subtitle: "Owners and managers see the full kitchen state in one operational view.",
    signal: "Production control from demand to dispatch",
    ownerView: "POS systems control sales. G7 controls production.",
    kitchenAction: "Surface pressure, blockers, workforce needs, QA risk, and release readiness.",
  },
]

const proofStats = [
  {
    label: "Founder-Proven Model",
    value: "4,000-5,000",
    note: "meals daily production scale",
  },
  {
    label: "Food Cost Control",
    value: "21%",
    note: "operational food cost benchmark",
  },
  {
    label: "Runtime Scope",
    value: "Demand -> Dispatch",
    note: "central kitchen production flow",
  },
]

const commandCards = [
  {
    title: "Category Launch Deck",
    href: "/demo-deck",
    note: "The 10-slide presentation that explains G7 as the missing operating system for central kitchen production.",
  },
  {
    title: "Client Value",
    href: "/client-value",
    note: "See the business value: operation control, cost protection, waste visibility, fair worker evaluation, and onboarding.",
  },
  {
    title: "Client Onboarding",
    href: "/client-onboarding",
    note: "See how a client can start from Excel, CSV, PDF, paper, photos, AI SOP Builder, or starter templates.",
  },
  {
    title: "Production Tasks",
    href: "/production-tasks",
    note: "See how locked demand becomes station workload, batch tasks, proof requirements, and worker handoff.",
  },
  {
    title: "Worker Task",
    href: "/worker-task",
    note: "See how one approved batch becomes a tablet-first SOP with visual guidance, barcode, storage, packing, and QA escalation.",
  },
  {
    title: "Kitchen Runtime",
    href: "/kitchen",
    note: "See batch production, worker execution, alerts, and runtime pressure.",
  },
  {
    title: "Demo Close",
    href: "/demo-close",
    note: "Close the sales story with what the client gets, pilot path, protected data rules, and next decision.",
  },
  {
    title: "Recipe Studio",
    href: "/recipe-studio",
    note: "See how approved recipes connect to production runtime logic.",
  },
  {
    title: "QA Approval",
    href: "/approval",
    note: "See release authority, QA holds, and batch approval control.",
  },
  {
    title: "Inventory Runtime",
    href: "/inventory",
    note: "See how procurement and stock connect to production readiness.",
  },
]

export default function DemoSalePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06111F] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute left-[-120px] top-[-160px] h-[360px] w-[360px] rounded-full bg-cyan-400/20 blur-[90px]" />
        <div className="absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[#CCFF33]/10 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
      </div>

      <section className="relative mx-auto flex w-full max-w-[1480px] flex-col gap-5 px-4 py-4 pb-10 sm:px-5 lg:px-7">
        <header className="rounded-[34px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-7">
          <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
            <div>
              <div className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
                G7 Sellable Demo Journey
              </div>

              <h1 className="mt-5 max-w-4xl text-[44px] font-black leading-[0.9] tracking-[-0.065em] text-white sm:text-[64px] lg:text-[78px]">
                Central Kitchen
                <span className="block text-cyan-300">
                  Runtime OS
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-slate-300 sm:text-[17px]">
                A sellable demo path showing how G7 controls central kitchen
                production from demand lock to dispatch readiness. POS systems
                control sales. G7 controls production.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/kitchen"
                  className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-5 py-3 text-[12px] font-black uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/15 hover:text-white"
                >
                  Open Runtime
                </Link>

                <Link
                  href="/demo-close"
                  className="rounded-full border border-[#CCFF33]/30 bg-[#CCFF33]/10 px-5 py-3 text-[12px] font-black uppercase tracking-[0.16em] text-[#CCFF33] transition hover:border-[#CCFF33] hover:bg-[#CCFF33]/15 hover:text-[#E9FF9A]"
                >
                  Close Demo
                </Link>

                <Link
                  href="/"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-[12px] font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  Back Home
                </Link>
              </div>
            </div>

            <aside className="rounded-[28px] border border-[#CCFF33]/20 bg-[#CCFF33]/[0.07] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
                Founder-Proven Model
              </p>

              <h2 className="mt-3 text-[34px] font-black leading-[0.92] tracking-[-0.055em] text-white">
                Built from real production pressure.
              </h2>

              <p className="mt-4 text-[13px] leading-6 text-slate-300">
                Scaled from 4,000 to 5,000 meals daily with food cost at 21%.
                The demo explains the system layer, not protected private recipes
                or client-owned operational data.
              </p>

              <div className="mt-5 grid gap-3">
                {proofStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[22px] border border-white/10 bg-black/20 p-4"
                  >
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-[28px] font-black leading-none text-white">
                      {stat.value}
                    </p>

                    <p className="mt-2 text-[12px] font-bold text-slate-400">
                      {stat.note}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 lg:sticky lg:top-4 lg:self-start">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Demo Story
            </p>

            <h2 className="mt-3 text-[34px] font-black leading-[0.92] tracking-[-0.055em]">
              From demand to dispatch.
            </h2>

            <p className="mt-4 text-[13px] leading-6 text-slate-300">
              This route is intentionally isolated from live runtime stores,
              protected recipes, ingredient databases, and worker execution
              components. It is a sales-grade explanation layer.
            </p>

            <div className="mt-5 rounded-[24px] border border-cyan-300/20 bg-cyan-300/10 p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-200">
                Category Positioning
              </p>

              <p className="mt-2 text-[20px] font-black leading-tight text-white">
                The POS for central kitchen production.
              </p>

              <p className="mt-3 text-[12px] leading-5 text-slate-300">
                Restaurant POS platforms control orders and payments. G7 is the
                intelligence layer for production, QA, workforce, packaging, and
                dispatch readiness.
              </p>
            </div>
          </aside>

          <div className="grid gap-3">
            {demoStages.map((stage) => (
              <article
                key={stage.step}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06] sm:p-5"
              >
                <div className="grid gap-4 xl:grid-cols-[90px_1fr_0.9fr]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-cyan-300/25 bg-cyan-300/10 text-[22px] font-black text-cyan-200">
                    {stage.step}
                  </div>

                  <div>
                    <h3 className="text-[28px] font-black leading-none tracking-[-0.04em] text-white">
                      {stage.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-6 text-slate-300">
                      {stage.subtitle}
                    </p>

                    <div className="mt-4 inline-flex rounded-full border border-[#CCFF33]/20 bg-[#CCFF33]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#CCFF33]">
                      {stage.signal}
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
                        Owner View
                      </p>

                      <p className="mt-2 text-[12px] leading-5 text-slate-200">
                        {stage.ownerView}
                      </p>
                    </div>

                    <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
                        Kitchen Action
                      </p>

                      <p className="mt-2 text-[12px] leading-5 text-slate-200">
                        {stage.kitchenAction}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
                Runtime Entry Points
              </p>

              <h2 className="mt-3 text-[36px] font-black leading-none tracking-[-0.055em] text-white">
                Continue into the live system.
              </h2>
            </div>

            <p className="max-w-xl text-[13px] leading-6 text-slate-300">
              These links open existing product areas without changing their
              runtime logic or protected data contracts.
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {commandCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="rounded-[24px] border border-white/10 bg-black/20 p-4 transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.07]"
              >
                <p className="text-[20px] font-black leading-tight text-white">
                  {card.title}
                </p>

                <p className="mt-3 text-[12px] leading-5 text-slate-400">
                  {card.note}
                </p>

                <div className="mt-5 text-[11px] font-black uppercase tracking-[0.16em] text-cyan-300">
                  Open -&gt;
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}