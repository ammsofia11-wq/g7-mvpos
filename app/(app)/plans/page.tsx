"use client"

import { useEffect, useState } from "react"

type SavedPlan = {
  plan?: string
  meal?: {
    name?: string
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
}

export default function PlansPage() {
  const [plans, setPlans] = useState<SavedPlan[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("g7-saved")

    if (stored) {
      setPlans(JSON.parse(stored))
    }
  }, [])

  return (
    <main className="g7-page">
      <div className="mx-auto w-full max-w-[980px] px-4 py-4 space-y-3">
        <section className="g7-card g7-card-cyan p-4">
          <p className="g7-kicker">
            G7 System Library
          </p>

          <h1 className="mt-2 text-[30px] font-black leading-[0.95] tracking-[-0.05em] text-white lg:text-[34px]">
            Saved chef
            <span className="block text-cyan-300">systems.</span>
          </h1>

          <p className="mt-2 max-w-xl text-[12px] leading-5 text-slate-300">
            Your saved nutrition systems — ready to repeat, adapt, cook, and evolve.
          </p>
        </section>

        {plans.length === 0 ? (
          <section className="g7-card p-4">
            <p className="g7-kicker">
              Empty Library
            </p>

            <h2 className="mt-2 text-[24px] font-black leading-tight text-white">
              No saved systems yet.
            </h2>

            <p className="mt-2 max-w-xl text-[12px] leading-5 text-slate-400">
              Generate your first AI chef system, then save it here.
            </p>

            <a href="/generate" className="g7-button-primary mt-4">
              Open AI Chef
            </a>
          </section>
        ) : (
          <section className="grid gap-3 lg:grid-cols-2">
            {plans.map((p, i) => (
              <div key={i} className="g7-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="g7-kicker">
                      Saved System
                    </p>

                    <h2 className="mt-2 truncate text-[22px] font-black capitalize leading-none text-white">
                      {p.plan || "G7 System"}
                    </h2>

                    <p className="mt-2 truncate text-[12px] font-bold text-cyan-300">
                      {p.meal?.name || "Chef-Based Meal"}
                    </p>
                  </div>

                  <div className="g7-pill g7-pill-cyan shrink-0">
                    Saved
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-4 gap-2">
                  <Metric label="Energy" value={p.meal?.calories || "—"} />
                  <Metric
                    label="Protein"
                    value={p.meal?.protein ? `${p.meal.protein}g` : "—"}
                  />
                  <Metric
                    label="Carbs"
                    value={p.meal?.carbs ? `${p.meal.carbs}g` : "—"}
                  />
                  <Metric
                    label="Fat"
                    value={p.meal?.fat ? `${p.meal.fat}g` : "—"}
                  />
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  )
}

function Metric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[14px] border border-white/10 bg-black/25 p-2.5">
      <p className="text-[7px] font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-1.5 truncate text-[14px] font-black text-white">
        {value}
      </p>
    </div>
  )
}