import Link from "next/link"

const onboardingMethods = [
  {
    title: "Excel / CSV",
    subtitle: "For kitchens that already track recipes, ingredients, suppliers, menus, portions, or production sheets in spreadsheets.",
    points: [
      "Import ingredient lists",
      "Import recipe costing sheets",
      "Import production demand",
      "Map columns into G7 templates",
    ],
  },
  {
    title: "PDF / Paper / Photos",
    subtitle: "For kitchens that still work from printed recipes, handwritten SOPs, supplier invoices, or kitchen photos.",
    points: [
      "Upload old recipe sheets",
      "Capture supplier papers",
      "Convert photos into structured tasks",
      "Clean messy documents into usable data",
    ],
  },
  {
    title: "AI SOP Builder",
    subtitle: "For kitchens that know the method but do not have clean written SOPs yet.",
    points: [
      "Build prep steps",
      "Build cooking method",
      "Add cooling checks",
      "Add QA and packaging rules",
    ],
  },
  {
    title: "Starter Templates",
    subtitle: "For new kitchens that want to start with safe templates before entering their own real data.",
    points: [
      "Recipe template",
      "Ingredient template",
      "Supplier template",
      "Production task template",
    ],
  },
]

const onboardingFlow = [
  "Choose data source",
  "Upload or enter client data",
  "AI structures the kitchen information",
  "Chef reviews and approves",
  "G7 turns approved data into production tasks",
]

const protectedRules = [
  "Client kitchens enter or import their own recipes, ingredients, suppliers, costs, SOPs, and operational numbers.",
  "Demo pages use safe sample information only.",
  "Protected G7 source assets are not exposed to client onboarding.",
  "No live runtime store, API, WorkerBoard, ProductionTimeline, ingredientDB, or G7_RECIPES changes are required here.",
]

export default function ClientOnboardingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-10">
          <nav className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
            <Link
              href="/client-value"
              className="rounded-full border border-white/15 px-4 py-2 hover:border-emerald-300 hover:text-emerald-200"
            >
              Back to Client Value
            </Link>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/demo-sale"
                className="rounded-full border border-white/15 px-4 py-2 hover:border-sky-300 hover:text-sky-200"
              >
                Demo Sale
              </Link>
              <Link
                href="/production-tasks"
                className="rounded-full border border-white/15 px-4 py-2 hover:border-amber-300 hover:text-amber-200"
              >
                Production Tasks
              </Link>
              <Link
                href="/worker-task"
                className="rounded-full border border-white/15 px-4 py-2 hover:border-emerald-300 hover:text-emerald-200"
              >
                Worker Task
              </Link>
            </div>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-7">
              <div className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                G7 Kitchen OS - Client Onboarding
              </div>

              <div className="space-y-5">
                <h1 className="max-w-5xl text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
                  Every kitchen can start, even without perfect data.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                  G7 helps a client move from spreadsheets, papers, photos, and verbal kitchen knowledge into structured production data that can become tasks, SOPs, QA gates, and runtime control.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/production-tasks"
                  className="rounded-full bg-emerald-300 px-6 py-3 text-sm font-black text-slate-950 hover:bg-white"
                >
                  Continue to Production Tasks
                </Link>
                <Link
                  href="/client-value"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white hover:border-emerald-300"
                >
                  Back to Client Value
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">
                Onboarding Flow
              </p>

              <div className="mt-6 space-y-3">
                {onboardingFlow.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-300/15 text-sm font-bold text-emerald-200">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-slate-100">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">
              Data Entry Options
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Start from the client&apos;s real kitchen situation.
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              Some clients have clean files. Some have only old paper sheets. Some have recipes inside the chef&apos;s head. G7 can start from any level and convert it into controlled kitchen data.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {onboardingMethods.map((method) => (
              <article
                key={method.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-2xl font-black">{method.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{method.subtitle}</p>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {method.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-slate-200"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/50 px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-200">
              Safe Client Data Layer
            </p>
            <h2 className="text-3xl font-black sm:text-4xl">
              The client owns their kitchen data.
            </h2>
            <p className="leading-7 text-slate-300">
              G7 can explain the onboarding path without exposing protected internal recipes, ingredient databases, runtime stores, or private operational assets.
            </p>
          </div>

          <div className="grid gap-3">
            {protectedRules.map((rule) => (
              <div
                key={rule}
                className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm font-semibold leading-6 text-slate-200"
              >
                {rule}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-100">
                Next Step
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                After onboarding, G7 can turn approved data into production execution.
              </h2>
              <p className="mt-4 max-w-4xl leading-7 text-emerald-50">
                Once the client&apos;s data is structured and approved, the system can move into production tasks, worker SOPs, QA gates, and the live kitchen runtime floor.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/production-tasks"
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-slate-950 hover:bg-emerald-100"
              >
                Open Production Tasks
              </Link>
              <Link
                href="/demo-sale"
                className="rounded-full border border-white/30 px-6 py-3 text-center text-sm font-black text-white hover:border-white"
              >
                Back to Demo Sale
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}