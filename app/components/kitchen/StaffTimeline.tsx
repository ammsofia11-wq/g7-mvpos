import {
  RUNTIME_DISHES,
  RUNTIME_WORKERS,
  calculateDishProgress,
  getCurrentProductionStage,
  getDishRuntimeInsights,
  getKitchenRuntimeSummary,
  type RuntimeDish,
} from "./kitchen-runtime-data"

import type { RuntimeRiskLevel } from "./runtime-engine-data"

type StaffSyncItem = {
  id: string
  title: string
  text: string
  time: string
  risk: RuntimeRiskLevel
}

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  MEDIUM: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
  HIGH: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  CRITICAL: "border-red-400/20 bg-red-400/10 text-red-300",
}

function buildStaffSyncItems(dishes: RuntimeDish[]): StaffSyncItem[] {
  const insights = getDishRuntimeInsights(dishes)

  const dishItems: StaffSyncItem[] = dishes.map((dish): StaffSyncItem => {
    const insight = insights.find((item) => item.dishId === dish.id)
    const currentStage = getCurrentProductionStage(dish)
    const progress = calculateDishProgress(dish)

    return {
      id: `dish-${dish.id}`,
      title: `${dish.recipe} · ${currentStage?.stage ?? "Completed"}`,
      text:
        insight?.nextAction ??
        `${dish.recipe} is moving through production runtime.`,
      time: dish.targetDispatchTime
        ? `Target ${dish.targetDispatchTime}`
        : `${progress}% complete`,
      risk: insight?.risk ?? "LOW",
    }
  })

  const qcWaiting: StaffSyncItem[] = dishes.flatMap((dish): StaffSyncItem[] =>
    dish.stages
      .filter((stage) => stage.stage === "QC" && stage.status === "WAITING")
      .map((stage): StaffSyncItem => ({
        id: `qc-${dish.id}-${stage.id}`,
        title: "QC Waiting",
        text: `${dish.recipe} is waiting for food safety / chef approval.`,
        time: dish.targetDispatchTime
          ? `Target ${dish.targetDispatchTime}`
          : "Pending",
        risk: dish.priority === "URGENT" ? "CRITICAL" : "HIGH",
      }))
  )

  const packagingWaiting: StaffSyncItem[] = dishes.flatMap(
    (dish): StaffSyncItem[] =>
      dish.stages
        .filter(
          (stage) =>
            stage.stage === "PACKAGING" && stage.status === "WAITING"
        )
        .map((stage): StaffSyncItem => ({
          id: `packaging-${dish.id}-${stage.id}`,
          title: "Packaging Standby",
          text: `${dish.recipe} packaging team must stay ready before dispatch pressure rises.`,
          time: dish.targetDispatchTime
            ? `Target ${dish.targetDispatchTime}`
            : "Standby",
          risk: dish.priority === "URGENT" ? "HIGH" : "MEDIUM",
        }))
  )

  return [...qcWaiting, ...packagingWaiting, ...dishItems].slice(0, 8)
}

export default function StaffTimeline() {
  const summary = getKitchenRuntimeSummary(RUNTIME_DISHES)
  const staffSync = buildStaffSyncItems(RUNTIME_DISHES)

  const availableWorkers = RUNTIME_WORKERS.filter(
    (worker) => worker.status === "AVAILABLE"
  ).length

  const busyWorkers = RUNTIME_WORKERS.filter(
    (worker) => worker.status === "BUSY"
  ).length

  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
            Staff Sync Timeline
          </p>

          <h3 className="mt-2 text-[22px] font-black tracking-[-0.05em] text-white">
            Live staff movement
          </h3>

          <p className="mt-2 max-w-xl text-[11px] font-semibold leading-5 text-white/45">
            Staff timeline is now connected to dish batches, QC waiting,
            packaging readiness, worker availability, and production progress.
          </p>
        </div>

        <span
          className={`w-fit rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${
            riskStyles[summary.highestRisk]
          }`}
        >
          {summary.highestRisk}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <TimelineMetric label="Available" value={availableWorkers} />
        <TimelineMetric label="Busy" value={busyWorkers} />
        <TimelineMetric label="Waiting" value={summary.waitingStages} />
        <TimelineMetric label="Progress" value={`${summary.runtimeProgress}%`} />
      </div>

      <div className="mt-4 space-y-3">
        {staffSync.map((item) => (
          <div
            key={item.id}
            className="rounded-[16px] border border-white/10 bg-black/20 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="min-w-0 truncate text-[11px] font-black text-white">
                {item.title}
              </p>

              <span className="shrink-0 text-[9px] text-slate-500">
                {item.time}
              </span>
            </div>

            <p className="mt-2 text-[10px] leading-5 text-slate-400">
              {item.text}
            </p>

            <div className="mt-3 flex justify-end">
              <span
                className={`rounded-full border px-3 py-1 text-[7px] font-black uppercase tracking-[0.12em] ${
                  riskStyles[item.risk]
                }`}
              >
                {item.risk}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TimelineMetric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[14px] border border-white/10 bg-black/20 p-3">
      <p className="text-[7px] font-black uppercase tracking-[0.16em] text-white/35">
        {label}
      </p>

      <p className="mt-1 text-[17px] font-black text-white">{value}</p>
    </div>
  )
}