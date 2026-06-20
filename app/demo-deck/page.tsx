import Link from "next/link";

const flowNodes = [
  "Chef Logic",
  "Approved Ingredients",
  "Supplier Options",
  "Approved Recipe",
  "SOP",
  "Worker Task",
  "QA",
  "Runtime",
];

const gainCards = [
  {
    title: "Control",
    text: "End-to-end visibility across kitchen execution.",
  },
  {
    title: "Consistency",
    text: "Chef-approved standards repeated every time.",
  },
  {
    title: "Fair Evaluation",
    text: "Performance based on execution, not opinion.",
  },
  {
    title: "Cold-Chain Traceability",
    text: "Every critical movement stays visible and accountable.",
  },
];

export default function DemoDeckPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#06182A] text-white">
      <section className="relative min-h-screen px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(0,180,255,0.28),transparent_34%),radial-gradient(circle_at_30%_95%,rgba(199,116,57,0.18),transparent_28%),linear-gradient(135deg,#06182A_0%,#07283A_48%,#04111F_100%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(0,214,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,214,255,0.08)_1px,transparent_1px)] [background-size:46px_46px]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col">
          <header className="flex items-center gap-5">
            <img
              src="/images/g7-logo-clean.png"
              alt="G7 Kitchen OS"
              className="h-16 w-auto object-contain sm:h-20"
            />
            <div className="h-14 w-px bg-[#C8753C]/70" />
            <p className="text-xs font-black uppercase tracking-[0.55em] text-[#C8753C] sm:text-sm">
              G7 Kitchen OS
            </p>
          </header>

          <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr]">
            <section>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-cyan-300">
                Culinary Intelligence
              </p>

              <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                <span className="block">G7 is a</span>
                <span className="block bg-gradient-to-r from-cyan-300 to-sky-500 bg-clip-text text-transparent">
                  Chef-Based
                </span>
                <span className="block">Kitchen OS.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-2xl font-semibold leading-tight text-[#C8753C] sm:text-3xl">
                Culinary Intelligence for Central Kitchen Production.
              </p>

              <div className="mt-8 border-l-2 border-cyan-300/70 pl-6">
                <p className="max-w-xl text-xl leading-relaxed text-slate-100 sm:text-2xl">
                  From chef logic to controlled kitchen execution.
                </p>
              </div>

              <p className="mt-12 font-serif text-5xl italic leading-none text-[#C8753C] sm:text-6xl">
                G7Chef
              </p>

              <div className="mt-12 flex flex-wrap gap-3">
                <Link
                  href="/demo-sale"
                  className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/15 hover:text-white"
                >
                  Open Demo Journey
                </Link>
                <Link
                  href="/demo-close"
                  className="rounded-full border border-[#C8753C]/45 bg-[#C8753C]/10 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#F0B27A] transition hover:border-[#F0B27A] hover:bg-[#C8753C]/15 hover:text-white"
                >
                  Pilot Close
                </Link>
              </div>
            </section>

            <section className="relative mx-auto aspect-square w-full max-w-[680px]">
              <div className="absolute inset-0 rounded-full border border-cyan-300/10" />
              <div className="absolute inset-[7%] rounded-full border border-cyan-300/10" />
              <div className="absolute inset-[14%] rounded-full border border-cyan-300/15" />
              <div className="absolute inset-[23%] rounded-full border border-cyan-300/25 shadow-[0_0_60px_rgba(0,210,255,0.22)]" />

              <div className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-300/40 bg-[#06182A]/80 shadow-[0_0_80px_rgba(0,210,255,0.32)]">
                <img
                  src="/images/g7-logo-clean.png"
                  alt="G7"
                  className="h-20 w-auto object-contain"
                />
                <p className="mt-2 text-xs font-black uppercase tracking-[0.35em] text-white/80">
                  Kitchen OS
                </p>
              </div>

              <div className="absolute left-1/2 top-[26%] -translate-x-1/2 rounded-full border border-[#C8753C]/50 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#F0B27A]">
                Chef Logic
              </div>

              <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 rounded-full border border-[#C8753C]/50 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#F0B27A]">
                Controlled Execution
              </div>

              {flowNodes.map((node, index) => {
                const angle = (index / flowNodes.length) * 360 - 90;
                const radius = 42;
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div
                    key={node}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/40 bg-[#06182A]/80 text-xl font-black text-cyan-200 shadow-[0_0_34px_rgba(0,210,255,0.2)]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="w-28 text-sm font-bold leading-tight text-slate-100">
                      {node}
                    </p>
                  </div>
                );
              })}
            </section>
          </div>

          <footer className="grid gap-4 pb-4 md:grid-cols-4">
            {gainCards.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-5 shadow-[0_0_35px_rgba(0,210,255,0.08)]"
              >
                <h3 className="text-xl font-black text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {card.text}
                </p>
              </article>
            ))}
          </footer>

          <div className="relative z-10 pb-2 text-center text-xs font-black uppercase tracking-[0.45em] text-slate-300">
            Built from <span className="text-[#C8753C]">real kitchen operations.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
