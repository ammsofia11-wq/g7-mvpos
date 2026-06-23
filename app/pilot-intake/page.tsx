import Image from "next/image";
import Link from "next/link";

const intakeBlocks = [
  {
    title: "Pilot Product Selection",
    text: "Confirm the 4–5 products that will become the first G7 Kitchen OS implementation scope.",
  },
  {
    title: "Chef Logic",
    text: "Capture the chef decisions behind build structure, prep logic, cooking logic, finishing, and handoff.",
  },
  {
    title: "Yield Chain",
    text: "Define how each product moves from raw prep to cooked yield, portioning, packaging, and dispatch.",
  },
  {
    title: "Cooling Gate",
    text: "Document cooling requirements, timing, holding expectations, and release conditions before QA.",
  },
  {
    title: "QA Gates",
    text: "Identify the checkpoints that protect consistency, product quality, packaging accuracy, and release.",
  },
  {
    title: "Worker Tasks",
    text: "Translate chef logic into simple station execution cards that workers can follow during production.",
  },
  {
    title: "Packaging / Dispatch",
    text: "Capture packaging rules, label needs, fridge call-off logic, and dispatch handoff requirements.",
  },
  {
    title: "Client Activation",
    text: "Prepare the required operating information for the client workspace delivery path.",
  },
];

const productIntakeFields = [
  "Product name",
  "Product category",
  "Target portion",
  "Main components",
  "G7 Culinary Modules",
  "Prep station",
  "Cook station",
  "Cooling requirement",
  "QA checkpoint",
  "Packaging rule",
  "Fridge call-off rule",
  "Dispatch handoff",
];

const pilotIntakePath = [
  {
    step: "01",
    title: "Collect Selected Products",
    text: "Confirm the first 4–5 products and define what each product must prove in the pilot.",
  },
  {
    step: "02",
    title: "Capture Operating Logic",
    text: "Document chef logic, yield chain, cooling gates, QA gates, packaging, and dispatch needs.",
  },
  {
    step: "03",
    title: "Prepare Build Structure",
    text: "Convert the intake into product builds, module tasks, worker execution cards, and release gates.",
  },
  {
    step: "04",
    title: "Move to Activation",
    text: "Send the completed intake into the client activation path for pilot workspace delivery.",
  },
];

const nextLinks = [
  {
    label: "Client Activation",
    href: "/client-activation",
    text: "Move completed intake into the client workspace activation path.",
  },
  {
    label: "Production Tasks",
    href: "/production-tasks",
    text: "Preview how intake becomes controlled production execution.",
  },
  {
    label: "Worker Task",
    href: "/worker-task",
    text: "See how chef logic becomes simplified worker instructions.",
  },
  {
    label: "Kitchen Runtime",
    href: "/kitchen",
    text: "Open the production floor view after pilot structure is ready.",
  },
];

export default function PilotIntakePage() {
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
                Pilot Intake Workspace
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/pilot-onboarding"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Back to Onboarding
            </Link>
            <Link
              href="/client-activation"
              className="rounded-full border border-cyan-300/40 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
            >
              Activate Client
            </Link>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 pb-12 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
              G7 Kitchen OS Pilot Intake
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Capture the operating truth behind the selected products.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              This intake page organizes the information needed to build the
              G7 Kitchen OS Founding Pilot. The focus is 4–5 selected products:
              chef logic, product build, yield chain, cooling gate, QA gates,
              worker tasks, packaging, fridge call-off, and dispatch control.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/client-activation"
                className="rounded-full bg-cyan-300 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-[#061622] transition hover:bg-cyan-200"
              >
                Continue to Client Activation
              </Link>
              <Link
                href="/genius-kitchen"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Open Pilot Workspace
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Intake Scope
                </p>
                <p className="mt-2 font-bold text-white">4–5 Products</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Output
                </p>
                <p className="mt-2 font-bold text-white">Pilot Build Logic</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Next
                </p>
                <p className="mt-2 font-bold text-white">Client Activation</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-white/[0.05] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#081c2a]/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                Intake Path
              </p>

              <div className="mt-6 space-y-4">
                {pilotIntakePath.map((item) => (
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
                  Intake rule
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  The pilot intake should collect only what is needed to build a
                  focused, testable G7 Kitchen OS implementation. Full SaaS
                  setup comes later.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Intake Blocks
            </p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              What the pilot needs before build
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              The intake converts discussion into structured operating inputs.
              Each input helps define how chef intelligence becomes controlled
              execution across the pilot workspace.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {intakeBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <h3 className="text-base font-black text-white">
                  {block.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {block.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Product Intake Fields
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              Required product information
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              These fields define what must be captured for every selected
              product before moving into build and activation.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {productIntakeFields.map((field) => (
                <div
                  key={field}
                  className="rounded-2xl border border-white/10 bg-[#071a27] p-4"
                >
                  <p className="text-sm font-bold text-white">{field}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Required for pilot build
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
              Send intake into activation.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-200">
              Once intake is complete, the selected product logic can move into
              client activation, production task preview, and delivery handoff.
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