"use client"

import { useEffect, useState } from "react"

import {
  ProductionTimelineEvent,
  PRODUCTION_TIMELINE_EVENT,
  getProductionTimelineEvents,
} from "@/app/ai/production-timeline-store"

function getEventColor(action: ProductionTimelineEvent["action"]) {
  if (action === "STARTED") {
    return {
      dot: "bg-emerald-400",
      badge:
        "border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
    }
  }

  return {
    dot: "bg-red-400",
    badge:
      "border-red-400/30 bg-red-500/15 text-red-200",
  }
}

export default function ProductionTimeline() {
  const [events, setEvents] = useState<ProductionTimelineEvent[]>([])

  useEffect(() => {
    function syncTimeline() {
      setEvents(getProductionTimelineEvents())
    }

    syncTimeline()

    window.addEventListener(
      PRODUCTION_TIMELINE_EVENT,
      syncTimeline
    )

    return () => {
      window.removeEventListener(
        PRODUCTION_TIMELINE_EVENT,
        syncTimeline
      )
    }
  }, [])

  return (
    <section className="rounded-[32px] border border-cyan-400/20 bg-white/[0.035] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-cyan-300">
            Live Production Timeline
          </p>

          <h2 className="mt-2 text-[34px] font-black tracking-[-0.06em] text-white">
            Runtime Event Feed
          </h2>
        </div>

        <div className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-200">
          {events.length} Events
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {events.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-10 text-center">
            <p className="text-[32px]">📡</p>

            <p className="mt-4 text-[24px] font-black tracking-[-0.05em] text-white">
              No Runtime Events Yet
            </p>

            <p className="mt-2 text-[13px] font-bold text-white/40">
              Start production tasks to generate live kitchen events.
            </p>
          </div>
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
    </section>
  )
}