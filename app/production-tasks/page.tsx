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
    title: "Module Tasks",
    text: "Break each module into worker-ready execution tasks for stations and production teams.",
  },
  {
    step: "05",
    title: "Worker Execution",
    text: "Send simplified task logic to workers so execution follows the approved chef standard.",
  },
  {
    step: "06",
    title: "QA Release",
    text: "Protect the final movement with cooling checks, QA gates, packaging checks, and release control.",
  },
];

const productionLayers = [
  "Demand to Dispatch",
  "Chef Logic",
  "Build Cards",
  "G7 Culinary Modules",
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
              build cards, G7 Culinary Modules, module tasks, worker execution,
              cooling gate, QA gates, packaging, fridge call-off, and dispatch
              control.
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
                  Output
                </p>
                <p className="mt-2 font-bold text-white">Worker Execution</p>
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
                  build, module structure, cooling gate, and QA requirements are
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
              chef logic and forward to QA release, packaging, fridge call-off,
              and dispatch readiness.
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