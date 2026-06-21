import Link from "next/link";

const onboardingSteps = [
  {
    number: "01",
    title: "Company & Tenant Setup",
    description:
      "Create a safe client workspace with local currency, timezone, units, kitchen name, and operating language.",
    signal: "Client identity",
  },
  {
    number: "02",
    title: "Kitchen Stations Setup",
    description:
      "Define the real production floor: prep, butchery, hot kitchen, cooling, QA, portioning, Packaging Module, dispatch, and handoff.",
    signal: "Production map",
  },
  {
    number: "03",
    title: "Roles & Permissions",
    description:
      "Assign protected access for owner, chef, production manager, QA, storekeeper, purchasing, and workers.",
    signal: "Role protection",
  },
  {
    number: "04",
    title: "Product Build & G7 Culinary Modules Intake",
    description:
      "Enter the client’s own recipes, ingredients, raw weights, yields, allergens, SOPs, and approved supplier rules.",
    signal: "Client data only",
  },
  {
    number: "05",
    title: "First Pilot Product Setup",
    description:
      "Convert one real client product into purchase requirements, Module Tasks, Build Card, worker responsibilities, QA gates, and runtime preview.",
    signal: "Live pilot",
  },
  {
    number: "06",
    title: "Go-Live Readiness Review",
    description:
      "Review operational readiness, team adoption, blocked points, training needs, and rollout plan.",
    signal: "Launch decision",
  },
];

const readinessChecks = [
  "Tenant workspace created",
  "Stations and production flow mapped",
  "Client roles and permissions approved",
  "First Product Build entered",
  "First pilot product generated",
  "QA and release process confirmed",
];

export default function PilotOnboardingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#06111f] text-white">
      <section className="relative min-h-screen px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(202,138,4,0.18),transparent_28%),linear-gradient(135deg,#06111f_0%,#071827_48%,#020617_100%)]" />
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8">
          <header className="flex items-center justify-between gap-4">
            <Link
              href="/demo-close"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
            >
              Back to Close
            </Link>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.9)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                Pilot Onboarding
              </span>
            </div>
          </header>

          <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-7">
              <div className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
                Start Pilot Setup
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                  From Demo Close to First Product Intake.
                </h1>

                <p className="max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                  G7 starts safely: no client secrets exposed, no forced recipe
                  migration, and no fake production promise. The pilot begins
                  with one protected tenant, one real product, and one
                  controlled kitchen workflow.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/pilot-intake"
                  className="rounded-2xl border border-[#CCFF33]/35 bg-[#CCFF33]/10 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#CCFF33] shadow-[0_0_28px_rgba(204,255,51,0.12)] transition hover:bg-[#CCFF33]/15"
                >
                  Start First Product Intake
                </Link>

                <Link
                  href="/demo-sale"
                  className="rounded-2xl border border-cyan-300/35 bg-cyan-300/12 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.14)] transition hover:bg-cyan-300/18"
                >
                  Review Demo Path
                </Link>

                <Link
                  href="/kitchen"
                  className="rounded-2xl border border-lime-300/30 bg-lime-300/10 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-lime-100 transition hover:bg-lime-300/15"
                >
                  Runtime Preview
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/[0.045] p-5 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="rounded-[1.5rem] border border-cyan-300/18 bg-[#071827]/80 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
                      Pilot Scope
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Safe Client Launch
                    </h2>
                  </div>
                  <div className="rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-lime-100">
                    Ready
                  </div>
                </div>

                <div className="grid gap-3">
                  {readinessChecks.map((check) => (
                    <div
                      key={check}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-lime-300/35 bg-lime-300/10 text-xs text-lime-100">
                        ✓
                      </div>
                      <p className="text-sm text-white/72">{check}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-100/80">
                    Protection Rule
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    G7 onboarding uses the client’s own operational data. The
                    demo never exposes proprietary G7 recipes, real costing, or
                    protected internal assets.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {onboardingSteps.map((step) => (
              <article
                key={step.number}
                className="group rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 transition hover:border-cyan-300/35 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-[0.28em] text-cyan-100/70">
                    {step.number}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 group-hover:border-cyan-300/30 group-hover:text-cyan-100">
                    {step.signal}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  {step.description}
                </p>
              </article>
            ))}
          </section>

          <footer className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                Next Commercial Step
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Approve pilot scope, then enter the first real product.
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-white/60">
                This page is the bridge between the cinematic demo and the first
                practical client setup. The next step is not another demo; it is
                the first product intake.
              </p>
            </div>

            <Link
              href="/pilot-intake"
              className="rounded-2xl border border-[#CCFF33]/35 bg-[#CCFF33]/10 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#CCFF33] transition hover:bg-[#CCFF33]/15"
            >
              Start First Product Intake
            </Link>
          </footer>
        </div>
      </section>
    </main>
  );
}