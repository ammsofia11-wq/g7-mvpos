import {
  RUNTIME_DISHES,
  getDishRuntimeInsights,
  getKitchenRuntimeSummary,
  type RuntimeDish,
} from "./kitchen-runtime-data"

import type { RuntimeRiskLevel } from "./runtime-engine-data"

const productionFlow = [
  {
    number: "01",
    value: "Collection",
    team: "Storage / Preparation Team",
  },
  {
    number: "02",
    value: "Preparation",
    team: "Preparation Team",
  },
  {
    number: "03",
    value: "Cooking",
    team: "Hot Kitchen / Bakery",
  },
  {
    number: "04",
    value: "Cooling / Holding",
    team: "Cold Section Team",
  },
  {
    number: "05",
    value: "Food Safety QC",
    team: "Food Safety / Head Chef",
  },
  {
    number: "06",
    value: "Plating / Assembly",
    team: "Assembly / Salads Team",
  },
  {
    number: "07",
    value: "Packaging / Dispatch",
    team: "Packaging Team",
  },
]

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  MEDIUM: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
  HIGH: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  CRITICAL: "border-red-400/20 bg-red-400/10 text-red-300",
}

export default function ProductionFlow() {
  const summary = getKitchenRuntimeSummary(RUNTIME_DISHES)
  const insights = getDishRuntimeInsights(RUNTIME_DISHES)

  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
            Production Flow
          </p>

          <h3 className="mt-2 text-[22px] font-black tracking-[-0.05em] text-white">
            Dish runtime flow
          </h3>

          <p className="mt-2 max-w-xl text-[11px] font-semibold leading-5 text-white/45">
            Production flow is now connected to live dish batches, stages,
            workers, portions, priorities, and next runtime actions.
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

      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <FlowMetric label="Dishes" value={summary.totalDishes} />
        <FlowMetric label="Portions" value={summary.totalPortions} />
        <FlowMetric label="Progress" value={`${summary.runtimeProgress}%`} />
        <FlowMetric label="Waiting" value={summary.waitingStages} />
      </div>

      <div className="mt-4 space-y-2">
        {productionFlow.map((step) => (
          <FlowItem
            key={step.number}
            number={step.number}
            value={step.value}
            team={step.team}
          />
        ))}
      </div>

      <div className="mt-5 rounded-[18px] border border-cyan-300/15 bg-cyan-300/[0.04] p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
            Active Dish Batches
          </p>

          <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-white/45">
            {summary.activeDishes} active
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {insights.map((insight) => {
            const dish = RUNTIME_DISHES.find(
              (item) => item.id === insight.dishId
            )

            return (
              <DishInsightCard
                key={insight.dishId}
                insight={insight}
                dish={dish}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function FlowMetric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[14px] border border-white/10 bg-black/20 p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-1 text-[18px] font-black tracking-[-0.04em] text-white">
        {value}
      </p>
    </div>
  )
}

function FlowItem({
  number,
  value,
  team,
}: {
  number: string
  value: string
  team: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] border border-white/10 bg-black/20 p-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] bg-cyan-300/10 text-[10px] font-black text-cyan-300">
        {number}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-black text-slate-200">{value}</p>

        <p className="mt-1 text-[9px] font-bold text-slate-500">{team}</p>
      </div>
    </div>
  )
}

function DishInsightCard({
  insight,
  dish,
}: {
  insight: {
    dishId: string
    recipe: string
    priority: RuntimeDish["priority"]
    risk: RuntimeRiskLevel
    currentStage: string
    nextAction: string
    progress: number
    portions: number
  }
  dish?: RuntimeDish
}) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-black/25 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[12px] font-black text-white">
            {insight.recipe}
          </p>

          <p className="mt-1 text-[9px] font-semibold text-white/40">
            {dish?.planName ?? "Production"} · {dish?.mealPeriod ?? "Batch"} ·{" "}
            {insight.portions} portions
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full border px-2 py-1 text-[7px] font-black uppercase tracking-[0.12em] ${
            riskStyles[insight.risk]
          }`}
        >
          {insight.risk}
        </span>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-[12px] border border-white/10 bg-white/[0.035] p-2">
          <p className="text-[7px] font-black uppercase tracking-[0.16em] text-white/30">
            Current Stage
          </p>

          <p className="mt-1 text-[10px] font-black text-white">
            {insight.currentStage}
          </p>
        </div>

        <div className="rounded-[12px] border border-white/10 bg-white/[0.035] p-2">
          <p className="text-[7px] font-black uppercase tracking-[0.16em] text-white/30">
            Target
          </p>

          <p className="mt-1 text-[10px] font-black text-white">
            {dish?.targetDispatchTime ?? "Not set"}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white/30">
            Batch Progress
          </p>

          <p className="text-[10px] font-black text-cyan-300">
            {insight.progress}%
          </p>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-300"
            style={{ width: `${insight.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-3 rounded-[12px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-3">
        <p className="text-[7px] font-black uppercase tracking-[0.16em] text-[#CCFF33]">
          Next Runtime Action
        </p>

        <p className="mt-1 text-[10px] font-bold leading-4 text-white/70">
          {insight.nextAction}
        </p>
      </div>
    </div>
  )
}