import Image from "next/image";
import Link from "next/link";

const pilotOffer = [
  {
    label: "Pilot Model",
    value: "Founding Pilot Implementation",
  },
  {
    label: "Pilot Scope",
    value: "4–5 Products",
  },
  {
    label: "Pilot Fee",
    value: "25,000 EGP",
  },
  {
    label: "Start Payment",
    value: "10,000 EGP upfront",
  },
  {
    label: "Delivery Payment",
    value: "15,000 EGP on delivery",
  },
  {
    label: "Delivery Focus",
    value: "Genius Kitchen pilot workspace",
  },
];

const deliveryScope = [
  "Chef logic capture",
  "Product build structure",
  "Yield chain setup",
  "Cooling gate",
  "QA gates",
  "Worker task flow",
  "Packaging / dispatch handoff",
  "Fridge call-off logic",
  "Client activation path",
];

const closeSteps = [
  {
    step: "01",
    title: "Confirm Pilot Products",
    text: "Select the 4–5 products that will become the first Genius Kitchen pilot scope.",
  },
  {
    step: "02",
    title: "Start Paid Pilot",
    text: "Begin the Founding Pilot with the agreed upfront payment and activation path.",
  },
  {
    step: "03",
    title: "Build Pilot Workspace",
    text: "Convert chef intelligence into controlled execution logic, gates, tasks, and handoffs.",
  },
  {
    step: "04",
    title: "Deliver & Review",
    text: "Review the pilot workspace and complete delivery payment after handoff.",
  },
];

const nextLinks = [
  {
    label: "Open Pilot Workspace",
    href: "/genius-kitchen",
    text: "Review the Genius Kitchen workspace before onboarding.",
  },
  {
    label: "Start Pilot Onboarding",
    href: "/pilot-onboarding",
    text: "Move into the official Founding Pilot setup flow.",
  },
  {
    label: "Pilot Intake",
    href: "/pilot-intake",
    text: "Collect products, kitchen details, and operating requirements.",
  },
  {
    label: "Client Activation",
    href: "/client-activation",
    text: "Prepare the client workspace for pilot delivery.",
  },
];

export default function DemoClosePage() {
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
                Chef-Based Kitchen Operating Intelligence
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/demo-sale"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Back to Demo
            </Link>
            <Link
              href="/pilot-onboarding"
              className="rounded-full border border-cyan-300/40 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
            >
              Start Pilot
            </Link>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 pb-12 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-100">
              Founding Pilot Close
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Move from demo to Genius Kitchen implementation.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              This is the close point for the G7 / Genius Kitchen Founding
              Pilot. The next step is a focused paid implementation where
              selected products are converted into chef-based operating
              intelligence, controlled execution gates, worker tasks, and
              delivery-ready pilot flow.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pilot-onboarding"
                className="rounded-full bg-cyan-300 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-[#061622] transition hover:bg-cyan-200"
              >
                Start Pilot Onboarding
              </Link>
              <Link
                href="/genius-kitchen"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Open Pilot Workspace
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-white/[0.05] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#081c2a]/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                Commercial Offer
              </p>

              <div className="mt-6 grid gap-3">
                {pilotOffer.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-base font-black text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
                <p className="text-sm font-bold text-amber-100">
                  Close decision
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Confirm the Founding Pilot, collect the upfront payment, and
                  move directly into pilot onboarding and intake.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Delivery Scope
            </p>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              What the client receives in the pilot
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
              The pilot is intentionally focused. It converts a small product
              set into a visible operating workspace that proves how chef
              intelligence becomes controlled execution.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {deliveryScope.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-white"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 py-12 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              Close Path
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              From agreement to delivery
            </h2>

            <div className="mt-6 space-y-4">
              {closeSteps.map((item) => (
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
              Next Actions
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              Continue the Genius Kitchen pilot journey.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-200">
              After the close decision, the flow moves into onboarding, intake,
              activation, and pilot workspace delivery.
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