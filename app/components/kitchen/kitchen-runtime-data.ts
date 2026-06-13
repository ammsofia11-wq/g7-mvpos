import type {
  RuntimeRiskLevel,
  RuntimeStage,
  RuntimeStageStatus,
  RuntimeStageType,
} from "./runtime-engine-data"

export type WorkerStatus = "BUSY" | "AVAILABLE" | "BREAK" | "OFFLINE"

export type ProductionStageType =
  | "COLLECT"
  | "PREP"
  | "COOK"
  | "COOLING"
  | "STORAGE"
  | "PLATING"
  | "PACKAGING"
  | "QC"
  | "DISPATCH"

export type StageRuntimeStatus = "WAITING" | "ACTIVE" | "COMPLETED"

export type BatchRuntimeStatus =
  | "IN_PROGRESS"
  | "READY_FOR_QC"
  | "COMPLETED"
  | "ON_HOLD"

export type StageWorker = {
  id: string
  name: string
}

export type KitchenRuntimeWorker = StageWorker & {
  status: WorkerStatus
  station: string
  runtimeRole:
    | "CHEF"
    | "PREP"
    | "QC"
    | "PACKAGING"
    | "STORAGE"
    | "LEADERSHIP"
}

export type ProductionStage = {
  id: string
  stage: ProductionStageType
  status: StageRuntimeStatus
  startedAt?: string
  completedAt?: string
  workers: StageWorker[]
}

export type RuntimeDish = {
  id: string
  recipe: string
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  batchStatus: BatchRuntimeStatus
  progress: number
  portions: number
  stages: ProductionStage[]

  planName?: string
  mealPeriod?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"
  targetDispatchTime?: string
  productionNote?: string
}

export type KitchenRuntimeSummary = {
  totalDishes: number
  activeDishes: number
  completedDishes: number
  onHoldDishes: number
  totalPortions: number
  completedStages: number
  activeStages: number
  waitingStages: number
  runtimeProgress: number
  highestPriority: RuntimeDish["priority"]
  highestRisk: RuntimeRiskLevel
}

export type DishRuntimeInsight = {
  dishId: string
  recipe: string
  priority: RuntimeDish["priority"]
  risk: RuntimeRiskLevel
  currentStage: string
  nextAction: string
  progress: number
  portions: number
}

export const RUNTIME_WORKERS: KitchenRuntimeWorker[] = [
  {
    id: "POS-001",
    name: "Culinary Operations Director",
    status: "AVAILABLE",
    station: "Executive Leadership",
    runtimeRole: "LEADERSHIP",
  },
  {
    id: "POS-002",
    name: "Food Safety Officer",
    status: "AVAILABLE",
    station: "Food Safety",
    runtimeRole: "QC",
  },
  {
    id: "POS-010",
    name: "Preparation Team Lead",
    status: "AVAILABLE",
    station: "Preparation Team",
    runtimeRole: "PREP",
  },
  {
    id: "POS-011",
    name: "Vegetable Preparation Position",
    status: "AVAILABLE",
    station: "Preparation Team",
    runtimeRole: "PREP",
  },
  {
    id: "POS-012",
    name: "Butchery Position",
    status: "AVAILABLE",
    station: "Preparation Team",
    runtimeRole: "PREP",
  },
  {
    id: "POS-013",
    name: "Preparation Position 1",
    status: "AVAILABLE",
    station: "Preparation Team",
    runtimeRole: "PREP",
  },
  {
    id: "POS-014",
    name: "Preparation Position 2",
    status: "AVAILABLE",
    station: "Preparation Team",
    runtimeRole: "PREP",
  },
  {
    id: "POS-020",
    name: "Breakfast Team Lead",
    status: "AVAILABLE",
    station: "Breakfast Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-021",
    name: "Breakfast Cook Position 1",
    status: "AVAILABLE",
    station: "Breakfast Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-022",
    name: "Breakfast Cook Position 2",
    status: "AVAILABLE",
    station: "Breakfast Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-030",
    name: "Hot Kitchen Team Lead",
    status: "AVAILABLE",
    station: "Lunch & Dinner Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-031",
    name: "Hot Kitchen Cook Position 1",
    status: "BUSY",
    station: "Lunch & Dinner Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-032",
    name: "Hot Kitchen Cook Position 2",
    status: "AVAILABLE",
    station: "Lunch & Dinner Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-033",
    name: "Hot Kitchen Cook Position 3",
    status: "AVAILABLE",
    station: "Lunch & Dinner Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-040",
    name: "Cold Section Lead",
    status: "AVAILABLE",
    station: "Cold Section Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-041",
    name: "Cold Section Cook Position 1",
    status: "AVAILABLE",
    station: "Cold Section Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-042",
    name: "Cold Section Cook Position 2",
    status: "AVAILABLE",
    station: "Cold Section Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-043",
    name: "Cold Section Cook Position 3",
    status: "AVAILABLE",
    station: "Cold Section Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-050",
    name: "Salads Team Lead",
    status: "AVAILABLE",
    station: "Salads Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-051",
    name: "Salad Production Position 1",
    status: "AVAILABLE",
    station: "Salads Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-052",
    name: "Salad Production Position 2",
    status: "AVAILABLE",
    station: "Salads Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-053",
    name: "Salad Production Position 3",
    status: "AVAILABLE",
    station: "Salads Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-060",
    name: "Bakery Team Lead",
    status: "AVAILABLE",
    station: "Bakery Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-061",
    name: "Bread Maker Position",
    status: "AVAILABLE",
    station: "Bakery Team",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-065",
    name: "Pastry Chef Lead",
    status: "AVAILABLE",
    station: "Pastry Section",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-066",
    name: "Pastry Production Position 1",
    status: "AVAILABLE",
    station: "Pastry Section",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-067",
    name: "Pastry Production Position 2",
    status: "AVAILABLE",
    station: "Pastry Section",
    runtimeRole: "CHEF",
  },
  {
    id: "POS-070",
    name: "Packaging Team Lead",
    status: "BUSY",
    station: "Packaging Team",
    runtimeRole: "PACKAGING",
  },
  {
    id: "POS-071",
    name: "Packaging Operator Position 1",
    status: "AVAILABLE",
    station: "Packaging Team",
    runtimeRole: "PACKAGING",
  },
  {
    id: "POS-072",
    name: "Packaging Operator Position 2",
    status: "AVAILABLE",
    station: "Packaging Team",
    runtimeRole: "PACKAGING",
  },
  {
    id: "POS-073",
    name: "Packaging Operator Position 3",
    status: "AVAILABLE",
    station: "Packaging Team",
    runtimeRole: "PACKAGING",
  },
  {
    id: "POS-090",
    name: "Cleaning Team Lead",
    status: "AVAILABLE",
    station: "Cleaning Team",
    runtimeRole: "QC",
  },
  {
    id: "POS-091",
    name: "Cleaning Operator Position 1",
    status: "AVAILABLE",
    station: "Cleaning Team",
    runtimeRole: "QC",
  },
]

export const RUNTIME_DISHES: RuntimeDish[] = [
  {
    id: "D-1001",
    recipe: "Rosemary Chicken Bowl",
    priority: "HIGH",
    batchStatus: "IN_PROGRESS",
    progress: 58,
    portions: 180,
    planName: "Balanced Performance",
    mealPeriod: "LUNCH",
    targetDispatchTime: "12:30",
    productionNote:
      "High-volume chicken bowl. Protect hot kitchen timing and QC release.",
    stages: [
      {
        id: "S-1",
        stage: "COLLECT",
        status: "COMPLETED",
        startedAt: "07:00",
        completedAt: "07:12",
        workers: [
          {
            id: "POS-011",
            name: "Vegetable Preparation Position",
          },
          {
            id: "POS-012",
            name: "Butchery Position",
          },
        ],
      },
      {
        id: "S-2",
        stage: "PREP",
        status: "COMPLETED",
        startedAt: "07:12",
        completedAt: "07:35",
        workers: [
          {
            id: "POS-013",
            name: "Preparation Position 1",
          },
          {
            id: "POS-014",
            name: "Preparation Position 2",
          },
        ],
      },
      {
        id: "S-3",
        stage: "COOK",
        status: "ACTIVE",
        startedAt: "07:36",
        workers: [
          {
            id: "POS-030",
            name: "Hot Kitchen Team Lead",
          },
          {
            id: "POS-031",
            name: "Hot Kitchen Cook Position 1",
          },
          {
            id: "POS-032",
            name: "Hot Kitchen Cook Position 2",
          },
        ],
      },
      {
        id: "S-4",
        stage: "COOLING",
        status: "WAITING",
        workers: [
          {
            id: "POS-040",
            name: "Cold Section Lead",
          },
        ],
      },
      {
        id: "S-5",
        stage: "QC",
        status: "WAITING",
        workers: [
          {
            id: "POS-002",
            name: "Food Safety Officer",
          },
        ],
      },
      {
        id: "S-6",
        stage: "PLATING",
        status: "WAITING",
        workers: [
          {
            id: "POS-050",
            name: "Salads Team Lead",
          },
          {
            id: "POS-051",
            name: "Salad Production Position 1",
          },
        ],
      },
      {
        id: "S-7",
        stage: "PACKAGING",
        status: "WAITING",
        workers: [
          {
            id: "POS-070",
            name: "Packaging Team Lead",
          },
          {
            id: "POS-071",
            name: "Packaging Operator Position 1",
          },
          {
            id: "POS-072",
            name: "Packaging Operator Position 2",
          },
        ],
      },
      {
        id: "S-7-D",
        stage: "DISPATCH",
        status: "WAITING",
        workers: [
          {
            id: "POS-001",
            name: "Culinary Operations Director",
          },
        ],
      },
    ],
  },
  {
    id: "D-1002",
    recipe: "Keto Salmon Meal",
    priority: "URGENT",
    batchStatus: "IN_PROGRESS",
    progress: 82,
    portions: 120,
    planName: "Keto",
    mealPeriod: "DINNER",
    targetDispatchTime: "13:15",
    productionNote:
      "Urgent keto batch. Cooling and QC must stay controlled before packaging.",
    stages: [
      {
        id: "S-8",
        stage: "COLLECT",
        status: "COMPLETED",
        startedAt: "06:50",
        completedAt: "07:02",
        workers: [
          {
            id: "POS-011",
            name: "Vegetable Preparation Position",
          },
        ],
      },
      {
        id: "S-9",
        stage: "PREP",
        status: "COMPLETED",
        startedAt: "07:02",
        completedAt: "07:20",
        workers: [
          {
            id: "POS-012",
            name: "Butchery Position",
          },
          {
            id: "POS-013",
            name: "Preparation Position 1",
          },
        ],
      },
      {
        id: "S-10",
        stage: "COOK",
        status: "COMPLETED",
        startedAt: "07:20",
        completedAt: "07:48",
        workers: [
          {
            id: "POS-030",
            name: "Hot Kitchen Team Lead",
          },
          {
            id: "POS-031",
            name: "Hot Kitchen Cook Position 1",
          },
        ],
      },
      {
        id: "S-11",
        stage: "COOLING",
        status: "ACTIVE",
        startedAt: "07:49",
        workers: [
          {
            id: "POS-040",
            name: "Cold Section Lead",
          },
          {
            id: "POS-041",
            name: "Cold Section Cook Position 1",
          },
        ],
      },
      {
        id: "S-12",
        stage: "QC",
        status: "WAITING",
        workers: [
          {
            id: "POS-002",
            name: "Food Safety Officer",
          },
        ],
      },
      {
        id: "S-13",
        stage: "PLATING",
        status: "WAITING",
        workers: [
          {
            id: "POS-050",
            name: "Salads Team Lead",
          },
          {
            id: "POS-052",
            name: "Salad Production Position 2",
          },
        ],
      },
      {
        id: "S-14",
        stage: "PACKAGING",
        status: "WAITING",
        workers: [
          {
            id: "POS-070",
            name: "Packaging Team Lead",
          },
          {
            id: "POS-073",
            name: "Packaging Operator Position 3",
          },
        ],
      },
      {
        id: "S-14-D",
        stage: "DISPATCH",
        status: "WAITING",
        workers: [
          {
            id: "POS-001",
            name: "Culinary Operations Director",
          },
        ],
      },
    ],
  },
  {
    id: "D-1003",
    recipe: "Pastry Protein Muffin",
    priority: "MEDIUM",
    batchStatus: "IN_PROGRESS",
    progress: 44,
    portions: 90,
    planName: "Snack Production",
    mealPeriod: "SNACK",
    targetDispatchTime: "11:45",
    productionNote:
      "Snack batch. Bakery timing must be protected before packaging.",
    stages: [
      {
        id: "S-15",
        stage: "PREP",
        status: "COMPLETED",
        startedAt: "08:00",
        completedAt: "08:20",
        workers: [
          {
            id: "POS-065",
            name: "Pastry Chef Lead",
          },
          {
            id: "POS-066",
            name: "Pastry Production Position 1",
          },
        ],
      },
      {
        id: "S-16",
        stage: "COOK",
        status: "ACTIVE",
        startedAt: "08:21",
        workers: [
          {
            id: "POS-060",
            name: "Bakery Team Lead",
          },
          {
            id: "POS-061",
            name: "Bread Maker Position",
          },
          {
            id: "POS-067",
            name: "Pastry Production Position 2",
          },
        ],
      },
      {
        id: "S-17",
        stage: "PACKAGING",
        status: "WAITING",
        workers: [
          {
            id: "POS-071",
            name: "Packaging Operator Position 1",
          },
        ],
      },
      {
        id: "S-17-D",
        stage: "DISPATCH",
        status: "WAITING",
        workers: [
          {
            id: "POS-001",
            name: "Culinary Operations Director",
          },
        ],
      },
    ],
  },
]

export function getKitchenRuntimeSummary(
  dishes: RuntimeDish[] = RUNTIME_DISHES
): KitchenRuntimeSummary {
  const allStages = dishes.flatMap((dish) => dish.stages)

  const completedStages = allStages.filter(
    (stage) => stage.status === "COMPLETED"
  ).length

  const activeStages = allStages.filter(
    (stage) => stage.status === "ACTIVE"
  ).length

  const waitingStages = allStages.filter(
    (stage) => stage.status === "WAITING"
  ).length

  const totalDishes = dishes.length

  const activeDishes = dishes.filter(
    (dish) => dish.batchStatus === "IN_PROGRESS"
  ).length

  const completedDishes = dishes.filter(
    (dish) => dish.batchStatus === "COMPLETED"
  ).length

  const onHoldDishes = dishes.filter(
    (dish) => dish.batchStatus === "ON_HOLD"
  ).length

  const totalPortions = dishes.reduce((total, dish) => total + dish.portions, 0)

  const runtimeProgress =
    allStages.length > 0
      ? Math.round((completedStages / allStages.length) * 100)
      : 0

  const highestPriority = getHighestDishPriority(dishes)
  const highestRisk = getHighestDishRisk(dishes)

  return {
    totalDishes,
    activeDishes,
    completedDishes,
    onHoldDishes,
    totalPortions,
    completedStages,
    activeStages,
    waitingStages,
    runtimeProgress,
    highestPriority,
    highestRisk,
  }
}

export function getDishRuntimeInsights(
  dishes: RuntimeDish[] = RUNTIME_DISHES
): DishRuntimeInsight[] {
  return dishes.map((dish) => {
    const currentStage = getCurrentProductionStage(dish)
    const risk = getDishRuntimeRisk(dish)

    return {
      dishId: dish.id,
      recipe: dish.recipe,
      priority: dish.priority,
      risk,
      currentStage: currentStage?.stage ?? "COMPLETED",
      nextAction: getDishNextRuntimeAction(dish),
      progress: calculateDishProgress(dish),
      portions: dish.portions,
    }
  })
}

export function getCurrentProductionStage(dish: RuntimeDish) {
  return (
    dish.stages.find((stage) => stage.status === "ACTIVE") ??
    dish.stages.find((stage) => stage.status === "WAITING") ??
    dish.stages[dish.stages.length - 1]
  )
}

export function getNextProductionStage(dish: RuntimeDish) {
  const currentStage = getCurrentProductionStage(dish)

  if (!currentStage) return undefined

  const currentIndex = dish.stages.findIndex(
    (stage) => stage.id === currentStage.id
  )

  return dish.stages[currentIndex + 1]
}

export function calculateDishProgress(dish: RuntimeDish) {
  if (dish.stages.length === 0) return dish.progress

  const completedStages = dish.stages.filter(
    (stage) => stage.status === "COMPLETED"
  ).length

  return Math.round((completedStages / dish.stages.length) * 100)
}

export function getDishRuntimeRisk(dish: RuntimeDish): RuntimeRiskLevel {
  if (dish.batchStatus === "ON_HOLD") return "CRITICAL"

  const currentStage = getCurrentProductionStage(dish)

  if (!currentStage) return "LOW"

  if (dish.priority === "URGENT" && currentStage.status !== "COMPLETED") {
    return "CRITICAL"
  }

  if (dish.priority === "HIGH" && currentStage.status === "WAITING") {
    return "HIGH"
  }

  if (dish.progress < 50 && dish.priority === "HIGH") return "HIGH"

  if (dish.progress < 60) return "MEDIUM"

  return priorityToRisk(dish.priority)
}

export function getDishNextRuntimeAction(dish: RuntimeDish) {
  const currentStage = getCurrentProductionStage(dish)
  const nextStage = getNextProductionStage(dish)

  if (dish.batchStatus === "ON_HOLD") {
    return "Escalate hold reason before production continues"
  }

  if (!currentStage) {
    return "No action required"
  }

  if (dish.batchStatus === "READY_FOR_QC") {
    return "Send batch to food safety / chef approval"
  }

  if (currentStage.stage === "QC" && currentStage.status === "WAITING") {
    return "Call food safety officer for QC release"
  }

  if (currentStage.stage === "PACKAGING" && currentStage.status === "WAITING") {
    return "Prepare packaging team before dispatch pressure rises"
  }

  if (currentStage.status === "ACTIVE") {
    return `Monitor ${currentStage.stage.toLowerCase()} output and protect timing`
  }

  if (currentStage.status === "WAITING" && nextStage) {
    return `Start ${currentStage.stage.toLowerCase()} when upstream stage is released`
  }

  return "Continue normal runtime flow"
}

export function createRuntimeStagesFromDishes(
  dishes: RuntimeDish[] = RUNTIME_DISHES
): RuntimeStage[] {
  return dishes.flatMap((dish) => createRuntimeStagesFromDish(dish))
}

export function createRuntimeStagesFromDish(dish: RuntimeDish): RuntimeStage[] {
  return dish.stages.map((stage, index) => {
    const previousStage = dish.stages[index - 1]
    const nextStage = dish.stages[index + 1]
    const assignedWorker = stage.workers[0]
    const risk = getDishRuntimeRisk(dish)
    const stageStatus = mapProductionStatusToRuntimeStatus(stage.status)
    const plannedMinutes = getPlannedMinutesForProductionStage(stage.stage)
    const currentOutput = getStageCurrentOutput(dish, stage)
    const capacityTarget = dish.portions

    return {
      id: `${dish.id}-${stage.id}`,
      name: `${dish.recipe} · ${stage.stage}`,
      station: getStationForProductionStage(stage.stage),
      assignedRole: getAssignedRoleForProductionStage(stage.stage),
      assignedEmployee: assignedWorker?.name ?? "Unassigned",
      plannedMinutes,
      elapsedMinutes: getElapsedMinutesForProductionStage(stage),
      capacityTarget,
      currentOutput,
      status: stageStatus,
      risk,
      aiNote: getDishStageAiNote(dish, stage),
      stageType: mapProductionStageToRuntimeStageType(stage.stage),
      sequence: index + 1,
      dependsOnStageId: previousStage ? `${dish.id}-${previousStage.id}` : undefined,
      blocksStageIds: nextStage ? [`${dish.id}-${nextStage.id}`] : [],
      recommendedAction:
        stage.stage === "QC"
          ? "ESCALATE_TO_HEAD_CHEF"
          : stage.stage === "PACKAGING"
            ? "CALL_PACKAGING_SUPPORT"
            : stage.stage === "COOK"
              ? "MOVE_SUPPORT"
              : "MONITOR",
      actionLabel: getDishNextRuntimeAction(dish),
      operationalImpact: dish.productionNote ?? getDishNextRuntimeAction(dish),
    }
  })
}

function getHighestDishPriority(
  dishes: RuntimeDish[]
): RuntimeDish["priority"] {
  const priorityScore: Record<RuntimeDish["priority"], number> = {
    URGENT: 4,
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  }

  return dishes.reduce<RuntimeDish["priority"]>((highest, dish) => {
    return priorityScore[dish.priority] > priorityScore[highest]
      ? dish.priority
      : highest
  }, "LOW")
}

function getHighestDishRisk(dishes: RuntimeDish[]) {
  const riskScore: Record<RuntimeRiskLevel, number> = {
    CRITICAL: 4,
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  }

  return dishes.reduce<RuntimeRiskLevel>((highest, dish) => {
    const risk = getDishRuntimeRisk(dish)

    return riskScore[risk] > riskScore[highest] ? risk : highest
  }, "LOW")
}

function priorityToRisk(priority: RuntimeDish["priority"]): RuntimeRiskLevel {
  if (priority === "URGENT") return "HIGH"
  if (priority === "HIGH") return "MEDIUM"
  if (priority === "MEDIUM") return "MEDIUM"

  return "LOW"
}

function mapProductionStatusToRuntimeStatus(
  status: StageRuntimeStatus
): RuntimeStageStatus {
  if (status === "ACTIVE") return "ACTIVE"
  if (status === "COMPLETED") return "COMPLETED"

  return "WAITING"
}

function mapProductionStageToRuntimeStageType(
  stage: ProductionStageType
): RuntimeStageType {
  if (stage === "PREP" || stage === "COLLECT") return "PREP"
  if (stage === "COOK") return "COOKING"
  if (stage === "QC") return "QC"
  if (stage === "PACKAGING") return "PACKAGING"
  if (stage === "DISPATCH") return "DISPATCH"

  return "ASSEMBLY"
}

function getStationForProductionStage(stage: ProductionStageType) {
  if (stage === "COLLECT") return "Storage / Collection"
  if (stage === "PREP") return "Preparation Team"
  if (stage === "COOK") return "Hot Kitchen"
  if (stage === "COOLING") return "Cooling / Blast Chiller"
  if (stage === "STORAGE") return "Cold Storage"
  if (stage === "PLATING") return "Assembly Line"
  if (stage === "PACKAGING") return "Packaging Team"
  if (stage === "QC") return "Quality Control"
  if (stage === "DISPATCH") return "Dispatch Zone"

  return "Kitchen Floor"
}

function getAssignedRoleForProductionStage(stage: ProductionStageType) {
  if (stage === "COLLECT") return "Storekeeper / Prep Support"
  if (stage === "PREP") return "Prep Team"
  if (stage === "COOK") return "CDP Hot Kitchen"
  if (stage === "COOLING") return "Cold Section"
  if (stage === "STORAGE") return "Storekeeper"
  if (stage === "PLATING") return "Assembly Supervisor"
  if (stage === "PACKAGING") return "Packaging Lead"
  if (stage === "QC") return "Food Safety / Head Chef"
  if (stage === "DISPATCH") return "Dispatch Coordinator"

  return "Kitchen Worker"
}

function getPlannedMinutesForProductionStage(stage: ProductionStageType) {
  if (stage === "COLLECT") return 15
  if (stage === "PREP") return 35
  if (stage === "COOK") return 55
  if (stage === "COOLING") return 40
  if (stage === "STORAGE") return 15
  if (stage === "PLATING") return 45
  if (stage === "PACKAGING") return 50
  if (stage === "QC") return 25
  if (stage === "DISPATCH") return 35

  return 30
}

function getElapsedMinutesForProductionStage(stage: ProductionStage) {
  if (stage.status === "COMPLETED") {
    return getPlannedMinutesForProductionStage(stage.stage)
  }

  if (stage.status === "WAITING") return 0

  const plannedMinutes = getPlannedMinutesForProductionStage(stage.stage)

  return Math.round(plannedMinutes * 0.72)
}

function getStageCurrentOutput(dish: RuntimeDish, stage: ProductionStage) {
  if (stage.status === "COMPLETED") return dish.portions

  if (stage.status === "WAITING") return 0

  return Math.round(dish.portions * 0.68)
}

function getDishStageAiNote(dish: RuntimeDish, stage: ProductionStage) {
  const progress = calculateDishProgress(dish)

  if (stage.status === "COMPLETED") {
    return `${dish.recipe} ${stage.stage.toLowerCase()} completed. Runtime progress is ${progress}%.`
  }

  if (stage.status === "ACTIVE") {
    return `${dish.recipe} is currently in ${stage.stage.toLowerCase()}. Protect timing and output to keep ${dish.portions} portions moving.`
  }

  if (stage.stage === "QC") {
    return `${dish.recipe} is waiting for QC. Chef or food safety release is required before packaging.`
  }

  if (stage.stage === "PACKAGING") {
    return `${dish.recipe} is waiting for packaging. Packaging must stay ready before dispatch pressure rises.`
  }

  return `${dish.recipe} is waiting at ${stage.stage.toLowerCase()}. Monitor upstream dependency.`
}