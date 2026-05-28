"use client"

import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { G7Plan, G7_PLANS } from "@/app/ai/g7-plans"
import {
  G7Flavor,
  G7RecipeOutput,
  G7_FLAVORS,
  generateG7Meal,
  getPlanLabel,
} from "@/app/ai/g7-meal-engine"

type MealWithAI = G7RecipeOutput & {
  aiDescription?: string
}

const PLAN_META: Record<
  G7Plan,
  {
    emoji: string
    label: string
    identity: string
    description: string
    promise: string
    tags: string[]
  }
> = {
  fat_loss: {
    emoji: "🔥",
    label: "Fat Loss",
    identity: "Metabolic Clarity",
    description: "Lean chef system for clean transformation.",
    promise: "Built for satiety, structure, and easy repeat meals.",
    tags: ["High Satiety", "Clean", "Controlled"],
  },
  keto: {
    emoji: "🥑",
    label: "Keto",
    identity: "Low-Carb Focus",
    description: "Low-carb culinary intelligence with stable energy.",
    promise: "Rich meals with controlled carbs and strong flavor.",
    tags: ["Low Carb", "Rich", "Stable"],
  },
  vegan: {
    emoji: "🌱",
    label: "Vegan",
    identity: "Plant Creativity",
    description: "Plant-powered meals with balanced food logic.",
    promise: "Colorful, fresh, fiber-rich chef-based meals.",
    tags: ["Plant-Based", "Fresh", "Creative"],
  },
  diabetic: {
    emoji: "🩺",
    label: "Diabetic",
    identity: "Balanced Energy",
    description: "Controlled meal architecture for steady energy.",
    promise: "Smart portions with balanced carb logic.",
    tags: ["Controlled Carbs", "Smart", "Steady"],
  },
  athlete: {
    emoji: "⚡",
    label: "Athlete",
    identity: "Performance Fuel",
    description: "Performance nutrition for recovery and output.",
    promise: "High-output meals for training, recovery, and power.",
    tags: ["Performance", "Recovery", "Power"],
  },
  gf_df: {
    emoji: "🌾",
    label: "GF & DF",
    identity: "Clean Comfort",
    description: "Gluten-free dairy-free comfort system.",
    promise: "Clean comfort without heavy digestion load.",
    tags: ["GF", "DF", "Comfort"],
  },
  carnivore: {
    emoji: "🥩",
    label: "Carnivore",
    identity: "Primal Protein",
    description: "Protein-focused primal chef system.",
    promise: "Protein-first meals with bold chef execution.",
    tags: ["Protein First", "Primal", "Zero Carb"],
  },
}

const EXECUTION_META: Record<
  G7Plan,
  {
    score: number
    prepTime: string
    difficulty: string
    kitchenMode: string
    batchType: string
  }
> = {
  fat_loss: {
    score: 92,
    prepTime: "18–22 min",
    difficulty: "Easy",
    kitchenMode: "Meal Prep Ready",
    batchType: "3-day batch",
  },
  keto: {
    score: 90,
    prepTime: "20–24 min",
    difficulty: "Medium",
    kitchenMode: "Low-Carb Prep",
    batchType: "2-day batch",
  },
  vegan: {
    score: 88,
    prepTime: "22–26 min",
    difficulty: "Medium",
    kitchenMode: "Plant Prep",
    batchType: "2-day batch",
  },
  diabetic: {
    score: 93,
    prepTime: "18–23 min",
    difficulty: "Easy",
    kitchenMode: "Controlled Prep",
    batchType: "3-day batch",
  },
  athlete: {
    score: 91,
    prepTime: "24–30 min",
    difficulty: "Medium",
    kitchenMode: "Performance Prep",
    batchType: "4-day batch",
  },
  gf_df: {
    score: 89,
    prepTime: "20–25 min",
    difficulty: "Easy",
    kitchenMode: "Clean Comfort Prep",
    batchType: "3-day batch",
  },
  carnivore: {
    score: 94,
    prepTime: "16–20 min",
    difficulty: "Easy",
    kitchenMode: "Primal Protein Prep",
    batchType: "2-day batch",
  },
}

export default function FlavorSelector() {
  const [plan, setPlan] = useState<G7Plan>("fat_loss")
  const [flavor, setFlavor] = useState<G7Flavor>("Chef Signature")
  const [meal, setMeal] = useState<MealWithAI | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUserId(data.user?.id || null)
    }

    getUser()
  }, [])

  const generateMealHandler = () => {
    setMessage("")
    setMeal(generateG7Meal(plan, flavor) as MealWithAI)
  }

  const saveCurrentPlan = async () => {
    if (!meal) {
      setMessage("Generate a chef system first.")
      return
    }

    if (!userId) {
      setMessage("Login required.")
      return
    }

    setSaving(true)

    const { error } = await supabase.from("plans").insert({
      user_id: userId,
      meal_name: meal.name,
      plan_type: getPlanLabel(plan),
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
    })

    setSaving(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage("Chef system saved.")
  }

  const activePlan = PLAN_META[plan]
  const execution = EXECUTION_META[plan]
  const repeatabilityScore = plan === "carnivore" ? 94 : plan === "athlete" ? 91 : 92

  return (
    <div className="space-y-4 overflow-hidden">
      <section className="g7-card g7-card-cyan p-4 lg:p-5">
        <p className="g7-kicker">G7 Compact OS</p>

        <div className="mt-2 grid gap-4 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
          <div>
            <h2 className="text-[28px] font-black leading-[1.03] tracking-[-0.04em] text-white lg:text-[36px]">
              Choose your system.
              <span className="block text-cyan-300">G7 builds the meal.</span>
            </h2>

            <p className="mt-3 max-w-3xl text-xs leading-6 text-slate-300">
              Decision layer + visual execution layer + Kitchen OS metadata.
            </p>
          </div>

          <div className="rounded-[22px] border border-cyan-300/20 bg-black/25 p-3">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-300">
              Active Mode
            </p>

            <p className="mt-2 text-xl font-black text-white">
              {activePlan.emoji} {activePlan.label}
            </p>

            <p className="mt-1 text-[11px] leading-5 text-slate-400">
              {activePlan.identity}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.34fr_0.66fr]">
        <div className="g7-card p-3 lg:p-4">
          <p className="g7-kicker">Nutrition Identity</p>

          <div className="mt-3 grid gap-2">
            {G7_PLANS.map((item) => {
              const active = plan === item
              const meta = PLAN_META[item]

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setPlan(item)
                    setMeal(null)
                    setMessage("")
                  }}
                  className={`w-full rounded-[20px] border p-2.5 text-left transition-all ${
                    active
                      ? "border-cyan-300 bg-cyan-300/10 shadow-[0_0_28px_rgba(34,211,238,0.08)]"
                      : "border-white/10 bg-white/[0.03] hover:border-cyan-300/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-black/25 text-xl">
                      {meta.emoji}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-sm font-black text-white">
                          {meta.label}
                        </h3>

                        {active && (
                          <span className="rounded-full bg-cyan-300 px-2 py-0.5 text-[8px] font-black text-[#001018]">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <p className="mt-0.5 truncate text-[11px] font-bold text-cyan-300">
                        {meta.identity}
                      </p>

                      <p className="mt-0.5 text-[11px] leading-4 text-slate-400">
                        {meta.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="g7-card p-4 lg:p-5">
            <p className="g7-kicker">Flavor Intelligence</p>

            <div className="mt-2 grid gap-3 lg:grid-cols-[0.62fr_0.38fr] lg:items-start">
              <div>
                <h3 className="text-[28px] font-black leading-[1.03] tracking-[-0.04em] text-white lg:text-[34px]">
                  Choose your
                  <span className="block text-cyan-300">flavor mood</span>
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-300">
                  Flavor controls satisfaction, repeatability, and execution.
                </p>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-black/25 p-3">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                  System Promise
                </p>

                <p className="mt-1.5 text-xs leading-5 text-slate-200">
                  {activePlan.promise}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {G7_FLAVORS.map((item) => {
                const active = flavor === item

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setFlavor(item)
                      setMeal(null)
                      setMessage("")
                    }}
                    className={`rounded-full border px-3.5 py-2 text-xs font-black transition ${
                      active
                        ? "border-cyan-300 bg-cyan-300 text-[#001018]"
                        : "border-white/10 bg-black/25 text-slate-300 hover:border-cyan-300/40"
                    }`}
                  >
                    {item}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={generateMealHandler}
              className="mt-4 w-full rounded-[22px] bg-cyan-300 px-4 py-3 text-sm font-black text-[#001018] transition hover:bg-cyan-200"
            >
              Generate Kitchen OS Card
            </button>
          </div>

          <div className="g7-card g7-card-cyan p-4 lg:p-5">
            {!meal && (
              <div className="rounded-[22px] border border-white/10 bg-black/25 p-4">
                <p className="g7-kicker">Awaiting Generation</p>

                <h3 className="mt-2 text-2xl font-black text-white">
                  Select system + flavor
                </h3>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-300">
                  G7 will generate a premium meal card with macros,
                  ingredients, kitchen timeline, AI chef mood, costing,
                  production, storage, and reheating logic.
                </p>
              </div>
            )}

            {meal && (
              <div className="space-y-3">
                <section className="g7-meal-hero">
                  <div className="g7-meal-hero-content">
                    <p className="g7-kicker">Kitchen OS Meal Card</p>

                    <h2 className="mt-2 break-words text-[28px] font-black leading-[1.03] tracking-[-0.04em] text-white lg:text-[36px]">
                      {meal.name}
                    </h2>

                    <p className="mt-2 max-w-xl text-xs leading-6 text-slate-300">
                      {getPlanLabel(plan)} system with{" "}
                      <span className="font-black text-cyan-300">
                        {flavor}
                      </span>{" "}
                      flavor direction.
                    </p>

                    <div className="g7-badge-row mt-4">
                      <span className="g7-execution-badge">
                        {activePlan.emoji} {activePlan.label}
                      </span>
                      <span className="g7-execution-badge">
                        HOME PREP
                      </span>
                      
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                  <Macro label="Energy" value={`${meal.calories} kcal`} />
                  <Macro label="Protein" value={`${meal.protein}g`} />
                  <Macro label="Carbs" value={`${meal.carbs}g`} />
                  <Macro label="Fat" value={`${meal.fat}g`} />
                </div>

                <div className="g7-system-footer">
                  <div className="grid gap-2 lg:grid-cols-4">
                    <InfoCard title="Prep Time" value={execution.prepTime} />
                    <InfoCard title="Difficulty" value={execution.difficulty} />
                    <InfoCard title="Repeatability" value={`${repeatabilityScore}%`} />
                    <InfoCard title="Execution" value={`${execution.score}%`} />
                  </div>
                </div>

                <DecisionBox title="Kitchen OS Metadata">
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    <InfoCard title="Cost / Meal" value={meal.kitchenOS.costPerMeal} />
                    <InfoCard title="Shelf Life" value={meal.kitchenOS.shelfLife} />
                    <InfoCard title="Reheat" value={meal.kitchenOS.reheatMethod} />
                    <InfoCard title="Containers" value={meal.kitchenOS.prepContainers} />
                    <InfoCard title="Station" value={meal.kitchenOS.kitchenStation} />
                    <InfoCard title="Mode" value={meal.kitchenOS.productionMode} />
                  </div>
                </DecisionBox>

                <section className="g7-ai-panel">
                  <div className="g7-ai-panel-inner">
                    <div className="grid gap-3 lg:grid-cols-[0.62fr_0.38fr]">
                      <div>
                        <p className="g7-kicker">AI Chef Intelligence</p>

                        <p className="mt-2 text-xs leading-6 text-slate-300">
                          {meal.aiDescription ||
                            `${activePlan.identity}: G7 created a chef-based meal direction using ${flavor} flavor logic, strong satisfaction, and repeatable nutrition structure.`}
                        </p>
                      </div>

                      <div className="grid gap-2">
                        <InfoCard title="Mood" value={meal.systemMood} />
                        <InfoCard title="Chef Voice" value={meal.chefVoice} />
                      </div>
                    </div>
                  </div>
                </section>

                <DecisionBox title="Execution Ingredients">
                  <div className="grid gap-2 md:grid-cols-2">
                    {meal.ingredients.map((ingredient, index) => (
                      <IngredientRow
                        key={`${ingredient}-${index}`}
                        index={index + 1}
                        value={ingredient}
                      />
                    ))}
                  </div>
                </DecisionBox>

                <DecisionBox title="Kitchen Timeline">
                  <div className="g7-timeline">
                    {meal.steps.map((step, index) => (
                      <StepRow
                        key={`${step}-${index}`}
                        index={index + 1}
                        value={step}
                      />
                    ))}
                  </div>
                </DecisionBox>

                <div className="grid gap-2 lg:grid-cols-3">
                  <InfoCard title="Nutrition Mode" value={activePlan.label} />
                  <InfoCard title="Flavor Mood" value={flavor} />
                  <InfoCard title="Kitchen Mode" value={execution.kitchenMode} />
                </div>

                <DecisionBox title="Production Note">
                  <p className="text-xs leading-6 text-slate-300">
                    {meal.kitchenOS.batchPrepNote}
                  </p>
                </DecisionBox>

                <DecisionBox title="Storage Note">
                  <p className="text-xs leading-6 text-slate-300">
                    {meal.kitchenOS.storageNote}
                  </p>
                </DecisionBox>

                <DecisionBox title="Kitchen Note">
                  <p className="text-xs leading-6 text-slate-300">
                    {meal.kitchenNote}
                  </p>
                </DecisionBox>

                <DecisionBox title="Repeatability Logic">
                  <p className="text-xs leading-6 text-slate-300">
                    {meal.repeatabilityReason}
                  </p>
                </DecisionBox>

                <DecisionBox title="Flavor Logic">
                  <p className="text-xs leading-6 text-slate-300">
                    {meal.sauce}
                  </p>
                </DecisionBox>

                <DecisionBox title="System Tags">
                  <div className="flex flex-wrap gap-2">
                    {activePlan.tags.map((tag) => (
                      <span key={tag} className="g7-execution-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </DecisionBox>

                {message && (
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-xs font-bold text-cyan-100">
                    {message}
                  </div>
                )}

                <button
                  type="button"
                  onClick={saveCurrentPlan}
                  disabled={saving}
                  className="w-full rounded-[22px] bg-cyan-300 px-4 py-3 text-sm font-black text-[#001018] transition hover:bg-cyan-200 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Kitchen OS Card"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function Macro({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/25 p-3">
      <p className="text-[9px] uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>

      <p className="mt-1.5 break-words text-base font-black text-white">
        {value}
      </p>
    </div>
  )
}

function InfoCard({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/25 p-3">
      <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">
        {title}
      </p>

      <p className="mt-1.5 break-words text-xs font-black text-white">
        {value}
      </p>
    </div>
  )
}

function IngredientRow({
  index,
  value,
}: {
  index: number
  value: string
}) {
  return (
    <div className="g7-ingredient-card">
      <div className="g7-ingredient-dot">{index}</div>

      <p className="text-xs font-bold leading-5 text-slate-200">{value}</p>
    </div>
  )
}

function StepRow({
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

function DecisionBox({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-black/25 p-3">
      <p className="mb-2 text-[9px] font-black uppercase tracking-[0.14em] text-cyan-300">
        {title}
      </p>

      {children}
    </div>
  )
}