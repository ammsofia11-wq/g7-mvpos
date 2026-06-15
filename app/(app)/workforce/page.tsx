"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import AIRuntimeSupervisor from "@/app/components/kitchen/AIRuntimeSupervisor"
import AIKitchenOrchestrator from "@/app/components/kitchen/AIKitchenOrchestrator"
import ProductionTimeline from "@/app/components/kitchen/ProductionTimeline"
import { RuntimeProvider } from "@/app/components/kitchen/runtime-context"
import WorkforceMap from "@/app/components/kitchen/WorkforceMap"

import RuntimeEscalationFeed from "@/app/components/system/runtime/RuntimeEscalationFeed"
import RuntimeWorkforcePressurePanel from "@/app/components/system/runtime/RuntimeWorkforcePressurePanel"

import {
  executeRuntimeAction,
} from "@/app/components/system/runtime/runtime-action-engine"

type WorkforceView =
  | "map"
  | "orchestrator"
  | "supervisor"
  | "timeline"

const WORKFORCE_ACTIVE_VIEW_KEY = "g7-workforce-active-view"

const workforceViews: {
  id: WorkforceView
  label: string
  description: string
}[] = [
  {
    id: "map",
    label: "Map",
    description: "People & stations",
  },

  {
    id: "orchestrator",
    label: "Orchestrator",
    description: "AI coordination",
  },

  {
    id: "supervisor",
    label: "Supervisor",
    description: "Runtime oversight",
  },

  {
    id: "timeline",
    label: "Timeline",
    description: "Production flow",
  },
]

const AI_RECOMMENDATIONS = [
  {
    title: "Move Prep Support → Packaging",
    risk: "CRITICAL",
    impact: "+18 dispatch capacity",
    action: "MOVE_SUPPORT_TO_PACKAGING",
    description:
      "Packaging pressure exceeded safe threshold. Reassign 2 support positions before release window.",
  },

  {
    title: "Cold Section Stable",
    risk: "STABLE",
    impact: "1 support available",
    action: "ESCALATE_QA_SUPPORT",
    description:
      "Cold Section runtime stable. One operator can support QA or Dispatch escalation.",
  },

  {
    title: "Lunch Runtime Escalation",
    risk: "HIGH",
    impact: "Production slowdown risk",
    action: "REDUCE_HOT_KITCHEN_PRESSURE",
    description:
      "Hot kitchen pressure increasing. AI recommends temporary supervisor intervention.",
  },
] as const

function isWorkforceView(value: string | null): value is WorkforceView {
  return (
    value === "map" ||
    value === "orchestrator" ||
    value === "supervisor" ||
    value === "timeline"
  )
}

export default function WorkforcePage() {
  return (
    <RuntimeProvider>
      <Suspense fallback={<WorkforceLoading />}>
        <WorkforceRuntime />
      </Suspense>
    </RuntimeProvider>
  )
}

function WorkforceRuntime() {
  const searchParams = useSearchParams()

  const employeeId =
    searchParams.get("employeeId")

  const [activeView, setActiveView] =
    useState<WorkforceView>("map")

  const [runtimeRefresh, setRuntimeRefresh] =
    useState(0)

  useEffect(() => {
    const savedView = window.localStorage.getItem(
      WORKFORCE_ACTIVE_VIEW_KEY
    )

    if (isWorkforceView(savedView)) {
      setActiveView(savedView)
    }
  }, [])

  const activeEscalations = useMemo(() => {
    return AI_RECOMMENDATIONS.filter(
      (item) =>
        item.risk === "CRITICAL" ||
        item.risk === "HIGH"
    ).length
  }, [runtimeRefresh])

  function changeActiveView(view: WorkforceView) {
    setActiveView(view)

    window.localStorage.setItem(
      WORKFORCE_ACTIVE_VIEW_KEY,
      view
    )
  }

  function runAIAction(
    action:
      | "MOVE_SUPPORT_TO_PACKAGING"
      | "ESCALATE_QA_SUPPORT"
      | "REDUCE_HOT_KITCHEN_PRESSURE"
  ) {
    executeRuntimeAction(action)

    setRuntimeRefresh((current) => current + 1)
  }

  return (
    <main className="g7-page min-h-screen overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-[1460px] flex-col gap-4 px-4 py-4">
        <section className="rounded-[32px] border border-cyan-400/15 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.24em] text-cyan-300">
                G7 Workforce Runtime OS
              </p>

              <h1 className="mt-2 text-[38px] font-black leading-[0.9] tracking-[-0.07em] text-white sm:text-[52px]">
                Workforce

                <span className="block text-cyan-300">
                  Command Floor
                </span>
              </h1>

              <p className="mt-4 max-w-3xl text-[13px] leading-6 text-white/55">
                Workforce intelligence runtime for
                escalation management, station balancing,
                support coordination, staffing pressure,
                and operational workforce movement.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[420px]">
              <WorkforceHeroCard
                label="Current Focus"
                value={
                  employeeId
                    ? "Employee Linked"
                    : "Full Workforce"
                }
                note={
                  employeeId
                    ? employeeId
                    : "All stations visible"
                }
              />

              <WorkforceHeroCard
                label="Runtime Mode"
                value="AI Execution"
                note="Cross-runtime automation"
              />
            </div>
          </div>
        </section>

        <RuntimeEscalationFeed />

        <RuntimeWorkforcePressurePanel />

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(34,211,238,0.05),rgba(255,255,255,0.02))] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-cyan-300">
                  Workforce Intelligence AI
                </p>

                <h2 className="mt-2 text-[30px] font-black tracking-[-0.06em] text-white">
                  AI Workforce Recommendations
                </h2>

                <p className="mt-3 max-w-2xl text-[12px] leading-6 text-white/50">
                  Runtime AI automatically monitors
                  staffing density, overload pressure,
                  dispatch readiness, QA bottlenecks,
                  and operational balance.
                </p>
              </div>

              <div className="rounded-[20px] border border-red-500/25 bg-red-500/10 px-4 py-3 text-right">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-red-300">
                  Active Escalations
                </p>

                <p className="mt-1 text-[28px] font-black text-white">
                  {activeEscalations}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {AI_RECOMMENDATIONS.map(
                (recommendation) => (
                  <div
                    key={recommendation.title}
                    className="rounded-[22px] border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] ${
                              recommendation.risk ===
                              "CRITICAL"
                                ? "bg-red-500/15 text-red-300"
                                : recommendation.risk ===
                                  "HIGH"
                                ? "bg-amber-500/15 text-amber-300"
                                : "bg-emerald-500/15 text-emerald-300"
                            }`}
                          >
                            {recommendation.risk}
                          </span>

                          <span className="text-[9px] font-black uppercase tracking-[0.14em] text-cyan-300">
                            {recommendation.impact}
                          </span>
                        </div>

                        <h3 className="mt-3 text-[20px] font-black tracking-[-0.05em] text-white">
                          {recommendation.title}
                        </h3>

                        <p className="mt-2 max-w-2xl text-[12px] leading-6 text-white/50">
                          {
                            recommendation.description
                          }
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          runAIAction(
                            recommendation.action
                          )
                        }
                        className="rounded-[16px] border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-cyan-300 transition-all duration-300 hover:bg-cyan-400/20"
                      >
                        Execute AI Action
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-300">
                  Workforce View Switcher
                </p>

                <h2 className="mt-2 text-[24px] font-black tracking-[-0.055em] text-white">
                  Intelligence Layers
                </h2>
              </div>

              <div className="rounded-[16px] border border-cyan-400/20 bg-cyan-400/10 px-3 py-2">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-cyan-300">
                  Live Runtime
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              {workforceViews.map((view) => {
                const active =
                  activeView === view.id

                return (
                  <button
                    key={view.id}
                    onClick={() =>
                      changeActiveView(view.id)
                    }
                    className={`rounded-[18px] border px-4 py-4 text-left transition-all duration-300 ${
                      active
                        ? "border-cyan-400/35 bg-cyan-400/12 shadow-[0_0_28px_rgba(34,211,238,0.08)]"
                        : "border-white/10 bg-white/[0.03] hover:border-cyan-400/20 hover:bg-cyan-400/[0.04]"
                    }`}
                  >
                    <p
                      className={`text-[11px] font-black uppercase tracking-[0.14em] ${
                        active
                          ? "text-cyan-300"
                          : "text-white/45"
                      }`}
                    >
                      {view.label}
                    </p>

                    <p className="mt-2 text-[11px] leading-5 text-white/40">
                      {view.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </section>
        </section>

        {activeView === "map" && (
          <WorkforceMap
            selectedEmployeeId={employeeId}
          />
        )}

        {activeView === "orchestrator" && (
          <AIKitchenOrchestrator />
        )}

        {activeView === "supervisor" && (
          <AIRuntimeSupervisor />
        )}

        {activeView === "timeline" && (
          <ProductionTimeline />
        )}
      </div>
    </main>
  )
}

function WorkforceHeroCard({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-[24px] border border-cyan-400/15 bg-cyan-400/[0.06] px-5 py-4">
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-300">
        {label}
      </p>

      <p className="mt-1 text-[22px] font-black text-white">
        {value}
      </p>

      <p className="mt-2 truncate text-[10px] text-white/45">
        {note}
      </p>
    </div>
  )
}

function WorkforceLoading() {
  return (
    <main className="g7-page min-h-screen">
      <div className="mx-auto w-full max-w-[1460px] px-4 py-4">
        <section className="rounded-[32px] border border-cyan-400/20 bg-white/[0.035] p-6">
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-cyan-300">
            Loading Workforce Runtime...
          </p>
        </section>
      </div>
    </main>
  )
}