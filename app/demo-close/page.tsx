import Link from "next/link"

const clientGets = [
  "A sellable production control story from demand to runtime",
  "Clear client onboarding options for messy real kitchen data",
  "Station-level task visibility before workers start execution",
  "Tablet-first worker SOP flow with proof and escalation",
  "A live runtime floor that shows pressure, blockers, and production state",
  "A protected-data message that keeps recipes, costs, and client operations safe",
]

const implementationPath = [
  {
    step: "01",
    title: "Pilot Scope",
    text: "Agree the kitchen area, menu sample, stations, and first production flow that should be controlled by G7.",
  },
  {
    step: "02",
    title: "Client Data Intake",
    text: "Start from Excel, CSV, PDF, paper, photos, or starter templates without requiring perfect data from day one.",
  },
  {
    step: "03",
    title: "Chef Approval",
    text: "The chef reviews structured recipes, SOPs, yield rules, QA checks, and production task logic before runtime use.",
  },
  {
    step: "04",
    title: "Production Pilot",
    text: "Run a controlled pilot from demand to station tasks, worker execution, QA gates, and live runtime visibility.",
  },
]

const closeDecisions = [
  "Choose pilot kitchen scope",
  "Prepare first client data pack",
  "Select first production flow",
  "Agree onboarding owner",
  "Run controlled demo with real team roles",
  "Move from demo story to implementation plan",
]

const protectedRules = [
  "G7 sells the operating system layer, not protected private recipes.",
  "Client kitchens own their own recipes, ingredients, suppliers, costs, SOPs, and operational numbers.",
  "Demo pages use safe sample language and do not expose live runtime stores or protected data assets.",
  "The final close keeps the sales journey separate from production runtime logic.",
]

export default function DemoClosePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06111F] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute left-[-120px] top-[-160px] h-[360px] w-[360px] rounded-full bg-cyan-400/20 blur-[90px]" />
        <div className="absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[#CCFF33]/10 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
      </div>

      <section className="relative mx-auto flex w-full max-w-[1480px] flex-col gap-5 px-4 py-4 pb-10 sm:px-5 lg:px-7">
        <header className="rounded-[34px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-7">
          <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
            <Link
              href="/demo-sale"
              className="rounded-full border border-white/15 px-4 py-2 transition hover:border-cyan-300/40 hover:text-cyan-200"
            >
              Back to Demo Sale
            </Link>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/client-value"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:border-emerald-300/40 hover:text-emerald-200"
              >
                Client Value
              </Link>
              <Link
                href="/client-onboarding"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:border-[#CCFF33]/40 hover:text-[#CCFF33]"
              >
                Client Onboarding
              </Link>
              <Link
                href="/production-tasks"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:border-amber-300/40 hover:text-amber-200"
              >
                Production Tasks
              </Link>
            </div>
          </nav>

          <div className="grid gap-8 xl:grid-cols-[1fr_420px]">
            <div>
              <div className="inline-flex rounded-full border border-[#CCFF33]/25 bg-[#CCFF33]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
                G7 Kitchen OS - Demo Close
              </div>

              <h1 className="mt-5 max-w-5xl text-[42px] font-black leading-[0.9] tracking-[-0.065em] text-white sm:text-[62px] lg:text-[76px]">
                Close the demo with a clear next step.
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-slate-300 sm:text-[17px]">
                The demo has shown the business value, onboarding path, production tasks, worker SOP execution, and runtime floor. This page turns the story into a safe pilot decision without exposing protected data or touching live runtime logic.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/client-onboarding"
                  className="rounded-full border border-[#CCFF33]/35 bg-[#CCFF33]/10 px-5 py-3 text-[12px] font-black uppercase tracking-[0.16em] text-[#CCFF33] transition hover:border-[#CCFF33] hover:bg-[#CCFF33]/15 hover:text-[#E9FF9A]"
                >
                  Review Onboarding
                </Link>

                <Link
                  href="/demo-sale"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-[12px] font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  Back to Journey
                </Link>
              </div>
            </div>

            <aside className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.07] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
                Final Sales Message
              </p>

              <h2 className="mt-3 text-[34px] font-black leading-[0.92] tracking-[-0.055em] text-white">
                G7 is the production OS behind the kitchen.
              </h2>

              <p className="mt-4 text-[13px] leading-6 text-slate-300">
                POS platforms control orders and payments. G7 controls the operation after demand exists: data onboarding, production tasks, SOP execution, QA gates, workforce pressure, and runtime visibility.
              </p>

              <div className="mt-5 rounded-[22px] border border-white/10 bg-black/20 p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Safe Close
                </p>
                <p className="mt-2 text-[22px] font-black leading-tight text-white">
                  Start with a pilot. Scale with the system.
                </p>
              </div>
            </aside>
          </div>
        </header>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
              What the client gets
            </p>
            <h2 className="mt-3 text-[36px] font-black leading-none tracking-[-0.055em] text-white">
              A complete sellable demo path.
            </h2>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {clientGets.map((item) => (
              <article
                key={item}
                className="rounded-[24px] border border-white/10 bg-black/20 p-4"
              >
                <p className="text-[14px] font-bold leading-6 text-slate-100">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Implementation Path
            </p>

            <h2 className="mt-3 text-[34px] font-black leading-[0.95] tracking-[-0.055em] text-white">
              From demo to pilot.
            </h2>

            <p className="mt-4 text-[13px] leading-6 text-slate-300">
              The close should not promise a magical instant system. It should make the next step practical: define scope, collect client data, approve the chef logic, and run a controlled production pilot.
            </p>
          </div>

          <div className="grid gap-3">
            {implementationPath.map((item) => (
              <article
                key={item.step}
                className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] border border-[#CCFF33]/25 bg-[#CCFF33]/10 text-[18px] font-black text-[#CCFF33]">
                    {item.step}
                  </div>

                  <div>
                    <h3 className="text-[24px] font-black leading-none tracking-[-0.04em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-6 text-slate-300">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-200">
                Next Decision
              </p>

              <h2 className="mt-3 text-[34px] font-black leading-[0.95] tracking-[-0.055em] text-white">
                What should happen after the demo?
              </h2>

              <p className="mt-4 text-[13px] leading-6 text-slate-300">
                The client should leave with a clear path, not just a nice screen. The decision is to start a focused pilot with a defined data pack and one controlled production flow.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {closeDecisions.map((decision) => (
                <div
                  key={decision}
                  className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-3 text-[13px] font-bold leading-6 text-slate-100"
                >
                  {decision}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-cyan-300/15 bg-cyan-300/[0.06] p-5 sm:p-6">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
                Protected Data Rules
              </p>

              <h2 className="mt-3 text-[34px] font-black leading-[0.95] tracking-[-0.055em] text-white">
                The demo closes without exposing private kitchen assets.
              </h2>
            </div>

            <div className="grid gap-3">
              {protectedRules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-[22px] border border-white/10 bg-black/20 p-4 text-[13px] font-bold leading-6 text-slate-100"
                >
                  {rule}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
                Close Statement
              </p>

              <h2 className="mt-3 text-[38px] font-black leading-[0.95] tracking-[-0.055em] text-white">
                G7 turns central kitchen work into a controlled operating system.
              </h2>

              <p className="mt-4 max-w-4xl text-[14px] leading-7 text-slate-200">
                The client does not need perfect data to begin. G7 provides the structure to collect it, clean it, approve it, and turn it into production execution with visibility from demand to runtime.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/client-onboarding"
                className="rounded-full border border-[#CCFF33]/35 bg-[#CCFF33]/10 px-6 py-3 text-center text-sm font-black text-[#CCFF33] transition hover:border-[#CCFF33] hover:bg-[#CCFF33]/15 hover:text-[#E9FF9A]"
              >
                Start Client Onboarding
              </Link>

              <Link
                href="/production-tasks"
                className="rounded-full border border-white/30 px-6 py-3 text-center text-sm font-black text-white transition hover:border-white"
              >
                View Production Tasks
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

