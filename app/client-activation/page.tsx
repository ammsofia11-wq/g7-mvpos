import Image from "next/image";
import Link from "next/link";

const activationStages = [
  {
    step: "01",
    title: "Intake Review",
    text: "Review selected products, chef logic, yield chain notes, cooling requirements, QA gates, and dispatch needs.",
  },
  {
    step: "02",
    title: "Workspace Setup",
    text: "Prepare the Genius Kitchen pilot workspace around the agreed 4–5 products and their operating logic.",
  },
  {
    step: "03",
    title: "Execution Mapping",
    text: "Convert product builds into G7 Culinary Modules, module tasks, worker flow, QA release, packaging, and handoff.",
  },
  {
    step: "04",
    title: "Go-Live Readiness",
    text: "Check that the pilot workspace is ready for client review, production preview, and delivery sign-off.",
  },
];

const readinessChecks = [
  "Selected products confirmed",
  "Chef logic captured",
  "Product build structure ready",
  "G7 Culinary Modules mapped",
  "Yield chain defined",
  "Cooling gate documented",
  "QA gates defined",
  "Worker tasks prepared",
  "Packaging rules prepared",
  "Fridge call-off logic ready",
  "Dispatch handoff prepared",
  "Client review path ready",
];

const activationOutputs = [
  {
    title: "Client Pilot Workspace",
    text: "A focused Genius Kitchen workspace prepared for the selected product scope.",
  },
  {
    title: "Build Cards",
    text: "Product structures that connect chef logic, modules, tasks, QA gates, and handoff points.",
  },
  {
    title: "Module Task Flow",
    text: "Clear worker-facing task logic for production, cooling, packaging, and dispatch readiness.",
  },
  {
    title: "QA Release Path",
    text: "A visible control path for cooling gate, QA gates, release decision, and delivery handoff.",
  },
  {
    title: "Go-Live Board",
    text: "A readiness view showing what is complete, what is pending, and what must be reviewed.",
  },
  {
    title: "Delivery Review",
    text: "A clean pilot handoff path for client review and final delivery confirmation.",
  },
];

const nextLinks = [
  {
    label: "Production Tasks",
    href: "/production-tasks",
    text: "Preview how activated product logic becomes production execution.",
  },
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
    text: "Review chef logic, product structure, and protected build intelligence.",
  },
  {
    label: "Genius Kitchen Workspace",
    href: "/genius-kitchen",
    text: "Return to the pilot workspace overview.",
  },
];

export default function ClientActivationPage() {
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
                Genius Kitchen by G7
              </p>
              <p className="text-sm font-semibold text-white">
                Client Pilot Activation
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/pilot-intake"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Back to Intake
            </Link>
            <Link
              href="/production-tasks"
              className="rounded-full border border-cyan-300/40 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
            >
              Production Tasks
            </Link>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 pb-12 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
              Genius Kitchen Pilot Activation
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Prepare the client workspace for pilot delivery.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Client activation turns the completed pilot intake into a
              delivery-ready Genius Kitchen workspace. The selected products are
              organized into chef logic, product builds, G7 Culinary Modules,
              yield chain, cooling gate, QA gates, worker tasks, packaging,
              fridge call-off, and dispatch handoff.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/production-tasks"
                className="rounded-full bg-cyan-300 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-[#061622] transition hover:bg-cyan-200"
              >
                Open Production Tasks
              </Link>
              <Link
                href="/genius-kitchen"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Pilot Workspace
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Activation
                </p>
                <p className="mt-2 font-bold text-white">Client Workspace</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Product Scope
                </p>
                <p className="mt-2 font-bold text-white">4–5 Products</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Status
                </p>
                <p className="mt-2 font-bold text-white">Go-Live Readiness</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-white/[0.05] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#081c2a]/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                Activation Path
              </p>

              <div className="mt-6 space-y-4">
                {activationStages.map((stage) => (
                  <div
                    key={stage.step}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm font-black text-cyan-100">
                        {stage.step}
                      </span>
                      <div>
                        <h2 className="font-black text-white">
                          {stage.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {stage.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
                <p className="text-sm font-bold text-amber-100">
                  Activation rule
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  The pilot workspace should be ready enough to review,
                  understand, and hand off without pretending to be a full SaaS
                  rollout.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Go-Live Readiness
            </p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              What must be ready before delivery
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              Activation confirms that the pilot has enough structure to move
              from intake into visible execution. Each readiness item protects
              clarity, consistency, and delivery control.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {readinessChecks.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-sm font-bold text-white">{item}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                  Readiness check
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Activation Outputs
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              What activation prepares
            </h2>

            <div className="mt-6 grid gap-4">
              {activationOutputs.map((output) => (
                <div
                  key={output.title}
                  className="rounded-2xl border border-white/10 bg-[#071a27] p-5"
                >
                  <h3 className="text-base font-black text-white">
                    {output.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {output.text}
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
              Move from activation into execution preview.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-200">
              After activation, the pilot can move into production tasks,
              worker execution, kitchen runtime view, and delivery review.
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