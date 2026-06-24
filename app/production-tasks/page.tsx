import Image from "next/image";
import Link from "next/link";

const taskFlow = [
  {
    step: "01",
    title: "Chef Logic",
    text: "Start from the approved chef logic behind each selected product.",
  },
  {
    step: "02",
    title: "Build Cards",
    text: "Convert the product logic into a clear build card with stages, modules, gates, and handoffs.",
  },
  {
    step: "03",
    title: "G7 Culinary Modules",
    text: "Organize each product into controlled modules such as protein, carb, sauce, garnish, and packaging.",
  },
  {
    step: "04",
    title: "Station Grocery Report",
    text: "Translate the build card into station-ready grocery needs before workers begin execution.",
  },
  {
    step: "05",
    title: "Storekeeper Trolley Prep",
    text: "Prepare station trolleys with required ingredients, quantities, and missing-item visibility.",
  },
  {
    step: "06",
    title: "Internal Production Control",
    text: "Protect internal modules such as bakery, butchery, trim recovery, return-to-store, and safety gates.",
  },
  {
    step: "07",
    title: "Worker Execution",
    text: "Send simplified task logic to workers only after collection, readiness, gates, and handoffs are clear.",
  },
  {
    step: "08",
    title: "QA Release",
    text: "Protect the final movement with cooling checks, QA gates, packaging checks, and release control.",
  },
];

const productionLayers = [
  "Demand to Dispatch",
  "Chef Logic",
  "Build Cards",
  "G7 Culinary Modules",
  "Station Grocery Report",
  "Storekeeper Trolley Prep",
  "Internal Production",
  "Butchery Yield Gate",
  "Bakery Module Production",
  "Return-to-Store SKU",
  "Worker Collection",
  "Module Tasks",
  "Worker Tasks",
  "Cooling Gate",
  "QA Gates",
  "Packaging / Dispatch",
  "Fridge Call-Off",
  "Consistency Control",
  "Waste Control",
];

const sampleTasks = [
  {
    station: "Prep Station",
    title: "Prepare Module Inputs",
    status: "Ready for task flow",
    details:
      "Prepare the required product inputs according to the approved build card and module structure.",
  },
  {
    station: "Cooking Station",
    title: "Execute Chef Logic",
    status: "Controlled execution",
    details:
      "Follow the approved cooking logic, yield expectations, timing, and handoff requirements.",
  },
  {
    station: "Cooling Gate",
    title: "Hold Before QA",
    status: "Gate required",
    details:
      "Confirm cooling requirements before moving product into QA, packaging, or fridge call-off.",
  },
  {
    station: "QA Station",
    title: "Release Check",
    status: "QA protected",
    details:
      "Check consistency, portion accuracy, packaging readiness, and release approval.",
  },
  {
    station: "Packaging Station",
    title: "Package Released Product",
    status: "Ready after QA",
    details:
      "Package only released product according to the agreed packaging and dispatch logic.",
  },
  {
    station: "Dispatch",
    title: "Prepare Handoff",
    status: "Dispatch ready",
    details:
      "Move released and packaged product into fridge call-off and dispatch handoff.",
  },
];

const groceryReports = [
  {
    station: "Prep Station",
    owner: "Storekeeper to Prep Team",
    trolley: "Trolley A-01",
    status: "Ready for collection",
    items: [
      "Washed vegetables by station need",
      "Trim containers prepared",
      "Labelled prep trays",
    ],
    risk: "Vegetable trim recovery must be visible before waste is discarded.",
  },
  {
    station: "Cooking Station",
    owner: "Storekeeper to Cooking Team",
    trolley: "Trolley C-02",
    status: "Needs chef confirmation",
    items: [
      "Protein batch from butchery",
      "Sauce module ingredients",
      "Controlled spice kit",
    ],
    risk: "Sensitive ingredients should follow chef scaling logic, not blind multiplication.",
  },
  {
    station: "Packaging Station",
    owner: "Storekeeper to Packaging Team",
    trolley: "Trolley P-03",
    status: "Ready after QA",
    items: ["Meal containers", "Labels", "Sleeves and dispatch crates"],
    risk: "Packaging should not start before QA release and fridge call-off visibility.",
  },
];

const grocerySteps = [
  {
    label: "Known Demand",
    text: "Locked demand creates the station grocery need before production starts.",
  },
  {
    label: "Storekeeper Prep",
    text: "The storekeeper prepares trolley quantities by station, module, and batch.",
  },
  {
    label: "Worker Collection",
    text: "Workers collect from store using a clear grocery checklist instead of memory.",
  },
  {
    label: "Readiness Gate",
    text: "Missing ingredients block the task before execution, not during cooking.",
  },
];

const internalProductionCards = [
  {
    title: "Bakery Internal Production",
    owner: "Bakery Team",
    status: "Internal module",
    lines: [
      "Produce tortilla, bread, or bakery components as internal SKUs.",
      "Return approved output to store before final station issue.",
      "Keep bakery batch identity visible for later product builds.",
    ],
    control:
      "Bakery output should become an internal controlled module, not an invisible side task.",
  },
  {
    title: "Butchery Yield Gate",
    owner: "Butchery / Prep Team",
    status: "Yield protected",
    lines: [
      "Record gross protein weight before trimming or cutting.",
      "Confirm usable yield before cooking station receives the batch.",
      "Separate usable protein, scrap, and rejected material clearly.",
    ],
    control:
      "Cooking should not start from purchase weight. It should start from usable yield.",
  },
  {
    title: "Return-to-Store Internal SKU",
    owner: "Storekeeper",
    status: "Traceable return",
    lines: [
      "Return internal production output to store with batch identity.",
      "Hold approved internal modules until station call-off.",
      "Keep remaining quantity visible before next product usage.",
    ],
    control:
      "Internal production should return to controlled store logic before it becomes station grocery.",
  },
  {
    title: "Scrap and Trim Recovery",
    owner: "Chef / Production Manager",
    status: "Recovery visible",
    lines: [
      "Separate vegetable trim, protein scrap, and usable leftovers.",
      "Protect food safety before reuse decisions.",
      "Recommend next best use only after QA-safe classification.",
    ],
    control:
      "Recovery intelligence must never bypass safety, QA, or chef approval.",
  },
];

const internalProductionPath = [
  {
    label: "Internal Need",
    text: "Demand and build cards create internal production needs such as bread, butchery prep, or sauce base.",
  },
  {
    label: "Controlled Output",
    text: "The internal team produces a module with yield, batch identity, and owner visibility.",
  },
  {
    label: "Return to Store",
    text: "Approved output returns as an internal SKU before it is issued to a station trolley.",
  },
  {
    label: "Next Best Use",
    text: "Scrap, trim, and surplus are classified for safe reuse, discard, or chef review.",
  },
];

const safetyGates = [
  {
    gate: "Frozen Protein Safety Gate",
    status: "Safety hold",
    detail:
      "Frozen protein requires thawing control, temperature evidence, and release before butchery or cooking.",
  },
  {
    gate: "Blast Freezer Gate",
    status: "Cold chain protected",
    detail:
      "Blast freezer movement should be tracked before storage, return-to-store, or later call-off.",
  },
  {
    gate: "Chef Approval Gate",
    status: "Decision required",
    detail:
      "Next best use, sensitive scaling, and recovery usage require chef-controlled approval.",
  },
];

const nextLinks = [
  {
    label: "Worker Task",
    href: "/worker-task",
    text: "Open the simplified worker execution view.",
  },
  {
    label: "Kitchen Runtime",
    href: "/kitchen",
    text: "Review the production floor execution view.",
  },
  {
    label: "Recipe Studio",
    href: "/recipe-studio",
    text: "Review chef logic and product build intelligence.",
  },
  {
    label: "Client Activation",
    href: "/client-activation",
    text: "Return to the pilot activation path.",
  },
];

export default function ProductionTasksPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#061622] text-white">
      <section className="relative isolate px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(184,115,51,0.16),transparent_34%)]" />
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
                G7 Kitchen OS
              </p>
              <p className="text-sm font-semibold text-white">
                Production Tasks
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/client-activation"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Back to Activation
            </Link>
            <Link
              href="/worker-task"
              className="rounded-full border border-cyan-300/40 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
            >
              Worker Task
            </Link>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 pb-12 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
              G7 Kitchen OS Execution Preview
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Turn build cards into controlled production tasks.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Production Tasks shows how G7 Kitchen OS converts chef logic into
              build cards, G7 Culinary Modules, station grocery reports,
              storekeeper trolley prep, internal production control, module
              tasks, worker execution, cooling gate, QA gates, packaging, fridge
              call-off, and dispatch control.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/worker-task"
                className="rounded-full bg-cyan-300 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-[#061622] transition hover:bg-cyan-200"
              >
                Open Worker Task
              </Link>
              <Link
                href="/kitchen"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Open Kitchen Runtime
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Source
                </p>
                <p className="mt-2 font-bold text-white">Chef Logic</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Structure
                </p>
                <p className="mt-2 font-bold text-white">Build Cards</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Readiness
                </p>
                <p className="mt-2 font-bold text-white">Internal Control</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-white/[0.05] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#081c2a]/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                Task Flow
              </p>

              <div className="mt-6 space-y-4">
                {taskFlow.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm font-black text-cyan-100">
                        {item.step}
                      </span>
                      <div>
                        <h2 className="font-black text-white">{item.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
                <p className="text-sm font-bold text-amber-100">
                  Execution rule
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Workers should receive clear task logic only after the product
                  build, module structure, station grocery readiness, internal
                  production control, cooling gate, and QA requirements are
                  defined.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Production Control Layers
            </p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              What tasks must connect
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              Production tasks should not sit alone. They must connect back to
              chef logic, forward to grocery readiness, internal production
              control, QA release, packaging, fridge call-off, and dispatch
              readiness.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {productionLayers.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-sm font-bold text-white">{item}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                  Task dependency
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                Station Grocery Intelligence
              </p>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                Before workers start, the station must be ready.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                This preview adds the missing bridge between known demand and
                worker execution: station grocery reports, storekeeper trolley
                preparation, collection readiness, and blocked-item visibility.
              </p>

              <div className="mt-6 grid gap-3">
                {grocerySteps.map((step) => (
                  <div
                    key={step.label}
                    className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4"
                  >
                    <p className="text-sm font-black text-cyan-100">
                      {step.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {groceryReports.map((report) => (
                <div
                  key={`${report.station}-${report.trolley}`}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
                        {report.station}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-white">
                        {report.trolley}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-slate-400">
                        {report.owner}
                      </p>
                    </div>
                    <span className="w-fit rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
                      {report.status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {report.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-[#071a27] p-4"
                      >
                        <p className="text-sm font-bold text-white">{item}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                          Grocery line
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-100">
                      Intelligence note
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {report.risk}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                Internal Production Intelligence
              </p>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                Internal modules must be controlled before they become station
                grocery.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                This preview maps the next deeper G7 layer: bakery production,
                butchery yield, return-to-store internal SKUs, scrap and trim
                recovery, frozen protein safety, and next best use visibility.
              </p>

              <div className="mt-6 grid gap-3">
                {internalProductionPath.map((step) => (
                  <div
                    key={step.label}
                    className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4"
                  >
                    <p className="text-sm font-black text-emerald-100">
                      {step.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {internalProductionCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">
                        {card.owner}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-white">
                        {card.title}
                      </h3>
                    </div>
                    <span className="w-fit rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-100">
                      {card.status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {card.lines.map((line) => (
                      <div
                        key={line}
                        className="rounded-2xl border border-white/10 bg-[#071a27] p-4"
                      >
                        <p className="text-sm font-bold leading-6 text-white">
                          {line}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-100">
                      Control rule
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {card.control}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {safetyGates.map((gate) => (
              <div
                key={gate.gate}
                className="rounded-[1.5rem] border border-red-300/20 bg-red-300/[0.06] p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between lg:flex-col">
                  <h3 className="text-lg font-black text-white">
                    {gate.gate}
                  </h3>
                  <span className="w-fit rounded-full border border-red-300/30 bg-red-300/10 px-3 py-1 text-xs font-bold text-red-100">
                    {gate.status}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {gate.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Sample Module Tasks
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              How product logic becomes station work
            </h2>

            <div className="mt-6 grid gap-4">
              {sampleTasks.map((task) => (
                <div
                  key={`${task.station}-${task.title}`}
                  className="rounded-2xl border border-white/10 bg-[#071a27] p-5"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
                        {task.station}
                      </p>
                      <h3 className="mt-2 text-base font-black text-white">
                        {task.title}
                      </h3>
                    </div>
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
                      {task.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {task.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100">
              Continue Flow
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              Move from tasks into execution.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-200">
              After production tasks are structured, the pilot can continue into
              worker execution, kitchen runtime view, recipe intelligence, and
              client activation review.
            </p>

            <div className="mt-7 grid gap-3">
              {nextLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 transition hover:border-cyan-200/50 hover:bg-white/[0.1]"
                >
                  <p className="text-base font-black text-white">
                    {link.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {link.text}
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
