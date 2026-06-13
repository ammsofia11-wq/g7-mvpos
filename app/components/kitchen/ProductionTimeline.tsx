"use client"

import { useEffect, useState } from "react"

import {
  ProductionTimelineEvent,
  PRODUCTION_TIMELINE_EVENT,
  getProductionTimelineEvents,
} from "@/app/ai/production-timeline-store"

import {
  RUNTIME_DISHES,
  calculateDishProgress,
  getCurrentProductionStage,
  getDishRuntimeInsights,
  getKitchenRuntimeSummary,
  type ProductionStage,
  type RuntimeDish,
} from "./kitchen-runtime-data"

import type { RuntimeRiskLevel } from "./runtime-engine-data"

type TimelineAction = "STARTED" | "COMPLETED" | "WAITING" | "ACTIVE"

type DishTimelineItem = {
  id: string
  recipe: string
  stage: string
  employeeName: string
  action: TimelineAction
  time: string
  risk: RuntimeRiskLevel
  portions: number
  progress: number
  targetDispatchTime?: string
}

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/25 bg-[#CCFF33]/10 text-[#CCFF33]",
  MEDIUM: "border-yellow-400/25 bg-yellow-400/10 text-yellow-300",
  HIGH: "border-orange-400/25 bg-orange-400/10 text-orange-300",
  CRITICAL: "border-red-400/25 bg-red-400/10 text-red-300",
}

function getEventColor(action: TimelineAction | ProductionTimelineEvent["action"]) {
  if (action === "STARTED" || action === "ACTIVE") {
    return {
      dot: "bg-emerald-400",
      badge: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
    }
  }

  if (action === "COMPLETED") {
    return {
      dot: "bg-[#CCFF33]",
      badge: "border-[#CCFF33]/30 bg-[#CCFF33]/15 text-[#CCFF33]",
    }
  }

  return {
    dot: "bg-yellow-300",
    badge: "border-yellow-300/30 bg-yellow-300/15 text-yellow-200",
  }
}

function getStageAction(stage: ProductionStage): TimelineAction {
  if (stage.status === "COMPLETED") return "COMPLETED"
  if (stage.status === "ACTIVE") return "ACTIVE"

  return "WAITING"
}

function getStageTime(stage: ProductionStage) {
  if (stage.completedAt) return stage.completedAt
  if (stage.startedAt) return stage.startedAt

  return "Pending"
}

function getStageEmployee(stage: ProductionStage) {
  return stage.workers[0]?.name ?? "Unassigned"
}

function buildDishTimeline(dishes: RuntimeDish[]): DishTimelineItem[] {
  const insights = getDishRuntimeInsights(dishes)

  return dishes.flatMap((dish) => {
    const insight = insights.find((item) => item.dishId === dish.id)
    const currentStage = getCurrentProductionStage(dish)

    return dish.stages.map((stage, index) => {
      const isCurrentStage = currentStage?.id === stage.id

      return {
        id: `${dish.id}-${stage.id}`,
        recipe: dish.recipe,
        stage: stage.stage,
        employeeName: getStageEmployee(stage),
        action: getStageAction(stage),
        time: getStageTime(stage),
        risk: isCurrentStage ? insight?.risk ?? "LOW" : "LOW",
        portions: dish.portions,
        progress: calculateDishProgress(dish),
        targetDispatchTime: dish.targetDispatchTime,
      }
    })
  })
}

export default function ProductionTimeline() {
  const [events, setEvents] = useState<ProductionTimelineEvent[]>([])

  const summary = getKitchenRuntimeSummary(RUNTIME_DISHES)
  const dishTimeline = buildDishTimeline(RUNTIME_DISHES)

  const activeTimeline = dishTimeline.filter(
    (item) => item.action === "ACTIVE" || item.action === "WAITING"
  )

  const completedTimeline = dishTimeline.filter(
    (item) => item.action === "COMPLETED"
  )

  useEffect(() => {
    function syncTimeline() {
      setEvents(getProductionTimelineEvents())
    }

    syncTimeline()

    window.addEventListener(PRODUCTION_TIMELINE_EVENT, syncTimeline)

    return () => {
      window.removeEventListener(PRODUCTION_TIMELINE_EVENT, syncTimeline)
    }
  }, [])

  return (
    <section className="rounded-[32px] border border-cyan-400/20 bg-white/[0.035] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-cyan-300">
            Live Production Timeline
          </p>

          <h2 className="mt-2 text-[34px] font-black tracking-[-0.06em] text-white">
            Dish Runtime Event Feed
          </h2>

          <p className="mt-2 max-w-2xl text-[12px] font-semibold leading-6 text-white/50">
            Timeline now reads from real dish batches, production stages,
            assigned workers, portions, progress, target dispatch time, and
            live production events.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 xl:min-w-[360px]">
          <TimelineMetric label="Dishes" value={summary.totalDishes} />
          <TimelineMetric label="Stages" value={dishTimeline.length} />
          <TimelineMetric label="Events" value={events.length} />
        </div>
      </div>

      <div className="mt-6 rounded-[26px] border border-cyan-300/15 bg-cyan-300/[0.04] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
              Active Production Movement
            </p>

            <p className="mt-1 text-[12px] font-semibold text-white/45">
              Current and waiting stages from dish runtime batches.
            </p>
          </div>

          <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-white/45">
            {activeTimeline.length} live
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {activeTimeline.length === 0 ? (
            <EmptyState message="No active or waiting dish stages at the moment." />
          ) : (
            activeTimeline.map((item) => (
              <DishTimelineCard key={item.id} item={item} />
            ))
          )}
        </div>
      </div>

      <div className="mt-5 rounded-[26px] border border-white/10 bg-black/15 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Completed Stage History
            </p>

            <p className="mt-1 text-[12px] font-semibold text-white/45">
              Completed production steps from current dish batches.
            </p>
          </div>

          <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-white/45">
            {completedTimeline.length} done
          </span>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {completedTimeline.slice(0, 6).map((item) => (
            <DishTimelineCard key={item.id} item={item} compact />
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-[26px] border border-purple-300/15 bg-purple-400/[0.04] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.22em] text-purple-300">
              Manual Runtime Events
            </p>

            <p className="mt-1 text-[12px] font-semibold text-white/45">
              Events generated by production task actions.
            </p>
          </div>

          <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-white/45">
            {events.length} events
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {events.length === 0 ? (
            <EmptyState message="No manual runtime events yet. Start production tasks to generate live kitchen events." />
          ) : (
            events.map((event) => {
              const color = getEventColor(event.action)

              return (
                <article
                  key={event.id}
                  className="rounded-[24px] border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`mt-1 h-3 w-3 rounded-full ${color.dot}`}
                      />

                      <div>
                        <p className="text-[16px] font-black text-white">
                          {event.employeeName}
                        </p>

                        <p className="mt-1 text-[13px] font-bold text-white/45">
                          {event.recipe}
                        </p>

                        <p className="mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-purple-300">
                          {event.stage}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] ${color.badge}`}
                      >
                        {event.action}
                      </div>

                      <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/45">
                        {event.time}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

function DishTimelineCard({
  item,
  compact,
}: {
  item: DishTimelineItem
  compact?: boolean
}) {
  const color = getEventColor(item.action)

  return (
    <article
      className={`rounded-[24px] border border-white/10 bg-black/20 ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className={`mt-1 h-3 w-3 shrink-0 rounded-full ${color.dot}`} />

          <div className="min-w-0">
            <p className="truncate text-[16px] font-black text-white">
              {item.employeeName}
            </p>

            <p className="mt-1 truncate text-[13px] font-bold text-white/45">
              {item.recipe}
            </p>

            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-cyan-300">
              {item.stage} · {item.portions} portions
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${color.badge}`}
          >
            {item.action}
          </div>

          <div
            className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${
              riskStyles[item.risk]
            }`}
          >
            {item.risk}
          </div>

          <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-white/45">
            {item.time}
          </div>
        </div>
      </div>

      {!compact && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
              Batch Progress
            </p>

            <p className="mt-1 text-[18px] font-black text-white">
              {item.progress}%
            </p>
          </div>

          <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
              Target Dispatch
            </p>

            <p className="mt-1 text-[18px] font-black text-white">
              {item.targetDispatchTime ?? "Not set"}
            </p>
          </div>
        </div>
      )}
    </article>
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
    <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-right">
      <p className="text-[8px] font-black uppercase tracking-[0.22em] text-white/35">
        {label}
      </p>

      <p className="mt-1 text-[24px] font-black text-white">{value}</p>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/20 p-8 text-center">
      <p className="text-[30px]">📡</p>

      <p className="mt-3 text-[18px] font-black tracking-[-0.04em] text-white">
        No Runtime Events Yet
      </p>

      <p className="mt-2 text-[12px] font-bold leading-5 text-white/40">
        {message}
      </p>
    </div>
  )
}