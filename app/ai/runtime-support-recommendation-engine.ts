export type RuntimeSupportRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

export type RuntimeSupportStageStatus =
  | "WAITING"
  | "ACTIVE"
  | "DELAYED"
  | "COMPLETED"
  | "BLOCKED"
  | "QA_HOLD"
  | "READY_FOR_QC"
  | "RELEASE_BLOCKED"
  | string

export type RuntimeSupportPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT"

export type RuntimeSupportRecommendationType =
  | "SUPPORT_MOVEMENT"
  | "PRIORITIZE_BATCH"
  | "HOLD_RELEASE"
  | "NO_SAFE_ACTION"
  | "MONITOR"

export type RuntimeSupportWorkerStatus =
  | "ACTIVE"
  | "AVAILABLE"
  | "ASSIGNED"
  | "BREAK"
  | "OFFLINE"
  | "BLOCKED"
  | string

export type RuntimeSupportStageInput = {
  id: string
  name: string
  station: string
  status?: RuntimeSupportStageStatus
  priority?: RuntimeSupportPriority
  plannedMinutes?: number
  elapsedMinutes?: number
  targetOutput?: number
  currentOutput?: number
  requiredWorkers?: number
  assignedWorkers?: number
  qaHold?: boolean
  releaseBlocked?: boolean
  coolingRequired?: boolean
  coolingCleared?: boolean
  allergenSensitive?: boolean
  labelRequired?: boolean
  labelCleared?: boolean
  batchCodeRequired?: boolean
  batchCodeCleared?: boolean
}

export type RuntimeSupportWorkerInput = {
  id: string
  employeeId?: string
  name: string
  role?: string
  team?: string
  station?: string
  supervisor?: string
  status?: RuntimeSupportWorkerStatus
  currentTaskId?: string
  currentStageId?: string
  minutesUntilAvailable?: number
  skills?: string[]
  canMoveStations?: boolean
  shiftMinutesRemaining?: number
  performanceScore?: number
}

export type RuntimeSupportRecommendationInput = {
  tenantId?: string
  shiftId?: string
  generatedAt?: string
  stages: RuntimeSupportStageInput[]
  workers?: RuntimeSupportWorkerInput[]
}

export type RuntimeSupportMovement = {
  workerId?: string
  employeeId?: string
  workerName?: string
  fromTeam?: string
  fromStation?: string
  toStation: string
  durationMinutes: number
  supportRole: string
}

export type RuntimeSupportRecommendation = {
  id: string
  type: RuntimeSupportRecommendationType
  severity: RuntimeSupportRiskLevel
  targetStageId: string
  targetStageName: string
  targetStation: string
  timePressureMinutes: number
  stationPressureScore: number
  approvalRequired: boolean
  approvalRoles: string[]
  supportMove?: RuntimeSupportMovement
  reason: string
  evidence: string[]
  blockers: string[]
  safeLimits: string[]
  confidence: number
}

export type RuntimeSupportRecommendationReport = {
  tenantId?: string
  shiftId?: string
  generatedAt: string
  engineVersion: "KC-1A"
  summary: {
    totalStages: number
    delayedStages: number
    blockedStages: number
    qaProtectedStages: number
    availableSupportWorkers: number
    recommendationsCount: number
    highestRisk: RuntimeSupportRiskLevel
  }
  recommendations: RuntimeSupportRecommendation[]
}

type StationPressureSnapshot = {
  station: string
  pressureScore: number
  delayedStages: number
  blockedStages: number
  activeStages: number
  outputGap: number
  workerGap: number
}

const APPROVAL_ROLES = [
  "Executive Chef",
  "Production Manager",
  "Supervisor",
] as const

const QA_SAFE_LIMITS = [
  "Do not release before QA clears cooling evidence.",
  "Do not release before allergen checks are cleared.",
  "Do not release before label checks are cleared.",
  "Do not release before batch code checks are cleared.",
]

function normalizeNumber(value: number | undefined, fallback = 0): number {
  if (typeof value !== "number") return fallback
  if (Number.isNaN(value)) return fallback
  if (!Number.isFinite(value)) return fallback
  return value
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function normalizeStatus(status: string | undefined): string {
  return (status ?? "WAITING").trim().toUpperCase()
}

function normalizePriority(priority: RuntimeSupportPriority | undefined): RuntimeSupportPriority {
  return priority ?? "NORMAL"
}

function riskFromScore(score: number): RuntimeSupportRiskLevel {
  if (score >= 85) return "CRITICAL"
  if (score >= 65) return "HIGH"
  if (score >= 40) return "MEDIUM"
  return "LOW"
}

function riskRank(risk: RuntimeSupportRiskLevel): number {
  if (risk === "CRITICAL") return 4
  if (risk === "HIGH") return 3
  if (risk === "MEDIUM") return 2
  return 1
}

function isDone(stage: RuntimeSupportStageInput): boolean {
  return normalizeStatus(stage.status) === "COMPLETED"
}

function isBlocked(stage: RuntimeSupportStageInput): boolean {
  const status = normalizeStatus(stage.status)
  return status === "BLOCKED" || status === "RELEASE_BLOCKED"
}

function isDelayed(stage: RuntimeSupportStageInput): boolean {
  const status = normalizeStatus(stage.status)
  const plannedMinutes = normalizeNumber(stage.plannedMinutes)
  const elapsedMinutes = normalizeNumber(stage.elapsedMinutes)

  return (
    status === "DELAYED" ||
    status === "BLOCKED" ||
    status === "RELEASE_BLOCKED" ||
    (plannedMinutes > 0 && elapsedMinutes > plannedMinutes)
  )
}

function isQaProtected(stage: RuntimeSupportStageInput): boolean {
  return Boolean(
    stage.qaHold ||
      stage.releaseBlocked ||
      (stage.coolingRequired && !stage.coolingCleared) ||
      (stage.allergenSensitive && !stage.qaHold) ||
      (stage.labelRequired && !stage.labelCleared) ||
      (stage.batchCodeRequired && !stage.batchCodeCleared),
  )
}

export function calculateRuntimeTimePressure(stage: RuntimeSupportStageInput): number {
  if (isDone(stage)) return 0

  const plannedMinutes = normalizeNumber(stage.plannedMinutes)
  const elapsedMinutes = normalizeNumber(stage.elapsedMinutes)
  const targetOutput = normalizeNumber(stage.targetOutput)
  const currentOutput = normalizeNumber(stage.currentOutput)
  const requiredWorkers = normalizeNumber(stage.requiredWorkers)
  const assignedWorkers = normalizeNumber(stage.assignedWorkers)

  const rawDelay = plannedMinutes > 0 ? elapsedMinutes - plannedMinutes : 0
  const delayPressure = rawDelay > 0 ? rawDelay : isDelayed(stage) ? 10 : 0

  const outputGapRatio =
    targetOutput > 0 ? clamp((targetOutput - currentOutput) / targetOutput, 0, 1) : 0

  const workerGap = Math.max(requiredWorkers - assignedWorkers, 0)

  const priority = normalizePriority(stage.priority)
  const priorityBoost =
    priority === "URGENT" ? 12 : priority === "HIGH" ? 8 : priority === "LOW" ? -4 : 0

  const blockedBoost = isBlocked(stage) ? 15 : 0
  const outputBoost = outputGapRatio * 20
  const workerBoost = workerGap * 6

  return Math.round(clamp(delayPressure + priorityBoost + blockedBoost + outputBoost + workerBoost, 0, 120))
}

export function calculateRuntimeStationPressure(
  station: string,
  stages: RuntimeSupportStageInput[],
): StationPressureSnapshot {
  const stationStages = stages.filter((stage) => stage.station === station && !isDone(stage))

  const delayedStages = stationStages.filter(isDelayed).length
  const blockedStages = stationStages.filter(isBlocked).length
  const activeStages = stationStages.filter((stage) => normalizeStatus(stage.status) === "ACTIVE").length

  const outputGap = stationStages.reduce((total, stage) => {
    const targetOutput = normalizeNumber(stage.targetOutput)
    const currentOutput = normalizeNumber(stage.currentOutput)
    return total + Math.max(targetOutput - currentOutput, 0)
  }, 0)

  const workerGap = stationStages.reduce((total, stage) => {
    const requiredWorkers = normalizeNumber(stage.requiredWorkers)
    const assignedWorkers = normalizeNumber(stage.assignedWorkers)
    return total + Math.max(requiredWorkers - assignedWorkers, 0)
  }, 0)

  const timePressure = stationStages.reduce((total, stage) => {
    return total + calculateRuntimeTimePressure(stage)
  }, 0)

  const pressureScore = clamp(
    timePressure / Math.max(stationStages.length, 1) +
      delayedStages * 10 +
      blockedStages * 18 +
      workerGap * 8 +
      Math.min(outputGap, 25),
    0,
    100,
  )

  return {
    station,
    pressureScore: Math.round(pressureScore),
    delayedStages,
    blockedStages,
    activeStages,
    outputGap,
    workerGap,
  }
}

function getStationSnapshots(stages: RuntimeSupportStageInput[]): StationPressureSnapshot[] {
  const stations = Array.from(new Set(stages.map((stage) => stage.station).filter(Boolean)))

  return stations.map((station) => calculateRuntimeStationPressure(station, stages))
}

function isWorkerAvailable(worker: RuntimeSupportWorkerInput): boolean {
  const status = normalizeStatus(worker.status)

  if (worker.canMoveStations === false) return false
  if (status === "BREAK") return false
  if (status === "OFFLINE") return false
  if (status === "BLOCKED") return false
  if (normalizeNumber(worker.minutesUntilAvailable) > 10) return false
  if (normalizeNumber(worker.shiftMinutesRemaining, 60) < 20) return false

  return !worker.currentTaskId && !worker.currentStageId
}

function scoreWorkerForStage(
  worker: RuntimeSupportWorkerInput,
  stage: RuntimeSupportStageInput,
  stationSnapshots: StationPressureSnapshot[],
): number {
  const skills = worker.skills ?? []
  const stationSkillMatch = skills.some((skill) => {
    return skill.toLowerCase() === stage.station.toLowerCase()
  })

  const roleSkillMatch = skills.some((skill) => {
    const normalizedSkill = skill.toLowerCase()
    const normalizedStation = stage.station.toLowerCase()

    return (
      normalizedStation.includes(normalizedSkill) ||
      normalizedSkill.includes("prep") ||
      normalizedSkill.includes("commie") ||
      normalizedSkill.includes("support")
    )
  })

  const sourceStationPressure =
    stationSnapshots.find((snapshot) => snapshot.station === worker.station)?.pressureScore ?? 50

  const performanceScore = clamp(normalizeNumber(worker.performanceScore, 75), 0, 100)

  const skillScore = stationSkillMatch ? 30 : roleSkillMatch ? 18 : 8
  const pressureScore = sourceStationPressure <= 35 ? 25 : sourceStationPressure <= 50 ? 12 : -20
  const performanceBoost = performanceScore / 5

  return Math.round(skillScore + pressureScore + performanceBoost)
}

function findBestSupportWorker(
  stage: RuntimeSupportStageInput,
  workers: RuntimeSupportWorkerInput[],
  stationSnapshots: StationPressureSnapshot[],
): RuntimeSupportWorkerInput | undefined {
  const availableWorkers = workers
    .filter(isWorkerAvailable)
    .filter((worker) => worker.station !== stage.station)
    .map((worker) => ({
      worker,
      score: scoreWorkerForStage(worker, stage, stationSnapshots),
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)

  return availableWorkers[0]?.worker
}

function getBlockers(stage: RuntimeSupportStageInput): string[] {
  const blockers: string[] = []

  if (stage.qaHold) blockers.push("QA hold is active.")
  if (stage.releaseBlocked) blockers.push("Release is blocked.")
  if (stage.coolingRequired && !stage.coolingCleared) {
    blockers.push("Cooling evidence is not cleared.")
  }
  if (stage.labelRequired && !stage.labelCleared) {
    blockers.push("Label check is not cleared.")
  }
  if (stage.batchCodeRequired && !stage.batchCodeCleared) {
    blockers.push("Batch code check is not cleared.")
  }

  return blockers
}

function getSafeLimits(stage: RuntimeSupportStageInput): string[] {
  const limits = [
    "Support movement must not override station SOP.",
    "Support movement must be approved before worker reassignment.",
  ]

  if (isQaProtected(stage)) {
    return [...limits, ...QA_SAFE_LIMITS]
  }

  return limits
}

function buildRecommendationReason(
  stage: RuntimeSupportStageInput,
  supportWorker: RuntimeSupportWorkerInput | undefined,
  pressure: StationPressureSnapshot,
): string {
  if (supportWorker) {
    return `${stage.station} needs temporary support because ${stage.name} is under time or output pressure. ${supportWorker.name} is the safest available support candidate from ${supportWorker.station ?? "another station"}.`
  }

  if (isQaProtected(stage)) {
    return `${stage.station} is protected by QA or release gates. The system can monitor and escalate, but it must not release the batch until required checks are cleared.`
  }

  if (pressure.pressureScore >= 65) {
    return `${stage.station} is under high pressure, but no safe support worker is currently available. Escalation is required.`
  }

  return `${stage.station} should be monitored. Pressure exists, but it has not crossed the support movement threshold.`
}

function buildRecommendationEvidence(
  stage: RuntimeSupportStageInput,
  pressure: StationPressureSnapshot,
  timePressureMinutes: number,
): string[] {
  const evidence = [
    `Stage status: ${stage.status ?? "WAITING"}.`,
    `Time pressure: ${timePressureMinutes} minutes.`,
    `Station pressure score: ${pressure.pressureScore}/100.`,
  ]

  if (pressure.delayedStages > 0) {
    evidence.push(`Delayed stages in station: ${pressure.delayedStages}.`)
  }

  if (pressure.blockedStages > 0) {
    evidence.push(`Blocked stages in station: ${pressure.blockedStages}.`)
  }

  if (pressure.workerGap > 0) {
    evidence.push(`Worker gap in station: ${pressure.workerGap}.`)
  }

  if (pressure.outputGap > 0) {
    evidence.push(`Output gap in station: ${pressure.outputGap}.`)
  }

  return evidence
}

function getRecommendationType(
  stage: RuntimeSupportStageInput,
  supportWorker: RuntimeSupportWorkerInput | undefined,
  pressureScore: number,
): RuntimeSupportRecommendationType {
  if (supportWorker && pressureScore >= 40 && !isDone(stage)) return "SUPPORT_MOVEMENT"
  if (isQaProtected(stage)) return "HOLD_RELEASE"
  if (pressureScore >= 65) return "NO_SAFE_ACTION"
  if (pressureScore >= 40) return "PRIORITIZE_BATCH"
  return "MONITOR"
}

function createRecommendationId(stage: RuntimeSupportStageInput, index: number): string {
  return `kc-1a-${stage.id}-${index + 1}`
}

function createStageRecommendation(
  stage: RuntimeSupportStageInput,
  index: number,
  stages: RuntimeSupportStageInput[],
  workers: RuntimeSupportWorkerInput[],
): RuntimeSupportRecommendation | undefined {
  if (isDone(stage)) return undefined

  const stationSnapshots = getStationSnapshots(stages)
  const pressure = calculateRuntimeStationPressure(stage.station, stages)
  const timePressureMinutes = calculateRuntimeTimePressure(stage)
  const pressureScore = Math.max(pressure.pressureScore, timePressureMinutes)

  if (pressureScore < 35 && !isQaProtected(stage)) return undefined

  const supportWorker = findBestSupportWorker(stage, workers, stationSnapshots)
  const type = getRecommendationType(stage, supportWorker, pressureScore)
  const severity = riskFromScore(pressureScore)
  const blockers = getBlockers(stage)

  const supportMove: RuntimeSupportMovement | undefined = supportWorker
    ? {
        workerId: supportWorker.id,
        employeeId: supportWorker.employeeId,
        workerName: supportWorker.name,
        fromTeam: supportWorker.team,
        fromStation: supportWorker.station,
        toStation: stage.station,
        durationMinutes: severity === "CRITICAL" ? 35 : severity === "HIGH" ? 25 : 15,
        supportRole: supportWorker.role ?? "Station Support",
      }
    : undefined

  const confidenceBase = supportWorker ? 78 : type === "HOLD_RELEASE" ? 72 : 58
  const confidence = clamp(confidenceBase + Math.min(pressureScore / 5, 18), 45, 95)

  return {
    id: createRecommendationId(stage, index),
    type,
    severity,
    targetStageId: stage.id,
    targetStageName: stage.name,
    targetStation: stage.station,
    timePressureMinutes,
    stationPressureScore: pressure.pressureScore,
    approvalRequired: type !== "MONITOR",
    approvalRoles: type === "MONITOR" ? [] : [...APPROVAL_ROLES],
    supportMove,
    reason: buildRecommendationReason(stage, supportWorker, pressure),
    evidence: buildRecommendationEvidence(stage, pressure, timePressureMinutes),
    blockers,
    safeLimits: getSafeLimits(stage),
    confidence: Math.round(confidence),
  }
}

export function createRuntimeSupportRecommendationReport(
  input: RuntimeSupportRecommendationInput,
): RuntimeSupportRecommendationReport {
  const stages = input.stages ?? []
  const workers = input.workers ?? []

  const recommendations = stages
    .map((stage, index) => createStageRecommendation(stage, index, stages, workers))
    .filter((recommendation): recommendation is RuntimeSupportRecommendation => {
      return Boolean(recommendation)
    })
    .sort((a, b) => {
      const riskDifference = riskRank(b.severity) - riskRank(a.severity)
      if (riskDifference !== 0) return riskDifference
      return b.stationPressureScore - a.stationPressureScore
    })

  const highestRisk =
    recommendations[0]?.severity ??
    stages.reduce<RuntimeSupportRiskLevel>((highest, stage) => {
      const risk = riskFromScore(calculateRuntimeTimePressure(stage))
      return riskRank(risk) > riskRank(highest) ? risk : highest
    }, "LOW")

  return {
    tenantId: input.tenantId,
    shiftId: input.shiftId,
    generatedAt: input.generatedAt ?? new Date().toISOString(),
    engineVersion: "KC-1A",
    summary: {
      totalStages: stages.length,
      delayedStages: stages.filter(isDelayed).length,
      blockedStages: stages.filter(isBlocked).length,
      qaProtectedStages: stages.filter(isQaProtected).length,
      availableSupportWorkers: workers.filter(isWorkerAvailable).length,
      recommendationsCount: recommendations.length,
      highestRisk,
    },
    recommendations,
  }
}

export const getRuntimeSupportRecommendationReport =
  createRuntimeSupportRecommendationReport
