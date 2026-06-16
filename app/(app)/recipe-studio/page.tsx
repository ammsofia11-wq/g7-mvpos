"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

type StudioRole =
  | "owner"
  | "chef"
  | "qa"
  | "worker"
  | "purchasing-manager"
  | "storekeeper"
  | "production-manager"

type IngredientSource = {
  name: string
  sourceStatus: string
  allergens?: string[]
  rawToCookedYield?: unknown
}

type StudioPermissions = Record<string, boolean>

type StudioRecipe = {
  id: string
  title: string
  station: string
  status: string
  batchCode?: unknown
  expiryDate?: unknown
  legacyMetadata?: {
    category?: unknown
    dietaryPlan?: unknown
    cuisine?: unknown
    tags?: unknown
  }
  costing?: {
    visible: true
    currencySource: string
    totalCost: unknown
    costPerYield: unknown
    marginSignal: string
    note: string
  }
  yield?: {
    yieldSource: string
    costPerYield: unknown
    operationalNote: string
  }
  protectedAssetConfidence?: string[]
  chefSop?: string[]
  testing?: string[]
  approvalReadiness?: string[]
  ingredientSources?: IngredientSource[]
  qaGates?: string[]
  cooling?: string[]
  allergens?: string[]
  releaseControl?: string[]
  purchasingControl?: string[]
  stockControl?: string[]
  productionControl?: string[]
  approvedTask?: {
    title: string
    station: string
    comfortNote: string
    visibleInstructions: string[]
    hiddenFromWorker: string[]
  }
}

type RecipeStudioPayload = {
  patch: string
  system: string
  role: StudioRole
  roleLabel?: string
  roleSummary: string
  permissions?: StudioPermissions
  allowedDataLayers?: string[]
  blockedDataLayers?: string[]
  costingVisible: boolean
  roleSource: string
  tenantSettings: {
    currency: string
    locale: string
    country: string
    timezone: string
    units: string
  }
  security: {
    protectedRecipeDataServerSide: boolean
    protectedIngredientDataServerSide: boolean
    clientReceivesSanitizedPayload: boolean
    directClientImportOfProtectedAssets: boolean
    centralizedPermissionContract?: boolean
    permissionContractSource?: string
    costingAllowedRoles?: string[]
    costingBlockedRoles?: string[]
  }
  recipes: StudioRecipe[]
}

const ROLE_OPTIONS: {
  id: StudioRole
  label: string
  subtitle: string
}[] = [
  {
    id: "owner",
    label: "Owner",
    subtitle: "Cost · Yield · Margin · Governance",
  },
  {
    id: "chef",
    label: "Chef",
    subtitle: "SOP · Testing · Cost · Purchasing",
  },
  {
    id: "qa",
    label: "QA",
    subtitle: "Cooling · Allergens · Release",
  },
  {
    id: "worker",
    label: "Worker",
    subtitle: "Approved task only",
  },
  {
    id: "purchasing-manager",
    label: "Purchasing",
    subtitle: "Supplier · Cost source · Stock need",
  },
  {
    id: "storekeeper",
    label: "Storekeeper",
    subtitle: "Stock issue · Batch handover",
  },
  {
    id: "production-manager",
    label: "Production",
    subtitle: "Runtime link · Station readiness",
  },
]

function normalizeRole(value: string | null): StudioRole {
  if (
    value === "chef" ||
    value === "qa" ||
    value === "worker" ||
    value === "purchasing-manager" ||
    value === "storekeeper" ||
    value === "production-manager"
  ) {
    return value
  }

  return "owner"
}

function stringifyValue(value: unknown) {
  if (value === undefined || value === null || value === "") return "—"

  if (typeof value === "string" || typeof value === "number") {
    return String(value)
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No"
  }

  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function CompactValue({ value }: { value: unknown }) {
  const text = stringifyValue(value)

  return (
    <span className="break-words text-sm font-semibold text-slate-100">
      {text}
    </span>
  )
}

function InfoList({
  title,
  items,
  tone = "blue",
}: {
  title: string
  items?: string[]
  tone?: "blue" | "green" | "amber" | "red"
}) {
  const safeItems = items?.filter(Boolean) ?? []

  if (!safeItems.length) return null

  const toneClass =
    tone === "green"
      ? "border-lime-300/40 bg-lime-300/10 text-lime-50"
      : tone === "amber"
        ? "border-amber-300/40 bg-amber-300/10 text-amber-50"
        : tone === "red"
          ? "border-red-300/40 bg-red-300/10 text-red-50"
          : "border-sky-300/40 bg-sky-300/10 text-sky-50"

  return (
    <section className={`rounded-2xl border p-4 ${toneClass}`}>
      <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em]">
        {title}
      </h3>

      <div className="space-y-2">
        {safeItems.map((item, index) => (
          <div
            key={`${title}-${index}-${item}`}
            className="rounded-xl bg-white/8 px-3 py-2 text-sm leading-relaxed"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

function MetricBox({
  label,
  value,
}: {
  label: string
  value: unknown
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <CompactValue value={value} />
    </div>
  )
}

function PermissionLayerPanel({
  allowed,
  blocked,
}: {
  allowed?: string[]
  blocked?: string[]
}) {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-lime-300/30 bg-lime-300/10 p-4">
        <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-lime-50">
          Allowed Data Layers
        </h3>

        <div className="flex flex-wrap gap-2">
          {(allowed ?? []).map((item) => (
            <span
              key={`allowed-${item}`}
              className="rounded-full border border-lime-200/25 bg-lime-950/25 px-3 py-1 text-xs font-bold text-lime-50"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-red-300/25 bg-red-300/10 p-4">
        <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-red-50">
          Blocked Data Layers
        </h3>

        <div className="flex flex-wrap gap-2">
          {(blocked ?? []).map((item) => (
            <span
              key={`blocked-${item}`}
              className="rounded-full border border-red-200/25 bg-red-950/25 px-3 py-1 text-xs font-bold text-red-50"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function CostingPanel({
  recipe,
  mode,
}: {
  recipe: StudioRecipe
  mode: "owner" | "chef" | "purchasing"
}) {
  const title =
    mode === "owner"
      ? "Owner Costing Layer"
      : mode === "chef"
        ? "Chef Costing Layer"
        : "Purchasing Cost Source"

  return (
    <section className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4">
      <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-amber-100">
        {title}
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <MetricBox
          label="Currency source"
          value={recipe.costing?.currencySource}
        />
        <MetricBox label="Total cost" value={recipe.costing?.totalCost} />
        <MetricBox
          label="Cost per yield"
          value={recipe.costing?.costPerYield}
        />
        <MetricBox label="Yield source" value={recipe.yield?.yieldSource} />
      </div>

      <p className="mt-4 rounded-xl bg-black/20 p-3 text-sm leading-relaxed text-amber-50">
        {recipe.costing?.marginSignal}
      </p>

      <p className="mt-3 rounded-xl bg-black/20 p-3 text-sm leading-relaxed text-amber-50">
        {recipe.costing?.note}
      </p>
    </section>
  )
}

function IngredientSourcePanel({ recipe }: { recipe: StudioRecipe }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-200">
        Ingredient Source
      </h3>

      <div className="space-y-3">
        {(recipe.ingredientSources ?? []).map((source) => (
          <div
            key={`${recipe.id}-${source.name}`}
            className="rounded-xl border border-white/10 bg-slate-950/35 p-3"
          >
            <p className="font-bold text-white">{source.name}</p>
            <p className="mt-1 text-xs text-slate-300">
              {source.sourceStatus}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Yield: {stringifyValue(source.rawToCookedYield)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function OwnerRecipeView({ recipe }: { recipe: StudioRecipe }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <CostingPanel recipe={recipe} mode="owner" />

      <InfoList
        title="Protected Asset Confidence"
        items={recipe.protectedAssetConfidence}
        tone="green"
      />
    </div>
  )
}

function ChefRecipeView({ recipe }: { recipe: StudioRecipe }) {
  return (
    <div className="space-y-4">
      <CostingPanel recipe={recipe} mode="chef" />

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <InfoList title="Recipe SOP" items={recipe.chefSop} tone="blue" />
          <InfoList title="Testing Notes" items={recipe.testing} tone="amber" />
          <InfoList
            title="Approval Readiness"
            items={recipe.approvalReadiness}
            tone="green"
          />
        </div>

        <IngredientSourcePanel recipe={recipe} />
      </div>
    </div>
  )
}

function QaRecipeView({ recipe }: { recipe: StudioRecipe }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <InfoList title="Cooling Control" items={recipe.cooling} tone="blue" />
      <InfoList title="QC Gates" items={recipe.qaGates} tone="amber" />
      <InfoList
        title="Release Control"
        items={recipe.releaseControl}
        tone="green"
      />

      <section className="rounded-2xl border border-red-300/30 bg-red-300/10 p-4 lg:col-span-3">
        <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-red-50">
          Allergen Visibility
        </h3>

        {recipe.allergens?.length ? (
          <div className="flex flex-wrap gap-2">
            {recipe.allergens.map((allergen) => (
              <span
                key={`${recipe.id}-${allergen}`}
                className="rounded-full border border-red-200/30 bg-red-950/30 px-3 py-1 text-xs font-bold text-red-50"
              >
                {allergen}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-red-50">
            No allergen flags returned in the sanitized QA payload.
          </p>
        )}
      </section>
    </div>
  )
}

function WorkerRecipeView({ recipe }: { recipe: StudioRecipe }) {
  return (
    <section className="rounded-[2rem] border border-lime-300/30 bg-lime-300/10 p-5">
      <div className="mb-4 rounded-2xl bg-slate-950/40 p-4">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-200">
          Approved Station Task
        </p>
        <h3 className="mt-2 text-2xl font-black text-white">
          {recipe.approvedTask?.title ?? recipe.title}
        </h3>
        <p className="mt-1 text-sm text-lime-50">
          Station: {recipe.approvedTask?.station ?? recipe.station}
        </p>
      </div>

      <p className="mb-4 rounded-2xl border border-lime-200/20 bg-lime-950/20 p-4 text-base leading-relaxed text-lime-50">
        {recipe.approvedTask?.comfortNote}
      </p>

      <div className="space-y-3">
        {(recipe.approvedTask?.visibleInstructions ?? []).map((step, index) => (
          <div
            key={`${recipe.id}-worker-step-${index}`}
            className="flex gap-3 rounded-2xl bg-white/10 p-4 text-white"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime-300 text-sm font-black text-slate-950">
              {index + 1}
            </div>
            <p className="text-base font-semibold leading-relaxed">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-300">
          Hidden from worker
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(recipe.approvedTask?.hiddenFromWorker ?? []).map((item) => (
            <span
              key={`${recipe.id}-${item}`}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function PurchasingRecipeView({ recipe }: { recipe: StudioRecipe }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
      <div className="space-y-4">
        <CostingPanel recipe={recipe} mode="purchasing" />
        <InfoList
          title="Purchasing Control"
          items={recipe.purchasingControl}
          tone="amber"
        />
      </div>

      <IngredientSourcePanel recipe={recipe} />
    </div>
  )
}

function StorekeeperRecipeView({ recipe }: { recipe: StudioRecipe }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
      <InfoList
        title="Stock Control"
        items={recipe.stockControl}
        tone="green"
      />

      <IngredientSourcePanel recipe={recipe} />
    </div>
  )
}

function ProductionManagerRecipeView({ recipe }: { recipe: StudioRecipe }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <InfoList
        title="Production Control"
        items={recipe.productionControl}
        tone="blue"
      />

      <section className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
        <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-200">
          Runtime Readiness
        </h3>

        <div className="space-y-3">
          <MetricBox label="Batch code" value={recipe.batchCode} />
          <MetricBox label="Station" value={recipe.station} />
          <MetricBox label="Status" value={recipe.status} />
        </div>
      </section>

      <IngredientSourcePanel recipe={recipe} />
    </div>
  )
}

function RecipeRoleView({
  role,
  recipe,
}: {
  role: StudioRole
  recipe: StudioRecipe
}) {
  if (role === "worker") return <WorkerRecipeView recipe={recipe} />
  if (role === "chef") return <ChefRecipeView recipe={recipe} />
  if (role === "qa") return <QaRecipeView recipe={recipe} />
  if (role === "purchasing-manager") {
    return <PurchasingRecipeView recipe={recipe} />
  }
  if (role === "storekeeper") {
    return <StorekeeperRecipeView recipe={recipe} />
  }
  if (role === "production-manager") {
    return <ProductionManagerRecipeView recipe={recipe} />
  }

  return <OwnerRecipeView recipe={recipe} />
}

function RecipeCard({
  role,
  recipe,
}: {
  role: StudioRole
  recipe: StudioRecipe
}) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 shadow-2xl shadow-slate-950/30">
      <div className="border-b border-white/10 bg-white/[0.06] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-200">
              {recipe.station}
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
              {recipe.title}
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Recipe ID: {recipe.id}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1 text-xs font-black text-lime-100">
              {recipe.status}
            </span>
            <span className="rounded-full border border-sky-300/30 bg-sky-300/10 px-3 py-1 text-xs font-black text-sky-100">
              {role.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricBox label="Batch code" value={recipe.batchCode} />
          <MetricBox label="Expiry" value={recipe.expiryDate} />
          <MetricBox
            label="Legacy category"
            value={recipe.legacyMetadata?.category}
          />
          <MetricBox
            label="Legacy plan metadata"
            value={recipe.legacyMetadata?.dietaryPlan}
          />
        </div>
      </div>

      <div className="p-5">
        <RecipeRoleView role={role} recipe={recipe} />
      </div>
    </article>
  )
}

export default function RecipeStudioPage() {
  const [activeRole, setActiveRole] = useState<StudioRole>("owner")
  const [payload, setPayload] = useState<RecipeStudioPayload | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const activeRoleOption = useMemo(() => {
    return ROLE_OPTIONS.find((role) => role.id === activeRole) ?? ROLE_OPTIONS[0]
  }, [activeRole])

  const loadRole = useCallback(async (nextRole: StudioRole) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/recipe-studio?role=${nextRole}`, {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`Recipe Studio API failed: ${response.status}`)
      }

      const data = (await response.json()) as RecipeStudioPayload

      setPayload(data)
      setActiveRole(data.role)

      const params = new URLSearchParams(window.location.search)
      params.set("role", data.role)

      window.history.replaceState(null, "", `?${params.toString()}`)
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Recipe Studio failed to load.",
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const roleFromUrl = normalizeRole(params.get("role"))

    void loadRole(roleFromUrl)
  }, [loadRole])

  return (
    <main className="min-h-full overflow-x-hidden bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 shadow-2xl shadow-slate-950/30">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-lime-300/10 blur-3xl" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-200">
                RS-2E · Expanded Role Views
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                G7 Recipe Studio
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
                Server-safe recipe interface for central kitchen operations.
                Owner, Chef, QA, Worker, Purchasing, Storekeeper and Production
                roles now receive dedicated operational views from the same
                permission contract.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
                Active View
              </p>

              <h2 className="mt-2 text-2xl font-black text-white">
                {activeRoleOption.label}
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                {activeRoleOption.subtitle}
              </p>

              <div className="mt-4 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-3 text-sm leading-relaxed text-amber-50">
                Role is currently read from query string for testing only.
                Production must use session / user / tenant permissions.
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {ROLE_OPTIONS.map((role) => {
            const isActive = role.id === activeRole

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => void loadRole(role.id)}
                className={`rounded-3xl border p-4 text-left transition ${
                  isActive
                    ? "border-sky-300/50 bg-sky-300/15 shadow-lg shadow-sky-950/30"
                    : "border-white/10 bg-white/[0.05] hover:border-white/25 hover:bg-white/[0.08]"
                }`}
              >
                <p className="text-base font-black text-white">{role.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {role.subtitle}
                </p>
              </button>
            )
          })}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Role Summary
            </p>
            <p className="mt-2 text-base font-semibold leading-relaxed text-white">
              {payload?.roleSummary ?? "Loading role summary..."}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Costing Visible
            </p>
            <p
              className={`mt-2 text-2xl font-black ${
                payload?.costingVisible ? "text-amber-200" : "text-lime-200"
              }`}
            >
              {payload?.costingVisible ? "Yes" : "No"}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Tenant Settings
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {payload &&
                Object.entries(payload.tenantSettings).map(([key, value]) => (
                  <span
                    key={key}
                    className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs font-bold text-slate-200"
                  >
                    {key}: {value}
                  </span>
                ))}
            </div>
          </div>
        </section>

        {payload && (
          <PermissionLayerPanel
            allowed={payload.allowedDataLayers}
            blocked={payload.blockedDataLayers}
          />
        )}

        {error && (
          <section className="rounded-3xl border border-red-300/30 bg-red-300/10 p-5 text-red-50">
            <p className="font-black">Recipe Studio error</p>
            <p className="mt-2 text-sm">{error}</p>
          </section>
        )}

        {isLoading && (
          <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center">
            <p className="text-lg font-black text-white">
              Loading sanitized Recipe Studio payload...
            </p>
          </section>
        )}

        {!isLoading && payload && (
          <section className="space-y-5">
            {payload.recipes.map((recipe) => (
              <RecipeCard
                key={`${payload.role}-${recipe.id}`}
                role={payload.role}
                recipe={recipe}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  )
}