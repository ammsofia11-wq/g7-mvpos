import Link from "next/link"

const promises = [
  "Control the full kitchen operation",
  "Standardize SOP execution",
  "Protect food cost and reduce waste",
  "Evaluate workers fairly with no wasta",
  "Scale the kitchen without chaos",
]

const controlLayers = [
  "Purchasing",
  "Receiving",
  "Inventory",
  "Supplier Quality",
  "Recipe Costing",
  "Prep Tasks",
  "Cooking Tasks",
  "Cooling",
  "QA Gates",
  "Portioning",
  "Packaging",
  "Dispatch",
  "Worker Performance",
  "Waste",
  "Cost Leakage",
  "Savings Visibility",
]

const costFlow = [
  "Purchased Weight",
  "Received Weight",
  "Trimmed Weight",
  "Prep Weight",
  "Cooked Yield",
  "Portion Weight",
  "Packed Output",
  "Waste / Loss",
  "Cost Leakage",
  "Savings Report",
]

const onboardingOptions = [
  "Excel / CSV import",
  "PDF / paper / photo upload",
  "AI SOP builder",
  "Starter templates",
]

const workerSignals = [
  "Tasks completed",
  "On-time execution",
  "SOP compliance",
  "QA rejection rate",
  "Waste variance",
  "Portion accuracy",
  "Training improvement",
  "Station teamwork",
]

export default function ClientValuePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-10">
          <nav className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
            <Link
              href="/demo-sale"
              className="rounded-full border border-white/15 px-4 py-2 hover:border-emerald-300 hover:text-emerald-200"
            >
              Back to Demo Sale
            </Link>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/client-onboarding"
                className="rounded-full border border-white/15 px-4 py-2 hover:border-emerald-300 hover:text-emerald-200"
              >
                Client Onboarding
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
              <Link
                href="/kitchen"
                className="rounded-full border border-white/15 px-4 py-2 hover:border-sky-300 hover:text-sky-200"
              >
                Runtime Floor
              </Link>
            </div>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-7">
              <div className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                G7 Kitchen OS - Client Value
              </div>

              <div className="space-y-5">
                <h1 className="max-w-5xl text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
                  Control the heavy kitchen operation.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                  G7 helps central kitchens control production, standardize SOPs, protect food cost, reduce waste, and evaluate workers fairly using real execution data.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
                  Product position
                </p>
                <p className="mt-3 text-2xl font-bold">
                  Like a POS, but for central kitchen production.
                </p>
                <p className="mt-3 leading-7 text-slate-300">
                  A normal POS controls sales, orders, and payments. G7 controls what happens after demand exists: planning, station tasks, worker SOPs, QA, yield, waste, cost leakage, and live runtime visibility.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">
                Demo chain
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Client Data Onboarding",
                  "Demand Lock",
                  "Station Tasks",
                  "Worker SOP",
                  "Completion Proof",
                  "Live Runtime Floor",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-300/15 text-sm font-bold text-emerald-200">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-slate-100">{item}</span>
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
              The 5 big client promises
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Why clients pay for G7
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {promises.map((promise) => (
              <article
                key={promise}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <h3 className="text-lg font-bold">{promise}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/50 px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-200">
              Full operation control
            </p>
            <h2 className="text-3xl font-black sm:text-4xl">
              G7 controls the kitchen operation layer by layer.
            </h2>
            <p className="leading-7 text-slate-300">
              The client should see that G7 is not only a recipe screen. It is a control system for the daily production operation.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {controlLayers.map((layer) => (
              <div
                key={layer}
                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-slate-200"
              >
                {layer}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">
              Cost Protection & Yield Intelligence
            </p>
            <h2 className="text-3xl font-black sm:text-4xl">
              Show the client where money is leaking.
            </h2>
            <p className="leading-7 text-slate-300">
              G7 calculates the real waste baseline from the client data. Demo percentages are targets or estimates only. The system value is showing actual waste, lost portions, and cost leakage.
            </p>
            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5">
              <p className="font-bold text-amber-100">
                G7 shows the kitchen where money is leaking before the monthly food cost report arrives.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-200">
              Ingredient-to-portion flow
            </p>
            <div className="mt-5 grid gap-3">
              {costFlow.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-300/15 text-sm font-bold text-amber-100">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-slate-100">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/50 px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-200">
              Fair Worker Evaluation
            </p>
            <h2 className="text-3xl font-black sm:text-4xl">
              Performance based on execution, not wasta.
            </h2>
            <p className="leading-7 text-slate-300">
              G7 evaluates workers using operational data. The goal is fairness, training, and visibility, not automatic punishment.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {workerSignals.map((signal) => (
              <div
                key={signal}
                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-slate-200"
              >
                {signal}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-200">
              Client Data Onboarding
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Every kitchen can start, even without perfect data.
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              Some clients have Excel files. Some have paper sheets. Some have photos. Some have no SOPs at all. G7 supports every level of data maturity.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {onboardingOptions.map((option) => (
              <article
                key={option}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <h3 className="text-lg font-bold">{option}</h3>
              </article>
            ))}
          </div>

          <Link
            href="/client-onboarding"
            className="inline-flex rounded-full bg-emerald-300 px-6 py-3 text-sm font-black text-slate-950 hover:bg-white"
          >
            Open Client Onboarding
          </Link>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-100">
                Final message
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                G7 turns kitchen operations into a controlled system.
              </h2>
              <p className="mt-4 max-w-4xl leading-7 text-emerald-50">
                It helps central kitchens move from verbal management, hidden waste, unfair evaluation, and late food-cost discovery to system-controlled production, measured waste, fair worker visibility, and scalable execution.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/client-onboarding"
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-slate-950 hover:bg-emerald-100"
              >
                Open Client Onboarding
              </Link>
              <Link
                href="/production-tasks"
                className="rounded-full border border-white/30 px-6 py-3 text-center text-sm font-black text-white hover:border-white"
              >
                View Production Tasks
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
