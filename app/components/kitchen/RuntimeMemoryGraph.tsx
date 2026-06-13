"use client"

import { useMemo } from "react"

import { useRuntime } from "@/app/components/kitchen/runtime-context"

import {
  getRuntimeEngineDecisions,
  getRuntimeStageCalculatedRisk,
  type RuntimeRiskLevel,
  type RuntimeStage,
} from "@/app/components/kitchen/runtime-engine-data"

type MemoryNode = {
  id: string
  label: string
  weight: number
  relation: string
  risk: RuntimeRiskLevel
}

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  MEDIUM: "border-yellow-400/25 bg-yellow-400/10 text-yellow-300",
  HIGH: "border-orange-400/25 bg-orange-400/10 text-orange-300",
  CRITICAL: "border-red-400/25 bg-red-400/10 text-red-300",
}

function clampWeight(value: number) {
  if (value < 8) return 8
  if (value > 100) return 100

  return Math.round(value)
}

function getRiskScore(risk: RuntimeRiskLevel) {
  if (risk === "CRITICAL") return 100
  if (risk === "HIGH") return 82
  if (risk === "MEDIUM") return 58

  return 28
}

function getHighestRisk(risks: RuntimeRiskLevel[]): RuntimeRiskLevel {
  if (risks.includes("CRITICAL")) return "CRITICAL"
  if (risks.includes("HIGH")) return "HIGH"
  if (risks.includes("MEDIUM")) return "MEDIUM"

  return "LOW"
}

function getNodeTone(node: MemoryNode) {
  return riskStyles[node.risk]
}

function getActiveStages(stages: RuntimeStage[]) {
  return stages.filter((stage) => stage.status === "ACTIVE")
}

function getBlockedStages(stages: RuntimeStage[]) {
  return stages.filter((stage) => stage.status === "BLOCKED")
}

function getDelayedStages(stages: RuntimeStage[]) {
  return stages.filter((stage) => stage.status === "DELAYED")
}

function getWaitingStages(stages: RuntimeStage[]) {
  return stages.filter((stage) => stage.status === "WAITING")
}

function getCompletedStages(stages: RuntimeStage[]) {
  return stages.filter((stage) => stage.status === "COMPLETED")
}

function getStageTypeRisk(
  stages: RuntimeStage[],
  stageType: RuntimeStage["stageType"]
): RuntimeRiskLevel {
  const risks = stages
    .filter((stage) => stage.stageType === stageType)
    .map((stage) => getRuntimeStageCalculatedRisk(stage))

  return getHighestRisk(risks)
}

function buildMemoryNodes(stages: RuntimeStage[]): MemoryNode[] {
  const decisions = getRuntimeEngineDecisions(stages)

  const activeStages = getActiveStages(stages)
  const blockedStages = getBlockedStages(stages)
  const delayedStages = getDelayedStages(stages)
  const waitingStages = getWaitingStages(stages)
  const completedStages = getCompletedStages(stages)

  const stageRisks = stages.map((stage) => getRuntimeStageCalculatedRisk(stage))
  const highestRisk = getHighestRisk(stageRisks)

  const productionRisk = getHighestRisk(
    stages
      .filter(
        (stage) =>
          stage.stageType === "PREP" ||
          stage.stageType === "COOKING" ||
          stage.stageType === "ASSEMBLY"
      )
      .map((stage) => getRuntimeStageCalculatedRisk(stage))
  )

  const qcRisk = getStageTypeRisk(stages, "QC")
  const packagingRisk = getStageTypeRisk(stages, "PACKAGING")
  const dispatchRisk = getStageTypeRisk(stages, "DISPATCH")

  const averageOutput =
    stages.length > 0
      ? stages.reduce((total, stage) => {
          const target = Math.max(stage.capacityTarget, 1)
          const progress = stage.currentOutput / target

          return total + progress
        }, 0) / stages.length
      : 0

  const blockedPressure = blockedStages.length * 18
  const delayedPressure = delayedStages.length * 10
  const decisionPressure = decisions.length * 8

  const nodes: MemoryNode[] = [
    {
      id: "alerts",
      label: "AI Alerts",
      weight: clampWeight(
        getRiskScore(highestRisk) * 0.6 + blockedPressure + decisionPressure
      ),
      relation:
        blockedStages.length > 0
          ? `${blockedStages.length} blocked stage(s) are feeding escalation memory.`
          : "Alerts are monitoring runtime stages without hard blockage.",
      risk: highestRisk,
    },
    {
      id: "production",
      label: "Production",
      weight: clampWeight(
        getRiskScore(productionRisk) * 0.5 +
          activeStages.length * 10 +
          delayedPressure
      ),
      relation:
        activeStages.length > 0
          ? `${activeStages.length} active stage(s) are shaping live production memory.`
          : "Production memory is waiting for active stage movement.",
      risk: productionRisk,
    },
    {
      id: "workforce",
      label: "Workforce",
      weight: clampWeight(
        waitingStages.length * 9 + delayedStages.length * 12 + 35
      ),
      relation:
        delayedStages.length > 0
          ? "Delayed stages are increasing the need for staff rebalancing."
          : "Workforce memory is watching station density and support needs.",
      risk: delayedStages.length > 0 ? "HIGH" : "LOW",
    },
    {
      id: "qc",
      label: "QC Approval",
      weight: clampWeight(
        getRiskScore(qcRisk) * 0.55 +
          stages.filter((stage) => stage.stageType === "QC").length * 10
      ),
      relation:
        qcRisk === "HIGH" || qcRisk === "CRITICAL"
          ? "QC is becoming a decision gate for downstream flow."
          : "QC memory is tracking approval readiness.",
      risk: qcRisk,
    },
    {
      id: "packaging",
      label: "Packaging",
      weight: clampWeight(
        getRiskScore(packagingRisk) * 0.55 +
          stages.filter((stage) => stage.stageType === "PACKAGING").length * 9
      ),
      relation:
        packagingRisk === "HIGH" || packagingRisk === "CRITICAL"
          ? "Packaging pressure may affect dispatch readiness."
          : "Packaging memory is watching final assembly flow.",
      risk: packagingRisk,
    },
    {
      id: "dispatch",
      label: "Dispatch",
      weight: clampWeight(
        getRiskScore(dispatchRisk) * 0.5 +
          waitingStages.length * 4 +
          (1 - averageOutput) * 35
      ),
      relation:
        dispatchRisk === "HIGH" || dispatchRisk === "CRITICAL"
          ? "Dispatch pressure is becoming sensitive to upstream delay."
          : "Dispatch memory is tracking delivery pressure.",
      risk: dispatchRisk,
    },
    {
      id: "decisions",
      label: "AI Decisions",
      weight: clampWeight(
        decisions.length * 18 + getRiskScore(highestRisk) * 0.45
      ),
      relation:
        decisions.length > 0
          ? `${decisions.length} live decision(s) are influencing command focus.`
          : "AI decisions are in monitoring mode.",
      risk: highestRisk,
    },
    {
      id: "learning",
      label: "Operational Memory",
      weight: clampWeight(
        completedStages.length * 7 +
          decisions.length * 10 +
          activeStages.length * 6 +
          30
      ),
      relation:
        completedStages.length > 0
          ? `${completedStages.length} completed stage(s) are feeding operational learning.`
          : "Memory is collecting early runtime signals.",
      risk: highestRisk,
    },
  ]

  return nodes.sort((a, b) => b.weight - a.weight)
}

function getMemoryInterpretation(nodes: MemoryNode[]) {
  const strongestNode = nodes[0]

  if (!strongestNode) {
    return "The runtime memory graph is waiting for kitchen data."
  }

  if (strongestNode.risk === "CRITICAL" || strongestNode.risk === "HIGH") {
    return `${strongestNode.label} is currently the strongest operational memory signal. The OS should keep decisions focused on this pressure area until the risk drops.`
  }

  return `${strongestNode.label} is currently the strongest signal, but the kitchen memory is stable and mainly learning from normal runtime flow.`
}

export default function RuntimeMemoryGraph() {
  const { runtime } = useRuntime()

  const memoryNodes = useMemo(
    () => buildMemoryNodes(runtime.liveStages),
    [runtime.liveStages]
  )

  const interpretation = getMemoryInterpretation(memoryNodes)

  return (
    <section className="rounded-[30px] border border-white/10 bg-[#10140f]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
            AI Runtime Memory Graph
          </p>

          <h2 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white md:text-[34px]">
            The OS connects events into operational intelligence.
          </h2>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/55">
            Each node is now calculated from live stages, risk, blocked flow,
            AI decisions, QC pressure, packaging readiness, and dispatch
            sensitivity.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 xl:min-w-[360px]">
          <MemoryMetric label="Pulse" value={runtime.runtimePulse} />
          <MemoryMetric label="Nodes" value={memoryNodes.length} />
          <MemoryMetric label="Risk" value={runtime.summary.aiSupervisorStatus} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {memoryNodes.map((node) => (
          <div
            key={node.id}
            className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 transition-all duration-500 hover:border-[#CCFF33]/25 hover:bg-[#CCFF33]/[0.04]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-white">{node.label}</p>

              <p
                className={`rounded-full border px-2 py-1 text-[10px] font-black ${getNodeTone(
                  node
                )}`}
              >
                {node.weight}
              </p>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#CCFF33]"
                style={{ width: `${node.weight}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <span
                className={`rounded-full border px-2 py-1 text-[7px] font-black uppercase tracking-[0.12em] ${riskStyles[node.risk]}`}
              >
                {node.risk}
              </span>

              <span className="text-[8px] font-black uppercase tracking-[0.12em] text-white/25">
                Memory signal
              </span>
            </div>

            <p className="mt-4 text-xs font-semibold leading-5 text-white/55">
              {node.relation}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[24px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.05] p-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
          Memory Interpretation
        </p>

        <p className="mt-2 text-sm font-semibold leading-6 text-white/65">
          {interpretation}
        </p>
      </div>
    </section>
  )
}

function MemoryMetric({
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

      <p className="mt-1 break-words text-[20px] font-black tracking-[-0.04em] text-white">
        {value}
      </p>
    </div>
  )
}