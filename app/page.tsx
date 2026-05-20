"use client"

export default function Home() {
  return (
    <main className="g7-page">
      <section className="mx-auto flex min-h-screen w-full max-w-[1180px] items-center px-6 py-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.95fr_0.85fr]">
          <div className="max-w-xl">
            <div className="mb-8 flex items-center gap-5">
              <div className="flex h-[92px] w-[92px] items-center justify-center rounded-[28px] bg-cyan-300 shadow-[0_0_45px_rgba(34,211,238,0.28)]">
                <span className="text-[42px] font-black tracking-[-0.08em] text-[#020617]">
                  G7
                </span>
              </div>

              <div>
                <p className="text-[13px] font-black uppercase tracking-[0.34em] text-cyan-300">
                  G7 Culinary Intelligence
                </p>

                <p className="mt-2 text-[12px] uppercase tracking-[0.28em] text-slate-500">
                  Chef-Based Nutrition OS
                </p>
              </div>
            </div>

            <h1
              dir="rtl"
              className="text-right text-[34px] font-black leading-[1.2] tracking-[-0.02em] text-white sm:text-[44px] lg:text-[58px]"
            >
              <span className="bg-gradient-to-l from-[#FFD86B] via-[#FFF1B8] to-white bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(255,214,107,0.55)]">
                اختار النظام اللي شبهك
              </span>
            </h1>

            <p className="mt-4 text-[20px] font-black leading-7 text-white">
              Choose the system that feels like you.
            </p>

            <p className="mt-5 max-w-lg text-[15px] leading-7 text-slate-300">
              Chef-crafted AI nutrition designed around identity, flavor
              intelligence, real-life ingredients, kitchen execution, inventory
              control, and your own operating system.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/dashboard" className="g7-button-primary">
                Enter Your System
              </a>

              <a href="/generate" className="g7-button-secondary">
                Start AI Chef
              </a>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <MiniCard title="AI Chef" text="Personalized meal intelligence." />
              <MiniCard title="Weekly OS" text="7-day orchestration system." />
              <MiniCard title="Kitchen OS" text="Chef execution & batch control." />
              <MiniCard title="Inventory OS" text="Procurement & stock intelligence." />
            </div>
          </div>

          <div className="g7-card g7-card-cyan p-5">
            <div className="overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,#0f172a,#020617)]">
              <div className="relative">
                <img
                  src="/images/keto Fettuccini Beef Bolognese.png"
                  alt="Keto Fettuccini Beef Bolognese"
                  className="h-[340px] w-full object-cover brightness-[1.08] contrast-[1.06] saturate-[1.08]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/55 via-transparent to-transparent" />

                <div className="absolute left-0 top-0 p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                    Today’s AI Culinary System
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-[30px] font-black leading-[1] tracking-[-0.04em] text-white">
                  Keto Fettuccini
                  <span className="block text-cyan-300">Beef Bolognese</span>
                </h2>

                <p className="mt-4 max-w-md text-[14px] leading-6 text-slate-300">
                  Rich, savory beef bolognese over keto fettuccini. High
                  protein, low carb, built for real-life kitchen execution.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <Metric label="Energy" value="540" note="kcal" />
                  <Metric label="Protein" value="45g" note="fuel" />
                  <Metric label="Mood" value="Savory" note="bold" />
                </div>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
                    G7 Philosophy
                  </p>

                  <p className="mt-2 text-[13px] leading-6 text-slate-300">
                    A chef-based nutrition operating system built for real
                    humans, real kitchens, and repeatable healthy behavior.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function MiniCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.03]">
      <p className="text-sm font-black text-white">{title}</p>
      <p className="mt-1 text-xs leading-5 text-slate-400">{text}</p>
    </div>
  )
}

function Metric({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-[24px] font-black leading-none text-white">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-slate-500">{note}</p>
    </div>
  )
}