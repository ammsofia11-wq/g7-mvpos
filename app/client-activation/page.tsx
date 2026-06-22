import Link from "next/link";

const activationPath = [
  {
    step: "01",
    title: "Commercial Acceptance",
    text: "Pilot result is accepted and the client is ready to move from validation into commercial activation.",
  },
  {
    step: "02",
    title: "Secure Workspace Setup",
    text: "A separate client workspace is prepared with country, currency, timezone, roles, stations, and production structure.",
  },
  {
    step: "03",
    title: "Client Data Intake",
    text: "The client provides their own recipes, ingredients, suppliers, staff, stations, QA rules, packaging, and dispatch requirements.",
  },
  {
    step: "04",
    title: "Go-Live Readiness",
    text: "The first category, products, stations, worker tasks, and QA release flow are prepared for live production.",
  },
];

const workspaceSetup = [
  "Country, currency, timezone",
  "Central kitchen / branches",
  "Role access",
  "Stations",
  "QA release rules",
  "Production structure",
];

const clientData = [
  "Recipes / products",
  "Ingredients",
  "Suppliers",
  "Packaging",
  "Staff",
  "Stations",
  "QA rules",
  "Dispatch rules",
];

const clientDataHandoff = [
  {
    title: "Recipes / Products",
    clientRequired:
      "Approved product list, recipes, yields, portion sizes, batch sizes, SOP notes.",
    g7Structures:
      "Product Builds, Build Cards, G7 Culinary Modules, Module Tasks.",
    goLiveDependency:
      "Required before production tasks, worker execution, QA release, and costing protection can be configured.",
  },
  {
    title: "Ingredients",
    clientRequired:
      "Ingredient list, units, specs, allergens, storage needs, substitutions.",
    g7Structures:
      "Ingredient master, prep references, storage rules, approved alternatives.",
    goLiveDependency:
      "Required before recipe structure, purchasing logic, inventory control, and QA validation.",
  },
  {
    title: "Suppliers",
    clientRequired:
      "Approved suppliers, contact details, supply items, lead times, order rules.",
    g7Structures:
      "Supplier map, purchasing handoff, receiving checks, approved source records.",
    goLiveDependency:
      "Required before procurement, receiving, substitution control, and supply risk tracking.",
  },
  {
    title: "Packaging",
    clientRequired:
      "Packaging items, sizes, labels, containers, sealing rules, shelf-life notes.",
    g7Structures:
      "Packaging Modules, packing tasks, label rules, product handoff checks.",
    goLiveDependency:
      "Required before portioning, packaging station setup, dispatch readiness, and customer handoff.",
  },
  {
    title: "Stations",
    clientRequired:
      "Kitchen stations, equipment, station capacity, prep/cook/cooling/packing flow.",
    g7Structures:
      "Station map, task routing, production sequence, runtime ownership.",
    goLiveDependency:
      "Required before tasks can be assigned to workers and production flow can be controlled.",
  },
  {
    title: "Staff",
    clientRequired:
      "Staff list, roles, skill levels, station ownership, shift structure.",
    g7Structures:
      "Role permissions, worker task views, station assignment, escalation paths.",
    goLiveDependency:
      "Required before worker execution, task protection, production responsibility, and escalation logic.",
  },
  {
    title: "QA Rules",
    clientRequired:
      "Critical checks, temperature rules, cooling checks, release standards, rejection rules.",
    g7Structures: "QA gates, hold/release logic, sign-off rules, exception flags.",
    goLiveDependency:
      "Required before batches can move safely from production to release.",
  },
  {
    title: "Dispatch Rules",
    clientRequired:
      "Dispatch timing, route rules, vehicle checks, cold-chain rules, delivery handoff standards.",
    g7Structures:
      "Dispatch readiness, release-to-delivery handoff, packing confirmation, delivery checks.",
    goLiveDependency:
      "Required before Go-Live because production is not complete until handoff is controlled.",
  },
];

const readinessChecklist = [
  "First category selected",
  "First products approved",
  "Stations mapped",
  "Worker tasks prepared",
  "QA release confirmed",
  "First live production batch ready",
];

const operationalActions = [
  {
    label: "Open Production Tasks",
    href: "/production-tasks",
    description: "Prepare station-level tasks for the first live production run.",
  },
  {
    label: "Open Worker Task",
    href: "/worker-task",
    description: "Review the protected worker execution screen.",
  },
  {
    label: "Open Runtime Preview",
    href: "/kitchen",
    description: "Preview live kitchen runtime, pressure, batches, and execution flow.",
  },
  {
    label: "Open Recipe Studio",
    href: "/recipe-studio",
    description: "Prepare safe recipe, product, station, and QA production structure.",
  },
  {
    label: "Back to Pilot Intake",
    href: "/pilot-intake",
    description: "Return to pilot intake and commercial close.",
  },
];

export default function ClientActivationPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03111f] text-white">
      <section className="relative isolate min-h-screen px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(184,115,51,0.18),transparent_28%),linear-gradient(135deg,#020817_0%,#03111f_45%,#071f2f_100%)]" />
        <div className="absolute left-0 top-0 -z-10 h-full w-full opacity-40">
          <div className="absolute left-8 top-24 h-px w-[42rem] rotate-[-12deg] bg-cyan-300/30" />
          <div className="absolute right-12 top-48 h-px w-[34rem] rotate-[18deg] bg-amber-300/20" />
          <div className="absolute bottom-28 left-24 h-px w-[38rem] rotate-[9deg] bg-cyan-200/20" />
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/pilot-intake"
              className="rounded-full border border-cyan-300/30 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-200/10"
            >
              ← Back to Pilot Intake
            </Link>

            <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-amber-100">
              Pilot Approved → Activation
            </div>
          </header>

          <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="rounded-[2rem] border border-cyan-200/20 bg-white/[0.04] p-7 shadow-2xl shadow-cyan-950/40 backdrop-blur md:p-10">
              <div className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-100">
                Client Activation Workspace
              </div>

              <h1 className="max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
                Client Activation Workspace
              </h1>

              <p className="mt-5 max-w-3xl text-xl font-semibold text-cyan-50 sm:text-2xl">
                Pilot approved. Commercial activation can now begin.
              </p>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                G7 now moves from pilot validation to a secure client workspace
                where the client&apos;s own kitchen data, roles, products,
                stations, and QA rules are prepared for go-live.
              </p>

              <div className="mt-8 rounded-3xl border border-amber-300/25 bg-amber-300/10 p-5">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-100">
                  Commercial Protection Principle
                </p>
                <p className="mt-3 text-lg font-semibold leading-8 text-white">
                  G7 sells the operating system, not protected recipes, private
                  costing, or internal founder data.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-amber-300/20 bg-[#071827]/85 p-7 shadow-2xl shadow-black/40 md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-amber-100">
                Activation Path
              </p>

              <div className="mt-6 grid gap-4">
                {activationPath.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-sm font-black text-cyan-100">
                        {item.step}
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-white">
                          {item.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-cyan-300/20 bg-white/[0.04] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan-100">
                Workspace Setup
              </p>
              <h2 className="mt-3 text-2xl font-black text-white">
                Separate client workspace / tenant
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Every client starts with a secure operational structure prepared
                for their own kitchen, country, roles, and production model.
              </p>

              <div className="mt-5 grid gap-3">
                {workspaceSetup.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-[#061725] px-4 py-3 text-sm font-semibold text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-cyan-300/20 bg-white/[0.04] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan-100">
                Client Data Intake
              </p>
              <h2 className="mt-3 text-2xl font-black text-white">
                Client-owned data goes in
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                The workspace is prepared with safe structure first. The client
                then provides their own operational data for production.
              </p>

              <div className="mt-5 grid gap-3">
                {clientData.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-[#061725] px-4 py-3 text-sm font-semibold text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-cyan-300/20 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan-100">
                  Client Data Intake Handoff
                </p>
                <h2 className="mt-3 text-3xl font-black text-white">
                  Client Data Intake Handoff
                </h2>
                <p className="mt-4 max-w-4xl text-sm font-semibold leading-7 text-slate-300">
                  Before Go-Live, the client prepares the operational data G7
                  needs to structure the workspace safely.
                </p>
                <p className="mt-3 max-w-5xl text-sm leading-7 text-slate-300">
                  Activation does not start with empty assumptions. The client
                  provides the real kitchen inputs, and G7 turns them into
                  structured production, QA, staffing, and dispatch workflows.
                </p>
              </div>

              <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-100">
                Data before Go-Live
              </div>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {clientDataHandoff.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-[#061725] p-5"
                >
                  <h3 className="text-lg font-black text-white">
                    {item.title}
                  </h3>

                  <div className="mt-5 grid gap-4">
                    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
                        Client Required
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                        {item.clientRequired}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-100">
                        G7 Structures
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                        {item.g7Structures}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200">
                        Go-Live Dependency
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                        {item.goLiveDependency}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-300/25 bg-amber-300/10 p-6 shadow-2xl shadow-black/30 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-amber-100">
                  Go-Live Readiness Checklist
                </p>
                <h2 className="mt-3 text-3xl font-black text-white">
                  Ready for first live batch
                </h2>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-200">
                  Activation is complete only when the first category, products,
                  stations, worker tasks, and QA release flow are ready.
                </p>
              </div>

              <div className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
                First batch gate
              </div>
            </div>

            <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {readinessChecklist.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-amber-100/15 bg-[#0d1f2b] px-4 py-4 text-sm font-semibold text-white"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-300/15 text-xs font-black text-cyan-100">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-6 shadow-2xl shadow-black/30 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan-100">
                  Go-Live Readiness Board
                </p>
                <h2 className="mt-3 text-3xl font-black text-white">
                  Activation is not complete until the first live batch is ready.
                </h2>
                <p className="mt-4 max-w-4xl text-sm font-semibold leading-7 text-slate-300">
                  This board keeps the client focused on the minimum operational
                  structure required before G7 moves from setup into controlled
                  production execution.
                </p>
              </div>

              <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-100">
                Setup before live use
              </div>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  title: "Workspace Rules",
                  status: "Required",
                  text: "Country, currency, timezone, branches, role access, and production structure confirmed.",
                },
                {
                  title: "Product Build Data",
                  status: "Required",
                  text: "First category and first approved products prepared with build cards and module tasks.",
                },
                {
                  title: "Ingredient and Supplier Data",
                  status: "Required",
                  text: "Ingredients, approved suppliers, alternatives, yield rules, and costing inputs prepared by the client.",
                },
                {
                  title: "Stations and Workers",
                  status: "Required",
                  text: "Stations mapped, worker roles assigned, and task ownership prepared for execution.",
                },
                {
                  title: "QA Release Flow",
                  status: "Required",
                  text: "QA checks, release gates, hold rules, and escalation path confirmed before production.",
                },
                {
                  title: "First Live Batch",
                  status: "Final Gate",
                  text: "A controlled first batch is selected to test production tasks, QA release, runtime visibility, and team handoff.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-[#061725] p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-black text-white">
                      {item.title}
                    </h3>
                    <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[#061725]/90 p-6 shadow-2xl shadow-black/40 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan-100">
                  Next Operational Actions
                </p>
                <h2 className="mt-3 text-3xl font-black text-white">
                  Move from activation into controlled execution
                </h2>
              </div>
              <div className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
                No protected data exposed
              </div>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {operationalActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-200/50 hover:bg-cyan-200/10"
                >
                  <div className="text-base font-black text-white group-hover:text-cyan-50">
                    {action.label}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {action.description}
                  </p>
                  <div className="mt-5 text-sm font-bold text-cyan-100">
                    Open →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}