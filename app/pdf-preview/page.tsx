"use client"

export const dynamic = "force-dynamic"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { G7_BASE_MEALS } from "../data/g7-base-meals"

const PLAN_CONFIG: Record<
  string,
  {
    title: string
    kcal: string
    protein: string
    carbs: string
    fat: string
  }
> = {
  lean_bulk: {
    title: "Lean Bulk",
    kcal: "2200",
    protein: "200g",
    carbs: "High",
    fat: "Low Fat",
  },

  shredding: {
    title: "Shredding",
    kcal: "1700",
    protein: "200g",
    carbs: "Controlled",
    fat: "Very Low",
  },

  mass_gainer: {
    title: "Mass Gainer",
    kcal: "3200",
    protein: "220g",
    carbs: "Very High",
    fat: "Moderate",
  },

  budget_athlete: {
    title: "Budget Athlete",
    kcal: "2400",
    protein: "190g",
    carbs: "Balanced",
    fat: "Low",
  },

  premium_chef: {
    title: "Premium Chef",
    kcal: "2600",
    protein: "210g",
    carbs: "Balanced",
    fat: "Chef Controlled",
  },
}

const FLAVOR_LABELS: Record<string, string> = {
  middle_eastern_performance: "Middle Eastern Performance",
  mexican_fire: "Mexican Fire",
  asian_soy_ginger: "Asian Soy Ginger",
  italian_lean: "Italian Lean",
  egyptian_home_fit: "Egyptian Home Fit",
  bbq_smoke: "BBQ Smoke",
  indian_spice: "Indian Spice",
  gulf_clean: "Gulf Clean",
}

export default function PDFPreviewPage() {
  const searchParams = useSearchParams()

  const selectedPlan =
    searchParams.get("plan") || "lean_bulk"

  const selectedFlavor =
    searchParams.get("flavor") ||
    "middle_eastern_performance"

  const plan =
    PLAN_CONFIG[selectedPlan] ||
    PLAN_CONFIG.lean_bulk

  const flavorLabel =
    FLAVOR_LABELS[selectedFlavor] ||
    "Middle Eastern Performance"

  const meals = useMemo(() => {
    return G7_BASE_MEALS.filter((meal) =>
      meal.flavorReady.includes(selectedFlavor as any)
    )
  }, [selectedFlavor])

  const days = [1, 2, 3, 4, 5, 6, 7]

  return (
    <main className="min-h-screen bg-[#050A12] px-6 py-8 text-white print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-[980px] rounded-[32px] border border-cyan-400/25 bg-[#08111D] p-8 shadow-[0_0_80px_rgba(34,211,238,0.14)] print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-8 print:text-black print:shadow-none">
        <header className="mb-8 flex items-center justify-between border-b border-cyan-400/20 pb-6 print:border-black/15">
          <div>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#22D3EE] text-3xl font-black text-black">
              G7
            </div>

            <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300 print:text-black/60">
              Personalized Client Nutrition PDF
            </p>

            <h1 className="mt-3 text-5xl font-black leading-tight">
              {plan.title}
              <span className="block text-[#B7F532] print:text-black">
                Client System
              </span>
            </h1>

            <p className="mt-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300 print:border-black/15 print:bg-black/[0.04] print:text-black">
              {flavorLabel}
            </p>

            <p className="mt-3 text-sm text-white/65 print:text-black/60">
              7 Days · 21 Meals · Chef-Based Nutrition OS
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="rounded-2xl bg-[#B7F532] px-6 py-3 text-sm font-black text-black print:hidden"
          >
            Generate PDF
          </button>
        </header>

        <section className="mb-8 grid grid-cols-4 gap-3">
          <Metric label="KCAL" value={plan.kcal} />
          <Metric label="Protein" value={plan.protein} />
          <Metric label="Carbs" value={plan.carbs} />
          <Metric label="Fat" value={plan.fat} />
        </section>

        {days.map((day) => {
          const dayMeals = meals.filter(
            (meal) => meal.day === day
          )

          return (
            <section
              key={day}
              className="mb-8 break-inside-avoid rounded-[28px] border border-cyan-400/20 bg-black/20 p-5 print:border-black/15 print:bg-white"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-3xl font-black">
                  Day {day}
                </h2>

                <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300 print:text-black/50">
                  Breakfast · Lunch · Dinner
                </p>
              </div>

              <div className="space-y-5">
                {dayMeals.map((meal) => (
                  <article
                    key={meal.id}
                    className="break-inside-avoid rounded-[22px] border border-cyan-400/15 bg-[#07101C] p-5 print:border-black/15 print:bg-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300 print:text-black/50">
                          {meal.mealType}
                        </p>

                        <h3 className="mt-2 text-2xl font-black">
                          {meal.title}
                        </h3>

                        <p className="mt-1 text-sm text-white/60 print:text-black/60">
                          {meal.subtitle}
                        </p>
                      </div>

                      <p className="text-2xl font-black text-[#B7F532] print:text-black">
                        {meal.baseCalories} kcal
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-4 gap-2">
                      <Macro
                        label="P"
                        value={`${meal.baseMacros.protein}g`}
                      />

                      <Macro
                        label="C"
                        value={`${meal.baseMacros.carbs}g`}
                      />

                      <Macro
                        label="F"
                        value={`${meal.baseMacros.fat}g`}
                      />

                      <Macro
                        label="Fiber"
                        value={`${meal.baseMacros.fiber}g`}
                      />
                    </div>

                    <div className="mt-5 grid gap-2 md:grid-cols-2">
                      {meal.ingredients.map((item) => (
                        <div
                          key={`${meal.id}-${item.name}`}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm print:border-black/10 print:bg-black/[0.02]"
                        >
                          <span>{item.name}</span>

                          <span className="font-black text-[#B7F532] print:text-black">
                            {item.grams
                              ? `${item.grams}g`
                              : item.unit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-2xl border border-[#B7F532]/20 bg-[#B7F532]/[0.04] p-4 print:border-black/15 print:bg-black/[0.02]">
                      <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-[#B7F532] print:text-black/60">
                        SOP · Chef Instructions
                      </p>

                      <div className="space-y-3">
                        {meal.sop.map((step, index) => (
                          <div
                            key={step.title}
                            className="text-sm leading-6"
                          >
                            <strong>
                              {index + 1}. {step.title}:
                            </strong>{" "}
                            <span className="text-white/70 print:text-black/70">
                              {step.instruction}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {meal.productionNote ? (
                      <p className="mt-3 text-xs font-bold text-cyan-300 print:text-black/50">
                        Production Note:{" "}
                        {meal.productionNote}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          )
        })}

        <footer className="mt-10 flex items-center justify-between border-t border-cyan-400/20 pt-5 text-sm print:border-black/15">
          <p className="text-3xl font-black text-cyan-300 print:text-black">
            G7
          </p>

          <p className="font-black uppercase tracking-[0.2em] text-white/70 print:text-black/60">
            Chef-Based Nutrition OS | Real Food. Real Results.
          </p>

          <p className="font-black text-[#B7F532] print:text-black">
            +20 112 844 2058
          </p>
        </footer>
      </div>
    </main>
  )
}

function Metric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-black/20 p-4 text-center print:border-black/15 print:bg-white">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300 print:text-black/50">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-[#B7F532] print:text-black">
        {value}
      </p>
    </div>
  )
}

function Macro({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-cyan-400/15 bg-black/20 p-3 text-center print:border-black/10 print:bg-white">
      <p className="text-xs text-white/45 print:text-black/45">
        {label}
      </p>

      <p className="mt-1 font-black">{value}</p>
    </div>
  )
}