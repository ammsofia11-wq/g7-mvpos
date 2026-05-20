import {
  KitchenRuntimeWorker,
  ProductionStage,
  RuntimeDish,
  StageWorker,
} from "@/app/components/kitchen/kitchen-runtime-data"

export function calculateRuntimeProgress(dish: RuntimeDish) {
  const completed = dish.stages.filter(
    (stage) => stage.status === "COMPLETED"
  ).length

  return Math.round((completed / dish.stages.length) * 100)
}

export function isEmployeeAssignedToStage(
  stage: ProductionStage,
  employeeId: string
) {
  return stage.workers.some((worker) => worker.id === employeeId)
}

export function assignEmployeeToStage(
  stage: ProductionStage,
  employee: KitchenRuntimeWorker
): ProductionStage {
  const alreadyAssigned = stage.workers.some(
    (worker) => worker.id === employee.id
  )

  if (alreadyAssigned) return stage

  const newWorker: StageWorker = {
    id: employee.id,
    name: employee.name,
  }

  return {
    ...stage,
    workers: [...stage.workers, newWorker],
  }
}

export function removeEmployeeFromStage(
  stage: ProductionStage,
  employeeId: string
): ProductionStage {
  return {
    ...stage,
    workers: stage.workers.filter((worker) => worker.id !== employeeId),
  }
}

export function getEmployeeActiveStages(
  dishes: RuntimeDish[],
  employeeId: string
) {
  return dishes.flatMap((dish) =>
    dish.stages
      .filter((stage) => isEmployeeAssignedToStage(stage, employeeId))
      .filter((stage) => stage.status !== "COMPLETED")
      .map((stage) => ({
        dish,
        stage,
      }))
  )
}

export function getEmployeeRunningStages(
  dishes: RuntimeDish[],
  employeeId: string
) {
  return dishes.flatMap((dish) =>
    dish.stages
      .filter((stage) => isEmployeeAssignedToStage(stage, employeeId))
      .filter((stage) => stage.status === "ACTIVE")
      .map((stage) => ({
        dish,
        stage,
      }))
  )
}

export function getEmployeeWaitingStages(
  dishes: RuntimeDish[],
  employeeId: string
) {
  return dishes.flatMap((dish) =>
    dish.stages
      .filter((stage) => isEmployeeAssignedToStage(stage, employeeId))
      .filter((stage) => stage.status === "WAITING")
      .map((stage) => ({
        dish,
        stage,
      }))
  )
}

function getNextWaitingStageIndex(
  stages: ProductionStage[],
  currentIndex: number
) {
  return stages.findIndex(
    (stage, index) =>
      index > currentIndex && stage.status === "WAITING"
  )
}

function calculateBatchStatus(
  stages: ProductionStage[]
): RuntimeDish["batchStatus"] {
  const allCompleted = stages.every(
    (stage) => stage.status === "COMPLETED"
  )

  if (allCompleted) return "COMPLETED"

  const qcStage = stages.find((stage) => stage.stage === "QC")

  if (
    qcStage &&
    qcStage.status === "ACTIVE"
  ) {
    return "READY_FOR_QC"
  }

  return "IN_PROGRESS"
}

export function startStage(
  dish: RuntimeDish,
  stageId: string,
  time: string
): RuntimeDish {
  const updatedStages = dish.stages.map((stage) =>
    stage.id === stageId
      ? {
          ...stage,
          status: "ACTIVE" as const,
          startedAt: stage.startedAt || time,
        }
      : stage
  )

  return {
    ...dish,
    stages: updatedStages,
    progress: calculateRuntimeProgress({
      ...dish,
      stages: updatedStages,
    }),
    batchStatus: calculateBatchStatus(updatedStages),
  }
}

export function finishStage(
  dish: RuntimeDish,
  stageId: string,
  time: string
): RuntimeDish {
  const currentIndex = dish.stages.findIndex(
    (stage) => stage.id === stageId
  )

  if (currentIndex === -1) return dish

  const nextWaitingStageIndex = getNextWaitingStageIndex(
    dish.stages,
    currentIndex
  )

  const updatedStages = dish.stages.map((stage, index) => {
    if (stage.id === stageId) {
      return {
        ...stage,
        status: "COMPLETED" as const,
        completedAt: time,
      }
    }

    if (index === nextWaitingStageIndex) {
      return {
        ...stage,
        status: "ACTIVE" as const,
        startedAt: stage.startedAt || time,
      }
    }

    return stage
  })

  const progress = calculateRuntimeProgress({
    ...dish,
    stages: updatedStages,
  })

  return {
    ...dish,
    stages: updatedStages,
    progress,
    batchStatus: calculateBatchStatus(updatedStages),
  }
}