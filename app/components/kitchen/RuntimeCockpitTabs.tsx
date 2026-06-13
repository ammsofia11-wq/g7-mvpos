"use client"

import { useEffect, useMemo, useState } from "react"

import AdaptiveRuntimeLayoutEngine from "./AdaptiveRuntimeLayoutEngine"
import RuntimeCauseEffectEngine from "./RuntimeCauseEffectEngine"
import RuntimeDecisionTimeline from "./RuntimeDecisionTimeline"
import RuntimeInterventionPlanner from "./RuntimeInterventionPlanner"
import RuntimeMemoryGraph from "./RuntimeMemoryGraph"

import { useRuntime } from "@/app/components/kitchen/runtime-context"

import {
  getRuntimeEngineDecisions,
  getRuntimeEngineRecommendedFocus,
  getRuntimeStageCalculatedRisk,
  type RuntimeRiskLevel,
} from "@/app/components/kitchen/runtime-engine-data"

type RuntimeCockpitTab =
  | "adaptive"
  | "decisions"
  | "memory"
  | "cause"
  | "intervention"

type RuntimeCockpitTabConfig = {
  id: RuntimeCockpitTab
  label: string
  hint: string
  signal: string
}

const tabs: RuntimeCockpitTabConfig[] = [
  {
    id: "adaptive",
    label: "Adaptive",
    hint: "Layout",
    signal: "Live layout response",
  },
  {
    id: "decisions",
    label: "Decisions",
    hint: "AI log",
    signal: "Decision pressure",
  },
  {
    id: "memory",
    label: "Memory",
    hint: "Graph",
    signal: "Learning pattern",
  },
  {
    id: "cause",
    label: "Cause",
    hint: "Impact",
    signal: "Flow impact",
  },
  {
    id: "intervention",
    label: "Actions",
    hint: "Plan",
    signal: "Who acts next",
  },
]

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  MEDIUM: "border-yellow-400/25 bg-yellow-400/10 text-yellow-300",
  HIGH: "border-orange-400/25 bg-orange-400/10 text-orange-300",
  CRITICAL: "border-red-400/25 bg-red-400/10 text-red-300",
}

function getTabSuggestion(risk: RuntimeRiskLevel): RuntimeCockpitTab {
  if (risk === "CRITICAL") return "intervention"
  if (risk === "HIGH") return "cause"
  if (risk === "MEDIUM") return "decisions"

  return "adaptive"
}

function getTabPriorityLabel(tab: RuntimeCockpitTab) {
  if (tab === "intervention") return "Action layer"
  if (tab === "cause") return "Impact layer"
  if (tab === "decisions") return "Decision layer"
  if (tab === "memory") return "Learning layer"

  return "Layout layer"
}

function getTabRuntimeNote(tab: RuntimeCockpitTab, risk: RuntimeRiskLevel) {
  if (tab === "intervention") {
    return risk === "CRITICAL"
      ? "Critical pressure detected. Intervention planning should stay visible until the runtime risk drops."
      : "Intervention layer is ready to convert runtime decisions into owner/action/ETA."
  }

  if (tab === "cause") {
    return risk === "HIGH" || risk === "CRITICAL"
      ? "Cause-effect layer should explain where pressure is spreading across the kitchen flow."
      : "Cause-effect layer is monitoring flow impact without major escalation."
  }

  if (tab === "decisions") {
    return "Decision layer records what the runtime engine recommends and why."
  }

  if (tab === "memory") {
    return "Memory layer turns repeated signals into operational learning patterns."
  }

  return "Adaptive layer keeps the cockpit layout aligned with live kitchen pressure."
}

function getRiskCount(
  liveStages: ReturnType<typeof useRuntime>["runtime"]["liveStages"],
  risk: RuntimeRiskLevel
) {
  return liveStages.filter(
    (stage) => getRuntimeStageCalculatedRisk(stage) === risk
  ).length
}

export default function RuntimeCockpitTabs() {
  const { runtime } = useRuntime()

  const [activeTab, setActiveTab] =
    useState<RuntimeCockpitTab>("adaptive")

  const runtimeRisk = runtime.summary.aiSupervisorStatus
  const suggestedTab = getTabSuggestion(runtimeRisk)
  const recommendedFocus = getRuntimeEngineRecommendedFocus(runtime.liveStages)

  const decisions = useMemo(
    () => getRuntimeEngineDecisions(runtime.liveStages),
    [runtime.liveStages]
  )

  const criticalStages = getRiskCount(runtime.liveStages, "CRITICAL")
  const highStages = getRiskCount(runtime.liveStages, "HIGH")

  useEffect(() => {
    if (runtimeRisk === "CRITICAL") {
      setActiveTab("intervention")
    }
  }, [runtimeRisk])

  return (
    <section className="rounded-[28px] border border-[#CCFF33]/10 bg-[#0B1108]/90 p-3 shadow-[0_22px_70px_rgba(0,0,0,0.28)] md:p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Intelligence Drawer
            </p>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-white/40">
              {activeTab}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] ${riskStyles[runtimeRisk]}`}
            >
              {runtimeRisk}
            </span>

            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-cyan-300">
              Suggested: {suggestedTab}
            </span>
          </div>

          <h2 className="mt-2 text-[24px] font-black tracking-[-0.055em] text-white">
            Runtime intelligence layers.
          </h2>

          <p className="mt-1 max-w-xl text-[11px] font-medium leading-5 text-white/45">
            Switch between AI layout, decisions, memory, cause-effect, and
            intervention planning. The cockpit now reacts to live runtime risk.
          </p>

          <div className="mt-4 rounded-[18px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-3">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
              Runtime Focus
            </p>

            <p className="mt-2 text-[12px] font-black leading-5 text-white">
              {recommendedFocus}
            </p>

            <p className="mt-2 text-[10px] font-semibold leading-5 text-white/45">
              {getTabRuntimeNote(activeTab, runtimeRisk)}
            </p>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-4 xl:min-w-[560px]">
          <CockpitMetric label="Pulse" value={runtime.runtimePulse} />
          <CockpitMetric label="Decisions" value={decisions.length} />
          <CockpitMetric label="Critical" value={criticalStages} />
          <CockpitMetric label="High" value={highStages} />
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-5">
        {tabs.map((tab) => {
          const active = activeTab === tab.id
          const suggested = suggestedTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-[18px] border px-3 py-3 text-left transition-all duration-300 ${
                active
                  ? "border-[#CCFF33]/35 bg-[#CCFF33]/10 shadow-[0_0_28px_rgba(204,255,51,0.08)]"
                  : suggested
                    ? "border-cyan-300/25 bg-cyan-300/[0.06] hover:border-[#CCFF33]/25 hover:bg-[#CCFF33]/[0.06]"
                    : "border-white/10 bg-white/[0.03] hover:border-[#CCFF33]/20 hover:bg-[#CCFF33]/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p
                  className={`text-[10px] font-black uppercase tracking-[0.14em] ${
                    active
                      ? "text-[#CCFF33]"
                      : suggested
                        ? "text-cyan-300"
                        : "text-white/45"
                  }`}
                >
                  {tab.label}
                </p>

                {suggested && (
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-[7px] font-black uppercase tracking-[0.1em] text-cyan-300">
                    AI
                  </span>
                )}
              </div>

              <p className="mt-1 text-[10px] font-semibold text-white/35">
                {tab.hint}
              </p>

              <p className="mt-3 text-[9px] font-bold leading-4 text-white/35">
                {tab.signal}
              </p>

              <p className="mt-2 text-[8px] font-black uppercase tracking-[0.12em] text-white/20">
                {getTabPriorityLabel(tab.id)}
              </p>
            </button>
          )
        })}
      </div>

      <div className="mt-4">
        {activeTab === "adaptive" && <AdaptiveRuntimeLayoutEngine />}
        {activeTab === "decisions" && <RuntimeDecisionTimeline />}
        {activeTab === "memory" && <RuntimeMemoryGraph />}
        {activeTab === "cause" && <RuntimeCauseEffectEngine />}
        {activeTab === "intervention" && <RuntimeInterventionPlanner />}
      </div>
    </section>
  )
}

function CockpitMetric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-3 text-right">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-1 break-words text-[18px] font-black tracking-[-0.04em] text-white">
        {value}
      </p>
    </div>
  )
}