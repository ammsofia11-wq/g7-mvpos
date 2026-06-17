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

type RuntimeTone = "neutral" | "success" | "warning" | "danger"

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

type RuntimeReadinessSummary = {
  productionReadiness: string
  station: string
  release: string
  workerTask: string
  risk: string
  note: string
  tone: RuntimeTone
}

type RuntimeDecisionGuidance = {
  title: string
  nextAction: string
  supportingActions: string[]
  doNotAction: string
  escalation: string
  tone: RuntimeTone
}

type RuntimeExceptionFlag = {
  label: string
  detail: string
  tone: RuntimeTone
}

type RuntimeExceptionResolution = {
  label: string
  owner: string
  runtimeImpact: string
  requiredDecision: string
  safeNextAction: string
  doNotAction: string
  releaseEffect: string
  workerTaskEffect: string
  qaEffect: string
  chefApprovalEffect: string
  tone: RuntimeTone
}

type RuntimeHandoffSummary = {
  runtimeReady: string
  qaReady: string
  workerTaskReady: string
  releaseReady: string
  blockedBy: string
  nextOwner: string
  nextHandoffAction: string
  note: string
  tone: RuntimeTone
}

type RuntimeWorkPacket = {
  roleLabel: string
  packetTitle: string
  primaryFocus: string
  whatToKnow: string
  myActions: string[]
  doNot: string[]
  escalation: string
  handoffTo: string
  visibleData: string[]
  protectedData: string[]
  tone: RuntimeTone
}

type DecisionCenterTab =
  | "handoff"
  | "flags"
  | "resolution"
  | "guidance"
  | "details"

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

function getRoleLabel(roleValue: RecipeStudioRole) {
  return ROLE_OPTIONS.find((role) => role.value === roleValue)?.label || "Role"
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

function getRecipeAnchorId(recipe: RecipeStudioRecipe, index: number) {
  const rawId =
    recipe.id ||
    recipe.recipeId ||
    recipe.name ||
    recipe.recipeName ||
    recipe.title ||
    `recipe-${index + 1}`

  const safeId = rawId
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return `recipe-runtime-${safeId || index + 1}`
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

function getRuntimeReadinessSummary(
  runtime?: RecipeProductionRuntime
): RuntimeReadinessSummary {
  if (!runtime) {
    return {
      productionReadiness: "Runtime missing",
      station: "—",
      release: "Cannot evaluate release",
      workerTask: "No task generated",
      risk: "Needs review",
      note: "No production runtime contract was returned for this recipe.",
      tone: "danger",
    }
  }

  const stationTask = runtime.stationTask
  const qaGate = runtime.qaGate
  const releaseControl = runtime.releaseControl

  const releaseStatus = formatValue(releaseControl?.releaseStatus)
  const station = formatValue(stationTask?.station)
  const hasWorkerTask = Boolean(stationTask?.taskId)
  const requiresQaGate =
    stationTask?.requiresQaGate === true ||
    qaGate?.coolingRequired === true ||
    qaGate?.allergenCheckRequired === true ||
    qaGate?.labelCheckRequired === true ||
    qaGate?.batchCodeCheckRequired === true

  const blockedByDefault = releaseControl?.releaseBlockedByDefault !== false
  const canReleaseWithoutQa = releaseControl?.canReleaseWithoutQa === true
  const releaseLooksApproved =
    releaseStatus.toLowerCase().includes("approved") ||
    releaseStatus.toLowerCase().includes("released")

  if (blockedByDefault && requiresQaGate) {
    return {
      productionReadiness: "QA pending",
      station,
      release: "Blocked until QA / authorized manager",
      workerTask: hasWorkerTask ? "Ready" : "Needs task",
      risk: "Controlled",
      note: "Recipe can prepare production runtime, but final release is protected by QA and authorized manager control.",
      tone: "warning",
    }
  }

  if (releaseLooksApproved && !blockedByDefault) {
    return {
      productionReadiness: "Ready for release",
      station,
      release: "Release available",
      workerTask: hasWorkerTask ? "Ready" : "Needs task",
      risk: "Low",
      note: "Runtime path is clear and release control is not blocking this recipe.",
      tone: "success",
    }
  }

  if (canReleaseWithoutQa) {
    return {
      productionReadiness: "Manager review required",
      station,
      release: "Release allowed by control setting",
      workerTask: hasWorkerTask ? "Ready" : "Needs task",
      risk: "Review",
      note: "This recipe can move forward only if the authorized role confirms production readiness.",
      tone: "warning",
    }
  }

  return {
    productionReadiness: releaseStatus === "—" ? "Review required" : releaseStatus,
    station,
    release: blockedByDefault ? "Blocked by default" : "Release review required",
    workerTask: hasWorkerTask ? "Ready" : "Needs task",
    risk: blockedByDefault ? "Controlled" : "Review",
    note:
      releaseControl?.releaseNote ||
      "Runtime bridge is active, but production release still needs operational review.",
    tone: blockedByDefault ? "warning" : "neutral",
  }
}

function getRuntimeExceptionFlags({
  activeRole,
  runtime,
  costingVisible,
}: {
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
  costingVisible: boolean
}): RuntimeExceptionFlag[] {
  if (!runtime) {
    return [
      {
        label: "Runtime Missing",
        detail: "No production runtime contract was returned.",
        tone: "danger",
      },
    ]
  }

  const summary = getRuntimeReadinessSummary(runtime)
  const flags: RuntimeExceptionFlag[] = []

  const qaPending = summary.productionReadiness.toLowerCase().includes("qa")
  const releaseBlocked = summary.release.toLowerCase().includes("blocked")
  const hasStationTask = Boolean(runtime.stationTask?.taskId)
  const instructionMode = formatValue(runtime.stationTask?.workerInstructionMode)
  const releaseBlockedByDefault =
    runtime.releaseControl?.releaseBlockedByDefault !== false

  if (qaPending) {
    flags.push({
      label: "QA Gate Pending",
      detail: "Final release is waiting for QA or authorized manager control.",
      tone: "warning",
    })
  }

  if (releaseBlocked) {
    flags.push({
      label: "Release Blocked",
      detail: "Batch cannot be released until the runtime gate is cleared.",
      tone: "danger",
    })
  }

  if (hasStationTask) {
    flags.push({
      label: "Station Task Ready",
      detail: `Task is available for ${formatValue(runtime.stationTask?.station)}.`,
      tone: "success",
    })
  }

  if (instructionMode.toLowerCase().includes("approved task")) {
    flags.push({
      label: "Worker Task Protected",
      detail: "Worker view is limited to approved station execution.",
      tone: "success",
    })
  }

  if (!costingVisible) {
    flags.push({
      label: "Costing Hidden For Role",
      detail: `${getRoleLabel(activeRole)} cannot view costing data in this view.`,
      tone: "neutral",
    })
  }

  if (releaseBlockedByDefault) {
    flags.push({
      label: "Release Blocked By Default",
      detail: "Tenant release policy protects the batch until approval.",
      tone: "warning",
    })
  }

  if (flags.length === 0) {
    flags.push({
      label: "No Runtime Exceptions",
      detail: "No active blockers are visible from this runtime state.",
      tone: "success",
    })
  }

  return flags
}

function getRoleDecisionGuidance(
  activeRole: RecipeStudioRole,
  runtime?: RecipeProductionRuntime
): RuntimeDecisionGuidance {
  const summary = getRuntimeReadinessSummary(runtime)
  const qaPending = summary.productionReadiness.toLowerCase().includes("qa")
  const releaseBlocked = summary.release.toLowerCase().includes("blocked")
  const hasWorkerTask = summary.workerTask.toLowerCase() === "ready"

  if (!runtime) {
    return {
      title: "Runtime contract missing",
      nextAction:
        "Stop release planning until the recipe runtime contract is available.",
      supportingActions: [
        "Ask the responsible manager to verify Recipe Studio API output.",
        "Do not create production tasks manually from protected recipe data.",
        "Keep the recipe outside active production scheduling.",
      ],
      doNotAction:
        "Do not release or assign production work without a runtime contract.",
      escalation:
        "Escalate to Owner or Chef if the runtime contract remains missing.",
      tone: "danger",
    }
  }

  const sharedQaBlockAction = qaPending
    ? "Final release must stay blocked until QA or an authorized manager clears the gate."
    : "Confirm final release authority before moving the batch forward."

  switch (activeRole) {
    case "owner":
      return {
        title: "Owner decision guidance",
        nextAction: releaseBlocked
          ? "Keep release governance active and verify that QA control is not bypassed."
          : "Review release readiness and confirm the recipe can move through production governance.",
        supportingActions: [
          "Check that station readiness, QA dependency, and release control are aligned.",
          "Use costing visibility only for business governance, not worker-facing execution.",
          "Confirm that tenant policy controls remain respected before production release.",
        ],
        doNotAction: "Do not allow final release if QA dependency is still pending.",
        escalation:
          "Escalate to Chef, QA, or Production Manager if readiness and release status disagree.",
        tone: summary.tone,
      }

    case "chef":
      return {
        title: "Chef decision guidance",
        nextAction: hasWorkerTask
          ? "Confirm the approved station task is operationally correct before production handoff."
          : "Prepare or review the station task before production starts.",
        supportingActions: [
          "Check SOP readiness and make sure worker-facing instructions are clear.",
          "Coordinate with Purchasing if ingredient source or production quantity affects execution.",
          sharedQaBlockAction,
        ],
        doNotAction:
          "Do not expose full recipe IP or R&D notes to worker-facing execution screens.",
        escalation:
          "Escalate to QA if the batch cannot pass cooling, allergen, label, or batch code checks.",
        tone: summary.tone,
      }

    case "qa":
      return {
        title: "QA decision guidance",
        nextAction:
          "Verify cooling, allergen, label, and batch code checks before any release decision.",
        supportingActions: [
          "Keep the release blocked while QA checks are incomplete.",
          "Confirm the release authority matches QA or authorized manager control.",
          "Record any blocker before the batch moves to packaging or dispatch.",
        ],
        doNotAction:
          "Do not approve release if any QA gate is incomplete or uncertain.",
        escalation:
          "Escalate to Chef or Production Manager if production pressure attempts to bypass QA.",
        tone: qaPending ? "warning" : summary.tone,
      }

    case "worker":
      return {
        title: "Worker decision guidance",
        nextAction:
          "Follow only the approved station task shown for this recipe and station.",
        supportingActions: [
          "Use the worker instruction mode exactly as provided.",
          "Ask the supervisor before changing method, quantity, timing, or station flow.",
          "Wait for QA or supervisor clearance where the task requires it.",
        ],
        doNotAction:
          "Do not use costing, R&D notes, or full recipe IP to make production decisions.",
        escalation:
          "Escalate to the supervisor if the task is unclear, blocked, or different from the station setup.",
        tone: hasWorkerTask ? "success" : "warning",
      }

    case "purchasing-manager":
      return {
        title: "Purchasing decision guidance",
        nextAction:
          "Confirm ingredient source, cost source, and supply readiness for production demand.",
        supportingActions: [
          "Check whether the recipe needs supplier confirmation before batch planning.",
          "Coordinate with Chef if ingredient substitution affects SOP or yield.",
          "Coordinate with Storekeeper if stock issue or handover is not ready.",
        ],
        doNotAction:
          "Do not approve operational release; release remains under QA or authorized manager control.",
        escalation:
          "Escalate shortage, supplier delay, or cost-source conflict before production starts.",
        tone: summary.tone,
      }

    case "storekeeper":
      return {
        title: "Storekeeper decision guidance",
        nextAction:
          "Confirm stock issue to production and prepare the batch handover path.",
        supportingActions: [
          "Check ingredient need, stock link, and issue-to-production readiness.",
          "Confirm batch handover state before the station starts execution.",
          "Escalate stock shortage or missing batch identity immediately.",
        ],
        doNotAction:
          "Do not release QA gate, view costing, or expose protected recipe IP.",
        escalation:
          "Escalate to Purchasing Manager or Production Manager if stock issue cannot be completed.",
        tone: summary.tone,
      }

    case "production-manager":
      return {
        title: "Production decision guidance",
        nextAction:
          "Coordinate station readiness and keep release blocked until QA or authorized manager approval.",
        supportingActions: [
          "Confirm the station can execute the approved task now.",
          "Track QA dependency before moving the batch to final release.",
          "Escalate if QA gate remains pending while production capacity is waiting.",
        ],
        doNotAction: "Do not bypass QA gate or release blocked batches.",
        escalation:
          "Escalate to QA, Chef, or Owner if station readiness and release control conflict.",
        tone: qaPending || releaseBlocked ? "warning" : summary.tone,
      }

    default:
      return {
        title: "Runtime decision guidance",
        nextAction:
          "Review recipe runtime readiness before taking any production action.",
        supportingActions: [
          "Check station assignment.",
          "Check worker task readiness.",
          "Check QA and release control.",
        ],
        doNotAction: "Do not move the recipe outside its permitted runtime path.",
        escalation: "Escalate blocked runtime states to the responsible manager.",
        tone: summary.tone,
      }
  }
}

function getToneClasses(tone: RuntimeTone) {
  if (tone === "success") {
    return "border-lime-400/40 bg-lime-400/10 text-lime-200"
  }

  if (tone === "warning") {
    return "border-amber-300/40 bg-amber-300/10 text-amber-100"
  }

  if (tone === "danger") {
    return "border-red-400/40 bg-red-400/10 text-red-100"
  }

  return "border-white/15 bg-white/[0.08] text-white/75"
}

function StatusPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: RuntimeTone
}) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getToneClasses(
        tone
      )}`}
    >
      {children}
    </span>
  )
}

function ExceptionFlagChip({ flag }: { flag: RuntimeExceptionFlag }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${getToneClasses(flag.tone)}`}
    >
      <p className="text-xs font-black uppercase tracking-[0.16em]">
        {flag.label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 opacity-85">
        {flag.detail}
      </p>
    </div>
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

function RuntimeSummaryItem({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: RuntimeTone
}) {
  const valueClass =
    tone === "success"
      ? "text-lime-100"
      : tone === "warning"
        ? "text-amber-100"
        : tone === "danger"
          ? "text-red-100"
          : "text-white/85"

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
        {label}
      </p>
      <p className={`mt-2 text-sm font-black ${valueClass}`}>{value}</p>
    </div>
  )
}

function RuntimeExceptionFlagsView({
  activeRole,
  runtime,
  costingVisible,
}: {
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
  costingVisible: boolean
}) {
  const flags = getRuntimeExceptionFlags({
    activeRole,
    runtime,
    costingVisible,
  })

  const dangerCount = flags.filter((flag) => flag.tone === "danger").length
  const warningCount = flags.filter((flag) => flag.tone === "warning").length

  return (
    <section className="rounded-3xl border border-orange-200/15 bg-orange-200/[0.04] p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-100/75">
            RS-3F Exception Flags
          </p>
          <h3 className="mt-1 text-lg font-bold text-white">
            Runtime blockers and protected signals
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            Fast flags showing QA dependency, release blocking, station task
            readiness, worker protection, and role-limited costing visibility.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatusPill tone={dangerCount > 0 ? "danger" : "neutral"}>
            Critical Flags: {dangerCount}
          </StatusPill>
          <StatusPill tone={warningCount > 0 ? "warning" : "neutral"}>
            Warnings: {warningCount}
          </StatusPill>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {flags.map((flag) => (
          <ExceptionFlagChip key={`${flag.label}-${flag.detail}`} flag={flag} />
        ))}
      </div>
    </section>
  )
}


function getRuntimeExceptionResolution({
  flag,
  activeRole,
  runtime,
}: {
  flag: RuntimeExceptionFlag
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
}): RuntimeExceptionResolution {
  const roleLabel = getRoleLabel(activeRole)
  const station = formatValue(runtime?.stationTask?.station)

  switch (flag.label) {
    case "Runtime Missing":
      return {
        label: flag.label,
        owner: "Owner / Chef / Engineering",
        runtimeImpact:
          "Recipe Studio cannot connect this recipe to production runtime until the contract is returned by the API.",
        requiredDecision:
          "Stop release planning and verify why productionRuntime is missing from the sanitized recipe payload.",
        safeNextAction:
          "Keep the recipe outside active production scheduling until the runtime contract is restored.",
        doNotAction:
          "Do not create station tasks manually from protected recipe data.",
        releaseEffect: "Release blocked",
        workerTaskEffect: "Worker task unavailable",
        qaEffect: "QA cannot evaluate runtime gate",
        chefApprovalEffect: "Chef review required",
        tone: "danger",
      }

    case "QA Gate Pending":
      return {
        label: flag.label,
        owner: "QA / Head Chef",
        runtimeImpact:
          "The recipe can prepare production runtime, but final release is waiting for QA or authorized manager control.",
        requiredDecision:
          "QA must approve, hold, reject, or escalate the gate before production release.",
        safeNextAction:
          "Keep the batch under QA hold and complete cooling, allergen, label, and batch code checks.",
        doNotAction:
          "Do not release to packaging, dispatch, or customer-facing flow before QA clearance.",
        releaseEffect: "Blocks release",
        workerTaskEffect: "Worker task may stay prepared but not finally released",
        qaEffect: "QA action required",
        chefApprovalEffect: "Chef supports QA if SOP or batch evidence is unclear",
        tone: "warning",
      }

    case "Release Blocked":
      return {
        label: flag.label,
        owner: "Head Chef / Production Manager",
        runtimeImpact:
          "The batch cannot move into final production release until the blocking condition is cleared.",
        requiredDecision:
          "Confirm whether the block is caused by QA, release policy, station readiness, or missing authority.",
        safeNextAction:
          "Hold release and route the decision to the authorized role shown in the runtime contract.",
        doNotAction:
          "Do not bypass release control or manually push the recipe into live execution.",
        releaseEffect: "Blocks release",
        workerTaskEffect: "Worker execution must remain supervisor-controlled",
        qaEffect: "QA check may be required before release",
        chefApprovalEffect: "Chef or production authority must confirm clearance",
        tone: "danger",
      }

    case "Station Task Ready":
      return {
        label: flag.label,
        owner: "Station Lead / Production Manager",
        runtimeImpact:
          `The recipe has enough runtime structure to become an approved station task${station !== "—" ? ` for ${station}` : ""}.`,
        requiredDecision:
          "Confirm station owner, worker assignment, batch timing, and handoff point.",
        safeNextAction:
          "Prepare the station task and keep execution aligned with QA and release control.",
        doNotAction:
          "Do not start execution if QA or release control is still blocking runtime.",
        releaseEffect: "Does not release by itself",
        workerTaskEffect: "Task guidance available",
        qaEffect: "QA dependency still applies if required",
        chefApprovalEffect: "Chef confirms SOP accuracy when needed",
        tone: "success",
      }

    case "Worker Task Protected":
      return {
        label: flag.label,
        owner: "Sous Chef / Station Lead",
        runtimeImpact:
          "Worker view is limited to approved station execution and cannot alter recipe, costing, QA, or release data.",
        requiredDecision:
          "Authorized role must assign, adjust, approve, or release the task.",
        safeNextAction:
          "Show worker-safe SOP, station steps, safety notes, and task status only.",
        doNotAction:
          "Do not expose editing, costing, approval, or release controls to worker roles.",
        releaseEffect: "No release authority",
        workerTaskEffect: "Worker-safe execution only",
        qaEffect: "QA gates remain protected",
        chefApprovalEffect: "Chef or supervisor controls changes",
        tone: "success",
      }

    case "Costing Hidden For Role":
      return {
        label: flag.label,
        owner: "Owner / Finance / Admin",
        runtimeImpact:
          `${roleLabel} can continue operational review without seeing protected costing data.`,
        requiredDecision:
          "No runtime action is needed unless cost approval is required for this recipe release.",
        safeNextAction:
          "Continue with role-safe operational information only.",
        doNotAction:
          "Do not reveal ingredient cost, margin, supplier cost, or protected financial data.",
        releaseEffect: "Release unaffected unless cost approval is required",
        workerTaskEffect: "Worker task unaffected",
        qaEffect: "QA unaffected",
        chefApprovalEffect: "Chef sees only what the role allows",
        tone: "neutral",
      }

    case "Release Blocked By Default":
      return {
        label: flag.label,
        owner: "Owner / Head Chef",
        runtimeImpact:
          "Tenant release policy protects the recipe by default until an authorized release decision is made.",
        requiredDecision:
          "Confirm the recipe is approved for the tenant, station, batch window, QA rule set, and release authority.",
        safeNextAction:
          "Keep default protection active until the authorized role clears the release path.",
        doNotAction:
          "Do not treat the default blocked state as an error or auto-release it in the UI.",
        releaseEffect: "Blocks release by default",
        workerTaskEffect: "Worker task can remain prepared but protected",
        qaEffect: "QA or authority clearance required",
        chefApprovalEffect: "Chef approval required when policy requires it",
        tone: "warning",
      }

    case "No Runtime Exceptions":
      return {
        label: flag.label,
        owner: "Production Manager / Responsible Role",
        runtimeImpact:
          "No active blocker is visible from the current runtime state.",
        requiredDecision:
          "Continue normal readiness monitoring and confirm final authority before release.",
        safeNextAction:
          "Proceed with the visible runtime path while respecting tenant permissions and QA policy.",
        doNotAction:
          "Do not assume UI visibility equals final production authorization.",
        releaseEffect: "No visible release blocker",
        workerTaskEffect: "Follow assigned task state",
        qaEffect: "Follow tenant QA policy",
        chefApprovalEffect: "Chef approval follows role policy",
        tone: "success",
      }

    default:
      return {
        label: flag.label,
        owner: "Responsible Runtime Role",
        runtimeImpact: flag.detail,
        requiredDecision:
          "Review this runtime signal and route it to the responsible operational owner.",
        safeNextAction:
          "Keep the recipe inside its permitted runtime path until the signal is understood.",
        doNotAction:
          "Do not bypass permissions, QA gates, or release control.",
        releaseEffect: "Review required",
        workerTaskEffect: "Review required",
        qaEffect: "Review required",
        chefApprovalEffect: "Review required",
        tone: flag.tone,
      }
  }
}

function ResolutionInfoRow({
  label,
  value,
  danger,
}: {
  label: string
  value: string
  danger?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        danger
          ? "border-red-300/15 bg-red-300/[0.045]"
          : "border-white/10 bg-black/20"
      }`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-[0.18em] ${
          danger ? "text-red-100/65" : "text-white/40"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-2 text-sm font-semibold leading-6 ${
          danger ? "text-red-50" : "text-white/75"
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function RuntimeExceptionResolutionMatrixView({
  activeRole,
  runtime,
  costingVisible,
}: {
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
  costingVisible: boolean
}) {
  const flags = getRuntimeExceptionFlags({
    activeRole,
    runtime,
    costingVisible,
  })

  const resolutions = flags.map((flag) =>
    getRuntimeExceptionResolution({
      flag,
      activeRole,
      runtime,
    })
  )

  const releaseBlockCount = resolutions.filter((resolution) =>
    resolution.releaseEffect.toLowerCase().includes("block")
  ).length

  const qaActionCount = resolutions.filter((resolution) =>
    resolution.qaEffect.toLowerCase().includes("required")
  ).length

  return (
    <section className="rounded-3xl border border-violet-200/15 bg-violet-200/[0.045] p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-100/75">
            RS-3G Exception Resolution Matrix
          </p>
          <h3 className="mt-1 text-lg font-bold text-white">
            Exception owner, decision, and safe action
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            Converts each RS-3F flag into an operational decision layer: who owns
            the issue, what is blocked, what action is safe, and what must not
            happen. This is UI-only and does not change runtime state.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatusPill tone={releaseBlockCount > 0 ? "danger" : "neutral"}>
            Release Blocks: {releaseBlockCount}
          </StatusPill>
          <StatusPill tone={qaActionCount > 0 ? "warning" : "neutral"}>
            QA Actions: {qaActionCount}
          </StatusPill>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {resolutions.map((resolution) => (
          <article
            key={`${resolution.label}-${resolution.owner}`}
            className={`rounded-3xl border p-5 ${getToneClasses(
              resolution.tone
            )}`}
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] opacity-80">
                  {resolution.label}
                </p>
                <h4 className="mt-1 text-lg font-black text-white">
                  Owner: {resolution.owner}
                </h4>
              </div>
              <StatusPill tone={resolution.tone}>{resolution.releaseEffect}</StatusPill>
            </div>

            <div className="grid gap-3">
              <ResolutionInfoRow
                label="Runtime Impact"
                value={resolution.runtimeImpact}
              />
              <ResolutionInfoRow
                label="Required Decision"
                value={resolution.requiredDecision}
              />
              <ResolutionInfoRow
                label="Safe Next Action"
                value={resolution.safeNextAction}
              />
              <ResolutionInfoRow
                label="Do Not"
                value={resolution.doNotAction}
                danger
              />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <RuntimeSummaryItem
                label="Worker Task"
                value={resolution.workerTaskEffect}
                tone={resolution.tone}
              />
              <RuntimeSummaryItem
                label="QA"
                value={resolution.qaEffect}
                tone={resolution.tone}
              />
              <RuntimeSummaryItem
                label="Chef Approval"
                value={resolution.chefApprovalEffect}
                tone={resolution.tone}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function getRuntimeHandoffSummary({
  activeRole,
  runtime,
  costingVisible,
}: {
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
  costingVisible: boolean
}): RuntimeHandoffSummary {
  const activeRoleLabel = getRoleLabel(activeRole)

  if (!runtime) {
    return {
      runtimeReady: "No",
      qaReady: "Blocked",
      workerTaskReady: "Unavailable",
      releaseReady: "No",
      blockedBy: "Runtime Missing",
      nextOwner: "Owner / Chef / Engineering",
      nextHandoffAction:
        "Restore the productionRuntime contract before scheduling, QA review, worker assignment, or release planning.",
      note: "No safe production handoff is available without the runtime contract.",
      tone: "danger",
    }
  }

  const summary = getRuntimeReadinessSummary(runtime)
  const flags = getRuntimeExceptionFlags({
    activeRole,
    runtime,
    costingVisible,
  })

  const visibleBlockers = flags.filter((flag) =>
    ["Runtime Missing", "QA Gate Pending", "Release Blocked", "Release Blocked By Default"].includes(
      flag.label
    )
  )

  const qaPending = flags.some((flag) => flag.label === "QA Gate Pending")
  const releaseBlocked = flags.some((flag) =>
    ["Release Blocked", "Release Blocked By Default"].includes(flag.label)
  )
  const hasWorkerTask = Boolean(runtime.stationTask?.taskId)
  const station = formatValue(runtime.stationTask?.station)
  const costingHidden = flags.some(
    (flag) => flag.label === "Costing Hidden For Role"
  )
  const noRuntimeExceptions = flags.some(
    (flag) => flag.label === "No Runtime Exceptions"
  )

  const runtimeReady =
    summary.productionReadiness.toLowerCase().includes("runtime missing") ||
    summary.productionReadiness.toLowerCase().includes("review required")
      ? "Review"
      : "Ready"

  const qaReady = qaPending ? "Pending" : "Clear / Policy-based"
  const workerTaskReady = hasWorkerTask ? "Ready" : "Needs task"
  const releaseReady = releaseBlocked || qaPending ? "Blocked" : "Reviewable"

  if (activeRole === "worker") {
    return {
      runtimeReady,
      qaReady,
      workerTaskReady,
      releaseReady,
      blockedBy: qaPending || releaseBlocked
        ? "Supervisor / QA protected handoff"
        : noRuntimeExceptions
          ? "No visible worker blocker"
          : "Worker task protection",
      nextOwner: "Sous Chef / Station Lead",
      nextHandoffAction:
        "Execute only the approved station task. Do not move the batch forward until the supervisor confirms QA or release clearance.",
      note:
        station === "—"
          ? "Worker-safe packet is available, but station identity must be confirmed by the supervisor."
          : `Worker-safe packet is available for ${station}. QA and release decisions stay outside the worker packet.`,
      tone: hasWorkerTask ? "success" : "warning",
    }
  }

  if (qaPending) {
    return {
      runtimeReady,
      qaReady,
      workerTaskReady,
      releaseReady,
      blockedBy: visibleBlockers.map((flag) => flag.label).join(" + "),
      nextOwner: "QA / Head Chef",
      nextHandoffAction:
        "Hand off to QA to complete cooling, allergen, label, and batch code checks before release.",
      note:
        "The recipe can remain prepared for runtime, but final release must stay blocked until QA clears the gate.",
      tone: "warning",
    }
  }

  if (releaseBlocked) {
    return {
      runtimeReady,
      qaReady,
      workerTaskReady,
      releaseReady,
      blockedBy: visibleBlockers.map((flag) => flag.label).join(" + "),
      nextOwner: "Head Chef / Production Manager",
      nextHandoffAction:
        "Keep the release hold active and confirm which authority condition must clear the block.",
      note:
        "The next handoff is not to workers; it is to the authorized role responsible for release control.",
      tone: "danger",
    }
  }

  if (!hasWorkerTask) {
    return {
      runtimeReady,
      qaReady,
      workerTaskReady,
      releaseReady: "Not ready",
      blockedBy: "Station task missing",
      nextOwner: "Chef / Production Manager",
      nextHandoffAction:
        "Prepare or confirm the approved station task before worker execution starts.",
      note:
        "The recipe needs an operational task handoff before it can be safely executed on the production floor.",
      tone: "warning",
    }
  }

  if (costingHidden) {
    return {
      runtimeReady,
      qaReady,
      workerTaskReady,
      releaseReady,
      blockedBy: "Role costing visibility only",
      nextOwner: "Owner / Finance / Admin if costing approval is needed",
      nextHandoffAction:
        "Continue operational review with role-safe data; request costing authority only if release policy requires it.",
      note:
        `${activeRoleLabel} can continue the runtime handoff without exposing protected costing data.`,
      tone: "neutral",
    }
  }


  return {
    runtimeReady,
    qaReady,
    workerTaskReady,
    releaseReady,
    blockedBy: noRuntimeExceptions
      ? "No visible runtime blocker"
      : flags.map((flag) => flag.label).join(" + "),
    nextOwner: "Production Manager / Responsible Role",
    nextHandoffAction:
      "Proceed with the visible runtime path while confirming tenant permissions, QA policy, and final release authority.",
    note:
      "This summary is a handoff snapshot only. It does not approve release or change runtime state.",
    tone: summary.tone,
  }
}

function RuntimeHandoffSummaryView({
  activeRole,
  runtime,
  costingVisible,
}: {
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
  costingVisible: boolean
}) {
  const handoff = getRuntimeHandoffSummary({
    activeRole,
    runtime,
    costingVisible,
  })

  return (
    <section className="rounded-3xl border border-sky-200/15 bg-sky-200/[0.045] p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-100/75">
            RS-3H Runtime Handoff Summary
          </p>
          <h3 className="mt-1 text-lg font-bold text-white">
            Next owner and production handoff
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            Executive handoff snapshot showing whether the recipe is ready for
            runtime, QA, worker task, and release — plus who owns the next safe
            action. This is UI-only and does not change runtime state.
          </p>
        </div>

        <StatusPill tone={handoff.tone}>Next Owner: {handoff.nextOwner}</StatusPill>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <RuntimeSummaryItem
          label="Runtime"
          value={handoff.runtimeReady}
          tone={handoff.tone}
        />
        <RuntimeSummaryItem
          label="QA"
          value={handoff.qaReady}
          tone={handoff.qaReady.toLowerCase().includes("pending") ? "warning" : handoff.tone}
        />
        <RuntimeSummaryItem
          label="Worker Task"
          value={handoff.workerTaskReady}
          tone={handoff.workerTaskReady.toLowerCase().includes("ready") ? "success" : "warning"}
        />
        <RuntimeSummaryItem
          label="Release"
          value={handoff.releaseReady}
          tone={handoff.releaseReady.toLowerCase().includes("blocked") ? "danger" : handoff.tone}
        />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
            Blocked By
          </p>
          <p className="mt-2 text-sm font-black leading-6 text-white">
            {handoff.blockedBy}
          </p>
          <p className="mt-2 text-xs font-semibold leading-5 text-white/50">
            {handoff.note}
          </p>
        </div>

        <div className="rounded-2xl border border-sky-200/15 bg-sky-200/[0.045] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-100/65">
            Next Handoff Action
          </p>
          <p className="mt-2 text-sm font-bold leading-6 text-sky-50">
            {handoff.nextHandoffAction}
          </p>
        </div>
      </div>
    </section>
  )
}


function getRoleWorkPacket({
  activeRole,
  runtime,
  costingVisible,
}: {
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
  costingVisible: boolean
}): RuntimeWorkPacket {
  const roleLabel = getRoleLabel(activeRole)
  const handoff = getRuntimeHandoffSummary({
    activeRole,
    runtime,
    costingVisible,
  })
  const guidance = getRoleDecisionGuidance(activeRole, runtime)
  const station = formatValue(runtime?.stationTask?.station)
  const taskId = compactTaskId(runtime?.stationTask?.taskId)
  const releaseStatus = formatValue(runtime?.releaseControl?.releaseStatus)
  const qaAuthority = formatValue(runtime?.qaGate?.releaseAuthority)

  if (!runtime) {
    return {
      roleLabel,
      packetTitle: `${roleLabel} Runtime Packet`,
      primaryFocus: "Restore runtime contract before any production handoff.",
      whatToKnow:
        "This recipe does not have a productionRuntime contract, so it cannot safely become a station task, QA gate, or release decision.",
      myActions: [
        "Keep this recipe outside active production scheduling.",
        "Escalate the missing runtime contract to the responsible owner.",
        "Wait for the API contract before assigning workers or QA checks.",
      ],
      doNot: [
        "Do not create production tasks manually.",
        "Do not release the recipe.",
        "Do not expose protected recipe data to fill missing runtime fields.",
      ],
      escalation: "Owner / Chef / Engineering must restore the runtime contract.",
      handoffTo: handoff.nextOwner,
      visibleData: ["Runtime missing", "No safe handoff available"],
      protectedData: ["Recipe IP", "Costing", "Release controls"],
      tone: "danger",
    }
  }

  const commonProtectedData = costingVisible
    ? ["Worker-facing recipe IP", "Release authority controls"]
    : ["Costing", "Margin", "Supplier cost", "Recipe IP", "Release controls"]

  switch (activeRole) {
    case "owner":
      return {
        roleLabel,
        packetTitle: "Owner Governance Packet",
        primaryFocus: handoff.nextHandoffAction,
        whatToKnow:
          "Owner sees the control picture: runtime readiness, QA dependency, protected release, costing visibility, and governance risk.",
        myActions: [
          "Review release governance before production movement.",
          "Confirm QA and chef authority are not bypassed.",
          "Use costing visibility for business control only, not worker execution.",
        ],
        doNot: [
          "Do not approve release while QA is pending.",
          "Do not allow protected costing or margin data into worker views.",
          "Do not treat readiness visibility as final production authorization.",
        ],
        escalation: "Escalate conflicts to Chef, QA, or Production Manager.",
        handoffTo: handoff.nextOwner,
        visibleData: [
          `Station: ${station}`,
          `Release: ${handoff.releaseReady}`,
          `Blocked by: ${handoff.blockedBy}`,
          `Costing visible: ${costingVisible ? "Yes" : "No"}`,
        ],
        protectedData: commonProtectedData,
        tone: handoff.tone,
      }

    case "chef":
      return {
        roleLabel,
        packetTitle: "Chef Production Packet",
        primaryFocus: guidance.nextAction,
        whatToKnow:
          "Chef owns recipe execution quality, station task accuracy, SOP readiness, and QA handoff support.",
        myActions: [
          "Confirm the approved station task is operationally correct.",
          "Check worker-facing SOP clarity before handoff.",
          "Coordinate with QA if cooling, allergen, label, or batch code evidence is unclear.",
        ],
        doNot: [
          "Do not expose full R&D notes or protected recipe IP to workers.",
          "Do not bypass QA release protection.",
          "Do not let station execution start if the task conflicts with SOP.",
        ],
        escalation: guidance.escalation,
        handoffTo: handoff.nextOwner,
        visibleData: [
          `Station: ${station}`,
          `Task: ${taskId}`,
          `QA: ${handoff.qaReady}`,
          `Release: ${releaseStatus}`,
        ],
        protectedData: commonProtectedData,
        tone: handoff.tone,
      }

    case "qa":
      return {
        roleLabel,
        packetTitle: "QA Gate Packet",
        primaryFocus:
          "Clear, hold, reject, or escalate the QA gate before release.",
        whatToKnow:
          "QA sees only the safety and release gate evidence needed to protect the batch before packaging, dispatch, or customer handoff.",
        myActions: [
          "Verify cooling, allergen, label, and batch code checks.",
          "Keep release blocked while any QA check is incomplete.",
          "Record the blocker and escalate pressure to bypass QA.",
        ],
        doNot: [
          "Do not approve release if any gate is uncertain.",
          "Do not use costing or recipe IP to make QA decisions.",
          "Do not let production pressure override food safety gates.",
        ],
        escalation: guidance.escalation,
        handoffTo: handoff.nextOwner,
        visibleData: [
          `Release authority: ${qaAuthority}`,
          `QA status: ${handoff.qaReady}`,
          `Blocked by: ${handoff.blockedBy}`,
          `Release: ${handoff.releaseReady}`,
        ],
        protectedData: ["Costing", "Margin", "Supplier cost", "Owner governance"],
        tone: handoff.tone,
      }

    case "worker":
      return {
        roleLabel,
        packetTitle: "Worker Station Packet",
        primaryFocus:
          "Follow only the approved station task and ask the supervisor before any change.",
        whatToKnow:
          "Worker sees the task packet only: station, task identity, instruction mode, supervisor check, and safe execution limits.",
        myActions: [
          "Follow the approved station task exactly.",
          "Use the worker instruction mode shown for this station.",
          "Ask the supervisor if method, timing, quantity, or setup is unclear.",
        ],
        doNot: [
          "Do not edit recipe, costing, QA, release, or batch policy data.",
          "Do not start if station setup does not match the task.",
          "Do not make substitutions or process changes without supervisor approval.",
        ],
        escalation: guidance.escalation,
        handoffTo: "Sous Chef / Station Lead",
        visibleData: [
          `Station: ${station}`,
          `Task: ${taskId}`,
          `Instruction: ${formatValue(runtime.stationTask?.workerInstructionMode)}`,
          `Supervisor check: ${formatValue(runtime.stationTask?.requiresSupervisorCheck)}`,
        ],
        protectedData: [
          "Business data hidden",
          "Recipe control data hidden",
          "QA approval controls",
          "Release controls",
        ],
        tone: runtime.stationTask?.taskId ? "success" : "warning",
      }

    case "purchasing-manager":
      return {
        roleLabel,
        packetTitle: "Purchasing Readiness Packet",
        primaryFocus:
          "Confirm ingredient source, cost source, and supply readiness before production demand.",
        whatToKnow:
          "Purchasing sees the supply side of the recipe handoff, not QA release authority or worker execution controls.",
        myActions: [
          "Confirm supplier readiness for required ingredients.",
          "Escalate shortage, substitution, or cost-source conflict.",
          "Coordinate with Chef if ingredient change affects SOP or yield.",
        ],
        doNot: [
          "Do not approve operational release.",
          "Do not change SOP or worker task flow.",
          "Do not expose supplier cost where the role is not allowed.",
        ],
        escalation: guidance.escalation,
        handoffTo: "Chef / Storekeeper / Production Manager",
        visibleData: [
          `Station demand: ${station}`,
          `Task readiness: ${handoff.workerTaskReady}`,
          `Release state: ${handoff.releaseReady}`,
        ],
        protectedData: costingVisible
          ? ["Release controls", "Worker task editing"]
          : commonProtectedData,
        tone: handoff.tone,
      }

    case "storekeeper":
      return {
        roleLabel,
        packetTitle: "Storekeeper Issue Packet",
        primaryFocus:
          "Confirm stock issue, batch handover, and storage movement readiness.",
        whatToKnow:
          "Storekeeper sees the stock and batch movement packet needed to prepare production without touching recipe IP or release authority.",
        myActions: [
          "Prepare stock issue to production.",
          "Confirm batch handover identity and storage readiness.",
          "Escalate missing stock or unclear batch identity immediately.",
        ],
        doNot: [
          "Do not release QA gates.",
          "Do not view or expose protected costing.",
          "Do not alter recipe or station task instructions.",
        ],
        escalation: guidance.escalation,
        handoffTo: "Purchasing Manager / Production Manager",
        visibleData: [
          `Station: ${station}`,
          `Batch task: ${taskId}`,
          `Worker task: ${handoff.workerTaskReady}`,
        ],
        protectedData: commonProtectedData,
        tone: handoff.tone,
      }

    case "production-manager":
      return {
        roleLabel,
        packetTitle: "Production Handoff Packet",
        primaryFocus:
          "Coordinate station readiness while keeping release blocked until QA or authorized manager approval.",
        whatToKnow:
          "Production sees the runtime movement picture: station, task readiness, QA blocker, release hold, and next owner.",
        myActions: [
          "Confirm the station can execute the approved task now.",
          "Track QA dependency before final release.",
          "Escalate if QA hold blocks capacity or schedule.",
        ],
        doNot: [
          "Do not bypass QA gate.",
          "Do not release blocked batches.",
          "Do not assign worker execution outside the approved task packet.",
        ],
        escalation: guidance.escalation,
        handoffTo: handoff.nextOwner,
        visibleData: [
          `Station: ${station}`,
          `Task: ${taskId}`,
          `Blocked by: ${handoff.blockedBy}`,
          `Release: ${handoff.releaseReady}`,
        ],
        protectedData: commonProtectedData,
        tone: handoff.tone,
      }

    default:
      return {
        roleLabel,
        packetTitle: `${roleLabel} Runtime Packet`,
        primaryFocus: handoff.nextHandoffAction,
        whatToKnow:
          "This role receives a safe operational packet based on visible runtime state and permissions.",
        myActions: guidance.supportingActions,
        doNot: [guidance.doNotAction],
        escalation: guidance.escalation,
        handoffTo: handoff.nextOwner,
        visibleData: [
          `Station: ${station}`,
          `Task: ${taskId}`,
          `Release: ${handoff.releaseReady}`,
        ],
        protectedData: commonProtectedData,
        tone: handoff.tone,
      }
  }
}

function getDecisionTabs(activeRole: RecipeStudioRole): {
  value: DecisionCenterTab
  label: string
}[] {
  if (activeRole === "worker") {
    return [
      { value: "guidance", label: "My Steps" },
      { value: "handoff", label: "Handoff" },
      { value: "details", label: "Task Details" },
    ]
  }

  if (activeRole === "qa") {
    return [
      { value: "handoff", label: "Handoff" },
      { value: "flags", label: "Flags" },
      { value: "resolution", label: "Resolution" },
      { value: "guidance", label: "QA Actions" },
      { value: "details", label: "QA Details" },
    ]
  }

  return [
    { value: "handoff", label: "Handoff" },
    { value: "flags", label: "Flags" },
    { value: "resolution", label: "Resolution" },
    { value: "guidance", label: "Guidance" },
    { value: "details", label: "Runtime Details" },
  ]
}

function WorkPacketList({
  title,
  items,
  tone = "neutral",
}: {
  title: string
  items: string[]
  tone?: RuntimeTone
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
        {title}
      </p>
      <div className="mt-3 grid gap-2">
        {items.map((item, index) => (
          <div
            key={`${title}-${item}-${index}`}
            className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3"
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-black ${getToneClasses(
                tone
              )}`}
            >
              {index + 1}
            </span>
            <p className="text-sm font-semibold leading-6 text-white/75">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RuntimeWorkPacketView({
  activeRole,
  runtime,
  costingVisible,
}: {
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
  costingVisible: boolean
}) {
  const packet = getRoleWorkPacket({
    activeRole,
    runtime,
    costingVisible,
  })

  return (
    <section className="rounded-3xl border border-lime-300/15 bg-lime-300/[0.045] p-5">
      <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-lime-100/80">
            RS-3I My Runtime Work Packet
          </p>
          <h3 className="mt-1 text-xl font-black text-white">
            {packet.packetTitle}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            {packet.whatToKnow}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatusPill tone={packet.tone}>Role: {packet.roleLabel}</StatusPill>
          <StatusPill tone={packet.tone}>Handoff: {packet.handoffTo}</StatusPill>
        </div>
      </div>

      <div className="rounded-2xl border border-lime-300/20 bg-lime-300/[0.07] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-100/70">
          Primary Focus
        </p>
        <p className="mt-2 text-base font-black leading-7 text-white">
          {packet.primaryFocus}
        </p>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <WorkPacketList
          title="My Actions"
          items={packet.myActions}
          tone={packet.tone}
        />

        <WorkPacketList
          title="Do Not Touch"
          items={packet.doNot}
          tone="danger"
        />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-sky-200/15 bg-sky-200/[0.045] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-100/65">
            Visible To Me
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {packet.visibleData.map((item) => (
              <StatusPill key={item} tone={packet.tone}>
                {item}
              </StatusPill>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-red-300/15 bg-red-300/[0.045] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-100/65">
            Protected From This Packet
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {packet.protectedData.map((item) => (
              <StatusPill key={item} tone="neutral">
                {item}
              </StatusPill>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.045] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100/65">
            Escalation
          </p>
          <p className="mt-2 text-sm font-bold leading-6 text-amber-50">
            {packet.escalation}
          </p>
        </div>
      </div>
    </section>
  )
}

function RecipeCommandStrip({
  recipe,
  index,
  activeRole,
  runtime,
  costingVisible,
}: {
  recipe: RecipeStudioRecipe
  index: number
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
  costingVisible: boolean
}) {
  const summary = getRuntimeReadinessSummary(runtime)
  const handoff = getRuntimeHandoffSummary({
    activeRole,
    runtime,
    costingVisible,
  })
  const station = formatValue(runtime?.stationTask?.station)
  const taskId = compactTaskId(runtime?.stationTask?.taskId)

  return (
    <section className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[0.045] p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-100/70">
            Recipe Command Card
          </p>
          <h3 className="mt-1 text-2xl font-black text-white">
            {getRecipeTitle(recipe, index)}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            One-screen command view: status, station, blocker, next owner, and
            the safest next production handoff for the current role.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatusPill tone={summary.tone}>{summary.productionReadiness}</StatusPill>
          <StatusPill tone={handoff.tone}>Next: {handoff.nextOwner}</StatusPill>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <RuntimeSummaryItem label="Station" value={station} />
        <RuntimeSummaryItem label="Task" value={taskId} />
        <RuntimeSummaryItem
          label="QA"
          value={handoff.qaReady}
          tone={handoff.qaReady.toLowerCase().includes("pending") ? "warning" : handoff.tone}
        />
        <RuntimeSummaryItem
          label="Release"
          value={handoff.releaseReady}
          tone={handoff.releaseReady.toLowerCase().includes("blocked") ? "danger" : handoff.tone}
        />
        <RuntimeSummaryItem label="Role" value={getRoleLabel(activeRole)} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
            Blocked By
          </p>
          <p className="mt-2 text-sm font-black leading-6 text-white">
            {handoff.blockedBy}
          </p>
        </div>

        <div className="rounded-2xl border border-lime-300/15 bg-lime-300/[0.045] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-100/65">
            Primary Safe Action
          </p>
          <p className="mt-2 text-sm font-bold leading-6 text-lime-50">
            {handoff.nextHandoffAction}
          </p>
        </div>
      </div>
    </section>
  )
}

function CompactRuntimeExceptionResolutionMatrixView({
  activeRole,
  runtime,
  costingVisible,
}: {
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
  costingVisible: boolean
}) {
  const flags = getRuntimeExceptionFlags({
    activeRole,
    runtime,
    costingVisible,
  })

  const resolutions = flags.map((flag) =>
    getRuntimeExceptionResolution({
      flag,
      activeRole,
      runtime,
    })
  )

  const releaseBlockCount = resolutions.filter((resolution) =>
    resolution.releaseEffect.toLowerCase().includes("block")
  ).length

  return (
    <section className="rounded-3xl border border-violet-200/15 bg-violet-200/[0.045] p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-100/75">
            Compact RS-3G Resolution
          </p>
          <h3 className="mt-1 text-lg font-bold text-white">
            Flag → owner → safe action
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            Compressed decision matrix for fast cockpit use. Open a row only
            when the role needs the full impact and do-not rule.
          </p>
        </div>

        <StatusPill tone={releaseBlockCount > 0 ? "danger" : "neutral"}>
          Release Blocks: {releaseBlockCount}
        </StatusPill>
      </div>

      <div className="grid gap-3">
        {resolutions.map((resolution) => (
          <details
            key={`${resolution.label}-${resolution.owner}`}
            className={`group rounded-2xl border p-4 ${getToneClasses(
              resolution.tone
            )}`}
          >
            <summary className="flex cursor-pointer list-none flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] opacity-80">
                  {resolution.label}
                </p>
                <h4 className="mt-1 text-base font-black text-white">
                  {resolution.owner}
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                <StatusPill tone={resolution.tone}>
                  {resolution.releaseEffect}
                </StatusPill>
                <StatusPill tone="neutral">Open details</StatusPill>
              </div>
            </summary>

            <div className="mt-4 grid gap-3 xl:grid-cols-2">
              <ResolutionInfoRow
                label="Required Decision"
                value={resolution.requiredDecision}
              />
              <ResolutionInfoRow
                label="Safe Next Action"
                value={resolution.safeNextAction}
              />
              <ResolutionInfoRow
                label="Runtime Impact"
                value={resolution.runtimeImpact}
              />
              <ResolutionInfoRow
                label="Do Not"
                value={resolution.doNotAction}
                danger
              />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <RuntimeSummaryItem
                label="Worker"
                value={resolution.workerTaskEffect}
                tone={resolution.tone}
              />
              <RuntimeSummaryItem
                label="QA"
                value={resolution.qaEffect}
                tone={resolution.tone}
              />
              <RuntimeSummaryItem
                label="Chef"
                value={resolution.chefApprovalEffect}
                tone={resolution.tone}
              />
            </div>
          </details>
        ))}
      </div>

      {activeRole !== "worker" ? (
        <details className="mt-4 rounded-2xl border border-violet-200/15 bg-black/20 p-4">
          <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.18em] text-violet-100/70">
            Open full RS-3G matrix only when audit detail is needed
          </summary>
          <div className="mt-4">
            <RuntimeExceptionResolutionMatrixView
              activeRole={activeRole}
              runtime={runtime}
              costingVisible={costingVisible}
            />
          </div>
        </details>
      ) : null}
    </section>
  )
}

function RuntimeDetailsAccordion({
  activeRole,
  runtime,
}: {
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
}) {
  if (!runtime) {
    return (
      <section className="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-5">
        <p className="text-sm font-bold text-amber-100">
          No productionRuntime object was returned for this recipe.
        </p>
        <p className="mt-2 text-sm leading-6 text-white/60">
          RS-3I keeps runtime details closed because the runtime contract is
          unavailable.
        </p>
      </section>
    )
  }

  return (
    <section className="grid gap-4">
      <details className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
        <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.18em] text-white/70">
          Readiness Snapshot
        </summary>
        <div className="mt-4">
          <RuntimeReadinessSummaryView runtime={runtime} />
        </div>
      </details>

      <details open className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
        <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.18em] text-white/70">
          Runtime Path
        </summary>
        <div className="mt-4">
          <RuntimePathView runtime={runtime} />
        </div>
      </details>

      <details className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
        <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.18em] text-white/70">
          Station Task
        </summary>
        <div className="mt-4">
          <StationTaskView stationTask={runtime.stationTask} />
        </div>
      </details>

      {activeRole !== "worker" ? (
        <details className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
          <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.18em] text-white/70">
            QA Gate
          </summary>
          <div className="mt-4">
            <QaGateView qaGate={runtime.qaGate} />
          </div>
        </details>
      ) : null}

      {activeRole !== "worker" ? (
        <details className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
          <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.18em] text-white/70">
            Release Control
          </summary>
          <div className="mt-4">
            <ReleaseControlView releaseControl={runtime.releaseControl} />
          </div>
        </details>
      ) : null}

      <details className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
        <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.18em] text-white/70">
          Role Runtime View
        </summary>
        <div className="mt-4">
          <RoleRuntimeView
            roleRuntimeView={runtime.roleRuntimeView}
            activeRole={activeRole}
          />
        </div>
      </details>
    </section>
  )
}

function DecisionCenterView({
  activeRole,
  runtime,
  costingVisible,
}: {
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
  costingVisible: boolean
}) {
  const tabs = getDecisionTabs(activeRole)
  const [activeTab, setActiveTab] = useState<DecisionCenterTab>(tabs[0].value)

  const activeTabIsVisible = tabs.some((tab) => tab.value === activeTab)
  const selectedTab = activeTabIsVisible ? activeTab : tabs[0].value

  return (
    <section className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[0.035] p-5">
      <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-100/70">
            RS-3I Decision Center
          </p>
          <h3 className="mt-1 text-xl font-black text-white">
            Open only what this role needs
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            RS-3F flags, RS-3G resolution, RS-3H handoff, and RS-3E guidance are
            still available, but compressed into role-safe panels instead of one
            long report.
          </p>
        </div>

        <StatusPill tone="success">Cockpit mode</StatusPill>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold transition ${
              selectedTab === tab.value
                ? "border-cyan-200/50 bg-cyan-200/15 text-cyan-50"
                : "border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {selectedTab === "handoff" ? (
        <RuntimeHandoffSummaryView
          activeRole={activeRole}
          runtime={runtime}
          costingVisible={costingVisible}
        />
      ) : null}

      {selectedTab === "flags" ? (
        <RuntimeExceptionFlagsView
          activeRole={activeRole}
          runtime={runtime}
          costingVisible={costingVisible}
        />
      ) : null}

      {selectedTab === "resolution" ? (
        <CompactRuntimeExceptionResolutionMatrixView
          activeRole={activeRole}
          runtime={runtime}
          costingVisible={costingVisible}
        />
      ) : null}

      {selectedTab === "guidance" ? (
        <RuntimeDecisionGuidanceView activeRole={activeRole} runtime={runtime} />
      ) : null}

      {selectedTab === "details" ? (
        <RuntimeDetailsAccordion activeRole={activeRole} runtime={runtime} />
      ) : null}
    </section>
  )
}

function RuntimeRecipeRail({
  recipes,
  activeRole,
  costingVisible,
}: {
  recipes: RecipeStudioRecipe[]
  activeRole: RecipeStudioRole
  costingVisible: boolean
}) {
  return (
    <nav className="sticky top-3 z-20 rounded-[2rem] border border-white/10 bg-[#071421]/95 p-3 shadow-2xl shadow-black/30 backdrop-blur">
      <div className="flex gap-3 overflow-x-auto pb-1">
        {recipes.map((recipe, index) => {
          const runtime = recipe.productionRuntime
          const summary = getRuntimeReadinessSummary(runtime)
          const handoff = getRuntimeHandoffSummary({
            activeRole,
            runtime,
            costingVisible,
          })

          return (
            <a
              key={getRecipeAnchorId(recipe, index)}
              href={`#${getRecipeAnchorId(recipe, index)}`}
              className="min-w-[260px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-200/30 hover:bg-cyan-200/[0.045]"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100/65">
                Runtime Packet
              </p>
              <p className="mt-1 text-base font-black text-white">
                {getRecipeTitle(recipe, index)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <StatusPill tone={summary.tone}>
                  {summary.productionReadiness}
                </StatusPill>
                <StatusPill tone={handoff.tone}>
                  {handoff.nextOwner}
                </StatusPill>
              </div>
            </a>
          )
        })}
      </div>
    </nav>
  )
}


function RuntimeReadinessSummaryView({
  runtime,
}: {
  runtime?: RecipeProductionRuntime
}) {
  const summary = getRuntimeReadinessSummary(runtime)

  return (
    <section className="rounded-3xl border border-lime-300/15 bg-lime-300/[0.045] p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-lime-100/80">
            Runtime Readiness Summary
          </p>
          <h3 className="mt-1 text-lg font-bold text-white">
            Production decision snapshot
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            {summary.note}
          </p>
        </div>

        <StatusPill tone={summary.tone}>
          Production Readiness: {summary.productionReadiness}
        </StatusPill>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <RuntimeSummaryItem
          label="Readiness"
          value={summary.productionReadiness}
          tone={summary.tone}
        />
        <RuntimeSummaryItem label="Station" value={summary.station} />
        <RuntimeSummaryItem label="Release" value={summary.release} />
        <RuntimeSummaryItem label="Worker Task" value={summary.workerTask} />
        <RuntimeSummaryItem label="Risk" value={summary.risk} tone={summary.tone} />
      </div>
    </section>
  )
}

function RuntimeDecisionGuidanceView({
  activeRole,
  runtime,
}: {
  activeRole: RecipeStudioRole
  runtime?: RecipeProductionRuntime
}) {
  const guidance = getRoleDecisionGuidance(activeRole, runtime)

  return (
    <section className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[0.045] p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-100/75">
            RS-3E Decision Guidance
          </p>
          <h3 className="mt-1 text-lg font-bold text-white">
            {guidance.title}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            Role-specific next action generated from the visible runtime state,
            QA dependency, station readiness, and release control.
          </p>
        </div>

        <StatusPill tone={guidance.tone}>Next action required</StatusPill>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
            Next Action
          </p>
          <p className="mt-2 text-base font-black leading-7 text-white">
            {guidance.nextAction}
          </p>
        </div>

        <div className="rounded-2xl border border-red-300/15 bg-red-300/[0.045] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-100/65">
            Do Not
          </p>
          <p className="mt-2 text-sm font-bold leading-6 text-red-50">
            {guidance.doNotAction}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
            Supporting Actions
          </p>
          <div className="mt-3 grid gap-2">
            {guidance.supportingActions.map((action, index) => (
              <div
                key={`${action}-${index}`}
                className="flex gap-3 rounded-xl border border-white/10 bg-black/15 p-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-lime-300/30 bg-lime-300/10 text-xs font-black text-lime-100">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold leading-6 text-white/75">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.045] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100/65">
            Escalation
          </p>
          <p className="mt-2 text-sm font-bold leading-6 text-amber-50">
            {guidance.escalation}
          </p>
        </div>
      </div>
    </section>
  )
}

function RuntimeOverviewBoard({
  recipes,
  activeRole,
  costingVisible,
}: {
  recipes: RecipeStudioRecipe[]
  activeRole: RecipeStudioRole
  costingVisible: boolean
}) {
  const activeRoleLabel = getRoleLabel(activeRole)

  const summaries = recipes.map((recipe, index) => {
    const summary = getRuntimeReadinessSummary(recipe.productionRuntime)
    const flags = getRuntimeExceptionFlags({
      activeRole,
      runtime: recipe.productionRuntime,
      costingVisible,
    })

    return {
      recipe,
      index,
      summary,
      flags,
      title: getRecipeTitle(recipe, index),
      stationTaskId: compactTaskId(recipe.productionRuntime?.stationTask?.taskId),
    }
  })

  const qaPendingCount = summaries.filter(
    (item) => item.summary.productionReadiness.toLowerCase() === "qa pending"
  ).length

  const readyTaskCount = summaries.filter(
    (item) => item.summary.workerTask.toLowerCase() === "ready"
  ).length

  const blockedCount = summaries.filter((item) =>
    item.summary.release.toLowerCase().includes("blocked")
  ).length

  const totalExceptionFlags = summaries.reduce(
    (total, item) =>
      total +
      item.flags.filter(
        (flag) => flag.tone === "danger" || flag.tone === "warning"
      ).length,
    0
  )

  return (
    <section className="rounded-[2rem] border border-cyan-200/10 bg-cyan-200/[0.035] p-5 md:p-6">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-100/70">
            RS-3F Runtime Overview Board
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Recipe runtime overview
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
            Fast cross-recipe board for the {activeRoleLabel} view. It summarizes
            readiness, station assignment, worker task state, release blocking,
            and active runtime exception flags.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
              QA Pending
            </p>
            <p className="mt-1 text-xl font-black text-amber-100">
              {qaPendingCount}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
              Tasks Ready
            </p>
            <p className="mt-1 text-xl font-black text-lime-100">
              {readyTaskCount}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
              Blocked
            </p>
            <p className="mt-1 text-xl font-black text-red-100">
              {blockedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
              Exception Flags
            </p>
            <p className="mt-1 text-xl font-black text-orange-100">
              {totalExceptionFlags}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {summaries.map((item) => (
          <article
            key={
              item.recipe.id ||
              item.recipe.recipeId ||
              `${item.title}-${item.index}`
            }
            className="rounded-3xl border border-white/10 bg-[#071421]/90 p-5"
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime-100/70">
                  Approved Runtime
                </p>
                <h3 className="mt-1 text-xl font-black text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs font-semibold text-white/45">
                  Task:{" "}
                  <span className="text-white/75">{item.stationTaskId}</span>
                </p>
              </div>

              <StatusPill tone={item.summary.tone}>
                {item.summary.productionReadiness}
              </StatusPill>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {item.flags.slice(0, 4).map((flag) => (
                <StatusPill key={`${item.title}-${flag.label}`} tone={flag.tone}>
                  {flag.label}
                </StatusPill>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <RuntimeSummaryItem
                label="Station"
                value={item.summary.station}
              />
              <RuntimeSummaryItem
                label="Release"
                value={item.summary.release}
              />
              <RuntimeSummaryItem
                label="Worker Task"
                value={item.summary.workerTask}
              />
              <RuntimeSummaryItem
                label="Risk"
                value={item.summary.risk}
                tone={item.summary.tone}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
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
        <StatusPill tone="success">RS-3F Flags</StatusPill>
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
            <p className="mt-2 text-xs font-semibold tracking-[0.12em] text-white/40">
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
  const activeRoleLabel = getRoleLabel(activeRole)

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
  costingVisible,
}: {
  recipe: RecipeStudioRecipe
  index: number
  activeRole: RecipeStudioRole
  costingVisible: boolean
}) {
  const productionRuntime = recipe.productionRuntime

  return (
    <article
      id={getRecipeAnchorId(recipe, index)}
      className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-white/10 bg-[#081421]/90 shadow-2xl shadow-black/25"
    >
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
              <StatusPill tone="success">RS-3I Packet Cockpit</StatusPill>
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

      <div className="grid gap-5 p-5 md:p-6">
        <RecipeCommandStrip
          recipe={recipe}
          index={index}
          activeRole={activeRole}
          runtime={productionRuntime}
          costingVisible={costingVisible}
        />

        <RuntimeWorkPacketView
          activeRole={activeRole}
          runtime={productionRuntime}
          costingVisible={costingVisible}
        />

        <DecisionCenterView
          activeRole={activeRole}
          runtime={productionRuntime}
          costingVisible={costingVisible}
        />
      </div>
    </article>
  )
}

function WorkerSafeAccessSummary() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="rounded-3xl border border-lime-300/15 bg-lime-300/[0.045] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime-100/70">
          Worker View
        </p>
        <p className="mt-2 text-2xl font-black text-white">
          Station task only
        </p>
        <p className="mt-2 text-sm leading-6 text-white/55">
          The worker packet focuses on the approved task, station setup, and supervisor-safe execution.
        </p>
      </div>

      <div className="rounded-3xl border border-sky-200/15 bg-sky-200/[0.045] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-100/70">
          Visible To Worker
        </p>
        <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
          Station, task ID, instruction mode, supervisor check, safe steps, and escalation route.
        </p>
      </div>

      <div className="rounded-3xl border border-red-300/15 bg-red-300/[0.045] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-100/70">
          Protected Controls
        </p>
        <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
          Business data, recipe control data, QA approval, and release controls stay outside the worker packet.
        </p>
      </div>
    </section>
  )
}

function WorkerRecipeDisclosure({
  recipe,
  index,
  activeRole,
  costingVisible,
}: {
  recipe: RecipeStudioRecipe
  index: number
  activeRole: RecipeStudioRole
  costingVisible: boolean
}) {
  const runtime = recipe.productionRuntime
  const handoff = getRuntimeHandoffSummary({
    activeRole,
    runtime,
    costingVisible,
  })
  const taskId = compactTaskId(runtime?.stationTask?.taskId)
  const station = formatValue(runtime?.stationTask?.station)

  return (
    <details
      id={getRecipeAnchorId(recipe, index)}
      open={index === 0}
      className="group scroll-mt-28 overflow-hidden rounded-[2rem] border border-white/10 bg-[#081421]/90 shadow-2xl shadow-black/25"
    >
      <summary className="cursor-pointer list-none border-b border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.06] md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-lime-200/75">
              Worker Runtime Packet
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
              {getRecipeTitle(recipe, index)}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusPill tone="success">Station: {station}</StatusPill>
              <StatusPill tone="success">Task: {taskId}</StatusPill>
              <StatusPill tone={handoff.releaseReady.toLowerCase().includes("blocked") ? "warning" : "success"}>
                {handoff.releaseReady}
              </StatusPill>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <StatusPill tone={handoff.tone}>Next: {handoff.nextOwner}</StatusPill>
            <span className="inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-white/65 group-open:hidden">
              Open packet
            </span>
            <span className="hidden rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-white/65 group-open:inline-flex">
              Close packet
            </span>
          </div>
        </div>
      </summary>

      <div className="p-5 md:p-6">
        <RecipeRuntimeCard
          recipe={recipe}
          index={index}
          activeRole={activeRole}
          costingVisible={costingVisible}
        />
      </div>
    </details>
  )
}

function RecipeStudioRuntimePageContent() {
  const searchParams = useSearchParams()
  const activeRole = getActiveRole(searchParams.get("role"))

  const [data, setData] = useState<RecipeStudioApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const activeRoleLabel = useMemo(() => getRoleLabel(activeRole), [activeRole])

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
  const costingVisible = data?.costingVisible === true

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
                RS-3I turns Recipe Studio into a role-based work packet cockpit:
                each role sees its own safe packet first, while RS-3F flags,
                RS-3G resolution, and RS-3H handoff remain available on demand.
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

        {activeRole === "worker" ? (
          <WorkerSafeAccessSummary />
        ) : (
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
                Costing Visible
              </p>
              <p className="mt-2 text-2xl font-black text-white">
                {costingVisible ? "Yes" : "No"}
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
        )}

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
              RS-3F expects recipes to include productionRuntime from the RS-3A
              API contract.
            </p>
          </section>
        ) : null}

        {!loading && !error && recipes.length > 0 ? (
          <RuntimeRecipeRail
            recipes={recipes}
            activeRole={activeRole}
            costingVisible={costingVisible}
          />
        ) : null}

        {!loading && !error && recipes.length > 0 && activeRole !== "worker" ? (
          <RuntimeOverviewBoard
            recipes={recipes}
            activeRole={activeRole}
            costingVisible={costingVisible}
          />
        ) : null}

        {!loading && !error && recipes.length > 0 ? (
          <section className="grid gap-6">
            {recipes.map((recipe, index) =>
              activeRole === "worker" ? (
                <WorkerRecipeDisclosure
                  key={recipe.id || recipe.recipeId || `${index}`}
                  recipe={recipe}
                  index={index}
                  activeRole={activeRole}
                  costingVisible={costingVisible}
                />
              ) : (
                <RecipeRuntimeCard
                  key={recipe.id || recipe.recipeId || `${index}`}
                  recipe={recipe}
                  index={index}
                  activeRole={activeRole}
                  costingVisible={costingVisible}
                />
              )
            )}
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