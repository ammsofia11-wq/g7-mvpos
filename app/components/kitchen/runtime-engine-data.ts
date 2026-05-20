export type RuntimeStageStatus =
  | "WAITING"
  | "ACTIVE"
  | "DELAYED"
  | "COMPLETED"
  | "BLOCKED"

export type RuntimeRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

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
  },
]

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

  const hasCritical = stages.some((stage) => stage.risk === "CRITICAL")
  const hasHigh = stages.some((stage) => stage.risk === "HIGH")
  const hasMedium = stages.some((stage) => stage.risk === "MEDIUM")

  const aiSupervisorStatus: RuntimeRiskLevel = hasCritical
    ? "CRITICAL"
    : hasHigh
      ? "HIGH"
      : hasMedium
        ? "MEDIUM"
        : "LOW"

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