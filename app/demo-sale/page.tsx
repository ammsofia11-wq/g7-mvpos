import Image from "next/image";
import Link from "next/link";

const demoPath = [
  {
    step: "01",
    title: "Genius Kitchen Positioning",
    text: "Understand how G7 turns chef intelligence into controlled kitchen execution.",
  },
  {
    step: "02",
    title: "Demand to Dispatch Flow",
    text: "See how demand, production, cooling, QA, packaging, fridge call-off, and dispatch connect.",
  },
  {
    step: "03",
    title: "Chef Logic System",
    text: "Chef decisions become build cards, yield chain controls, worker tasks, and QA gates.",
  },
  {
    step: "04",
    title: "Pilot Workspace Preview",
    text: "Open the Genius Kitchen workspace to see how the Founding Pilot is delivered.",
  },
];

const intelligenceLayers = [
  "Chef Logic",
  "Yield Chain",
  "Cooling Gate",
  "QA Gates",
  "Packaging / Dispatch",
  "Fridge Call-Off",
  "Worker Tasks",
  "Waste Control",
  "Consistency Control",
];

const pilotScope = [
  "4–5 selected products",
  "Chef logic capture",
  "Product build structure",
  "Yield chain setup",
  "Cooling and QA gates",
  "Worker task flow",
  "Packaging and dispatch handoff",
  "Pilot delivery workspace",
];

const nextActions = [
  {
    title: "Open Pilot Workspace",
    href: "/genius-kitchen",
    text: "Preview the Genius Kitchen Founding Pilot workspace and delivery structure.",
  },
  {
    title: "Close Demo",
    href: "/demo-close",
    text: "Move from demo understanding into the paid pilot decision page.",
  },
  {
    title: "Start Pilot Onboarding",
    href: "/pilot-onboarding",
    text: "Begin the client setup path after the pilot decision is confirmed.",
  },
];

export default function DemoSalePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#061622] text-white">
      <section className="relative isolate px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(184,115,51,0.15),transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

        <header className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/g7-logo-clean.png"
              alt="G7 logo"
              width={54}
              height={54}
              priority
              className="h-12 w-auto"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
                Genius Kitchen by G7
              </p>
              <p className="text-sm font-semibold text-white">
                Culinary Intelligence System
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/genius-kitchen"
              className="rounded-full border border-cyan-300/40 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
            >
              Pilot Workspace
            </Link>
            <Link
              href="/demo-close"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Close Demo
            </Link>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 pb-12 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
              Paid Pilot Implementation
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Genius Kitchen turns chef intelligence into controlled execution.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              G7 is Chef-Based Kitchen Operating Intelligence for central
              kitchen production. It connects demand, chef logic, yield chain,
              cooling, QA, packaging, fridge call-off, worker tasks, and
              dispatch into one controlled pilot flow.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/genius-kitchen"
                className="rounded-full bg-cyan-300 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-[#061622] transition hover:bg-cyan-200"
              >
                Open Pilot Workspace
              </Link>
              <Link
                href="/demo-close"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Close Demo
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Model
                </p>
                <p className="mt-2 font-bold text-white">Founding Pilot</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Scope
                </p>
                <p className="mt-2 font-bold text-white">4–5 Products</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Offer
                </p>
                <p className="mt-2 font-bold text-white">25,000 EGP</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-white/[0.05] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#081c2a]/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                Recommended Demo Path
              </p>

              <div className="mt-6 space-y-4">
                {demoPath.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm font-black text-cyan-100">
                        {item.step}
                      </span>
                      <div>
                        <h2 className="font-bold text-white">{item.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/genius-kitchen"
                className="mt-6 flex items-center justify-between rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-5 transition hover:border-cyan-200/60 hover:bg-cyan-300/15"
              >
                <div>
                  <p className="text-sm font-black text-cyan-100">
                    Open Genius Kitchen Workspace
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Review the pilot workspace before moving to close.
                  </p>
                </div>
                <span className="text-xl text-cyan-100">→</span>
              </Link>

              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
                <p className="text-sm font-bold text-amber-100">
                  Commercial pilot structure
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  10,000 EGP upfront to start the Founding Pilot, then 15,000
                  EGP on delivery of the agreed pilot workspace.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Chef-Based Kitchen Operating Intelligence
            </p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              What the demo proves
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              The demo is designed to show how a chef-led operation can be
              translated into visible execution rules, controlled handoffs, and
              production decisions that workers can follow consistently.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {intelligenceLayers.map((layer) => (
              <div
                key={layer}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-white"
              >
                {layer}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Founding Pilot
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              Implementation scope
            </h2>
            <div className="mt-6 grid gap-3">
              {pilotScope.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#071a27] p-4"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  <span className="text-sm font-semibold text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100">
              Next decision
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              Move from demo to controlled pilot.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-200">
              The next step is not a full SaaS rollout. It is a focused paid
              pilot where selected products are converted into Genius Kitchen
              operating logic and delivered through a clear client activation
              path.
            </p>

            <div className="mt-7 grid gap-3">
              {nextActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 transition hover:border-cyan-200/50 hover:bg-white/[0.1]"
                >
                  <p className="text-base font-black text-white">
                    {action.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {action.text}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}