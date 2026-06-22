import Image from "next/image";
import Link from "next/link";

const pilotScope = [
  "4–5 selected products",
  "Chef logic capture",
  "Product build structure",
  "G7 Culinary Modules",
  "Yield chain setup",
  "Cooling gate",
  "QA gates",
  "Worker task flow",
  "Packaging / dispatch handoff",
  "Fridge call-off logic",
  "Client activation path",
];

const pilotFlow = [
  {
    step: "01",
    title: "Select Products",
    text: "Confirm the first 4–5 products that will become the Genius Kitchen Founding Pilot scope.",
  },
  {
    step: "02",
    title: "Capture Chef Logic",
    text: "Document the chef decisions behind build cards, modules, yield chain, cooling, QA, packaging, and dispatch.",
  },
  {
    step: "03",
    title: "Build Pilot Workspace",
    text: "Convert selected products into controlled operating intelligence, module tasks, worker flow, and release gates.",
  },
  {
    step: "04",
    title: "Review & Deliver",
    text: "Deliver the Genius Kitchen pilot workspace for client review, execution preview, and sign-off.",
  },
];

const deliverables = [
  {
    title: "Build Cards",
    text: "Each selected product is structured into a clear build card with chef logic, modules, gates, and handoffs.",
  },
  {
    title: "G7 Culinary Modules",
    text: "Products are organized into controlled modules such as protein, carb, sauce, garnish, and packaging.",
  },
  {
    title: "Module Tasks",
    text: "Module logic becomes worker-ready station tasks for production teams.",
  },
  {
    title: "Yield Chain",
    text: "The pilot shows how product output moves from prep to cooking, cooling, portioning, packaging, and dispatch.",
  },
  {
    title: "Cooling & QA Gates",
    text: "Critical control points protect consistency before packaging, fridge call-off, and dispatch.",
  },
  {
    title: "Client Activation",
    text: "The pilot ends with a clear activation path and review-ready workspace.",
  },
];

const nextLinks = [
  {
    label: "Open Genius Kitchen",
    href: "/genius-kitchen",
    text: "View the pilot workspace preview.",
  },
  {
    label: "Start Client Demo",
    href: "/demo-sale",
    text: "Open the commercial demo flow.",
  },
  {
    label: "Close Demo",
    href: "/demo-close",
    text: "Move into the Founding Pilot decision.",
  },
  {
    label: "Pilot Onboarding",
    href: "/pilot-onboarding",
    text: "Start the implementation setup path.",
  },
];

export default function FoundingPilotPage() {
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
                Founding Pilot Implementation
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
              href="/demo-sale"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Client Demo
            </Link>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 pb-12 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-100">
              One-Page Client Pilot Summary
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Genius Kitchen Founding Pilot Implementation.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Genius Kitchen by G7 is Chef-Based Kitchen Operating Intelligence.
              The Founding Pilot converts 4–5 selected products into controlled
              execution: chef logic, yield chain, cooling gate, QA gates, worker
              tasks, packaging, fridge call-off, and dispatch handoff.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demo-close"
                className="rounded-full bg-cyan-300 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-[#061622] transition hover:bg-cyan-200"
              >
                Start Founding Pilot
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
                  Pilot Scope
                </p>
                <p className="mt-2 font-bold text-white">4–5 Products</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Pilot Fee
                </p>
                <p className="mt-2 font-bold text-white">25,000 EGP</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Payment
                </p>
                <p className="mt-2 font-bold text-white">10k + 15k</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-white/[0.05] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#081c2a]/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                Commercial Structure
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Total Pilot Fee
                  </p>
                  <p className="mt-2 text-3xl font-black text-white">
                    25,000 EGP
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">
                      Start Payment
                    </p>
                    <p className="mt-2 text-xl font-black text-white">
                      10,000 EGP
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Paid upfront to start the Founding Pilot.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-amber-100">
                      Delivery Payment
                    </p>
                    <p className="mt-2 text-xl font-black text-white">
                      15,000 EGP
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Paid on delivery of the pilot workspace.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-bold text-white">
                  Pilot promise
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  A focused implementation that proves the operating model
                  without presenting it as a full SaaS rollout.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Pilot Scope
            </p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              What is included
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              The Founding Pilot is built around a small selected product set,
              so the client can understand the system through real operating
              flow, not abstract software screens.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pilotScope.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-sm font-bold text-white">{item}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                  Included
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Pilot Flow
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              How the implementation works
            </h2>

            <div className="mt-6 space-y-4">
              {pilotFlow.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-white/10 bg-[#071a27] p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm font-black text-cyan-100">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-black text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-100">
              Deliverables
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              What the client receives
            </h2>

            <div className="mt-6 grid gap-4">
              {deliverables.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/15 bg-white/[0.06] p-5"
                >
                  <h3 className="text-base font-black text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl border-t border-white/10 py-12">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                  Next Step
                </p>
                <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                  Move from summary to pilot decision.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                  This page can be shared as the simple client-facing pilot
                  offer. The next step is to open the workspace, run the demo,
                  close the pilot, and begin onboarding.
                </p>
              </div>

              <Link
                href="/demo-close"
                className="rounded-full bg-cyan-300 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-[#061622] transition hover:bg-cyan-200"
              >
                Move to Close
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {nextLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/10 bg-[#071a27] p-5 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  <p className="text-base font-black text-white">
                    {link.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {link.text}
                  </p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
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