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

type IngredientPreview = {
  name: string
  category: string
  unit: string
  nutrition: string
  yieldRule: string
  allergenRule: string
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

type RoleAccess = {
  role: string
  canSee: string
  hidden: string
  accent: "blue" | "copper" | "lime" | "amber"
}

type WorkerStep = {
  step: string
  action: string
  support: string
}

type SourcePreview = {
  label: string
  value: string
  safeClientView: string
  protectedData: string
  accent: "blue" | "copper" | "lime" | "amber"
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

const shortStatusLabel: Record<RecipeStatus, string> = {
  Draft: "Draft",
  "Voice Captured": "Voice Captured",
  "AI SOP Generated": "AI SOP Generated",
  "Chef Review": "Chef Review",
  Testing: "Testing",
  "Needs Changes": "Needs Changes",
  Approved: "Approved",
  "Documentation Required": "Docs Required",
  "Production Ready": "Production Ready",
}

const metrics: MetricCard[] = [
  {
    label: "SOURCE",
    value: "Ready",
    caption: "Prepared for safe server recipe source",
    accent: "blue",
  },
  {
    label: "COST",
    value: "Protected",
    caption: "Never exposed to worker client view",
    accent: "copper",
  },
  {
    label: "RELEASE",
    value: "Gated",
    caption: "Recipe must pass approval workflow",
    accent: "lime",
  },
]

const ingredientPreview: IngredientPreview[] = [
  {
    name: "Chicken Breast",
    category: "Protein",
    unit: "g",
    nutrition: "Nutrition facts available",
    yieldRule: "Raw-to-cooked yield required",
    allergenRule: "No declared allergen in seed",
  },
  {
    name: "Rice",
    category: "Carb",
    unit: "g",
    nutrition: "Nutrition facts available",
    yieldRule: "Cooked yield conversion required",
    allergenRule: "No declared allergen in seed",
  },
  {
    name: "Tomato Sauce",
    category: "Sauce",
    unit: "g",
    nutrition: "Nutrition facts available",
    yieldRule: "Batch consistency check required",
    allergenRule: "Allergen review required before release",
  },
  {
    name: "Greek Yogurt",
    category: "Dairy",
    unit: "g",
    nutrition: "Nutrition facts available",
    yieldRule: "Stable yield rule",
    allergenRule: "Contains dairy",
  },
]

const sourcePreview: SourcePreview[] = [
  {
    label: "Recipe Library",
    value: "Server Recipe Source",
    safeClientView: "Recipe name, station, category, SOP status",
    protectedData: "Cost, margin, R&D notes, unapproved versions",
    accent: "blue",
  },
  {
    label: "Ingredient Master",
    value: "Server Ingredient Source",
    safeClientView: "Name, category, unit, allergen warnings",
    protectedData: "Supplier price, protected costing fields",
    accent: "lime",
  },
  {
    label: "Nutrition Facts",
    value: "Sanitized Nutrition View",
    safeClientView: "KCAL, protein, carbs, fat, fiber",
    protectedData: "Commercial costing and supplier-linked data",
    accent: "amber",
  },
  {
    label: "Cost Engine",
    value: "Owner-only Access",
    safeClientView: "Protected label only",
    protectedData: "Cost per unit, cost per yield, margin",
    accent: "copper",
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
      "Ingredient source verified",
      "Allergen notes checked",
    ],
  },
  {
    title: "Cook SOP",
    owner: "Hot Kitchen",
    status: "Testing",
    description:
      "Cooking method, batch size, equipment setup, temperature target, cooking time and chef tasting checkpoint.",
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
      "Cooling In time and batch code recorded",
      "Probe temperature entered by QA",
      "Cooling Out released before packaging",
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
      "Label, expiry and storage route checked",
    ],
  },
]

const tabDescriptions: Record<StudioTab, string> = {
  Basics:
    "Recipe identity, category, production purpose, kitchen ownership and safe source connection state.",
  Voice:
    "Chef voice notes are treated as protected R&D input before SOP generation.",
  Ingredients:
    "Controlled ingredients from Ingredient Master with nutrition, yield and allergen visibility rules.",
  "AI SOP":
    "AI-generated SOP draft based on chef input, ingredient rules and kitchen production standards.",
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

const roleAccess: RoleAccess[] = [
  {
    role: "Owner",
    canSee: "Costing, yield, margin, approval history and full protected recipe asset.",
    hidden: "Nothing hidden from ownership authority.",
    accent: "copper",
  },
  {
    role: "Chef",
    canSee: "Recipe build, SOP, testing notes, ingredients and production method.",
    hidden: "Cannot bypass final approval lock.",
    accent: "blue",
  },
  {
    role: "QA",
    canSee: "Cooling, temperature checks, QC rules, allergens and release gates.",
    hidden: "Costing and commercial margin hidden.",
    accent: "amber",
  },
  {
    role: "Worker",
    canSee: "Approved step-by-step task only after production release.",
    hidden: "Costing, R&D notes, draft versions and full recipe IP hidden.",
    accent: "lime",
  },
]

const workerSteps: WorkerStep[] = [
  {
    step: "1",
    action: "Prepare assigned ingredient",
    support: "Show approved weight, prep instruction and control point only.",
  },
  {
    step: "2",
    action: "Start station SOP",
    support: "Worker sees the live step for the assigned station.",
  },
  {
    step: "3",
    action: "Record checkpoint",
    support: "Temperature, weight or completion is logged for fair evaluation.",
  },
  {
    step: "4",
    action: "Ask for support",
    support: "Escalation can request help before the station falls behind.",
  },
]

const nextActions = [
  "Connect Recipe Studio to a server-safe recipe preview",
  "Keep costing fields outside the client bundle",
  "Prepare sanitized Ingredient Master view",
  "Add role-based API contract before edit actions",
]

const coolingSteps = [
  {
    title: "Cooling In",
    detail: "Record tray entry time, batch code and responsible station.",
  },
  {
    title: "Temperature Check",
    detail: "Enter probe temperature and confirm QA checkpoint.",
  },
  {
    title: "Cooling Out",
    detail: "Release only after QA approval before packaging starts.",
  },
]

const securityRules = [
  "No direct client import of cost-bearing recipe data",
  "No worker access to supplier pricing or R&D notes",
  "Owner-only cost and margin visibility",
  "Server/API must sanitize recipe payload by role",
  "Tenant isolation required before real customer data",
  "Audit log required for recipe edits and approvals",
]

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

const roleAccentStyles: Record<RoleAccess["accent"], string> = {
  blue: "border-[#76E4FF]/18 bg-[#76E4FF]/10",
  copper: "border-[#C78A4A]/20 bg-[#C78A4A]/10",
  lime: "border-lime-300/18 bg-lime-300/10",
  amber: "border-amber-300/20 bg-amber-300/10",
}

const sourceAccentStyles: Record<SourcePreview["accent"], string> = {
  blue: "border-[#76E4FF]/18 bg-[#76E4FF]/10",
  copper: "border-[#C78A4A]/20 bg-[#C78A4A]/10",
  lime: "border-lime-300/18 bg-lime-300/10",
  amber: "border-amber-300/20 bg-amber-300/10",
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

  const activeStepNumber = studioTabs.indexOf(activeTab) + 1

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#06101D] text-white">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(118,228,255,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(199,138,74,0.12),transparent_30%),linear-gradient(180deg,#06101D_0%,#071525_48%,#050914_100%)]" />

      <main className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col gap-4 px-3 py-4 sm:px-4 lg:px-5 lg:py-5">
        <section className="min-w-0 rounded-2xl border border-[#76E4FF]/15 bg-[#0B1B2F]/75 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-5">
          <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap gap-2">
                <div className="inline-flex max-w-full items-center rounded-full border border-[#76E4FF]/25 bg-[#76E4FF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#CFF7FF]">
                  G7 Culinary Intelligence
                </div>

                <div className="inline-flex max-w-full items-center rounded-full border border-[#C78A4A]/25 bg-[#C78A4A]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFD8A6]">
                  Safe Source Preview
                </div>
              </div>

              <h1 className="max-w-full text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[34px]">
                Recipe Lifecycle Studio
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/68 sm:text-[15px]">
                Prepare Recipe Studio for secure server-side connection to the
                recipe library, ingredient master, nutrition facts, yield rules
                and protected costing layer.
              </p>

              <div className="mt-4 grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
                {nextActions.slice(0, 2).map((action) => (
                  <div
                    key={action}
                    className="rounded-xl border border-lime-300/18 bg-lime-300/10 px-3 py-2 text-sm text-lime-50"
                  >
                    <span className="font-semibold text-lime-100">
                      Architecture action:
                    </span>{" "}
                    {action}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-3 xl:w-[430px]">
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
                  <div className="mt-1 break-words text-xl font-bold text-white">
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
              Recipe Steps
            </div>

            <div className="mb-3 rounded-xl border border-[#76E4FF]/16 bg-[#76E4FF]/10 p-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#CFF7FF]/60">
                Progress
              </div>
              <div className="mt-1 text-sm font-bold text-white">
                Step {activeStepNumber} of {studioTabs.length}
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#76E4FF]"
                  style={{
                    width: `${(activeStepNumber / studioTabs.length) * 100}%`,
                  }}
                />
              </div>
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
                      : "border-white/10 bg-white/[0.035] text-white/62 hover:border-[#76E4FF]/25 hover:bg-[#76E4FF]/10 hover:text-white"
                  )}
                >
                  <span className="block whitespace-normal break-words">
                    {tab}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 hidden rounded-xl border border-[#C78A4A]/20 bg-[#C78A4A]/10 p-3 lg:block">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFD8A6]/70">
                Client Safety
              </div>
              <p className="mt-2 text-xs leading-5 text-white/60">
                This screen does not directly import protected cost-bearing
                source files.
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
                    Click a gate to simulate workflow state
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
                          : "border-white/10 bg-white/[0.035] text-white/58 hover:border-[#76E4FF]/25 hover:bg-[#76E4FF]/10 hover:text-white"
                      )}
                    >
                      <span className="block whitespace-normal break-words font-semibold leading-5">
                        {shortStatusLabel[status]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-w-0 rounded-2xl border border-[#C78A4A]/18 bg-[#120F0B]/55 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFD8A6]/70">
                  Server Contract
                </div>
                <h3 className="mt-1 text-lg font-bold text-white">
                  Ready for protected API
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  Next real connection should return a sanitized payload by
                  role, tenant, recipe status and approval state.
                </p>

                <div className="mt-4 grid gap-2">
                  {nextActions.slice(2).map((action) => (
                    <div
                      key={action}
                      className="rounded-xl border border-[#C78A4A]/18 bg-[#C78A4A]/10 px-3 py-2 text-sm text-white/72"
                    >
                      {action}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="min-w-0 rounded-2xl border border-[#76E4FF]/12 bg-[#0B1B2F]/68 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#CFF7FF]/60">
                  Safe Source Preview
                </div>
                <h3 className="mt-1 text-lg font-bold text-white">
                  Recipe and ingredient data boundaries
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                  The page is prepared to receive safe read-only data without
                  exposing cost-bearing or supplier-linked fields to the client.
                </p>
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                {sourcePreview.map((source) => (
                  <div
                    key={source.label}
                    className={cn(
                      "min-w-0 rounded-xl border p-3",
                      sourceAccentStyles[source.accent]
                    )}
                  >
                    <div className="text-sm font-bold text-white">
                      {source.label}
                    </div>
                    <div className="mt-1 text-xs text-white/50">
                      {source.value}
                    </div>

                    <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
                      Safe client view
                    </div>
                    <p className="mt-1 text-xs leading-5 text-white/68">
                      {source.safeClientView}
                    </p>

                    <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
                      Protected data
                    </div>
                    <p className="mt-1 text-xs leading-5 text-white/60">
                      {source.protectedData}
                    </p>
                  </div>
                ))}
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
                      className="flex min-w-0 items-start gap-2 rounded-xl border border-lime-300/15 bg-lime-300/10 p-3 text-sm text-white/72"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-lime-300 shadow-lg shadow-lime-300/30" />
                      <span className="min-w-0">{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-0 rounded-2xl border border-lime-300/18 bg-lime-300/10 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-100/70">
                  Worker View Preview
                </div>
                <h3 className="mt-1 text-lg font-bold text-white">
                  Approved steps only
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  Worker screens should receive only the current approved task,
                  not recipe IP, costing or draft R&D data.
                </p>

                <div className="mt-4 grid gap-2">
                  {workerSteps.map((item) => (
                    <div
                      key={item.step}
                      className="rounded-xl border border-lime-300/16 bg-black/15 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-lime-300/30 bg-lime-300/12 text-xs font-bold text-lime-100">
                          {item.step}
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {item.action}
                        </div>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-white/58">
                        {item.support}
                      </p>
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
                      Ingredient Master Preview
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      Sanitized ingredient visibility
                    </h3>
                  </div>
                  <p className="text-xs text-white/45">
                    No supplier price exposed
                  </p>
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
                  {ingredientPreview.map((ingredient) => (
                    <div
                      key={ingredient.name}
                      className="min-w-0 rounded-xl border border-white/10 bg-white/[0.035] p-3"
                    >
                      <div className="flex min-w-0 items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="whitespace-normal break-words text-sm font-bold leading-5 text-white">
                            {ingredient.name}
                          </div>
                          <div className="mt-1 text-xs leading-5 text-white/48">
                            {ingredient.category}
                          </div>
                        </div>

                        <div className="shrink-0 rounded-lg border border-[#76E4FF]/15 bg-[#76E4FF]/10 px-2.5 py-1 text-right">
                          <div className="text-sm font-bold text-white">
                            {ingredient.unit}
                          </div>
                          <div className="text-[10px] uppercase tracking-wide text-[#CFF7FF]/55">
                            unit
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 grid gap-2">
                        <div className="rounded-lg border border-lime-300/14 bg-lime-300/10 p-2 text-xs leading-5 text-white/62">
                          {ingredient.nutrition}
                        </div>
                        <div className="rounded-lg border border-[#C78A4A]/15 bg-[#C78A4A]/10 p-2 text-xs leading-5 text-white/58">
                          {ingredient.yieldRule}
                        </div>
                        <div className="rounded-lg border border-amber-300/15 bg-amber-300/10 p-2 text-xs leading-5 text-white/58">
                          {ingredient.allergenRule}
                        </div>
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
                  {coolingSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="rounded-xl border border-lime-300/16 bg-lime-300/10 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-lime-300/30 bg-lime-300/12 text-xs font-bold text-lime-100">
                          {index + 1}
                        </div>
                        <div className="min-w-0 text-sm font-semibold text-white">
                          {step.title}
                        </div>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-white/55">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="min-w-0 rounded-2xl border border-[#C78A4A]/18 bg-[#0B1B2F]/68 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFD8A6]/70">
                  Data Protection Layer
                </div>
                <h3 className="mt-1 text-lg font-bold text-white">
                  Recipe IP protection model
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                  UI visibility is only the first layer. Real protection must be
                  enforced by server auth, database rules, tenant isolation and
                  audit logs before live customer data.
                </p>
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {securityRules.map((rule) => (
                  <div
                    key={rule}
                    className="rounded-xl border border-[#C78A4A]/16 bg-[#C78A4A]/10 p-3 text-sm leading-6 text-white/70"
                  >
                    {rule}
                  </div>
                ))}
              </div>
            </section>

            <section className="min-w-0 rounded-2xl border border-[#C78A4A]/18 bg-[#0B1B2F]/68 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFD8A6]/70">
                  Role Visibility
                </div>
                <h3 className="mt-1 text-lg font-bold text-white">
                  Sanitized access by kitchen role
                </h3>
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                {roleAccess.map((access) => (
                  <div
                    key={access.role}
                    className={cn(
                      "min-w-0 rounded-xl border p-3",
                      roleAccentStyles[access.accent]
                    )}
                  >
                    <div className="text-sm font-bold text-white">
                      {access.role}
                    </div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                      Can see
                    </div>
                    <p className="mt-1 text-xs leading-5 text-white/65">
                      {access.canSee}
                    </p>
                    <div className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                      Hidden
                    </div>
                    <p className="mt-1 text-xs leading-5 text-white/60">
                      {access.hidden}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="min-w-0 rounded-2xl border border-[#76E4FF]/12 bg-[#0B1B2F]/68 p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-5">
              <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3">
                <div className="min-w-0 rounded-xl border border-[#76E4FF]/15 bg-[#76E4FF]/10 p-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#CFF7FF]/65">
                    Testing
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/65">
                    Trial results, correction notes and retest cycle before
                    final approval.
                  </div>
                </div>

                <div className="min-w-0 rounded-xl border border-[#C78A4A]/16 bg-[#C78A4A]/10 p-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFD8A6]/70">
                    Approval
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/65">
                    Chef approval, QA gate and documentation check before
                    production readiness.
                  </div>
                </div>

                <div className="min-w-0 rounded-xl border border-lime-300/16 bg-lime-300/10 p-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-lime-100/70">
                    Release
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/65">
                    Final handoff to kitchen runtime with protected worker-facing
                    SOP instructions.
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