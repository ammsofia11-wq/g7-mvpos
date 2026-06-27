import Image from "next/image";
import Link from "next/link";

const pilotModules = [
  {
    title: "Chef Logic Capture",
    text: "Convert chef decisions into controlled product builds, station logic, task flow, and QA rules.",
  },
  {
    title: "Yield Chain",
    text: "Track how each product moves from raw prep to cooked yield, cooling, portioning, packaging, and dispatch.",
  },
  {
    title: "Cooling Gate",
    text: "Add a mandatory control point before QA release, packaging, and fridge call-off.",
  },
  {
    title: "QA Gates",
    text: "Protect consistency with visible approval checkpoints before products move forward.",
  },
  {
    title: "Worker Tasks",
    text: "Turn chef logic into simple execution cards for production workers and station teams.",
  },
  {
    title: "Packaging / Dispatch",
    text: "Connect released products to packaging rules, fridge call-off, and dispatch readiness.",
  },
];

const pilotFlow = [
  "Select 4–5 pilot products",
  "Capture chef logic and product builds",
  "Define yield chain and production stages",
  "Add cooling and QA gates",
  "Create worker task flow",
  "Prepare packaging and dispatch handoff",
  "Activate client workspace",
];

const workspaceLinks = [
  {
    label: "Founding Pilot Offer",
    href: "/founding-pilot",
    text: "Open the one-page client pilot summary with scope, price, and delivery structure.",
  },
  {
    label: "Pilot Onboarding",
    href: "/pilot-onboarding",
    text: "Start the client pilot setup path.",
  },
  {
    label: "Pilot Intake",
    href: "/pilot-intake",
    text: "Collect pilot product and operating details.",
  },
  {
    label: "Client Activation",
    href: "/client-activation",
    text: "Prepare the client workspace for delivery.",
  },
  {
    label: "Production Tasks",
    href: "/production-tasks",
    text: "Preview controlled execution tasks.",
  },
  {
    label: "Worker Task",
    href: "/worker-task",
    text: "See simplified worker execution flow.",
  },
  {
    label: "Approval / QA Gates",
    href: "/approval",
    text: "Open protected QA, cooling, final release, and chef approval gates.",
  },
  {
    label: "Inventory / Storekeeper",
    href: "/inventory",
    text: "Open trolley issue, actual quantities, and storekeeper release.",
  },
  {
    label: "Kitchen Runtime",
    href: "/kitchen",
    text: "Open the production floor view.",
  },
  {
    label: "Recipe Studio",
    href: "/recipe-studio",
    text: "Review chef logic and product structure.",
  },
];

export default function GeniusKitchenPage() {
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
                Chef-Based Kitchen Operating Intelligence
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/founding-pilot"
              className="rounded-full border border-amber-300/40 px-5 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-200 hover:bg-amber-300/10"
            >
              Founding Pilot
            </Link>
            <Link
              href="/demo-sale"
              className="rounded-full border border-cyan-300/40 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
            >
              Back to Demo
            </Link>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 pb-12 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
              Founding Pilot Workspace
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              A controlled pilot workspace for G7 Kitchen OS implementation.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              This workspace shows how G7 Kitchen OS converts selected
              products into chef-based operating intelligence: demand to
              dispatch, chef logic, yield chain, cooling gate, QA gates, worker
              tasks, packaging, fridge call-off, and dispatch control.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/founding-pilot"
                className="rounded-full bg-cyan-300 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-[#061622] transition hover:bg-cyan-200"
              >
                Open Founding Pilot Offer
              </Link>
              <Link
                href="/pilot-onboarding"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Start Pilot Onboarding
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Model
                </p>
                <p className="mt-2 font-bold text-white">Paid Pilot</p>
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
                Pilot Delivery Path
              </p>

              <div className="mt-6 space-y-3">
                {pilotFlow.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-xs font-black text-cyan-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold text-slate-200">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/founding-pilot"
                className="mt-6 flex items-center justify-between rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5 transition hover:border-amber-200/60 hover:bg-amber-300/15"
              >
                <div>
                  <p className="text-sm font-black text-amber-100">
                    One-page Founding Pilot offer
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Open the client-facing summary with scope, price, payment
                    structure, and deliverables.
                  </p>
                </div>
                <span className="text-xl text-amber-100">→</span>
              </Link>

              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
                <p className="text-sm font-bold text-amber-100">
                  Founding Pilot commercial structure
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  10,000 EGP upfront to start the pilot, then 15,000 EGP on
                  delivery of the agreed G7 Kitchen OS pilot workspace.
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
              What gets built in the pilot
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              The pilot does not attempt to launch a full SaaS system. It
              converts a focused product set into a working implementation
              preview that can be understood, tested, and delivered.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pilotModules.map((module) => (
              <div
                key={module.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <h3 className="text-base font-black text-white">
                  {module.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {module.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto border-t border-white/10 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                  Workspace Map
                </p>
                <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                  Connected pilot journey
                </h2>
              </div>

              <Link
                href="/founding-pilot"
                className="rounded-full border border-amber-300/40 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.2em] text-amber-100 transition hover:bg-amber-300/10"
              >
                Founding Pilot Offer
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {workspaceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  <p className="text-base font-black text-white">
                    {link.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {link.text}
                  </p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200 transition group-hover:text-cyan-100">
                    Open →
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
