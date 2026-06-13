export type RuntimeStageStatus =
  | "WAITING"
  | "ACTIVE"
  | "DELAYED"
  | "COMPLETED"
  | "BLOCKED"

export type RuntimeRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

export type RuntimeStageType =
  | "PREP"
  | "COOKING"
  | "ASSEMBLY"
  | "QC"
  | "PACKAGING"
  | "DISPATCH"

export type RuntimeActionType =
  | "NONE"
  | "MONITOR"
  | "MOVE_SUPPORT"
  | "ESCALATE_TO_HEAD_CHEF"
  | "HOLD_DOWNSTREAM"
  | "RELEASE_NEXT_STAGE"
  | "CALL_PACKAGING_SUPPORT"
  | "CHECK_INVENTORY"
  | "REBALANCE_CAPACITY"

type RuntimeStageFunctionalType =
  | RuntimeStageType
  | "COOLING"
  | "PLATING"
  | "UNKNOWN"

export type RuntimeStage = {
  id: string
  name: string
  station: string
  assignedRole: string
  assignedEmployee: string
  plannedMinutes: number
  elapsedMinutes: number
  capacityTarget: number
  currentOutput: number
  status: RuntimeStageStatus
  risk: RuntimeRiskLevel
  aiNote: string

  stageType?: RuntimeStageType
  sequence?: number
  dependsOnStageId?: string
  blocksStageIds?: string[]
  recommendedAction?: RuntimeActionType
  actionLabel?: string
  operationalImpact?: string
}

export type RuntimeEngineSummary = {
  totalStages: number
  activeStages: number
  delayedStages: number
  completedStages: number
  blockedStages: number
  totalCapacityTarget: number
  totalCurrentOutput: number
  runtimeEfficiency: number
  aiSupervisorStatus: RuntimeRiskLevel
}

export type RuntimeEngineDecision = {
  id: string
  stageId: string
  stageName: string
  risk: RuntimeRiskLevel
  action: RuntimeActionType
  title: string
  body: string
  priority: number
}

export const REALTIME_RUNTIME_STAGES: RuntimeStage[] = [
  {
    id: "stage-001",
    name: "Ingredient Prep",
    station: "Prep Station",
    assignedRole: "Commis Chef",
    assignedEmployee: "Ahmed Hassan",
    plannedMinutes: 45,
    elapsedMinutes: 32,
    capacityTarget: 320,
    currentOutput: 240,
    status: "ACTIVE",
    risk: "LOW",
    aiNote: "Prep is moving within safe capacity range.",
    stageType: "PREP",
    sequence: 1,
    blocksStageIds: ["stage-002", "stage-003"],
    recommendedAction: "MONITOR",
    actionLabel: "Keep prep flow moving",
    operationalImpact:
      "Prep is feeding cooking and assembly without current pressure.",
  },
  {
    id: "stage-002",
    name: "Cooking",
    station: "Hot Kitchen",
    assignedRole: "CDP Hot Kitchen",
    assignedEmployee: "Mohamed Ali",
    plannedMinutes: 60,
    elapsedMinutes: 58,
    capacityTarget: 280,
    currentOutput: 210,
    status: "DELAYED",
    risk: "HIGH",
    aiNote: "Cooking is close to time limit with lower output than target.",
    stageType: "COOKING",
    sequence: 2,
    dependsOnStageId: "stage-001",
    blocksStageIds: ["stage-003", "stage-004"],
    recommendedAction: "MOVE_SUPPORT",
    actionLabel: "Move support to hot kitchen",
    operationalImpact:
      "Cooking delay may reduce assembly speed and create pressure before QC.",
  },
  {
    id: "stage-003",
    name: "Batch Assembly",
    station: "Assembly Line",
    assignedRole: "Assembly Supervisor",
    assignedEmployee: "Sara Mahmoud",
    plannedMinutes: 50,
    elapsedMinutes: 44,
    capacityTarget: 350,
    currentOutput: 310,
    status: "ACTIVE",
    risk: "LOW",
    aiNote: "Assembly output is strong and aligned with target.",
    stageType: "ASSEMBLY",
    sequence: 3,
    dependsOnStageId: "stage-002",
    blocksStageIds: ["stage-004"],
    recommendedAction: "MONITOR",
    actionLabel: "Maintain assembly pace",
    operationalImpact:
      "Assembly is currently stable and ready to feed QC once cooking catches up.",
  },
  {
    id: "stage-004",
    name: "Head Chef Check",
    station: "Quality Control",
    assignedRole: "Head Chef",
    assignedEmployee: "Omar Khaled",
    plannedMinutes: 30,
    elapsedMinutes: 36,
    capacityTarget: 300,
    currentOutput: 230,
    status: "BLOCKED",
    risk: "CRITICAL",
    aiNote: "QC is blocking downstream packaging. Immediate review required.",
    stageType: "QC",
    sequence: 4,
    dependsOnStageId: "stage-003",
    blocksStageIds: ["stage-005", "stage-006"],
    recommendedAction: "ESCALATE_TO_HEAD_CHEF",
    actionLabel: "Escalate QC release",
    operationalImpact:
      "QC hold is blocking packaging and may create dispatch delay.",
  },
  {
    id: "stage-005",
    name: "Packaging",
    station: "Packaging Station",
    assignedRole: "Packaging Lead",
    assignedEmployee: "Mina Adel",
    plannedMinutes: 55,
    elapsedMinutes: 27,
    capacityTarget: 360,
    currentOutput: 170,
    status: "WAITING",
    risk: "MEDIUM",
    aiNote: "Packaging is waiting for QC release.",
    stageType: "PACKAGING",
    sequence: 5,
    dependsOnStageId: "stage-004",
    blocksStageIds: ["stage-006"],
    recommendedAction: "HOLD_DOWNSTREAM",
    actionLabel: "Keep packaging team on standby",
    operationalImpact:
      "Packaging cannot start fully until QC releases approved batches.",
  },
  {
    id: "stage-006",
    name: "Dispatch",
    station: "Dispatch Zone",
    assignedRole: "Dispatch Coordinator",
    assignedEmployee: "Youssef Samir",
    plannedMinutes: 40,
    elapsedMinutes: 0,
    capacityTarget: 300,
    currentOutput: 0,
    status: "WAITING",
    risk: "MEDIUM",
    aiNote: "Dispatch is not started yet. Dependent on packaging completion.",
    stageType: "DISPATCH",
    sequence: 6,
    dependsOnStageId: "stage-005",
    blocksStageIds: [],
    recommendedAction: "MONITOR",
    actionLabel: "Prepare dispatch release window",
    operationalImpact:
      "Dispatch is waiting for packaged output and may become high risk if QC remains blocked.",
  },
]

function getRuntimeStageSearchText(stage: RuntimeStage) {
  return `${stage.name} ${stage.station} ${stage.stageType ?? ""}`.toUpperCase()
}

function getRuntimeStageFunctionalType(
  stage: RuntimeStage
): RuntimeStageFunctionalType {
  const text = getRuntimeStageSearchText(stage)

  if (text.includes("COOLING") || text.includes("CHILLER")) return "COOLING"
  if (text.includes("PLATING")) return "PLATING"
  if (text.includes("PACKAGING")) return "PACKAGING"
  if (text.includes("DISPATCH")) return "DISPATCH"
  if (text.includes("QC") || text.includes("QUALITY")) return "QC"
  if (text.includes("ASSEMBLY")) return "ASSEMBLY"
  if (text.includes("COOKING") || text.includes("HOT")) return "COOKING"
  if (text.includes("PREP")) return "PREP"

  return stage.stageType ?? "UNKNOWN"
}

export function getRuntimeEngineSummary(
  stages: RuntimeStage[] = REALTIME_RUNTIME_STAGES
): RuntimeEngineSummary {
  const totalStages = stages.length

  const activeStages = stages.filter((stage) => stage.status === "ACTIVE").length
  const delayedStages = stages.filter((stage) => stage.status === "DELAYED").length
  const completedStages = stages.filter(
    (stage) => stage.status === "COMPLETED"
  ).length
  const blockedStages = stages.filter((stage) => stage.status === "BLOCKED").length

  const totalCapacityTarget = stages.reduce(
    (total, stage) => total + stage.capacityTarget,
    0
  )

  const totalCurrentOutput = stages.reduce(
    (total, stage) => total + stage.currentOutput,
    0
  )

  const runtimeEfficiency =
    totalCapacityTarget > 0
      ? Math.round((totalCurrentOutput / totalCapacityTarget) * 100)
      : 0

  const aiSupervisorStatus = getHighestRuntimeRisk(stages)

  return {
    totalStages,
    activeStages,
    delayedStages,
    completedStages,
    blockedStages,
    totalCapacityTarget,
    totalCurrentOutput,
    runtimeEfficiency,
    aiSupervisorStatus,
  }
}

export function getRuntimeStageProgress(stage: RuntimeStage) {
  if (stage.capacityTarget <= 0) return 0

  return Math.min(
    100,
    Math.round((stage.currentOutput / stage.capacityTarget) * 100)
  )
}

export function getRuntimeTimePressure(stage: RuntimeStage) {
  if (stage.plannedMinutes <= 0) return 0

  return Math.min(
    100,
    Math.round((stage.elapsedMinutes / stage.plannedMinutes) * 100)
  )
}

export function getRuntimeOutputGap(stage: RuntimeStage) {
  return Math.max(0, stage.capacityTarget - stage.currentOutput)
}

export function getRuntimeStageEfficiency(stage: RuntimeStage) {
  if (stage.capacityTarget <= 0) return 0

  return Math.round((stage.currentOutput / stage.capacityTarget) * 100)
}

export function getRuntimeStageCalculatedRisk(
  stage: RuntimeStage
): RuntimeRiskLevel {
  const progress = getRuntimeStageProgress(stage)
  const timePressure = getRuntimeTimePressure(stage)
  const outputGap = getRuntimeOutputGap(stage)

  if (stage.status === "COMPLETED") return "LOW"

  if (stage.status === "BLOCKED") return "CRITICAL"

  if (stage.status === "DELAYED" && timePressure >= 95 && progress < 85) {
    return "CRITICAL"
  }

  if (stage.status === "DELAYED") return "HIGH"

  if (timePressure >= 100 && progress < 90) return "HIGH"

  if (timePressure >= 85 && progress < 75) return "HIGH"

  if (outputGap > 0 && progress < 70 && timePressure >= 65) return "MEDIUM"

  if (stage.status === "WAITING" && stage.dependsOnStageId) return "MEDIUM"

  return "LOW"
}

export function getHighestRuntimeRisk(
  stages: RuntimeStage[] = REALTIME_RUNTIME_STAGES
): RuntimeRiskLevel {
  const calculatedRisks = stages.map((stage) =>
    getRuntimeStageCalculatedRisk(stage)
  )

  if (calculatedRisks.includes("CRITICAL")) return "CRITICAL"
  if (calculatedRisks.includes("HIGH")) return "HIGH"
  if (calculatedRisks.includes("MEDIUM")) return "MEDIUM"

  return "LOW"
}

export function getRuntimeStageDisplayRisk(stage: RuntimeStage) {
  return getRuntimeStageCalculatedRisk(stage)
}

export function getRuntimeRiskScore(risk: RuntimeRiskLevel) {
  if (risk === "CRITICAL") return 4
  if (risk === "HIGH") return 3
  if (risk === "MEDIUM") return 2
  return 1
}

export function sortRuntimeStagesBySequence(stages: RuntimeStage[]) {
  return [...stages].sort((a, b) => (a.sequence ?? 999) - (b.sequence ?? 999))
}

export function getBlockedRuntimeStages(
  stages: RuntimeStage[] = REALTIME_RUNTIME_STAGES
) {
  return stages.filter(
    (stage) =>
      stage.status === "BLOCKED" ||
      getRuntimeStageCalculatedRisk(stage) === "CRITICAL"
  )
}

export function getDelayedRuntimeStages(
  stages: RuntimeStage[] = REALTIME_RUNTIME_STAGES
) {
  return stages.filter(
    (stage) =>
      stage.status === "DELAYED" ||
      getRuntimeStageCalculatedRisk(stage) === "HIGH"
  )
}

export function getRuntimeStageById(
  stageId: string,
  stages: RuntimeStage[] = REALTIME_RUNTIME_STAGES
) {
  return stages.find((stage) => stage.id === stageId)
}

export function getDependentRuntimeStages(
  stageId: string,
  stages: RuntimeStage[] = REALTIME_RUNTIME_STAGES
) {
  return stages.filter((stage) => stage.dependsOnStageId === stageId)
}

export function getRuntimeStageDependencyLabel(
  stage: RuntimeStage,
  stages: RuntimeStage[] = REALTIME_RUNTIME_STAGES
) {
  if (!stage.dependsOnStageId) return "No dependency"

  const dependency = getRuntimeStageById(stage.dependsOnStageId, stages)

  if (!dependency) return "Dependency not found"

  return `Depends on ${dependency.name}`
}

export function getRecommendedRuntimeAction(
  stage: RuntimeStage
): RuntimeActionType {
  const risk = getRuntimeStageCalculatedRisk(stage)
  const progress = getRuntimeStageProgress(stage)
  const timePressure = getRuntimeTimePressure(stage)
  const flowType = getRuntimeStageFunctionalType(stage)

  if (stage.status === "COMPLETED") return "NONE"

  if (stage.status === "BLOCKED" && flowType === "QC") {
    return "ESCALATE_TO_HEAD_CHEF"
  }

  if (stage.status === "BLOCKED") {
    return "HOLD_DOWNSTREAM"
  }

  if (risk === "CRITICAL" && flowType === "PACKAGING") {
    return "CALL_PACKAGING_SUPPORT"
  }

  if (risk === "CRITICAL" && flowType === "COOKING") {
    return "MOVE_SUPPORT"
  }

  if (risk === "CRITICAL") {
    return "ESCALATE_TO_HEAD_CHEF"
  }

  if (risk === "HIGH" && flowType === "COOKING") {
    return "MOVE_SUPPORT"
  }

  if (risk === "HIGH" && flowType === "PACKAGING") {
    return "CALL_PACKAGING_SUPPORT"
  }

  if (risk === "HIGH" && flowType === "QC") {
    return "ESCALATE_TO_HEAD_CHEF"
  }

  if (timePressure >= 85 && progress < 75) {
    return "REBALANCE_CAPACITY"
  }

  if (stage.status === "WAITING" && stage.dependsOnStageId) {
    if (flowType === "PACKAGING") return "HOLD_DOWNSTREAM"
    if (flowType === "DISPATCH") return "HOLD_DOWNSTREAM"
    if (flowType === "QC") return "RELEASE_NEXT_STAGE"
    if (flowType === "PLATING") return "REBALANCE_CAPACITY"
    if (flowType === "ASSEMBLY") return "REBALANCE_CAPACITY"
    if (flowType === "COOLING") return "RELEASE_NEXT_STAGE"

    return "MONITOR"
  }

  return stage.recommendedAction ?? "NONE"
}

function getStageSpecificMonitorLabel(stage: RuntimeStage) {
  const flowType = getRuntimeStageFunctionalType(stage)

  if (flowType === "PREP") return "Keep prep feeding production"
  if (flowType === "COOKING") return "Keep hot kitchen output moving"
  if (flowType === "COOLING") return "Check blast chiller readiness"
  if (flowType === "ASSEMBLY") return "Maintain assembly pace"
  if (flowType === "PLATING") return "Prepare plating line"
  if (flowType === "QC") return "Prepare QC inspection"
  if (flowType === "PACKAGING") return "Prepare packaging line"
  if (flowType === "DISPATCH") return "Prepare dispatch window"

  return stage.actionLabel ?? "Monitor stage"
}

export function getRecommendedRuntimeActionLabel(stage: RuntimeStage) {
  const action = getRecommendedRuntimeAction(stage)
  const flowType = getRuntimeStageFunctionalType(stage)

  if (action === "ESCALATE_TO_HEAD_CHEF") {
    if (flowType === "QC") return "Escalate QC release to Head Chef"
    return "Escalate to Head Chef"
  }

  if (action === "HOLD_DOWNSTREAM") {
    if (flowType === "PACKAGING") return "Keep packaging team on standby"
    if (flowType === "DISPATCH") return "Protect dispatch release window"
    return "Hold downstream stages"
  }

  if (action === "MOVE_SUPPORT") {
    if (flowType === "COOKING") return "Move support to hot kitchen"
    return "Move support to this station"
  }

  if (action === "CALL_PACKAGING_SUPPORT") {
    return "Call packaging support"
  }

  if (action === "REBALANCE_CAPACITY") {
    if (flowType === "PLATING") return "Assign support to plating line"
    if (flowType === "ASSEMBLY") return "Rebalance assembly capacity"
    return "Rebalance capacity"
  }

  if (action === "CHECK_INVENTORY") return "Check inventory availability"

  if (action === "RELEASE_NEXT_STAGE") {
    if (flowType === "COOLING") return "Confirm cooling handoff readiness"
    if (flowType === "QC") return "Prepare QC release check"
    return "Release next stage"
  }

  if (action === "MONITOR") return getStageSpecificMonitorLabel(stage)

  return "No action required"
}

function getMediumRiskNote(stage: RuntimeStage) {
  const flowType = getRuntimeStageFunctionalType(stage)

  if (flowType === "COOLING") {
    return `${stage.name} is waiting for upstream handoff. Check blast chiller space, tray flow, and cooling readiness before QC pressure increases.`
  }

  if (flowType === "QC") {
    return `${stage.name} is waiting for inspection flow. Prepare QC tools, chef approval, and release sequence before packaging becomes blocked.`
  }

  if (flowType === "PLATING" || flowType === "ASSEMBLY") {
    return `${stage.name} is waiting for upstream output. Prepare plates, portion tools, and line workers so plating can start immediately when product arrives.`
  }

  if (flowType === "PACKAGING") {
    return `${stage.name} is waiting for approved product. Keep containers, labels, sealers, and packaging workers ready for immediate start after QC release.`
  }

  if (flowType === "DISPATCH") {
    return `${stage.name} is waiting for packaged output. Prepare route grouping, bagging area, and handoff timing before delivery pressure starts.`
  }

  if (flowType === "COOKING") {
    return `${stage.name} should be watched closely. Hot kitchen output may become delayed if prep handoff or burner capacity does not improve.`
  }

  if (flowType === "PREP") {
    return `${stage.name} should stay ahead of production. Prep delay will slow cooking, assembly, and downstream release.`
  }

  return `${stage.name} requires monitoring. Dependency or output pressure may affect the next stage.`
}

function getHighRiskNote(stage: RuntimeStage) {
  const flowType = getRuntimeStageFunctionalType(stage)

  if (flowType === "COOKING") {
    return `${stage.name} is under hot kitchen pressure. Move support, protect batch timing, and prevent assembly/QC starvation.`
  }

  if (flowType === "PACKAGING") {
    return `${stage.name} is under packaging pressure. Add support, clear sealed output, and protect dispatch readiness.`
  }

  if (flowType === "QC") {
    return `${stage.name} is slowing approval flow. Head Chef or QA release is needed before downstream blockage increases.`
  }

  if (flowType === "PLATING" || flowType === "ASSEMBLY") {
    return `${stage.name} is behind the line target. Rebalance workers and protect QC feed.`
  }

  if (flowType === "COOLING") {
    return `${stage.name} is becoming a cooling bottleneck. Check chiller loading, tray spacing, and temperature handoff immediately.`
  }

  return `${stage.name} is under pressure. Output is behind the target and may affect the next stage.`
}

function getCriticalRiskNote(stage: RuntimeStage) {
  const flowType = getRuntimeStageFunctionalType(stage)
  const progress = getRuntimeStageProgress(stage)
  const timePressure = getRuntimeTimePressure(stage)

  if (flowType === "QC") {
    return `${stage.name} is blocking approval flow. Head Chef release is required now. Current progress is ${progress}% with ${timePressure}% time pressure.`
  }

  if (flowType === "PACKAGING") {
    return `${stage.name} is blocking dispatch readiness. Packaging support is required now. Current progress is ${progress}% with ${timePressure}% time pressure.`
  }

  if (flowType === "COOKING") {
    return `${stage.name} is blocking downstream production. Move support to hot kitchen now. Current progress is ${progress}% with ${timePressure}% time pressure.`
  }

  return `${stage.name} requires immediate attention. Current progress is ${progress}% with ${timePressure}% time pressure.`
}

export function getRuntimeStageAiNote(stage: RuntimeStage) {
  const risk = getRuntimeStageCalculatedRisk(stage)

  if (risk === "CRITICAL") return getCriticalRiskNote(stage)

  if (risk === "HIGH") return getHighRiskNote(stage)

  if (risk === "MEDIUM") return getMediumRiskNote(stage)

  return stage.aiNote
}

export function getRuntimeEngineDecisions(
  stages: RuntimeStage[] = REALTIME_RUNTIME_STAGES
): RuntimeEngineDecision[] {
  return sortRuntimeStagesBySequence(stages)
    .map((stage) => {
      const risk = getRuntimeStageCalculatedRisk(stage)
      const action = getRecommendedRuntimeAction(stage)

      return {
        id: `decision-${stage.id}`,
        stageId: stage.id,
        stageName: stage.name,
        risk,
        action,
        title: getRecommendedRuntimeActionLabel(stage),
        body: getRuntimeStageAiNote(stage),
        priority: getRuntimeRiskScore(risk),
      }
    })
    .filter((decision) => decision.action !== "NONE")
    .sort((a, b) => b.priority - a.priority)
}

export function getRuntimeEngineHeadline(
  stages: RuntimeStage[] = REALTIME_RUNTIME_STAGES
) {
  const summary = getRuntimeEngineSummary(stages)

  if (summary.aiSupervisorStatus === "CRITICAL") {
    return "Critical runtime blockage detected"
  }

  if (summary.aiSupervisorStatus === "HIGH") {
    return "Kitchen runtime is under pressure"
  }

  if (summary.aiSupervisorStatus === "MEDIUM") {
    return "Kitchen runtime requires station-specific readiness"
  }

  return "Kitchen runtime is stable"
}

export function getRuntimeEngineRecommendedFocus(
  stages: RuntimeStage[] = REALTIME_RUNTIME_STAGES
) {
  const decisions = getRuntimeEngineDecisions(stages)

  if (decisions.length === 0) {
    return "No immediate action required. Continue monitoring production flow."
  }

  const topDecision = decisions[0]

  return `${topDecision.stageName}: ${topDecision.title}`
}