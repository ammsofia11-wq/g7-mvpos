export type ProductionStatus =
  | "ASSIGNED"
  | "INGREDIENT_COLLECTION"
  | "PREP_STARTED"
  | "COOKING"
  | "READY"
  | "HEAD_CHEF_CHECK"
  | "APPROVED"
  | "STORED"
  | "PACKAGING_READY"

export type ProductionPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"

export type QualityCheck = {
  checkedBy: string
  approvedAt: string
  qualityNotes: string
}

export type ProductionTask = {
  id: string
  recipe: string
  station: string
  assignedWorker: string
  portions: number
  estimatedMinutes: number
  priority: ProductionPriority
  status: ProductionStatus
  startedAt?: string
  completedAt?: string
  lastActionAt?: string
  checkedBy?: string
  approvedAt?: string
  qualityNotes?: string
  ingredients: string[]
  preparation: string[]
  cooking: string[]
  storage: string[]
  packaging: string[]
}

export type ProductionLog = {
  worker: string
  recipe: string
  action: string
  station: string
  timestamp: string
}

export const PRODUCTION_TASKS: ProductionTask[] = [
  {
    id: "task-1",
    recipe: "Butter Chicken",
    station: "Hot Kitchen",
    assignedWorker: "Ahmed",
    portions: 55,
    estimatedMinutes: 70,
    priority: "URGENT",
    status: "ASSIGNED",
    ingredients: [
      "Chicken Breast",
      "Tomato Sauce",
      "Cooking Cream",
      "Butter",
      "Spice Mix",
    ],
    preparation: ["Cut chicken", "Prepare spice mix", "Build sauce base"],
    cooking: ["Cook chicken", "Reduce sauce", "Combine and simmer"],
    storage: ["Cool safely", "Transfer to chilled storage"],
    packaging: ["Portion evenly", "Seal meal trays"],
  },
  {
    id: "task-2",
    recipe: "Marinara Sauce",
    station: "Sauce Station",
    assignedWorker: "Mahmoud",
    portions: 90,
    estimatedMinutes: 25,
    priority: "HIGH",
    status: "ASSIGNED",
    ingredients: ["Tomato", "Garlic", "Olive Oil", "Basil"],
    preparation: ["Wash tomatoes", "Prepare garlic"],
    cooking: ["Cook sauce", "Reduce texture"],
    storage: ["Blast chill", "Label batch"],
    packaging: ["Fill containers"],
  },
]

export const PRODUCTION_LOGS: ProductionLog[] = []

export function createTimestamp() {
  return new Date().toLocaleTimeString()
}

export function updateTaskStatus(taskId: string, status: ProductionStatus) {
  const task = PRODUCTION_TASKS.find((item) => item.id === taskId)

  if (!task) return null

  const timestamp = createTimestamp()

  task.status = status
  task.lastActionAt = timestamp

  if (!task.startedAt) {
    task.startedAt = timestamp
  }

  if (status === "PACKAGING_READY") {
    task.completedAt = timestamp
  }

  PRODUCTION_LOGS.unshift({
    worker: task.assignedWorker,
    recipe: task.recipe,
    action: `Moved to ${status}`,
    station: task.station,
    timestamp,
  })

  return task
}

export function requestHeadChefCheck(taskId: string) {
  return updateTaskStatus(taskId, "HEAD_CHEF_CHECK")
}

export function approveTask(
  taskId: string,
  checkedBy: string,
  qualityNotes: string
) {
  const task = PRODUCTION_TASKS.find((item) => item.id === taskId)

  if (!task) return null

  const timestamp = createTimestamp()

  task.status = "APPROVED"
  task.checkedBy = checkedBy
  task.approvedAt = timestamp
  task.qualityNotes = qualityNotes
  task.lastActionAt = timestamp

  PRODUCTION_LOGS.unshift({
    worker: checkedBy,
    recipe: task.recipe,
    action: `Approved by Head Chef — ${qualityNotes}`,
    station: task.station,
    timestamp,
  })

  return task
}

export function getTaskDuration(task: ProductionTask) {
  if (!task.startedAt) {
    return "0m"
  }

  if (task.completedAt) {
    return "Completed"
  }

  return "LIVE"
}

export function getWorkerTasks(worker: string) {
  return PRODUCTION_TASKS.filter((task) => {
    return task.assignedWorker === worker
  })
}

export function getCompletedTasks(worker: string) {
  return getWorkerTasks(worker).filter((task) => {
    return task.status === "PACKAGING_READY"
  })
}

export function getActiveTasks(worker: string) {
  return getWorkerTasks(worker).filter((task) => {
    return task.status !== "PACKAGING_READY"
  })
}

export function getTasksWaitingForApproval() {
  return PRODUCTION_TASKS.filter((task) => {
    return task.status === "HEAD_CHEF_CHECK"
  })
}

export function getApprovedTasks() {
  return PRODUCTION_TASKS.filter((task) => {
    return task.status === "APPROVED"
  })
}

export function getTotalProductionPortions() {
  return PRODUCTION_TASKS.reduce((total, task) => {
    return total + task.portions
  }, 0)
}

export function getUrgentProductionTasks() {
  return PRODUCTION_TASKS.filter((task) => {
    return task.priority === "URGENT" || task.priority === "HIGH"
  })
}

export function getProductionEfficiencyScore() {
  const completed = PRODUCTION_TASKS.filter((task) => {
    return task.status === "PACKAGING_READY"
  }).length

  if (PRODUCTION_TASKS.length === 0) return 0

  return Math.round((completed / PRODUCTION_TASKS.length) * 100)
}

export function getBottleneckStation() {
  const stationMap: Record<string, number> = {}

  PRODUCTION_TASKS.forEach((task) => {
    stationMap[task.station] = (stationMap[task.station] ?? 0) + task.portions
  })

  const stations = Object.entries(stationMap)

  if (stations.length === 0) return "No Station"

  return stations.sort((a, b) => b[1] - a[1])[0][0]
}

export function getDelayRisk() {
  const urgentTasks = getUrgentProductionTasks()
  const waitingForApproval = getTasksWaitingForApproval()

  if (waitingForApproval.length >= 2) return "HIGH"
  if (urgentTasks.length >= 2) return "HIGH"
  if (waitingForApproval.length === 1) return "MEDIUM"
  if (urgentTasks.length === 1) return "MEDIUM"

  return "LOW"
}