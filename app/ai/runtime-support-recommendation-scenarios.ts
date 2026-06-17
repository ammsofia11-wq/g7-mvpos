import {
  createRuntimeSupportRecommendationReport,
  type RuntimeSupportRecommendationInput,
  type RuntimeSupportRecommendationReport,
  type RuntimeSupportStageInput,
  type RuntimeSupportWorkerInput,
} from "./runtime-support-recommendation-engine"

export type KitchenCommandScenarioId =
  | "HOT_KITCHEN_DELAYED_PREP_SUPPORT"
  | "PACKAGING_BOTTLENECK_SUPPORT"
  | "QA_HOLD_BLOCKING_RELEASE"
  | "BUTCHERY_INGREDIENT_SHORTAGE"
  | "NO_SAFE_WORKER_AVAILABLE"

export type KitchenCommandScenarioExpectedSignal =
  | "DELAY_DETECTED"
  | "TIME_PRESSURE_CALCULATED"
  | "STATION_PRESSURE_CALCULATED"
  | "SUPPORT_WORKER_FOUND"
  | "SUPPORT_MOVEMENT_RECOMMENDED"
  | "QA_RELEASE_PROTECTED"
  | "APPROVAL_REQUIRED"
  | "NO_SAFE_ACTION"
  | "MONITOR_ONLY"

export type KitchenCommandScenario = {
  id: KitchenCommandScenarioId
  title: string
  description: string
  expectedSignals: KitchenCommandScenarioExpectedSignal[]
  input: RuntimeSupportRecommendationInput
}

export type KitchenCommandScenarioReport = RuntimeSupportRecommendationReport & {
  scenarioId: KitchenCommandScenarioId
  scenarioTitle: string
  scenarioDescription: string
  expectedSignals: KitchenCommandScenarioExpectedSignal[]
}

export type KitchenCommandScenarioSummary = {
  scenarioId: KitchenCommandScenarioId
  title: string
  highestRisk: RuntimeSupportRecommendationReport["summary"]["highestRisk"]
  recommendationsCount: number
  firstRecommendationType?: string
  firstRecommendationReason?: string
  approvalRequired: boolean
}

const DEMO_TENANT_ID = "global-central-kitchen-demo"
const DEMO_SHIFT_ID = "morning-production-shift"
const DEMO_TIMESTAMP = "2026-01-01T08:00:00.000Z"

function stage(input: RuntimeSupportStageInput): RuntimeSupportStageInput {
  return input
}

function worker(input: RuntimeSupportWorkerInput): RuntimeSupportWorkerInput {
  return input
}

const hotKitchenDelayedStages: RuntimeSupportStageInput[] = [
  stage({
    id: "stage-classic-kofta-hot-kitchen",
    name: "Classic Kofta Batch Cooking",
    station: "Classic Lunch & Dinner",
    status: "DELAYED",
    priority: "HIGH",
    plannedMinutes: 45,
    elapsedMinutes: 63,
    targetOutput: 120,
    currentOutput: 78,
    requiredWorkers: 4,
    assignedWorkers: 3,
    coolingRequired: true,
    coolingCleared: false,
    labelRequired: true,
    labelCleared: false,
    batchCodeRequired: true,
    batchCodeCleared: true,
  }),
  stage({
    id: "stage-prep-vegetable-base",
    name: "Vegetable Base Preparation",
    station: "Prep",
    status: "ACTIVE",
    priority: "NORMAL",
    plannedMinutes: 50,
    elapsedMinutes: 22,
    targetOutput: 80,
    currentOutput: 86,
    requiredWorkers: 2,
    assignedWorkers: 2,
  }),
  stage({
    id: "stage-salad-garnish",
    name: "Salad Garnish Prep",
    station: "Salads",
    status: "ACTIVE",
    priority: "LOW",
    plannedMinutes: 40,
    elapsedMinutes: 18,
    targetOutput: 60,
    currentOutput: 64,
    requiredWorkers: 2,
    assignedWorkers: 2,
  }),
]

const hotKitchenDelayedWorkers: RuntimeSupportWorkerInput[] = [
  worker({
    id: "worker-prep-commie-01",
    employeeId: "EMP-PREP-001",
    name: "Prep Commie 01",
    role: "Commie",
    team: "Preparation team",
    station: "Prep",
    supervisor: "Prep Supervisor",
    status: "AVAILABLE",
    skills: ["Prep", "support", "Classic Lunch & Dinner"],
    canMoveStations: true,
    shiftMinutesRemaining: 180,
    performanceScore: 84,
  }),
  worker({
    id: "worker-salad-01",
    employeeId: "EMP-SALAD-001",
    name: "Salad Worker 01",
    role: "Kitchen Helper",
    team: "Preparation team",
    station: "Salads",
    supervisor: "Salad Supervisor",
    status: "ACTIVE",
    currentStageId: "stage-salad-garnish",
    skills: ["Salads", "Prep"],
    canMoveStations: true,
    shiftMinutesRemaining: 160,
    performanceScore: 78,
  }),
]

const packagingBottleneckStages: RuntimeSupportStageInput[] = [
  stage({
    id: "stage-packaging-protein-boxes",
    name: "Protein Meal Box Packaging",
    station: "Packaging",
    status: "DELAYED",
    priority: "URGENT",
    plannedMinutes: 35,
    elapsedMinutes: 52,
    targetOutput: 180,
    currentOutput: 92,
    requiredWorkers: 5,
    assignedWorkers: 3,
    coolingRequired: true,
    coolingCleared: true,
    labelRequired: true,
    labelCleared: true,
    batchCodeRequired: true,
    batchCodeCleared: true,
  }),
  stage({
    id: "stage-bakery-bread-pack",
    name: "Bakery Bread Packing Prep",
    station: "Bakery Bread",
    status: "ACTIVE",
    priority: "NORMAL",
    plannedMinutes: 60,
    elapsedMinutes: 20,
    targetOutput: 100,
    currentOutput: 112,
    requiredWorkers: 2,
    assignedWorkers: 2,
  }),
  stage({
    id: "stage-cleaning-kumara",
    name: "Kumara Area Reset",
    station: "Cleaning / Kumara",
    status: "ACTIVE",
    priority: "LOW",
    plannedMinutes: 45,
    elapsedMinutes: 16,
    targetOutput: 1,
    currentOutput: 1,
    requiredWorkers: 2,
    assignedWorkers: 2,
  }),
]

const packagingBottleneckWorkers: RuntimeSupportWorkerInput[] = [
  worker({
    id: "worker-bakery-support-01",
    employeeId: "EMP-BAKERY-001",
    name: "Bakery Support 01",
    role: "Packaging Support",
    team: "Packaging team",
    station: "Bakery Bread",
    supervisor: "Bakery Supervisor",
    status: "AVAILABLE",
    skills: ["Packaging", "support", "Bakery Bread"],
    canMoveStations: true,
    shiftMinutesRemaining: 140,
    performanceScore: 88,
  }),
  worker({
    id: "worker-cleaning-helper-01",
    employeeId: "EMP-CLEAN-001",
    name: "Cleaning Helper 01",
    role: "Kitchen Helper",
    team: "Cleaning team",
    station: "Cleaning / Kumara",
    supervisor: "Cleaning Supervisor",
    status: "AVAILABLE",
    skills: ["Cleaning", "support"],
    canMoveStations: true,
    shiftMinutesRemaining: 150,
    performanceScore: 74,
  }),
]

const qaHoldStages: RuntimeSupportStageInput[] = [
  stage({
    id: "stage-keto-chicken-release",
    name: "Keto Chicken Batch Release",
    station: "Keto / Vegan / GF-DF",
    status: "RELEASE_BLOCKED",
    priority: "URGENT",
    plannedMinutes: 30,
    elapsedMinutes: 42,
    targetOutput: 90,
    currentOutput: 90,
    requiredWorkers: 2,
    assignedWorkers: 2,
    qaHold: true,
    releaseBlocked: true,
    coolingRequired: true,
    coolingCleared: false,
    allergenSensitive: true,
    labelRequired: true,
    labelCleared: false,
    batchCodeRequired: true,
    batchCodeCleared: true,
  }),
  stage({
    id: "stage-qa-label-check",
    name: "QA Label Verification",
    station: "Food Safety Officer",
    status: "ACTIVE",
    priority: "HIGH",
    plannedMinutes: 20,
    elapsedMinutes: 14,
    targetOutput: 90,
    currentOutput: 40,
    requiredWorkers: 1,
    assignedWorkers: 1,
  }),
]

const qaHoldWorkers: RuntimeSupportWorkerInput[] = [
  worker({
    id: "worker-qa-officer-01",
    employeeId: "EMP-QA-001",
    name: "Food Safety Officer 01",
    role: "Food Safety Officer",
    team: "Food Safety",
    station: "Food Safety Officer",
    supervisor: "Executive Chef",
    status: "ACTIVE",
    currentStageId: "stage-qa-label-check",
    skills: ["QA", "Food Safety", "Allergen"],
    canMoveStations: false,
    shiftMinutesRemaining: 180,
    performanceScore: 92,
  }),
]

const butcheryShortageStages: RuntimeSupportStageInput[] = [
  stage({
    id: "stage-butchery-protein-shortage",
    name: "Chicken Breast Butchery Allocation",
    station: "Butchery",
    status: "BLOCKED",
    priority: "URGENT",
    plannedMinutes: 40,
    elapsedMinutes: 64,
    targetOutput: 140,
    currentOutput: 55,
    requiredWorkers: 3,
    assignedWorkers: 2,
    coolingRequired: false,
    labelRequired: false,
    batchCodeRequired: true,
    batchCodeCleared: false,
  }),
  stage({
    id: "stage-classic-hot-ready",
    name: "Classic Sauce Base Cooking",
    station: "Classic Lunch & Dinner",
    status: "WAITING",
    priority: "HIGH",
    plannedMinutes: 35,
    elapsedMinutes: 0,
    targetOutput: 140,
    currentOutput: 0,
    requiredWorkers: 3,
    assignedWorkers: 3,
  }),
]

const butcheryShortageWorkers: RuntimeSupportWorkerInput[] = [
  worker({
    id: "worker-butchery-01",
    employeeId: "EMP-BUTCHERY-001",
    name: "Butchery Worker 01",
    role: "Butcher",
    team: "Preparation team",
    station: "Butchery",
    supervisor: "Butchery Supervisor",
    status: "BLOCKED",
    currentStageId: "stage-butchery-protein-shortage",
    skills: ["Butchery", "Protein Prep"],
    canMoveStations: false,
    shiftMinutesRemaining: 180,
    performanceScore: 86,
  }),
  worker({
    id: "worker-hot-kitchen-01",
    employeeId: "EMP-HOT-001",
    name: "Hot Kitchen Cook 01",
    role: "Cook",
    team: "Cooking team",
    station: "Classic Lunch & Dinner",
    supervisor: "Hot Kitchen Supervisor",
    status: "ACTIVE",
    currentStageId: "stage-classic-hot-ready",
    skills: ["Cooking", "Classic Lunch & Dinner"],
    canMoveStations: false,
    shiftMinutesRemaining: 180,
    performanceScore: 82,
  }),
]

const noSafeWorkerStages: RuntimeSupportStageInput[] = [
  stage({
    id: "stage-breakfast-soups-delay",
    name: "Breakfast Soup Production",
    station: "Breakfast & Soups",
    status: "DELAYED",
    priority: "HIGH",
    plannedMinutes: 50,
    elapsedMinutes: 72,
    targetOutput: 110,
    currentOutput: 68,
    requiredWorkers: 4,
    assignedWorkers: 2,
    coolingRequired: true,
    coolingCleared: false,
    labelRequired: true,
    labelCleared: false,
    batchCodeRequired: true,
    batchCodeCleared: true,
  }),
  stage({
    id: "stage-packaging-normal",
    name: "Normal Packaging Flow",
    station: "Packaging",
    status: "ACTIVE",
    priority: "NORMAL",
    plannedMinutes: 45,
    elapsedMinutes: 24,
    targetOutput: 90,
    currentOutput: 88,
    requiredWorkers: 3,
    assignedWorkers: 3,
  }),
]

const noSafeWorkerWorkers: RuntimeSupportWorkerInput[] = [
  worker({
    id: "worker-packaging-01",
    employeeId: "EMP-PACK-001",
    name: "Packaging Worker 01",
    role: "Packaging",
    team: "Packaging team",
    station: "Packaging",
    supervisor: "Packaging Supervisor",
    status: "ACTIVE",
    currentStageId: "stage-packaging-normal",
    skills: ["Packaging", "support"],
    canMoveStations: true,
    shiftMinutesRemaining: 130,
    performanceScore: 80,
  }),
  worker({
    id: "worker-prep-break-01",
    employeeId: "EMP-PREP-002",
    name: "Prep Worker Break 01",
    role: "Prep",
    team: "Preparation team",
    station: "Prep",
    supervisor: "Prep Supervisor",
    status: "BREAK",
    skills: ["Prep", "Breakfast & Soups"],
    canMoveStations: true,
    shiftMinutesRemaining: 120,
    performanceScore: 82,
  }),
  worker({
    id: "worker-cleaning-offline-01",
    employeeId: "EMP-CLEAN-002",
    name: "Cleaning Worker Offline 01",
    role: "Cleaning",
    team: "Cleaning team",
    station: "Cleaning / Kumara",
    supervisor: "Cleaning Supervisor",
    status: "OFFLINE",
    skills: ["Cleaning", "support"],
    canMoveStations: true,
    shiftMinutesRemaining: 0,
    performanceScore: 70,
  }),
]

export const KITCHEN_COMMAND_SCENARIOS: KitchenCommandScenario[] = [
  {
    id: "HOT_KITCHEN_DELAYED_PREP_SUPPORT",
    title: "Hot kitchen delayed with prep team support available",
    description:
      "Classic Lunch & Dinner is behind planned pace while Prep is ahead and has a movable commie. The engine should recommend temporary support movement with approval.",
    expectedSignals: [
      "DELAY_DETECTED",
      "TIME_PRESSURE_CALCULATED",
      "STATION_PRESSURE_CALCULATED",
      "SUPPORT_WORKER_FOUND",
      "SUPPORT_MOVEMENT_RECOMMENDED",
      "APPROVAL_REQUIRED",
    ],
    input: {
      tenantId: DEMO_TENANT_ID,
      shiftId: DEMO_SHIFT_ID,
      generatedAt: DEMO_TIMESTAMP,
      stages: hotKitchenDelayedStages,
      workers: hotKitchenDelayedWorkers,
    },
  },
  {
    id: "PACKAGING_BOTTLENECK_SUPPORT",
    title: "Packaging bottleneck with bakery support available",
    description:
      "Packaging is behind output target while Bakery Bread is ahead. The engine should recommend moving a support worker into Packaging for a limited duration.",
    expectedSignals: [
      "DELAY_DETECTED",
      "TIME_PRESSURE_CALCULATED",
      "STATION_PRESSURE_CALCULATED",
      "SUPPORT_WORKER_FOUND",
      "SUPPORT_MOVEMENT_RECOMMENDED",
      "APPROVAL_REQUIRED",
    ],
    input: {
      tenantId: DEMO_TENANT_ID,
      shiftId: DEMO_SHIFT_ID,
      generatedAt: DEMO_TIMESTAMP,
      stages: packagingBottleneckStages,
      workers: packagingBottleneckWorkers,
    },
  },
  {
    id: "QA_HOLD_BLOCKING_RELEASE",
    title: "QA hold blocks release",
    description:
      "A Keto / Vegan / GF-DF batch is blocked by QA, cooling evidence, allergen sensitivity, and label checks. The engine must protect release gates and avoid unsafe release.",
    expectedSignals: [
      "DELAY_DETECTED",
      "TIME_PRESSURE_CALCULATED",
      "QA_RELEASE_PROTECTED",
      "APPROVAL_REQUIRED",
    ],
    input: {
      tenantId: DEMO_TENANT_ID,
      shiftId: DEMO_SHIFT_ID,
      generatedAt: DEMO_TIMESTAMP,
      stages: qaHoldStages,
      workers: qaHoldWorkers,
    },
  },
  {
    id: "BUTCHERY_INGREDIENT_SHORTAGE",
    title: "Butchery ingredient shortage blocks downstream cooking",
    description:
      "Butchery is blocked and batch code evidence is incomplete. The engine should escalate because worker movement alone cannot solve ingredient or traceability shortage.",
    expectedSignals: [
      "DELAY_DETECTED",
      "TIME_PRESSURE_CALCULATED",
      "STATION_PRESSURE_CALCULATED",
      "NO_SAFE_ACTION",
      "APPROVAL_REQUIRED",
    ],
    input: {
      tenantId: DEMO_TENANT_ID,
      shiftId: DEMO_SHIFT_ID,
      generatedAt: DEMO_TIMESTAMP,
      stages: butcheryShortageStages,
      workers: butcheryShortageWorkers,
    },
  },
  {
    id: "NO_SAFE_WORKER_AVAILABLE",
    title: "Delayed station with no safe worker available",
    description:
      "Breakfast & Soups is delayed, but all possible support workers are active, on break, offline, or unsafe to move. The engine should not force unsafe movement.",
    expectedSignals: [
      "DELAY_DETECTED",
      "TIME_PRESSURE_CALCULATED",
      "STATION_PRESSURE_CALCULATED",
      "NO_SAFE_ACTION",
      "APPROVAL_REQUIRED",
    ],
    input: {
      tenantId: DEMO_TENANT_ID,
      shiftId: DEMO_SHIFT_ID,
      generatedAt: DEMO_TIMESTAMP,
      stages: noSafeWorkerStages,
      workers: noSafeWorkerWorkers,
    },
  },
]

export function getKitchenCommandScenario(
  scenarioId: KitchenCommandScenarioId,
): KitchenCommandScenario {
  const scenario = KITCHEN_COMMAND_SCENARIOS.find((item) => item.id === scenarioId)

  if (!scenario) {
    throw new Error(`Kitchen command scenario not found: ${scenarioId}`)
  }

  return scenario
}

export function createKitchenCommandScenarioReport(
  scenarioId: KitchenCommandScenarioId,
): KitchenCommandScenarioReport {
  const scenario = getKitchenCommandScenario(scenarioId)
  const report = createRuntimeSupportRecommendationReport(scenario.input)

  return {
    scenarioId: scenario.id,
    scenarioTitle: scenario.title,
    scenarioDescription: scenario.description,
    expectedSignals: scenario.expectedSignals,
    ...report,
  }
}

export function createAllKitchenCommandScenarioReports(): KitchenCommandScenarioReport[] {
  return KITCHEN_COMMAND_SCENARIOS.map((scenario) => {
    return createKitchenCommandScenarioReport(scenario.id)
  })
}

export function summarizeKitchenCommandScenarioReport(
  report: KitchenCommandScenarioReport,
): KitchenCommandScenarioSummary {
  const firstRecommendation = report.recommendations[0]

  return {
    scenarioId: report.scenarioId,
    title: report.scenarioTitle,
    highestRisk: report.summary.highestRisk,
    recommendationsCount: report.summary.recommendationsCount,
    firstRecommendationType: firstRecommendation?.type,
    firstRecommendationReason: firstRecommendation?.reason,
    approvalRequired: report.recommendations.some((recommendation) => {
      return recommendation.approvalRequired
    }),
  }
}

export function summarizeAllKitchenCommandScenarios(): KitchenCommandScenarioSummary[] {
  return createAllKitchenCommandScenarioReports().map((report) => {
    return summarizeKitchenCommandScenarioReport(report)
  })
}

export const getKitchenCommandScenarioReport = createKitchenCommandScenarioReport
export const getAllKitchenCommandScenarioReports = createAllKitchenCommandScenarioReports
