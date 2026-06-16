"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { useSearchParams } from "next/navigation"

const ROLE_OPTIONS = [
  { value: "owner", label: "Owner" },
  { value: "chef", label: "Chef" },
  { value: "qa", label: "QA" },
  { value: "worker", label: "Worker" },
  { value: "purchasing-manager", label: "Purchasing" },
  { value: "storekeeper", label: "Storekeeper" },
  { value: "production-manager", label: "Production" },
] as const

type RecipeStudioRole = (typeof ROLE_OPTIONS)[number]["value"]

type ProductionRuntimePathStep =
  | string
  | {
      label?: string
      name?: string
      status?: string
      note?: string
    }

type ProductionRuntimeStationTask = {
  taskId?: string
  station?: string
  workerInstructionMode?: string
  requiresSupervisorCheck?: boolean
  requiresQaGate?: boolean
}

type ProductionRuntimeQaGate = {
  coolingRequired?: boolean
  allergenCheckRequired?: boolean
  labelCheckRequired?: boolean
  batchCodeCheckRequired?: boolean
  releaseAuthority?: string
}

type ProductionRuntimeReleaseControl = {
  canReleaseWithoutQa?: boolean
  releaseStatus?: string
  releaseBlockedByDefault?: boolean
  releaseNote?: string
}

type RecipeProductionRuntime = {
  runtimePath?: ProductionRuntimePathStep[]
  stationTask?: ProductionRuntimeStationTask
  qaGate?: ProductionRuntimeQaGate
  releaseControl?: ProductionRuntimeReleaseControl
  roleRuntimeView?: unknown
}

type RecipeStudioRecipe = {
  id?: string
  recipeId?: string
  name?: string
  recipeName?: string
  title?: string
  batchCode?: string
  expiryDate?: string
  productionRuntime?: RecipeProductionRuntime
}

type RecipeStudioApiResponse = {
  patch?: string
  permissions?: Record<string, unknown>
  allowedDataLayers?: string[]
  blockedDataLayers?: string[]
  costingVisible?: boolean
  productionRuntimeContract?: {
    enabled?: boolean
    contractVersion?: string
  }
  recipes?: RecipeStudioRecipe[]
}

const DEFAULT_RUNTIME_PATH = [
  "Recipe Approved",
  "Batch Ready",
  "Station Task Ready",
  "QA Gate Pending",
  "Release Ready",
]

const HUMAN_READABLE_RUNTIME_VALUES: Record<string, string> = {
  READY: "Ready",
  PENDING_QA: "Pending QA",
  NOT_STARTED: "Not started",
  APPROVED_TASK_ONLY: "Approved task only",
  QA_OR_AUTHORIZED_MANAGER: "QA or authorized manager",
  "Controlled by tenant.recipeExpiryPolicy":
    "Controlled by tenant expiry policy",
  "tenant.recipeExpiryPolicy": "tenant expiry policy",
}

const ROLE_DESCRIPTIONS: Record<RecipeStudioRole, string> = {
  owner:
    "Governance view for recipe readiness, costing visibility, yield control, and production release confidence.",
  chef:
    "Chef view for SOP execution, testing feedback, costing coordination, and production handoff readiness.",
  qa:
    "QA view for allergen checks, cooling control, label verification, batch code checks, and release authority.",
  worker:
    "Worker-safe view showing only approved station task instructions required for production execution.",
  "purchasing-manager":
    "Purchasing view for supplier source, cost source, ingredient readiness, and recipe purchasing control.",
  storekeeper:
    "Storekeeper view for stock issue, batch handover, ingredient movement, and protected storage control.",
  "production-manager":
    "Production view for runtime readiness, station readiness, batch movement, and release blocking visibility.",
}

function isRecipeStudioRole(value: string | null): value is RecipeStudioRole {
  return ROLE_OPTIONS.some((role) => role.value === value)
}

function getActiveRole(value: string | null): RecipeStudioRole {
  if (isRecipeStudioRole(value)) return value
  return "owner"
}

function formatLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function humanizeRuntimeValue(value: string) {
  const trimmedValue = value.trim()

  if (HUMAN_READABLE_RUNTIME_VALUES[trimmedValue]) {
    return HUMAN_READABLE_RUNTIME_VALUES[trimmedValue]
  }

  const matchingRole = ROLE_OPTIONS.find((role) => role.value === trimmedValue)

  if (matchingRole) {
    return matchingRole.label
  }

  if (trimmedValue.includes("tenant.recipeExpiryPolicy")) {
    return trimmedValue.replace(
      "tenant.recipeExpiryPolicy",
      "tenant expiry policy"
    )
  }

  if (/^[A-Z0-9_]+$/.test(trimmedValue)) {
    return trimmedValue
      .split("_")
      .map((part) => {
        if (part === "QA") return "QA"
        if (part === "QC") return "QC"
        if (part === "IP") return "IP"
        if (part === "R&D") return "R&D"

        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      })
      .join(" ")
  }

  return trimmedValue
}

function formatValue(value: unknown): string {
  if (value === true) return "Yes"
  if (value === false) return "No"
  if (value === null || value === undefined || value === "") return "—"

  if (Array.isArray(value)) {
    return value.map((item) => formatValue(item)).join(", ")
  }

  if (typeof value === "string") {
    return humanizeRuntimeValue(value)
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2)
  }

  return String(value)
}

function compactTaskId(taskId?: string) {
  if (!taskId) return "—"

  const duplicateRecipeMatch = taskId.match(
    /^(recipe-[a-z0-9-]+)-\1-(\d{8})$/i
  )

  if (duplicateRecipeMatch) {
    const recipeSlug = duplicateRecipeMatch[1].replace(/^recipe-/i, "")
    const dateCode = duplicateRecipeMatch[2]

    return `${recipeSlug}-${dateCode}`
  }

  return taskId.replace(/^recipe-/i, "")
}

function getRecipeTitle(recipe: RecipeStudioRecipe, index: number) {
  return (
    recipe.name ||
    recipe.recipeName ||
    recipe.title ||
    recipe.recipeId ||
    recipe.id ||
    `Recipe ${index + 1}`
  )
}

function getRuntimePath(runtime?: RecipeProductionRuntime) {
  const runtimePath = runtime?.runtimePath

  if (!runtimePath || runtimePath.length === 0) {
    return DEFAULT_RUNTIME_PATH.map((label) => ({
      label,
      status: "Contract Step",
      note: "",
    }))
  }

  return runtimePath.map((step) => {
    if (typeof step === "string") {
      return {
        label: step,
        status: "Runtime Step",
        note: "",
      }
    }

    return {
      label: step.label || step.name || "Runtime Step",
      status: step.status || "Runtime Step",
      note: step.note || "",
    }
  })
}

function StatusPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: "neutral" | "success" | "warning" | "danger"
}) {
  const toneClass =
    tone === "success"
      ? "border-lime-400/40 bg-lime-400/10 text-lime-200"
      : tone === "warning"
        ? "border-amber-300/40 bg-amber-300/10 text-amber-100"
        : tone === "danger"
          ? "border-red-400/40 bg-red-400/10 text-red-100"
          : "border-white/15 bg-white/[0.08] text-white/75"

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneClass}`}
    >
      {children}
    </span>
  )
}

function InfoRow({
  label,
  value,
  important,
}: {
  label: string
  value: unknown
  important?: boolean
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
        {label}
      </p>
      <p
        className={`mt-2 text-sm font-semibold ${
          important ? "text-amber-100" : "text-white/85"
        }`}
      >
        {formatValue(value)}
      </p>
    </div>
  )
}

function RuntimePathView({ runtime }: { runtime?: RecipeProductionRuntime }) {
  const path = getRuntimePath(runtime)

  return (
    <section className="rounded-3xl border border-white/10 bg-[#071827]/80 p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-lime-200/80">
            Runtime Bridge
          </p>
          <h3 className="mt-1 text-xl font-bold text-white">
            Recipe-to-Production Path
          </h3>
        </div>
        <StatusPill tone="success">RS-3B.1 UI Polish</StatusPill>
      </div>

      <div className="grid gap-3 md:grid-cols-5">
        {path.map((step, index) => (
          <div
            key={`${step.label}-${index}`}
            className="relative rounded-2xl border border-white/10 bg-white/[0.045] p-4"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-lime-300/30 bg-lime-300/10 text-sm font-black text-lime-100">
              {index + 1}
            </div>
            <p className="text-sm font-bold text-white">{step.label}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
              {formatValue(step.status)}
            </p>
            {step.note ? (
              <p className="mt-2 text-xs leading-5 text-white/55">{step.note}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function StationTaskView({
  stationTask,
}: {
  stationTask?: ProductionRuntimeStationTask
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200/80">
          Station Task
        </p>
        <h3 className="mt-1 text-lg font-bold text-white">
          Approved Station Execution
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <InfoRow label="Task ID" value={compactTaskId(stationTask?.taskId)} />
        <InfoRow label="Station" value={stationTask?.station} />
        <InfoRow
          label="Worker Instruction Mode"
          value={stationTask?.workerInstructionMode}
        />
        <InfoRow
          label="Supervisor Check"
          value={stationTask?.requiresSupervisorCheck}
          important={stationTask?.requiresSupervisorCheck}
        />
        <InfoRow
          label="QA Gate Required"
          value={stationTask?.requiresQaGate}
          important={stationTask?.requiresQaGate}
        />
      </div>
    </section>
  )
}

function QaGateView({ qaGate }: { qaGate?: ProductionRuntimeQaGate }) {
  return (
    <section className="rounded-3xl border border-amber-200/15 bg-amber-200/[0.055] p-5">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-100/80">
          QA Gate
        </p>
        <h3 className="mt-1 text-lg font-bold text-white">
          Batch Safety & Release Checks
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <InfoRow
          label="Cooling Required"
          value={qaGate?.coolingRequired}
          important={qaGate?.coolingRequired}
        />
        <InfoRow
          label="Allergen Check"
          value={qaGate?.allergenCheckRequired}
          important={qaGate?.allergenCheckRequired}
        />
        <InfoRow
          label="Label Check"
          value={qaGate?.labelCheckRequired}
          important={qaGate?.labelCheckRequired}
        />
        <InfoRow
          label="Batch Code Check"
          value={qaGate?.batchCodeCheckRequired}
          important={qaGate?.batchCodeCheckRequired}
        />
        <InfoRow label="Release Authority" value={qaGate?.releaseAuthority} />
      </div>
    </section>
  )
}

function ReleaseControlView({
  releaseControl,
}: {
  releaseControl?: ProductionRuntimeReleaseControl
}) {
  const blockedByDefault = releaseControl?.releaseBlockedByDefault !== false
  const canReleaseWithoutQa = releaseControl?.canReleaseWithoutQa === true

  return (
    <section className="rounded-3xl border border-red-300/15 bg-red-300/[0.045] p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-100/80">
            Release Control
          </p>
          <h3 className="mt-1 text-lg font-bold text-white">
            Protected Production Release
          </h3>
        </div>

        <StatusPill tone={blockedByDefault ? "danger" : "warning"}>
          {blockedByDefault ? "Blocked by Default" : "Review Required"}
        </StatusPill>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <InfoRow
          label="Can Release Without QA"
          value={canReleaseWithoutQa}
          important={!canReleaseWithoutQa}
        />
        <InfoRow label="Release Status" value={releaseControl?.releaseStatus} />
        <InfoRow
          label="Release Blocked by Default"
          value={blockedByDefault}
          important={blockedByDefault}
        />
        <InfoRow label="Release Note" value={releaseControl?.releaseNote} />
      </div>
    </section>
  )
}

function RoleRuntimeView({
  roleRuntimeView,
  activeRole,
}: {
  roleRuntimeView: unknown
  activeRole: RecipeStudioRole
}) {
  const activeRoleLabel =
    ROLE_OPTIONS.find((role) => role.value === activeRole)?.label || "Role"

  if (!roleRuntimeView) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/45">
          Role Runtime View
        </p>
        <h3 className="mt-1 text-lg font-bold text-white">
          {activeRoleLabel} Runtime View
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/60">
          No dedicated roleRuntimeView was returned for this role. The runtime
          bridge is still displayed using the shared production contract.
        </p>
      </section>
    )
  }

  if (typeof roleRuntimeView === "string") {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/45">
          Role Runtime View
        </p>
        <h3 className="mt-1 text-lg font-bold text-white">
          {activeRoleLabel} Runtime View
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/70">
          {formatValue(roleRuntimeView)}
        </p>
      </section>
    )
  }

  if (Array.isArray(roleRuntimeView)) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/45">
          Role Runtime View
        </p>
        <h3 className="mt-1 text-lg font-bold text-white">
          {activeRoleLabel} Runtime View
        </h3>
        <div className="mt-4 grid gap-3">
          {roleRuntimeView.map((item, index) => (
            <div
              key={`${String(item)}-${index}`}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70"
            >
              {formatValue(item)}
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (typeof roleRuntimeView === "object") {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/45">
          Role Runtime View
        </p>
        <h3 className="mt-1 text-lg font-bold text-white">
          {activeRoleLabel} Runtime View
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {Object.entries(roleRuntimeView as Record<string, unknown>).map(
            ([key, value]) => (
              <InfoRow key={key} label={formatLabel(key)} value={value} />
            )
          )}
        </div>
      </section>
    )
  }

  return null
}

function RecipeRuntimeCard({
  recipe,
  index,
  activeRole,
}: {
  recipe: RecipeStudioRecipe
  index: number
  activeRole: RecipeStudioRole
}) {
  const productionRuntime = recipe.productionRuntime

  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#081421]/90 shadow-2xl shadow-black/25">
      <div className="border-b border-white/10 bg-white/[0.04] p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-lime-200/75">
              Approved Recipe Runtime
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
              {getRecipeTitle(recipe, index)}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusPill tone="success">Approved Recipe</StatusPill>
              <StatusPill tone="warning">QA Protected</StatusPill>
              <StatusPill>Role: {formatLabel(activeRole)}</StatusPill>
            </div>
          </div>

          <div className="grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
            <div>
              <span className="text-white/45">Batch Code: </span>
              <span className="font-bold text-white/85">
                {formatValue(recipe.batchCode)}
              </span>
            </div>
            <div>
              <span className="text-white/45">Expiry Date: </span>
              <span className="font-bold text-white/85">
                {formatValue(recipe.expiryDate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {productionRuntime ? (
        <div className="grid gap-5 p-5 md:p-6">
          <RuntimePathView runtime={productionRuntime} />

          <div className="grid gap-5 xl:grid-cols-2">
            <StationTaskView stationTask={productionRuntime.stationTask} />
            <QaGateView qaGate={productionRuntime.qaGate} />
          </div>

          <ReleaseControlView
            releaseControl={productionRuntime.releaseControl}
          />

          <RoleRuntimeView
            roleRuntimeView={productionRuntime.roleRuntimeView}
            activeRole={activeRole}
          />
        </div>
      ) : (
        <div className="p-5 md:p-6">
          <div className="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-5">
            <p className="text-sm font-bold text-amber-100">
              No productionRuntime object was returned for this recipe.
            </p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              RS-3B.1 expects the API to return recipes[n].productionRuntime from
              the RS-3A contract.
            </p>
          </div>
        </div>
      )}
    </article>
  )
}

function RecipeStudioRuntimePageContent() {
  const searchParams = useSearchParams()
  const activeRole = getActiveRole(searchParams.get("role"))

  const [data, setData] = useState<RecipeStudioApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const activeRoleLabel = useMemo(
    () => ROLE_OPTIONS.find((role) => role.value === activeRole)?.label,
    [activeRole]
  )

  useEffect(() => {
    let cancelled = false

    async function loadRecipeStudioData() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/recipe-studio?role=${encodeURIComponent(activeRole)}`,
          {
            cache: "no-store",
          }
        )

        if (!response.ok) {
          throw new Error(`Recipe Studio API failed: ${response.status}`)
        }

        const payload = (await response.json()) as RecipeStudioApiResponse

        if (!cancelled) {
          setData(payload)
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Recipe Studio API failed."
          )
          setData(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadRecipeStudioData()

    return () => {
      cancelled = true
    }
  }, [activeRole])

  const recipes = data?.recipes || []
  const runtimeContractEnabled = data?.productionRuntimeContract?.enabled === true

  return (
    <main className="min-h-screen bg-[#050B13] text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#071827] via-[#09111d] to-[#0d1b2a] p-5 shadow-2xl shadow-black/30 md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-lime-200/80">
                G7 Kitchen OS · Recipe Studio
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">
                Production Runtime Bridge
              </h1>
              <p className="mt-4 text-sm leading-7 text-white/65 md:text-base">
                RS-3B.1 keeps the RS-3A recipe-to-production contract visible
                inside Recipe Studio while making runtime labels easier to read
                for kitchen teams. The current role is read from query string
                for testing only; production permissions must come from session,
                user, and tenant permissions.
              </p>
            </div>

            <div className="grid gap-3 rounded-3xl border border-white/10 bg-black/20 p-4">
              <StatusPill tone={runtimeContractEnabled ? "success" : "danger"}>
                Runtime Contract{" "}
                {runtimeContractEnabled ? "Enabled" : "Unavailable"}
              </StatusPill>
              <div className="text-sm text-white/60">
                Contract Version:{" "}
                <span className="font-bold text-white">
                  {data?.productionRuntimeContract?.contractVersion || "—"}
                </span>
              </div>
              <div className="text-sm text-white/60">
                API Patch:{" "}
                <span className="font-bold text-white">
                  {data?.patch || "—"}
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 md:p-5">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/40">
              Testing Role
            </p>
            <h2 className="mt-1 text-xl font-black text-white">
              {activeRoleLabel} View
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              {ROLE_DESCRIPTIONS[activeRole]}
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {ROLE_OPTIONS.map((role) => {
              const active = role.value === activeRole

              return (
                <a
                  key={role.value}
                  href={`/recipe-studio?role=${role.value}`}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold transition ${
                    active
                      ? "border-lime-300/50 bg-lime-300/15 text-lime-100"
                      : "border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {role.label}
                </a>
              )
            })}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
              Costing Visible
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              {data?.costingVisible ? "Yes" : "No"}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
              Allowed Layers
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/70">
              {data?.allowedDataLayers?.length
                ? data.allowedDataLayers.join(", ")
                : "—"}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
              Blocked Layers
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/70">
              {data?.blockedDataLayers?.length
                ? data.blockedDataLayers.join(", ")
                : "—"}
            </p>
          </div>
        </section>

        {loading ? (
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-center">
            <p className="text-sm font-bold text-white/70">
              Loading Recipe Studio runtime bridge...
            </p>
          </section>
        ) : null}

        {error ? (
          <section className="rounded-[2rem] border border-red-300/20 bg-red-300/[0.06] p-6">
            <p className="text-sm font-bold text-red-100">
              Recipe Studio could not load.
            </p>
            <p className="mt-2 text-sm text-white/60">{error}</p>
          </section>
        ) : null}

        {!loading && !error && recipes.length === 0 ? (
          <section className="rounded-[2rem] border border-amber-300/20 bg-amber-300/[0.06] p-6">
            <p className="text-sm font-bold text-amber-100">
              No recipes returned from the Recipe Studio API.
            </p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              RS-3B.1 expects recipes to include productionRuntime from the RS-3A
              API contract.
            </p>
          </section>
        ) : null}

        {!loading && !error && recipes.length > 0 ? (
          <section className="grid gap-6">
            {recipes.map((recipe, index) => (
              <RecipeRuntimeCard
                key={recipe.id || recipe.recipeId || `${index}`}
                recipe={recipe}
                index={index}
                activeRole={activeRole}
              />
            ))}
          </section>
        ) : null}
      </section>
    </main>
  )
}

export default function RecipeStudioRuntimePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#050B13] p-6 text-white">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-center">
            <p className="text-sm font-bold text-white/70">
              Loading Recipe Studio...
            </p>
          </div>
        </main>
      }
    >
      <RecipeStudioRuntimePageContent />
    </Suspense>
  )
}