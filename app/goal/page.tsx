"use client"

import { useRouter } from "next/navigation"

const SYSTEMS = [
  {
    id: "fat_loss",
    name: "Fat Loss",
    icon: "🔥",
    description:
      "Lean transformation system focused on satiety, flavor, and metabolic clarity.",
    mood: "Clean • Structured • Adaptive",
  },
  {
    id: "athlete",
    name: "Athlete",
    icon: "⚡",
    description:
      "Performance fuel architecture for strength, recovery, and output.",
    mood: "Power • Recovery • Intensity",
  },
  {
    id: "keto",
    name: "Keto",
    icon: "🥑",
    description:
      "Low-carb culinary intelligence with stable energy and rich flavor systems.",
    mood: "Stable • Sharp • Rich",
  },
  {
    id: "carnivore",
    name: "Carnivore",
    icon: "🥩",
    description:
      "Primal chef-based system built around protein dominance and instinctive eating.",
    mood: "Fire • Protein • Focus",
  },
  {
    id: "vegan",
    name: "Vegan",
    icon: "🌱",
    description:
      "Plant-powered culinary creativity with balanced intelligent nutrition.",
    mood: "Fresh • Creative • Light",
  },
  {
    id: "balance",
    name: "Balance",
    icon: "⚖️",
    description:
      "Flexible everyday system designed for sustainability and real-life rhythm.",
    mood: "Balanced • Practical • Sustainable",
  },
]

export default function GoalPage() {
  const router = useRouter()

  const chooseGoal = (goal: string) => {
    localStorage.setItem("g7_goal", goal)
    router.push("/dashboard")
  }

  return (
    <main className="g7-page">
      <section className="mx-auto w-full max-w-[1180px] px-8 py-8 lg:px-10">

        {/* LOGO */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-cyan-300 shadow-[0_0_45px_rgba(34,211,238,0.28)]">
            <span className="text-[34px] font-black tracking-[-0.08em] text-[#020617]">
              G7
            </span>
          </div>

          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.34em] text-cyan-300">
              G7 Culinary Intelligence
            </p>

            <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-slate-500">
              Chef-Based Nutrition OS
            </p>
          </div>
        </div>

        {/* HEADER */}
        <div className="max-w-2xl">
          <p className="g7-kicker">
            G7 Identity Systems
          </p>

          <h1 className="mt-4 text-[34px] font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-[42px] lg:text-[48px]">
            اختار النظام
            <span className="block text-cyan-300">
              اللي شبهك
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-300">
            This is not a diet. It’s a chef-based nutrition operating system
            built around your identity, flavor preference, lifestyle rhythm,
            and body response.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SYSTEMS.map((system) => (
            <button
              key={system.id}
              onClick={() => chooseGoal(system.id)}
              className="rounded-[26px] border border-white/10 bg-white/[0.025] p-5 text-left shadow-[0_18px_55px_rgba(0,0,0,0.34)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-3xl">
                    {system.icon}
                  </div>

                  <h2 className="mt-3 text-[25px] font-black leading-tight text-white">
                    {system.name}
                  </h2>
                </div>

                <div className="shrink-0 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-bold text-slate-300">
                  AI System
                </div>
              </div>

              <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-300">
                {system.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {system.mood.split("•").map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] text-slate-300"
                  >
                    {item.trim()}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <p className="text-sm font-bold tracking-wide text-cyan-300">
                  Enter System
                </p>

                <div className="text-xl text-white">
                  →
                </div>
              </div>
            </button>
          ))}
        </div>

      </section>
    </main>
  )
}