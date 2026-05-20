"use client"

import { useState } from "react"
import { G7Plan, G7_PLANS } from "@/app/ai/g7-plans"
import { generateG7WeeklySystem } from "@/app/ai/g7-weekly-system"

const PLAN_LABELS: Record<G7Plan, string> = {
  fat_loss: "Fat Loss",
  keto: "Keto",
  vegan: "Vegan",
  diabetic: "Diabetic",
  athlete: "Athlete",
  gf_df: "GF & DF",
  carnivore: "Carnivore",
}

export default function WeeklyPage() {
  const [plan, setPlan] = useState<G7Plan>("fat_loss")
  const weekly = generateG7WeeklySystem(plan)

  return (
    <main className="g7-page min-h-screen">
      <div className="mx-auto w-full max-w-[1040px] px-4 py-4 space-y-4">
        <section className="g7-card g7-card-cyan p-5">
          <p className="g7-kicker">G7 Weekly System</p>

          <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_280px] lg:items-end">
            <div>
              <h1 className="text-[34px] font-black leading-[0.95] tracking-[-0.055em] text-white lg:text-[52px]">
                Weekly Nutrition
                <span className="block text-cyan-300">Operating System</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                7-day orchestration layer for meals, macros, shopping,
                batch prep, and kitchen production.
              </p>
            </div>

            <div className="rounded-[22px] border border-cyan-300/20 bg-black/25 p-3">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-300">
                Active Weekly Plan
              </p>

              <p className="mt-2 text-2xl font-black text-white">
                {PLAN_LABELS[plan]}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                {weekly.averageCalories} kcal average / day
              </p>
            </div>
          </div>
        </section>

        <section className="g7-card p-4">
          <p className="g7-kicker">Choose Weekly System</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {G7_PLANS.map((item) => {
              const active = plan === item

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPlan(item)}
                  className={`rounded-full border px-4 py-2 text-xs font-black transition ${
                    active
                      ? "border-cyan-300 bg-cyan-300 text-[#001018]"
                      : "border-white/10 bg-black/25 text-slate-300 hover:border-cyan-300/40"
                  }`}
                >
                  {PLAN_LABELS[item]}
                </button>
              )
            })}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Weekly Calories" value={`${weekly.totalCalories} kcal`} />
          <StatCard label="Weekly Protein" value={`${weekly.totalProtein}g`} />
          <StatCard label="Weekly Carbs" value={`${weekly.totalCarbs}g`} />
          <StatCard label="Weekly Fat" value={`${weekly.totalFat}g`} />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <div className="g7-card p-4">
            <p className="g7-kicker">7-Day Meal System</p>

            <div className="mt-4 grid gap-3">
              {weekly.days.map((day) => (
                <div
                  key={day.day}
                  className="rounded-[22px] border border-white/10 bg-black/25 p-4"
                >
                  <div className="grid gap-3 lg:grid-cols-[90px_1fr_220px] lg:items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-cyan-300/25 bg-cyan-300/10 text-xl font-black text-cyan-200">
                      D{day.day}
                    </div>

                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-300">
                        {day.title}
                      </p>

                      <h3 className="mt-1 text-xl font-black leading-tight text-white">
                        {day.mealName}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {day.flavor} • {day.prepFocus}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Mini label="Kcal" value={day.calories} />
                      <Mini label="Protein" value={`${day.protein}g`} />
                      <Mini label="Carbs" value={`${day.carbs}g`} />
                      <Mini label="Fat" value={`${day.fat}g`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <Panel title="Shopping Aggregation">
              <div className="flex flex-wrap gap-2">
                {weekly.shoppingList.map((item) => (
                  <span key={item} className="g7-execution-badge">
                    {item}
                  </span>
                ))}
              </div>
            </Panel>

            <Panel title="Batch Prep Calendar">
              <div className="space-y-2">
                {weekly.batchPrepCalendar.map((item, index) => (
                  <Timeline key={item} index={index + 1} value={item} />
                ))}
              </div>
            </Panel>

            <Panel title="Production Notes">
              <div className="space-y-2">
                {weekly.productionNotes.map((item, index) => (
                  <Timeline key={item} index={index + 1} value={item} />
                ))}
              </div>
            </Panel>
          </aside>
        </section>
      </div>
    </main>
  )
}

function StatCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="g7-card p-4">
      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  )
}

function Mini({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-black/25 p-2">
      <p className="text-[8px] font-black uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xs font-black text-white">{value}</p>
    </div>
  )
}

function Panel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="g7-card p-4">
      <p className="g7-kicker">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function Timeline({
  index,
  value,
}: {
  index: number
  value: string
}) {
  return (
    <div className="g7-timeline-item">
      <div className="g7-timeline-number">{index}</div>
      <div className="g7-timeline-content">{value}</div>
    </div>
  )
}