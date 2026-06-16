"use client"

import { useMemo, useState } from "react"

type RecipeStatus =
  | "Draft"
  | "Voice Captured"
  | "AI SOP Generated"
  | "Chef Review"
  | "Testing"
  | "Needs Changes"
  | "Approved"
  | "Documentation Required"
  | "Production Ready"

type StudioTab =
  | "Basics"
  | "Voice"
  | "Ingredients"
  | "AI SOP"
  | "Prep"
  | "Cook"
  | "Cooling"
  | "Portion"
  | "Package"
  | "QC"
  | "Testing"
  | "Approval"
  | "Release"

type Ingredient = {
  name: string
  quantity: string
  unit: string
  prep: string
  controlPoint: string
}

type SopCard = {
  title: string
  owner: string
  status: RecipeStatus
  description: string
  checks: string[]
}

type MetricCard = {
  label: string
  value: string
  caption: string
}

const studioTabs: StudioTab[] = [
  "Basics",
  "Voice",
  "Ingredients",
  "AI SOP",
  "Prep",
  "Cook",
  "Cooling",
  "Portion",
  "Package",
  "QC",
  "Testing",
  "Approval",
  "Release",
]

const lifecycleStatuses: RecipeStatus[] = [
  "Draft",
  "Voice Captured",
  "AI SOP Generated",
  "Chef Review",
  "Testing",
  "Needs Changes",
  "Approved",
  "Documentation Required",
  "Production Ready",
]

const ingredients: Ingredient[] = [
  {
    name: "Chicken Breast",
    quantity: "160",
    unit: "g raw",
    prep: "Trimmed, cleaned, marinated",
    controlPoint: "Raw weight locked before cooking",
  },
  {
    name: "Basmati Rice",
    quantity: "120",
    unit: "g cooked",
    prep: "Steamed batch, cooled correctly",
    controlPoint: "Cooked portion weight verified",
  },
  {
    name: "Tomato Base Sauce",
    quantity: "45",
    unit: "g",
    prep: "Batch cooked sauce",
    controlPoint: "Salt, acidity and consistency checked",
  },
  {
    name: "Mixed Vegetables",
    quantity: "100",
    unit: "g raw",
    prep: "Washed, chopped, portioned",
    controlPoint: "Freshness and color checked",
  },
]

const metrics: MetricCard[] = [
  {
    label: "KCAL",
    value: "620",
    caption: "Target per portion",
  },
  {
    label: "COST",
    value: "EGP 74",
    caption: "Estimated batch cost",
  },
  {
    label: "TEST",
    value: "2/3",
    caption: "Kitchen trials passed",
  },
]

const sopCards: SopCard[] = [
  {
    title: "Prep SOP",
    owner: "CDP / Prep Team",
    status: "Chef Review",
    description:
      "Ingredient cleaning, trimming, marination, weighing and mise en place before production release.",
    checks: [
      "Raw weight recorded",
      "Marination time confirmed",
      "Allergen notes checked",
    ],
  },
  {
    title: "Cook SOP",
    owner: "Hot Kitchen",
    status: "Testing",
    description:
      "Cooking method, batch size, oven or pan setup, temperature target and chef tasting checkpoint.",
    checks: [
      "Cooking temperature logged",
      "Yield loss reviewed",
      "Texture and flavor approved",
    ],
  },
  {
    title: "Cooling SOP",
    owner: "QA / Cooling Station",
    status: "Documentation Required",
    description:
      "Cooling flow must move through Cooling In, Temperature Check and Cooling Out before packaging.",
    checks: [
      "Cooling In time recorded",
      "Temperature Check completed",
      "Cooling Out released by QA",
    ],
  },
  {
    title: "Portion & Package SOP",
    owner: "Packaging Team",
    status: "Approved",
    description:
      "Final cooked component weights, container setup, label placement and visual quality standard.",
    checks: [
      "Protein portion verified",
      "Carb portion verified",
      "Label and expiry checked",
    ],
  },
]

const tabDescriptions: Record<StudioTab, string> = {
  Basics:
    "Recipe identity, category, production purpose, customer plan link and internal kitchen ownership.",
  Voice:
    "Chef voice notes and practical kitchen instructions captured before AI SOP generation.",
  Ingredients:
    "Controlled ingredient list with weight basis, preparation method and operational control points.",
  "AI SOP":
    "AI-generated SOP draft based on chef voice, recipe structure and central kitchen rules.",
  Prep:
    "Mise en place, trimming, marination, batching and station readiness before cooking.",
  Cook:
    "Cooking method, batch size, equipment, temperature target, yield and taste control.",
  Cooling:
    "Cooling In, Temperature Check and Cooling Out workflow before packaging release.",
  Portion:
    "Final portion weights, cooked yield, customer portion control and plating standards.",
  Package:
    "Container setup, sealing, labeling, expiry, storage route and dispatch readiness.",
  QC:
    "Food safety, visual quality, taste, temperature and operational compliance checks.",
  Testing:
    "Kitchen trials, chef feedback, issue logging, correction cycle and retest status.",
  Approval:
    "Chef approval, QA approval and production release authority before live kitchen use.",
  Release:
    "Final production-ready documentation, station instructions and kitchen runtime handoff.",
}

const statusStyles: Record<RecipeStatus, string> = {
  Draft: "border-white/10 bg-white/5 text-white/70",
  "Voice Captured": "border-sky-300/20 bg-sky-300/10 text-sky-100",
  "AI SOP Generated": "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
  "Chef Review": "border-amber-300/25 bg-amber-300/10 text-amber-100",
  Testing: "border-violet-300/25 bg-violet-300/10 text-violet-100",
  "Needs Changes": "border-orange-300/25 bg-orange-300/10 text-orange-100",
  Approved: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  "Documentation Required": "border-yellow-300/25 bg-yellow-300/10 text-yellow-100",
  "Production Ready": "border-lime-300/25 bg-lime-300/10 text-lime-100",
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export default function RecipeStudioPage() {
  const [activeTab, setActiveTab] = useState<StudioTab>("Basics")
  const [recipeStatus, setRecipeStatus] = useState<RecipeStatus>("Chef Review")

  const selectedSop = useMemo(() => {
    if (activeTab === "Prep") return sopCards[0]
    if (activeTab === "Cook") return sopCards[1]
    if (activeTab === "Cooling") return sopCards[2]
    if (activeTab === "Portion" || activeTab === "Package") return sopCards[3]
    return sopCards.find((card) => card.status === recipeStatus) ?? sopCards[0]
  }, [activeTab, recipeStatus])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070A12] text-white">
      <main className="mx-auto flex w-full max-w-[1180px] flex-col gap-4 px-3 py-4 sm:px-4 lg:px-5 lg:py-5">
        <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30 sm:p-5">
          <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-2 inline-flex max-w-full items-center rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-lime-100">
                G7 Culinary Intelligence
              </div>

              <h1 className="max-w-full text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[34px]">
                Recipe Lifecycle Studio
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60 sm:text-[15px]">
                Build, test, approve and release central-kitchen recipes with
                chef voice, AI SOP generation, cooling control, QC gates and
                production-ready documentation.
              </p>
            </div>

            <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-3 xl:w-[390px]">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="min-w-0 rounded-xl border border-white/10 bg-black/20 p-3"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                    {metric.label}
                  </div>
                  <div className="mt-1 truncate text-xl font-bold text-white">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-xs leading-4 text-white/50">
                    {metric.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[236px_minmax(0,1fr)]">
          <aside className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
            <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Studio Steps
            </div>

            <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {studioTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "shrink-0 rounded-xl border px-3 py-2 text-left text-sm transition lg:w-full lg:shrink",
                    activeTab === tab
                      ? "border-lime-300/35 bg-lime-300/12 text-lime-100"
                      : "border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <span className="block truncate">{tab}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-4">
            <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                    Active Module
                  </div>
                  <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                    {activeTab}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                    {tabDescriptions[activeTab]}
                  </p>
                </div>

                <div
                  className={cn(
                    "w-fit max-w-full rounded-full border px-3 py-1.5 text-xs font-semibold",
                    statusStyles[recipeStatus]
                  )}
                >
                  {recipeStatus}
                </div>
              </div>
            </section>

            <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <div className="mb-3 flex min-w-0 flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                    Status Lifecycle
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Recipe approval path
                  </h3>
                </div>
                <p className="text-xs text-white/45">
                  Click any status to simulate lifecycle state
                </p>
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {lifecycleStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setRecipeStatus(status)}
                    className={cn(
                      "min-w-0 rounded-xl border px-3 py-2 text-left text-sm transition",
                      recipeStatus === status
                        ? statusStyles[status]
                        : "border-white/10 bg-black/20 text-white/55 hover:bg-white/[0.06] hover:text-white"
                    )}
                  >
                    <span className="block truncate font-semibold">
                      {status}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <div className="mb-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                    SOP Detail
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    {selectedSop.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {selectedSop.description}
                  </p>
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="min-w-0 rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      Owner
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      {selectedSop.owner}
                    </div>
                  </div>

                  <div className="min-w-0 rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      Current Gate
                    </div>
                    <div
                      className={cn(
                        "mt-2 inline-flex max-w-full rounded-full border px-3 py-1 text-xs font-semibold",
                        statusStyles[selectedSop.status]
                      )}
                    >
                      {selectedSop.status}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid min-w-0 grid-cols-1 gap-2">
                  {selectedSop.checks.map((check) => (
                    <div
                      key={check}
                      className="flex min-w-0 items-start gap-2 rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white/70"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-lime-300" />
                      <span className="min-w-0">{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  Cooling Control
                </div>
                <h3 className="mt-1 text-lg font-bold text-white">
                  Cooling SOP
                </h3>

                <div className="mt-4 space-y-2">
                  {["Cooling In", "Temperature Check", "Cooling Out"].map(
                    (step, index) => (
                      <div
                        key={step}
                        className="rounded-xl border border-white/10 bg-black/20 p-3"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-lime-300/25 bg-lime-300/10 text-xs font-bold text-lime-100">
                            {index + 1}
                          </div>
                          <div className="min-w-0 text-sm font-semibold text-white">
                            {step}
                          </div>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-white/50">
                          Required before packaging release and production
                          handoff.
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>

            <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <div className="mb-4 flex min-w-0 flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                    Ingredients
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Controlled recipe components
                  </h3>
                </div>
                <p className="text-xs text-white/45">
                  No wide table — responsive cards
                </p>
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
                {ingredients.map((ingredient) => (
                  <div
                    key={ingredient.name}
                    className="min-w-0 rounded-xl border border-white/10 bg-black/20 p-3"
                  >
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-white">
                          {ingredient.name}
                        </div>
                        <div className="mt-1 text-xs text-white/45">
                          {ingredient.prep}
                        </div>
                      </div>

                      <div className="shrink-0 rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1 text-right">
                        <div className="text-sm font-bold text-white">
                          {ingredient.quantity}
                        </div>
                        <div className="text-[10px] uppercase tracking-wide text-white/45">
                          {ingredient.unit}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.03] p-2 text-xs leading-5 text-white/55">
                      {ingredient.controlPoint}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3">
                <div className="min-w-0 rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                    Testing
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/65">
                    Kitchen trial, chef feedback, correction notes and retest
                    cycle before final approval.
                  </div>
                </div>

                <div className="min-w-0 rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                    Approval
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/65">
                    Chef approval, QA gate and documentation check before the
                    recipe becomes production ready.
                  </div>
                </div>

                <div className="min-w-0 rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                    Release
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/65">
                    Final handoff to kitchen runtime with SOP, portion,
                    packaging and QC instructions.
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}