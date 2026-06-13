"use client"

import { useState } from "react"

import {
  getRuntimeEngineDecisions,
  getRuntimeEngineRecommendedFocus,
  getRuntimeOutputGap,
  getRuntimeStageCalculatedRisk,
  type RuntimeActionType,
  type RuntimeRiskLevel,
  type RuntimeStage,
} from "./runtime-engine-data"

import { useRuntime } from "./runtime-context"

type RuntimeActionCenterProps = {
  riskLevel: RuntimeRiskLevel
  onOpenAlerts: () => void
  onOpenWorkforce: () => void
  onOpenProduction: () => void
  onOpenRuntime: () => void
}

type ActionTarget = "alerts" | "workforce" | "production" | "runtime"

type StaticRuntimeAction = {
  title: string
  description: string
  target: ActionTarget
}

type OperatorStatus = "PENDING" | "READY" | "SUPPORT" | "ESCALATED" | "HELD"

const FALLBACK_ACTIONS: Record<RuntimeRiskLevel, StaticRuntimeAction[]> = {
  LOW: [
    {
      title: "Monitor Runtime",
      description: "Kitchen is stable. Keep tracking active stages.",
      target: "runtime",
    },
    {
      title: "Stay Overview",
      description: "No urgent action required at the moment.",
      target: "runtime",
    },
  ],

  MEDIUM: [
    {
      title: "Review Production",
      description: "Inspect production before pressure rises.",
      target: "production",
    },
    {
      title: "Check Workforce",
      description: "Validate station balance and support coverage.",
      target: "workforce",
    },
  ],

  HIGH: [
    {
      title: "Reassign Support",
      description: "Move staff into overloaded stations.",
      target: "workforce",
    },
    {
      title: "Inspect Runtime",
      description: "Review delayed stages and output gaps.",
      target: "runtime",
    },
    {
      title: "Review Production",
      description: "Protect production flow before the delay spreads.",
      target: "production",
    },
  ],

  CRITICAL: [
    {
      title: "Open Escalations",
      description: "Critical blockage needs immediate action.",
      target: "alerts",
    },
    {
      title: "Backup Line",
      description: "Activate production support to protect flow.",
      target: "production",
    },
    {
      title: "Approval Priority",
      description: "Protect approval and QC release flow.",
      target: "alerts",
    },
  ],
}

function getRiskStyle(riskLevel: RuntimeRiskLevel) {
  if (riskLevel === "CRITICAL") {
    return "border-red-400/30 bg-red-500/10 text-red-300"
  }

  if (riskLevel === "HIGH") {
    return "border-orange-400/30 bg-orange-500/10 text-orange-300"
  }

  if (riskLevel === "MEDIUM") {
    return "border-yellow-300/30 bg-yellow-300/10 text-yellow-200"
  }

  return "border-[#CCFF33]/25 bg-[#CCFF33]/10 text-[#CCFF33]"
}

function getRiskTextClass(riskLevel: RuntimeRiskLevel) {
  if (riskLevel === "CRITICAL") return "text-red-300"
  if (riskLevel === "HIGH") return "text-orange-300"
  if (riskLevel === "MEDIUM") return "text-yellow-200"

  return "text-[#CCFF33]"
}

function getRiskGlow(riskLevel: RuntimeRiskLevel) {
  if (riskLevel === "CRITICAL") {
    return "shadow-[0_18px_60px_rgba(248,113,113,0.14)]"
  }

  if (riskLevel === "HIGH") {
    return "shadow-[0_18px_60px_rgba(251,146,60,0.12)]"
  }

  if (riskLevel === "MEDIUM") {
    return "shadow-[0_18px_60px_rgba(253,224,71,0.10)]"
  }

  return "shadow-[0_18px_60px_rgba(204,255,51,0.10)]"
}

function getTargetFromEngineAction(action: RuntimeActionType): ActionTarget {
  if (action === "ESCALATE_TO_HEAD_CHEF" || action === "HOLD_DOWNSTREAM") {
    return "alerts"
  }

  if (
    action === "MOVE_SUPPORT" ||
    action === "CALL_PACKAGING_SUPPORT" ||
    action === "REBALANCE_CAPACITY"
  ) {
    return "workforce"
  }

  if (action === "RELEASE_NEXT_STAGE" || action === "CHECK_INVENTORY") {
    return "production"
  }

  return "runtime"
}

function getOwnerFromAction(action: RuntimeActionType, stage?: RuntimeStage) {
  if (action === "ESCALATE_TO_HEAD_CHEF") return "Head Chef"
  if (action === "HOLD_DOWNSTREAM") return "Operations Supervisor"
  if (action === "MOVE_SUPPORT") return "Sous Chef"
  if (action === "CALL_PACKAGING_SUPPORT") return "Packaging Lead"
  if (action === "REBALANCE_CAPACITY") return "Production Manager"
  if (action === "CHECK_INVENTORY") return "Storekeeper"
  if (action === "RELEASE_NEXT_STAGE") return "QA / Head Chef"

  return stage?.assignedRole ?? "AI Supervisor"
}

function getOperatorSteps(action: RuntimeActionType, stage?: RuntimeStage) {
  const station = stage?.station ?? "this station"

  if (action === "CALL_PACKAGING_SUPPORT") {
    return [
      "Prepare containers, labels, sealers, and packing table.",
      "Keep packaging workers ready but do not start before QC release.",
      "Call one support worker to packaging standby.",
    ]
  }

  if (action === "HOLD_DOWNSTREAM") {
    return [
      `Keep ${station} on standby.`,
      "Do not move product downstream until upstream dependency is ready.",
      "Notify supervisor if waiting time increases.",
    ]
  }

  if (action === "MOVE_SUPPORT") {
    return [
      `Move available support to ${station}.`,
      "Clear the active blocker before adding more output.",
      "Report back when pressure drops.",
    ]
  }

  if (action === "REBALANCE_CAPACITY") {
    return [
      "Move one flexible worker to the slowest point.",
      "Check tools, trays, and portion setup.",
      "Recheck the output gap after the next cycle.",
    ]
  }

  if (action === "ESCALATE_TO_HEAD_CHEF") {
    return [
      "Call Head Chef or QA owner now.",
      "Keep affected batch on hold.",
      "Do not release downstream before approval.",
    ]
  }

  if (action === "RELEASE_NEXT_STAGE") {
    return [
      "Confirm current stage readiness.",
      "Notify the next station owner.",
      "Release only after readiness check.",
    ]
  }

  return [
    "Keep station visible to supervisor.",
    "Check output gap, waiting time, and dependency.",
    "Escalate only if risk increases.",
  ]
}

function getStatusStyle(status: OperatorStatus) {
  if (status === "READY") return "border-[#CCFF33]/30 bg-[#CCFF33]/10 text-[#CCFF33]"
  if (status === "SUPPORT") return "border-cyan-300/30 bg-cyan-300/10 text-cyan-300"
  if (status === "ESCALATED") return "border-orange-400/30 bg-orange-400/10 text-orange-300"
  if (status === "HELD") return "border-red-400/30 bg-red-400/10 text-red-300"

  return "border-white/10 bg-white/[0.04] text-white/45"
}

export default function RuntimeActionCenter({
  riskLevel,
  onOpenAlerts,
  onOpenProduction,
  onOpenRuntime,
  onOpenWorkforce,
}: RuntimeActionCenterProps) {
  const { runtime } = useRuntime()

  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(
    null
  )
  const [operatorStatus, setOperatorStatus] =
    useState<OperatorStatus>("PENDING")

  const calculatedRisk = runtime.summary.aiSupervisorStatus || riskLevel
  const recommendedFocus = getRuntimeEngineRecommendedFocus(runtime.liveStages)
  const decisions = getRuntimeEngineDecisions(runtime.liveStages)

  const selectedDecision =
    decisions.find((decision) => decision.id === selectedDecisionId) ?? null

  const selectedStage = selectedDecision
    ? runtime.liveStages.find((stage) => stage.id === selectedDecision.stageId)
    : undefined

  const topRiskStages = runtime.liveStages
    .slice()
    .sort((a, b) => {
      const riskScore: Record<RuntimeRiskLevel, number> = {
        CRITICAL: 4,
        HIGH: 3,
        MEDIUM: 2,
        LOW: 1,
      }

      return (
        riskScore[getRuntimeStageCalculatedRisk(b)] -
        riskScore[getRuntimeStageCalculatedRisk(a)]
      )
    })
    .slice(0, 3)

  function runAction(target: ActionTarget) {
    if (target === "alerts") {
      onOpenAlerts()
      return
    }

    if (target === "workforce") {
      onOpenWorkforce()
      return
    }

    if (target === "production") {
      onOpenProduction()
      return
    }

    onOpenRuntime()
  }

  function openDecision(decisionId: string) {
    setSelectedDecisionId(decisionId)
    setOperatorStatus("PENDING")
  }

  const hasEngineDecisions = decisions.length > 0

  return (
    <section
      className={`rounded-[26px] border border-white/10 bg-white/[0.03] p-3 md:p-4 ${getRiskGlow(
        calculatedRisk
      )}`}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 xl:max-w-[430px]">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              AI Action Center
            </p>

            <span
              className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] ${getRiskStyle(
                calculatedRisk
              )}`}
            >
              {calculatedRisk}
            </span>

            <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/45">
              Pulse #{runtime.runtimePulse}
            </span>
          </div>

          <h3 className="mt-2 text-[22px] font-black tracking-[-0.05em] text-white">
            Recommended next moves.
          </h3>

          <p className="mt-1 max-w-xl text-[11px] font-medium leading-5 text-white/45">
            Live actions are now calculated from runtime stages, output gaps,
            time pressure, and active blockages.
          </p>

          <div className="mt-4 rounded-[20px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-3">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
              Current Focus
            </p>

            <p className="mt-2 text-[12px] font-black leading-5 text-white">
              {recommendedFocus}
            </p>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
            {topRiskStages.map((stage) => {
              const stageRisk = getRuntimeStageCalculatedRisk(stage)

              return (
                <div
                  key={stage.id}
                  className="rounded-[16px] border border-white/10 bg-black/25 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-[10px] font-black text-white">
                      {stage.name}
                    </p>

                    <span
                      className={`shrink-0 text-[8px] font-black uppercase tracking-[0.14em] ${getRiskTextClass(
                        stageRisk
                      )}`}
                    >
                      {stageRisk}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-[9px] font-semibold text-white/40">
                    {stage.station} · Gap {getRuntimeOutputGap(stage)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3 xl:min-w-[680px]">
          {hasEngineDecisions
            ? decisions.slice(0, 3).map((decision) => {
                const selected = selectedDecision?.id === decision.id

                return (
                  <button
                    key={decision.id}
                    onClick={() => openDecision(decision.id)}
                    className={`min-w-0 rounded-[18px] border p-3 text-left transition-all duration-300 ${
                      selected
                        ? "border-[#CCFF33]/35 bg-[#CCFF33]/10"
                        : "border-white/10 bg-black/25 hover:border-[#CCFF33]/30 hover:bg-[#CCFF33]/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-[11px] font-black text-white">
                        {decision.title}
                      </p>

                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-[7px] font-black uppercase tracking-[0.12em] ${getRiskStyle(
                          decision.risk
                        )}`}
                      >
                        {decision.risk}
                      </span>
                    </div>

                    <p className="mt-1 line-clamp-2 text-[10px] font-semibold leading-4 text-white/50">
                      {decision.stageName}
                    </p>

                    <p className="mt-2 line-clamp-3 text-[10px] font-semibold leading-4 text-white/45">
                      {decision.body}
                    </p>

                    <p className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#CCFF33]">
                      Open action panel →
                    </p>
                  </button>
                )
              })
            : FALLBACK_ACTIONS[calculatedRisk].map((action) => (
                <button
                  key={action.title}
                  onClick={() => runAction(action.target)}
                  className="min-w-0 rounded-[18px] border border-white/10 bg-black/25 p-3 text-left transition-all duration-300 hover:border-[#CCFF33]/30 hover:bg-[#CCFF33]/10"
                >
                  <p className="truncate text-[11px] font-black text-white">
                    {action.title}
                  </p>

                  <p className="mt-1 line-clamp-2 text-[10px] font-semibold leading-4 text-white/45">
                    {action.description}
                  </p>

                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#CCFF33]">
                    Execute →
                  </p>
                </button>
              ))}

          {selectedDecision && (
            <div className="rounded-[22px] border border-[#CCFF33]/20 bg-[#0B1108]/90 p-4 md:col-span-3">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
                    Operator Action Panel
                  </p>

                  <h4 className="mt-2 text-[20px] font-black tracking-[-0.05em] text-white">
                    {selectedDecision.title}
                  </h4>

                  <p className="mt-1 text-[11px] font-semibold leading-5 text-white/45">
                    {selectedDecision.stageName}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.16em] ${getRiskStyle(
                      selectedDecision.risk
                    )}`}
                  >
                    {selectedDecision.risk}
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.16em] ${getStatusStyle(
                      operatorStatus
                    )}`}
                  >
                    {operatorStatus}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <PanelMetric
                  label="Owner"
                  value={getOwnerFromAction(selectedDecision.action, selectedStage)}
                />
                <PanelMetric
                  label="Station"
                  value={selectedStage?.station ?? "Runtime"}
                />
                <PanelMetric
                  label="Gap"
                  value={selectedStage ? getRuntimeOutputGap(selectedStage) : "—"}
                />
              </div>

              <div className="mt-4 rounded-[16px] border border-white/10 bg-black/25 p-3">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/35">
                  Why this matters
                </p>

                <p className="mt-2 text-[11px] font-semibold leading-5 text-white/60">
                  {selectedDecision.body}
                </p>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_220px]">
                <div className="rounded-[16px] border border-white/10 bg-black/25 p-3">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
                    Worker steps
                  </p>

                  <div className="mt-3 space-y-2">
                    {getOperatorSteps(
                      selectedDecision.action,
                      selectedStage
                    ).map((step, index) => (
                      <div
                        key={step}
                        className="flex gap-3 rounded-[14px] border border-white/10 bg-white/[0.035] p-3"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[10px] font-black text-[#CCFF33]">
                          {index + 1}
                        </span>

                        <p className="text-[11px] font-semibold leading-5 text-white/60">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[16px] border border-white/10 bg-black/25 p-3">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/35">
                    Mobile actions
                  </p>

                  <div className="mt-3 grid gap-2">
                    <OperatorButton
                      label="Mark Ready"
                      onClick={() => setOperatorStatus("READY")}
                    />
                    <OperatorButton
                      label="Call Support"
                      onClick={() => setOperatorStatus("SUPPORT")}
                    />
                    <OperatorButton
                      label="Escalate"
                      onClick={() => setOperatorStatus("ESCALATED")}
                    />
                    <OperatorButton
                      label="Hold"
                      onClick={() => setOperatorStatus("HELD")}
                    />
                  </div>

                  <button
                    onClick={() =>
                      runAction(getTargetFromEngineAction(selectedDecision.action))
                    }
                    className="mt-3 w-full rounded-[14px] border border-cyan-300/20 bg-cyan-300/10 px-3 py-3 text-left text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300 transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/15"
                  >
                    Open related board →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function PanelMetric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-black/25 p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-1 break-words text-[13px] font-black text-white">
        {value}
      </p>
    </div>
  )
}

function OperatorButton({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-[14px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 px-3 py-3 text-left text-[10px] font-black uppercase tracking-[0.14em] text-[#CCFF33] transition-all duration-300 hover:border-[#CCFF33]/40 hover:bg-[#CCFF33]/15"
    >
      {label}
    </button>
  )
}