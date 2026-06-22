import Image from "next/image";
import Link from "next/link";

const intelligencePoints = [
  "Chef Logic",
  "Demand to Dispatch",
  "Yield Chain",
  "Cooling Gate",
  "QA Gates",
  "Worker Tasks",
  "Packaging / Dispatch",
  "Fridge Call-Off",
  "Waste Control",
  "Consistency Control",
];

const journey = [
  {
    label: "Client Demo",
    href: "/demo-sale",
    text: "Start the Genius Kitchen commercial demo path.",
  },
  {
    label: "Pilot Workspace",
    href: "/genius-kitchen",
    text: "Open the Founding Pilot workspace preview.",
  },
  {
    label: "Pilot Onboarding",
    href: "/pilot-onboarding",
    text: "Move into the structured client setup flow.",
  },
  {
    label: "Client Activation",
    href: "/client-activation",
    text: "Prepare the pilot workspace for delivery.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#061622] text-white">
      <section className="relative isolate min-h-screen px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(184,115,51,0.16),transparent_34%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

        <header className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/g7-logo-clean.png"
              alt="G7 logo"
              width={58}
              height={58}
              priority
              className="h-12 w-auto"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
                G7 Culinary Intelligence
              </p>
              <p className="text-sm font-semibold text-white">
                Genius Kitchen by G7
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

        <div className="mx-auto grid max-w-7xl gap-10 pb-12 pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:pt-24">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
              Chef-Based Kitchen Operating Intelligence
            </div>

            <h1 className="max-w-5xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Genius Kitchen turns chef intelligence into controlled execution.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              G7 connects demand, chef logic, yield chain, cooling, QA,
              packaging, fridge call-off, worker tasks, and dispatch into one
              controlled operating flow for central kitchen production.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/genius-kitchen"
                className="rounded-full bg-cyan-300 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-[#061622] transition hover:bg-cyan-200"
              >
                Open Pilot Workspace
              </Link>
              <Link
                href="/demo-sale"
                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Start Client Demo
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Product
                </p>
                <p className="mt-2 font-bold text-white">Genius Kitchen</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Pilot
                </p>
                <p className="mt-2 font-bold text-white">4–5 Products</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Flow
                </p>
                <p className="mt-2 font-bold text-white">
                  Demand to Dispatch
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-white/[0.05] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#081c2a]/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
                Genius Kitchen Operating Layers
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {intelligencePoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-sm font-black text-white">{point}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/genius-kitchen"
                className="mt-6 flex items-center justify-between rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-5 transition hover:border-cyan-200/60 hover:bg-cyan-300/15"
              >
                <div>
                  <p className="text-sm font-black text-cyan-100">
                    Open Founding Pilot Workspace
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    See how the pilot is packaged for client delivery.
                  </p>
                </div>
                <span className="text-xl text-cyan-100">→</span>
              </Link>
            </div>
          </div>
        </div>

        <section className="mx-auto max-w-7xl border-t border-white/10 py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
              >
                <p className="text-base font-black text-white">{item.label}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {item.text}
                </p>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
                  Open →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}