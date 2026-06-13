"use client"

import { useMemo, useState } from "react"

import {
  RUNTIME_DISHES,
  RUNTIME_WORKERS,
  calculateDishProgress,
  getCurrentProductionStage,
  getDishNextRuntimeAction,
  getDishRuntimeInsights,
  getDishRuntimeRisk,
  getKitchenRuntimeSummary,
  type KitchenRuntimeWorker,
  type ProductionStage,
  type RuntimeDish,
  type StageWorker,
} from "./kitchen-runtime-data"

import { useRuntime } from "./runtime-context"

import type { RuntimeRiskLevel } from "./runtime-engine-data"

function nowTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getRuntimeStageId(dishId: string, stageId: string) {
  return `${dishId}-${stageId}`
}

function startProductionStage(
  dish: RuntimeDish,
  stageId: string,
  time: string
): RuntimeDish {
  const nextStages: ProductionStage[] = dish.stages.map((stage) => {
    if (stage.id !== stageId) return stage

    return {
      ...stage,
      status: "ACTIVE" as ProductionStage["status"],
      startedAt: stage.startedAt ?? time,
    }
  })

  return {
    ...dish,
    stages: nextStages,
  }
}

function finishProductionStage(
  dish: RuntimeDish,
  stageId: string,
  time: string
): RuntimeDish {
  const nextStages: ProductionStage[] = dish.stages.map((stage) => {
    if (stage.id !== stageId) return stage

    return {
      ...stage,
      status: "COMPLETED" as ProductionStage["status"],
      completedAt: time,
    }
  })

  const nextDish: RuntimeDish = {
    ...dish,
    stages: nextStages,
  }

  const progress = calculateDishProgress(nextDish)

  const allCompleted = nextDish.stages.every(
    (stage) => stage.status === "COMPLETED"
  )

  const hasWaitingQc = nextDish.stages.some(
    (stage) => stage.stage === "QC" && stage.status === "WAITING"
  )

  return {
    ...nextDish,
    progress,
    batchStatus: allCompleted
      ? "COMPLETED"
      : hasWaitingQc
        ? "READY_FOR_QC"
        : nextDish.batchStatus,
  }
}

function assignWorkerToStage(
  stage: ProductionStage,
  worker: KitchenRuntimeWorker
): ProductionStage {
  const alreadyAssigned = stage.workers.some(
    (assignedWorker) => assignedWorker.id === worker.id
  )

  if (alreadyAssigned) return stage

  const workerPayload: StageWorker = {
    id: worker.id,
    name: worker.name,
  }

  return {
    ...stage,
    workers: [...stage.workers, workerPayload],
  }
}

function removeWorkerFromStage(
  stage: ProductionStage,
  workerId: string
): ProductionStage {
  return {
    ...stage,
    workers: stage.workers.filter((worker) => worker.id !== workerId),
  }
}

function getStageCardStyle(status: ProductionStage["status"]) {
  if (status === "ACTIVE") {
    return "border-[#CCFF33]/35 bg-[#CCFF33]/[0.045]"
  }

  if (status === "COMPLETED") {
    return "border-emerald-400/25 bg-emerald-400/[0.045]"
  }

  return "border-white/10 bg-white/[0.02]"
}

function getStageBadgeStyle(status: ProductionStage["status"]) {
  if (status === "ACTIVE") {
    return "border-[#CCFF33]/30 bg-[#CCFF33]/10 text-[#CCFF33]"
  }

  if (status === "COMPLETED") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
  }

  return "border-white/10 bg-white/[0.03] text-white/45"
}

function getBatchBadge(status: RuntimeDish["batchStatus"]) {
  if (status === "COMPLETED") {
    return "border-[#CCFF33]/30 bg-[#CCFF33]/10 text-[#CCFF33]"
  }

  if (status === "READY_FOR_QC") {
    return "border-cyan-400/30 bg-cyan-500/10 text-cyan-300"
  }

  if (status === "ON_HOLD") {
    return "border-red-400/30 bg-red-500/10 text-red-300"
  }

  return "border-[#CCFF33]/30 bg-[#CCFF33]/10 text-[#CCFF33]"
}

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  MEDIUM: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
  HIGH: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  CRITICAL: "border-red-400/20 bg-red-400/10 text-red-300",
}

const workerStatusStyles: Record<KitchenRuntimeWorker["status"], string> = {
  AVAILABLE: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  BUSY: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  BREAK: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
  OFFLINE: "border-white/10 bg-white/[0.04] text-white/35",
}

export default function WorkerBoard() {
  const { dispatch } = useRuntime()

  const [dishes, setDishes] = useState<RuntimeDish[]>(RUNTIME_DISHES)

  const [openAssignPanel, setOpenAssignPanel] = useState<string | null>(null)

  const [expandedDish, setExpandedDish] = useState<string | null>(
    RUNTIME_DISHES[0]?.id || null
  )

  const summary = useMemo(() => getKitchenRuntimeSummary(dishes), [dishes])
  const insights = useMemo(() => getDishRuntimeInsights(dishes), [dishes])

  const activeStages = useMemo(
    () =>
      dishes.flatMap((dish) =>
        dish.stages.filter((stage) => stage.status === "ACTIVE")
      ).length,
    [dishes]
  )

  const completedStages = useMemo(
    () =>
      dishes.flatMap((dish) =>
        dish.stages.filter((stage) => stage.status === "COMPLETED")
      ).length,
    [dishes]
  )

  const assignedPositions = useMemo(
    () =>
      dishes
        .flatMap((dish) => dish.stages)
        .reduce((total, stage) => total + stage.workers.length, 0),
    [dishes]
  )

  const availableWorkers = RUNTIME_WORKERS.filter(
    (worker) => worker.status === "AVAILABLE"
  ).length

  function handleStartStage(dishId: string, stageId: string) {
    const time = nowTime()

    setDishes((current) =>
      current.map((dish) =>
        dish.id === dishId ? startProductionStage(dish, stageId, time) : dish
      )
    )

    dispatch({
      type: "START_STAGE",
      stageId: getRuntimeStageId(dishId, stageId),
    })
  }

  function handleEndStage(dishId: string, stageId: string) {
    const time = nowTime()

    setDishes((current) =>
      current.map((dish) =>
        dish.id === dishId ? finishProductionStage(dish, stageId, time) : dish
      )
    )

    dispatch({
      type: "COMPLETE_STAGE",
      stageId: getRuntimeStageId(dishId, stageId),
    })
  }

  function addWorker(
    dishId: string,
    stageId: string,
    worker: KitchenRuntimeWorker
  ) {
    setDishes((current) =>
      current.map((dish) =>
        dish.id !== dishId
          ? dish
          : {
              ...dish,
              stages: dish.stages.map((stage) =>
                stage.id === stageId ? assignWorkerToStage(stage, worker) : stage
              ),
            }
      )
    )

    setOpenAssignPanel(null)
  }

  function removeWorker(dishId: string, stageId: string, workerId: string) {
    setDishes((current) =>
      current.map((dish) =>
        dish.id !== dishId
          ? dish
          : {
              ...dish,
              stages: dish.stages.map((stage) =>
                stage.id === stageId
                  ? removeWorkerFromStage(stage, workerId)
                  : stage
              ),
            }
      )
    )
  }

  return (
    <section className="rounded-[30px] border border-[#CCFF33]/15 bg-white/[0.035] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.30)] md:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
            Worker Touch Runtime
          </p>

          <h2 className="mt-2 text-[30px] font-black tracking-[-0.07em] text-white md:text-[36px]">
            Production Floor
            <span className="block text-[#CCFF33]">Control</span>
          </h2>

          <p className="mt-2 max-w-2xl text-[12px] leading-5 text-slate-400">
            Worker board is now connected to dish batches, stages, positions,
            runtime progress, next actions, and the global kitchen runtime
            engine.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 xl:min-w-[420px]">
          <WorkerMetric label="Active" value={activeStages} />
          <WorkerMetric label="Finished" value={completedStages} />
          <WorkerMetric label="Assigned" value={assignedPositions} />
          <WorkerMetric label="Available" value={availableWorkers} />
        </div>
      </div>

      <div className="mt-5 grid gap-2 md:grid-cols-4">
        <WorkerMetric label="Dishes" value={summary.totalDishes} />
        <WorkerMetric label="Portions" value={summary.totalPortions} />
        <WorkerMetric label="Progress" value={`${summary.runtimeProgress}%`} />
        <div
          className={`rounded-[18px] border p-3 text-right ${
            riskStyles[summary.highestRisk]
          }`}
        >
          <p className="text-[8px] font-black uppercase tracking-[0.18em]">
            Highest Risk
          </p>

          <p className="mt-1 text-[20px] font-black tracking-[-0.04em]">
            {summary.highestRisk}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {dishes.map((dish) => {
          const progress = calculateDishProgress(dish)
          const risk = getDishRuntimeRisk(dish)
          const currentStage = getCurrentProductionStage(dish)

          const insight = insights.find((item) => item.dishId === dish.id)

          const nextStage = dish.stages.find(
            (stage) => stage.status === "WAITING"
          )

          const isExpanded = expandedDish === dish.id
          const nextAction = getDishNextRuntimeAction(dish)

          return (
            <article
              key={dish.id}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-black/20"
            >
              <button
                onClick={() => setExpandedDish(isExpanded ? null : dish.id)}
                className="w-full p-4 text-left transition hover:bg-white/[0.02]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#CCFF33]/70">
                        {dish.id} · {dish.priority} Priority
                      </p>

                      <span
                        className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${
                          riskStyles[risk]
                        }`}
                      >
                        {risk}
                      </span>
                    </div>

                    <h3 className="mt-1 break-words text-[26px] font-black tracking-[-0.06em] text-white">
                      {dish.recipe}
                    </h3>

                    <p className="mt-2 max-w-2xl text-[11px] font-semibold leading-5 text-white/45">
                      {dish.productionNote ?? nextAction}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/70">
                        Current: {currentStage?.stage || "Completed"}
                      </div>

                      <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/50">
                        Next: {nextStage?.stage || "--"}
                      </div>

                      <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/50">
                        Target: {dish.targetDispatchTime ?? "--"}
                      </div>

                      <div
                        className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${getBatchBadge(
                          dish.batchStatus
                        )}`}
                      >
                        {dish.batchStatus.replaceAll("_", " ")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-[150px]">
                      <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.12em] text-white/45">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[#CCFF33] transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <p className="mt-2 text-[9px] font-semibold text-white/35">
                        {insight?.portions ?? dish.portions} portions
                      </p>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/10 bg-black/20 text-[22px] font-black text-[#CCFF33]">
                      {isExpanded ? "−" : "+"}
                    </div>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-white/10 p-4">
                  <div className="mb-4 rounded-[20px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-4">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
                      Next Runtime Action
                    </p>

                    <p className="mt-2 text-[12px] font-black leading-5 text-white">
                      {nextAction}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                    {dish.stages.map((stage) => {
                      const startDisabled =
                        stage.status === "ACTIVE" ||
                        stage.status === "COMPLETED"

                      const endDisabled = stage.status !== "ACTIVE"

                      const panelId = `${dish.id}-${stage.id}`

                      const isOpen = openAssignPanel === panelId

                      return (
                        <div
                          key={stage.id}
                          className={`rounded-[24px] border p-4 transition-all ${getStageCardStyle(
                            stage.status
                          )}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-[20px] font-black uppercase tracking-[0.13em] text-white">
                              {stage.stage}
                            </p>

                            <span
                              className={`rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] ${getStageBadgeStyle(
                                stage.status
                              )}`}
                            >
                              {stage.status}
                            </span>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
                              <p className="text-[8px] font-black uppercase tracking-[0.14em] text-white/35">
                                Start
                              </p>

                              <p className="mt-1 text-[17px] font-black text-white">
                                {stage.startedAt || "--"}
                              </p>
                            </div>

                            <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
                              <p className="text-[8px] font-black uppercase tracking-[0.14em] text-white/35">
                                End
                              </p>

                              <p className="mt-1 text-[17px] font-black text-white">
                                {stage.completedAt || "--"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <p className="text-[8px] font-black uppercase tracking-[0.14em] text-white/35">
                              Positions
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                              {stage.workers.length > 0 ? (
                                stage.workers.map((worker) => (
                                  <button
                                    key={worker.id}
                                    onClick={() =>
                                      removeWorker(
                                        dish.id,
                                        stage.id,
                                        worker.id
                                      )
                                    }
                                    className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[10px] font-bold text-white/80 transition hover:border-red-400/40 hover:text-red-300"
                                  >
                                    {worker.name} ×
                                  </button>
                                ))
                              ) : (
                                <span className="text-[11px] font-bold text-white/35">
                                  No positions assigned
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              setOpenAssignPanel(isOpen ? null : panelId)
                            }
                            className="mt-4 w-full rounded-[16px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 px-4 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#CCFF33] transition hover:bg-[#CCFF33]/15"
                          >
                            + Assign Position
                          </button>

                          {isOpen && (
                            <div className="mt-3 grid max-h-[280px] gap-2 overflow-y-auto pr-1">
                              {RUNTIME_WORKERS.map((worker) => (
                                <button
                                  key={worker.id}
                                  onClick={() =>
                                    addWorker(dish.id, stage.id, worker)
                                  }
                                  className="flex items-center justify-between rounded-[16px] border border-white/10 bg-black/20 px-3 py-2 text-left transition hover:border-[#CCFF33]/30 hover:bg-[#CCFF33]/10"
                                >
                                  <div className="min-w-0">
                                    <p className="truncate text-[11px] font-black text-white">
                                      {worker.name}
                                    </p>

                                    <p className="truncate text-[9px] text-white/40">
                                      {worker.station}
                                    </p>
                                  </div>

                                  <span
                                    className={`ml-3 shrink-0 rounded-full border px-2 py-1 text-[7px] font-black uppercase tracking-[0.12em] ${
                                      workerStatusStyles[worker.status]
                                    }`}
                                  >
                                    {worker.status}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}

                          <div className="mt-5 grid grid-cols-2 gap-3">
                            <button
                              onClick={() =>
                                handleStartStage(dish.id, stage.id)
                              }
                              disabled={startDisabled}
                              className="min-h-[68px] rounded-[20px] border border-emerald-400/40 bg-emerald-500/15 px-3 py-3 text-[17px] font-black uppercase tracking-[0.08em] text-emerald-300 transition hover:bg-emerald-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.025] disabled:text-white/20"
                            >
                              Start
                            </button>

                            <button
                              onClick={() => handleEndStage(dish.id, stage.id)}
                              disabled={endDisabled}
                              className="min-h-[68px] rounded-[20px] border border-red-400/40 bg-red-500/15 px-3 py-3 text-[17px] font-black uppercase tracking-[0.08em] text-red-200 transition hover:bg-red-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.025] disabled:text-white/20"
                            >
                              End
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

function WorkerMetric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/20 p-3 text-right">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-1 text-[20px] font-black tracking-[-0.04em] text-white">
        {value}
      </p>
    </div>
  )
}