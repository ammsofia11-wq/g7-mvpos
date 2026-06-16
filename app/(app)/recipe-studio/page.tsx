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
  accent: "blue" | "copper" | "lime"
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
    accent: "blue",
  },
  {
    label: "LOCAL COST",
    value: "74.00",
    caption: "Uses tenant currency settings",
    accent: "copper",
  },
  {
    label: "TEST",
    value: "2/3",
    caption: "Kitchen trials passed",
    accent: "lime",
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
  "Voice Captured": "border-[#76E4FF]/25 bg-[#76E4FF]/10 text-[#CFF7FF]",
  "AI SOP Generated": "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
  "Chef Review": "border-[#C78A4A]/35 bg-[#C78A4A]/10 text-[#FFD8A6]",
  Testing: "border-violet-300/25 bg-violet-300/10 text-violet-100",
  "Needs Changes": "border-orange-300/30 bg-orange-300/10 text-orange-100",
  Approved: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  "Documentation Required": "border-yellow-300/30 bg-yellow-300/10 text-yellow-100",
  "Production Ready": "border-lime-300/30 bg-lime-300/10 text-lime-100",
}

const metricAccentStyles: Record<MetricCard["accent"], string> = {
  blue: "border-[#76E4FF]/20 bg-[#76E4FF]/10 text-[#CFF7FF]",
  copper: "border-[#C78A4A]/25 bg-[#C78A4A]/10 text-[#FFD8A6]",
  lime: "border-lime-300/25 bg-lime-300/10 text-lime-100",
}

const globalReadiness = [
  "ISO currency-ready",
  "Metric / imperial-ready",
  "Multi-country kitchens",
  "Tenant local settings",
]

const workerPromise = [
  "Clear next action",
  "Less confusion",
  "Fair evaluation",
  "Skill improvement",
]

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
    <div className="min-h-screen overflow-x-hidden bg-[#06101D] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(118,228,255,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(199,138,74,0.12),transparent_30%),linear-gradient(180deg,#06101D_0%,#071525_48%,#050914_100%)]" />

      <main className="relative mx-auto flex w-full max-w-[1180px] flex-col gap-4 px-3 py-4 sm:px-4 lg:px-5 lg:py-5">
        <section className="min-w-0 rounded-2xl border border-[#76E4FF]/15 bg-[#0B1B2F]/75 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-5">
          <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap gap-2">
                <div className="inline-flex max-w-full items-center rounded-full border border-[#76E4FF]/25 bg-[#76E4FF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#CFF7FF]">
                  G7 Culinary Intelligence
                </div>

                <div className="inline-flex max-w-full items-center rounded-full border border-[#C78A4A]/25 bg-[#C78A4A]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFD8A6]">
                  Global Kitchen OS
                </div>
              </div>

              <h1 className="max-w-full text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[34px]">
                Recipe Lifecycle Studio
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
                Build, test, approve and release central-kitchen recipes with
                chef voice, AI SOP generation, cooling control, QC gates and
                production-ready documentation.
              </p>

              <div className="mt-4 rounded-xl border border-lime-300/20 bg-lime-300/10 p-3 text-sm leading-6 text-lime-50">
                <span className="font-semibold text-lime-100">
                  Plan your work, then work your plan.
                </span>{" "}
                G7 helps the worker follow the plan clearly, and helps the owner
                keep the kitchen running even when people change.
              </div>
            </div>

            <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-3 xl:w-[410px]">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className={cn(
                    "min-w-0 rounded-xl border p-3",
                    metricAccentStyles[metric.accent]
                  )}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                    {metric.label}
                  </div>
                  <div className="mt-1 truncate text-xl font-bold text-white">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-xs leading-4 text-white/58">
                    {metric.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[236px_minmax(0,1fr)]">
          <aside className="min-w-0 rounded-2xl border border-[#76E4FF]/12 bg-[#0B1B2F]/68 p-3 shadow-xl shadow-black/20 backdrop-blur">
            <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#CFF7FF]/60">
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
                      ? "border-[#76E4FF]/40 bg-[#76E4FF]/12 text-[#CFF7FF] shadow-lg shadow-[#76E4FF]/5"
                      : "border-white/10 bg-white/[0.035] text-white/62 hover:border-[#76E4FF]/25 hover:bg-[#76E4FF]/8 hover:text-white"
                  )}
                >
                  <span className="block truncate">{tab}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 hidden rounded-xl border border-[#C78A4A]/20 bg-[#C78A4A]/10 p-3 lg:block">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFD8A6]/70">
                Worker-first
              </div>
              <p className="mt-2 text-xs leading-5 text-white/58">
                Every screen should reduce pressure, guide action and make
                production easier to execute.
              </p>
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-4">
            <section className="min-w-0 rounded-2xl border border-[#76E4FF]/12 bg-[#0B1B2F]/68 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
              <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#CFF7FF]/60">
                    Active Module
                  </div>
                  <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                    {activeTab}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/64">
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

            <section className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-w-0 rounded-2xl border border-[#76E4FF]/12 bg-[#0B1B2F]/68 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
                <div className="mb-3 flex min-w-0 flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#CFF7FF]/60">
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
                          : "border-white/10 bg-white/[0.035] text-white/58 hover:border-[#76E4FF]/25 hover:bg-[#76E4FF]/8 hover:text-white"
                      )}
                    >
                      <span className="block truncate font-semibold">
                        {status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-w-0 rounded-2xl border border-[#C78A4A]/18 bg-[#120F0B]/55 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFD8A6]/70">
                  Global Fit
                </div>
                <h3 className="mt-1 text-lg font-bold text-white">
                  Any market, any kitchen
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  Recipe cost must come from tenant settings, not a hard-coded
                  country or currency.
                </p>

                <div className="mt-4 grid gap-2">
                  {globalReadiness.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-[#C78A4A]/18 bg-[#C78A4A]/8 px-3 py-2 text-sm text-white/70"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-w-0 rounded-2xl border border-[#76E4FF]/12 bg-[#0B1B2F]/68 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
                <div className="mb-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#CFF7FF]/60">
                    SOP Detail
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    {selectedSop.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/64">
                    {selectedSop.description}
                  </p>
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.035] p-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      Owner
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      {selectedSop.owner}
                    </div>
                  </div>

                  <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.035] p-3">
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
                      className="flex min-w-0 items-start gap-2 rounded-xl border border-lime-300/14 bg-lime-300/8 p-3 text-sm text-white/72"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-lime-300 shadow-lg shadow-lime-300/30" />
                      <span className="min-w-0">{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-0 rounded-2xl border border-lime-300/18 bg-lime-300/8 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-100/70">
                  Worker Promise
                </div>
                <h3 className="mt-1 text-lg font-bold text-white">
                  Easier work, better execution
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  The system should feel like a calm chef beside the worker, not
                  another pressure point.
                </p>

                <div className="mt-4 grid gap-2">
                  {workerPromise.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-lime-300/16 bg-black/15 px-3 py-2 text-sm text-white/72"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-w-0 rounded-2xl border border-[#76E4FF]/12 bg-[#0B1B2F]/68 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
                <div className="mb-4 flex min-w-0 flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#CFF7FF]/60">
                      Ingredients
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      Controlled recipe components
                    </h3>
                  </div>
                  <p className="text-xs text-white/45">
                    Responsive cards, not a wide table
                  </p>
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
                  {ingredients.map((ingredient) => (
                    <div
                      key={ingredient.name}
                      className="min-w-0 rounded-xl border border-white/10 bg-white/[0.035] p-3"
                    >
                      <div className="flex min-w-0 items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-bold text-white">
                            {ingredient.name}
                          </div>
                          <div className="mt-1 text-xs text-white/48">
                            {ingredient.prep}
                          </div>
                        </div>

                        <div className="shrink-0 rounded-lg border border-[#76E4FF]/14 bg-[#76E4FF]/8 px-2.5 py-1 text-right">
                          <div className="text-sm font-bold text-white">
                            {ingredient.quantity}
                          </div>
                          <div className="text-[10px] uppercase tracking-wide text-[#CFF7FF]/55">
                            {ingredient.unit}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 rounded-lg border border-[#C78A4A]/14 bg-[#C78A4A]/8 p-2 text-xs leading-5 text-white/58">
                        {ingredient.controlPoint}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-0 rounded-2xl border border-lime-300/18 bg-[#071525]/70 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-100/70">
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
                        className="rounded-xl border border-lime-300/16 bg-lime-300/8 p-3"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-lime-300/30 bg-lime-300/12 text-xs font-bold text-lime-100">
                            {index + 1}
                          </div>
                          <div className="min-w-0 text-sm font-semibold text-white">
                            {step}
                          </div>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-white/55">
                          Required before packaging release and production
                          handoff.
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>

            <section className="min-w-0 rounded-2xl border border-[#76E4FF]/12 bg-[#0B1B2F]/68 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
              <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3">
                <div className="min-w-0 rounded-xl border border-[#76E4FF]/14 bg-[#76E4FF]/8 p-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#CFF7FF]/65">
                    Testing
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/65">
                    Kitchen trial, chef feedback, correction notes and retest
                    cycle before final approval.
                  </div>
                </div>

                <div className="min-w-0 rounded-xl border border-[#C78A4A]/16 bg-[#C78A4A]/8 p-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFD8A6]/70">
                    Approval
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/65">
                    Chef approval, QA gate and documentation check before the
                    recipe becomes production ready.
                  </div>
                </div>

                <div className="min-w-0 rounded-xl border border-lime-300/16 bg-lime-300/8 p-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-lime-100/70">
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