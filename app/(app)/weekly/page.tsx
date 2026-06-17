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

const PLAN_PRODUCTION_META: Record<
  G7Plan,
  {
    productionLine: string
    libraryStatus: string
    recipeCoverage: string
    weeklyBatches: number
    expectedPortions: number
    stationLoad: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
    packagingLoad: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
    dispatchWindows: number
    primaryStations: string[]
    qaFocus: string[]
  }
> = {
  fat_loss: {
    productionLine: "Fat Loss Production Line",
    libraryStatus: "Active library",
    recipeCoverage: "Protected recipe library mapped",
    weeklyBatches: 18,
    expectedPortions: 1260,
    stationLoad: "HIGH",
    packagingLoad: "HIGH",
    dispatchWindows: 7,
    primaryStations: ["Prep", "Classic Lunch & Dinner", "Salads", "Packaging"],
    qaFocus: ["portion control", "label accuracy", "batch code"],
  },
  keto: {
    productionLine: "Keto Production Line",
    libraryStatus: "Active library",
    recipeCoverage: "Protected recipe library mapped",
    weeklyBatches: 16,
    expectedPortions: 980,
    stationLoad: "HIGH",
    packagingLoad: "MEDIUM",
    dispatchWindows: 7,
    primaryStations: ["Butchery", "Classic Lunch & Dinner", "Packaging"],
    qaFocus: ["carb control", "allergen check", "label accuracy"],
  },
  vegan: {
    productionLine: "Vegan Production Line",
    libraryStatus: "Active library",
    recipeCoverage: "Protected recipe library mapped",
    weeklyBatches: 14,
    expectedPortions: 840,
    stationLoad: "MEDIUM",
    packagingLoad: "MEDIUM",
    dispatchWindows: 6,
    primaryStations: ["Prep", "Salads", "Bakery Bread", "Packaging"],
    qaFocus: ["cross-contact protection", "ingredient verification", "label accuracy"],
  },
  diabetic: {
    productionLine: "Diabetic Production Line",
    libraryStatus: "Active library",
    recipeCoverage: "Protected recipe library mapped",
    weeklyBatches: 15,
    expectedPortions: 910,
    stationLoad: "HIGH",
    packagingLoad: "MEDIUM",
    dispatchWindows: 7,
    primaryStations: ["Prep", "Classic Lunch & Dinner", "Salads", "Packaging"],
    qaFocus: ["sugar control", "portion control", "nutrition label"],
  },
  athlete: {
    productionLine: "Athlete Production Line",
    libraryStatus: "Active library",
    recipeCoverage: "Protected recipe library mapped",
    weeklyBatches: 20,
    expectedPortions: 1320,
    stationLoad: "CRITICAL",
    packagingLoad: "HIGH",
    dispatchWindows: 7,
    primaryStations: ["Butchery", "Classic Lunch & Dinner", "Prep", "Packaging"],
    qaFocus: ["protein portion", "carb portion", "batch consistency"],
  },
  gf_df: {
    productionLine: "GF & DF Production Line",
    libraryStatus: "Active library",
    recipeCoverage: "Protected recipe library mapped",
    weeklyBatches: 13,
    expectedPortions: 760,
    stationLoad: "MEDIUM",
    packagingLoad: "MEDIUM",
    dispatchWindows: 6,
    primaryStations: ["Prep", "Keto / Vegan / GF-DF", "Packaging"],
    qaFocus: ["allergen separation", "gluten-free check", "dairy-free check"],
  },
  carnivore: {
    productionLine: "Carnivore Production Line",
    libraryStatus: "Pending recipe library",
    recipeCoverage: "Recipe library not loaded yet",
    weeklyBatches: 0,
    expectedPortions: 0,
    stationLoad: "LOW",
    packagingLoad: "LOW",
    dispatchWindows: 0,
    primaryStations: ["Butchery", "Classic Lunch & Dinner"],
    qaFocus: ["protein traceability", "batch code", "temperature control"],
  },
}

const LOAD_STYLES = {
  LOW: "border-lime-300/20 bg-lime-300/[0.06] text-lime-200",
  MEDIUM: "border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-100",
  HIGH: "border-amber-300/20 bg-amber-300/[0.06] text-amber-100",
  CRITICAL: "border-red-300/20 bg-red-300/[0.06] text-red-100",
}

export default function WeeklyPage() {
  const [plan, setPlan] = useState<G7Plan>("fat_loss")
  const weekly = generateG7WeeklySystem(plan)
  const production = PLAN_PRODUCTION_META[plan]

  const ingredientDemandKg = Math.max(
    Math.round((weekly.totalProtein + weekly.totalCarbs + weekly.totalFat) / 10),
    production.weeklyBatches * 4,
  )

  const averagePortionsPerBatch =
    production.weeklyBatches > 0
      ? Math.round(production.expectedPortions / production.weeklyBatches)
      : 0

  return (
    <main className="g7-page min-h-screen">
      <div className="mx-auto w-full max-w-[1120px] space-y-4 px-4 py-4">
        <section className="g7-card g7-card-cyan p-5">
          <p className="g7-kicker">G7 Weekly Production OS</p>

          <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <h1 className="text-[34px] font-black leading-[0.95] tracking-[-0.055em] text-white lg:text-[52px]">
                Weekly Production
                <span className="block text-cyan-300">Plan OS</span>
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                7-day central kitchen planning layer for menu programs, batch
                planning, station workload, ingredient demand, packaging
                forecast, QA gates, and dispatch windows.
              </p>
            </div>

            <div className="rounded-[22px] border border-cyan-300/20 bg-black/25 p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-300">
                Active Production Program
              </p>

              <p className="mt-2 text-2xl font-black text-white">
                {PLAN_LABELS[plan]}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                {production.productionLine}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="g7-execution-badge">
                  {production.libraryStatus}
                </span>
                <span
                  className={`rounded-full border px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${
                    LOAD_STYLES[production.stationLoad]
                  }`}
                >
                  {production.stationLoad} load
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="g7-card p-4">
          <p className="g7-kicker">Production Program Lines</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {G7_PLANS.map((item) => {
              const active = plan === item
              const meta = PLAN_PRODUCTION_META[item]

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
                  {meta.libraryStatus.includes("Pending") && (
                    <span className="ml-2 text-[9px] opacity-70">Pending</span>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Weekly Batches" value={`${production.weeklyBatches}`} />
          <StatCard label="Expected Portions" value={`${production.expectedPortions}`} />
          <StatCard label="Ingredient Demand" value={`${ingredientDemandKg} kg`} />
          <StatCard label="Dispatch Windows" value={`${production.dispatchWindows}`} />
        </section>

        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Avg Portions / Batch" value={`${averagePortionsPerBatch}`} />
          <StatCard label="Menu Days" value={`${weekly.days.length}`} />
          <StatCard label="Station Load" value={production.stationLoad} />
          <StatCard label="Packaging Load" value={production.packagingLoad} />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <div className="g7-card p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="g7-kicker">7-Day Production Schedule</p>

                <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
                  {production.productionLine}
                </h2>

                <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-400">
                  Nutrition data remains as protected production metadata, but
                  this screen is focused on kitchen execution, batches, stations,
                  QA, packaging, and dispatch readiness.
                </p>
              </div>

              <span
                className={`w-fit rounded-full border px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] ${
                  LOAD_STYLES[production.packagingLoad]
                }`}
              >
                Packaging {production.packagingLoad}
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {weekly.days.map((day) => (
                <div
                  key={day.day}
                  className="rounded-[22px] border border-white/10 bg-black/25 p-4"
                >
                  <div className="grid gap-3 lg:grid-cols-[90px_1fr_260px] lg:items-center">
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
                        {day.flavor} - {day.prepFocus}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Mini label="Batch Target" value={`${Math.max(1, Math.ceil(production.weeklyBatches / 7))}`} />
                      <Mini label="Portions" value={`${Math.max(0, Math.round(production.expectedPortions / 7))}`} />
                      <Mini label="Protein Meta" value={`${day.protein}g`} />
                      <Mini label="Kcal Meta" value={day.calories} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <Panel title="Primary Stations">
              <div className="flex flex-wrap gap-2">
                {production.primaryStations.map((item) => (
                  <span key={item} className="g7-execution-badge">
                    {item}
                  </span>
                ))}
              </div>
            </Panel>

            <Panel title="Ingredient Demand Forecast">
              <div className="flex flex-wrap gap-2">
                {weekly.shoppingList.map((item) => (
                  <span key={item} className="g7-execution-badge">
                    {item}
                  </span>
                ))}
              </div>
            </Panel>

            <Panel title="Batch Planning Calendar">
              <div className="space-y-2">
                {weekly.batchPrepCalendar.map((item, index) => (
                  <Timeline key={item} index={index + 1} value={item} />
                ))}
              </div>
            </Panel>

            <Panel title="QA Focus">
              <div className="space-y-2">
                {production.qaFocus.map((item, index) => (
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
