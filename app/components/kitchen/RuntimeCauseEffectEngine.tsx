"use client"

import {
  getBlockedRuntimeStages,
  getDelayedRuntimeStages,
  getRuntimeEngineDecisions,
  getRuntimeOutputGap,
  getRuntimeStageCalculatedRisk,
  getRuntimeStageProgress,
  getRuntimeTimePressure,
  type RuntimeRiskLevel,
} from "./runtime-engine-data"

import { useRuntime } from "./runtime-context"

type CauseEffectChain = {
  id: string
  cause: string
  effect: string
  impact: string
  strength: number
  risk: RuntimeRiskLevel
}

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  MEDIUM: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
  HIGH: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  CRITICAL: "border-red-400/20 bg-red-400/10 text-red-300",
}

const causeStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20 bg-[#CCFF33]/10",
  MEDIUM: "border-yellow-400/20 bg-yellow-400/10",
  HIGH: "border-orange-400/20 bg-orange-400/10",
  CRITICAL: "border-red-400/20 bg-red-500/10",
}

function clampStrength(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)))
}

function getRiskScore(risk: RuntimeRiskLevel) {
  if (risk === "CRITICAL") return 4
  if (risk === "HIGH") return 3
  if (risk === "MEDIUM") return 2
  return 1
}

export default function RuntimeCauseEffectEngine() {
  const { runtime } = useRuntime()

  const blockedStages = getBlockedRuntimeStages(runtime.liveStages)
  const delayedStages = getDelayedRuntimeStages(runtime.liveStages)
  const decisions = getRuntimeEngineDecisions(runtime.liveStages)

  const qcStage = runtime.liveStages.find(
    (stage) =>
      stage.stageType === "QC" ||
      stage.name.toLowerCase().includes("chef") ||
      stage.station.toLowerCase().includes("quality")
  )

  const packagingStage = runtime.liveStages.find(
    (stage) =>
      stage.stageType === "PACKAGING" ||
      stage.station.toLowerCase().includes("packaging")
  )

  const dispatchStage = runtime.liveStages.find(
    (stage) =>
      stage.stageType === "DISPATCH" ||
      stage.station.toLowerCase().includes("dispatch")
  )

  const cookingStage = runtime.liveStages.find(
    (stage) =>
      stage.stageType === "COOKING" ||
      stage.station.toLowerCase().includes("hot") ||
      stage.name.toLowerCase().includes("cooking")
  )

  const chains: CauseEffectChain[] = []

  if (blockedStages.length > 0) {
    const topBlocked = blockedStages
      .slice()
      .sort(
        (a, b) =>
          getRiskScore(getRuntimeStageCalculatedRisk(b)) -
          getRiskScore(getRuntimeStageCalculatedRisk(a))
      )[0]

    const risk = getRuntimeStageCalculatedRisk(topBlocked)

    chains.push({
      id: `blocked-${topBlocked.id}`,
      cause: `${topBlocked.name} blocked`,
      effect: "Downstream stages lose release flow",
      impact: `${topBlocked.station} is creating operational pressure. AI should protect the next dependent stages before the delay spreads.`,
      strength: clampStrength(
        getRuntimeTimePressure(topBlocked) * 0.55 +
          (100 - getRuntimeStageProgress(topBlocked)) * 0.45
      ),
      risk,
    })
  }

  if (cookingStage) {
    const cookingRisk = getRuntimeStageCalculatedRisk(cookingStage)
    const cookingGap = getRuntimeOutputGap(cookingStage)
    const cookingTimePressure = getRuntimeTimePressure(cookingStage)

    if (
      cookingRisk === "HIGH" ||
      cookingRisk === "CRITICAL" ||
      cookingGap > 40 ||
      cookingTimePressure > 80
    ) {
      chains.push({
        id: `cooking-${cookingStage.id}`,
        cause: "Cooking pressure rising",
        effect: "Assembly and QC may receive late batches",
        impact: `Hot kitchen output gap is ${cookingGap}. If cooking does not recover, assembly speed and chef approval timing will be affected.`,
        strength: clampStrength(cookingTimePressure * 0.5 + cookingGap * 0.25),
        risk: cookingRisk,
      })
    }
  }

  if (qcStage && packagingStage) {
    const qcRisk = getRuntimeStageCalculatedRisk(qcStage)
    const packagingRisk = getRuntimeStageCalculatedRisk(packagingStage)

    if (
      qcStage.status === "BLOCKED" ||
      qcRisk === "CRITICAL" ||
      packagingStage.status === "WAITING"
    ) {
      chains.push({
        id: `qc-packaging-${qcStage.id}-${packagingStage.id}`,
        cause: "QC release not flowing",
        effect: "Packaging remains exposed",
        impact: `Packaging depends on chef/QC release. If QC stays blocked, packaging output will not start safely and dispatch risk will rise.`,
        strength: clampStrength(
          getRuntimeTimePressure(qcStage) * 0.45 +
            getRuntimeTimePressure(packagingStage) * 0.35 +
            (packagingStage.status === "WAITING" ? 20 : 0)
        ),
        risk:
          qcRisk === "CRITICAL" || packagingRisk === "CRITICAL"
            ? "CRITICAL"
            : qcRisk === "HIGH" || packagingRisk === "HIGH"
              ? "HIGH"
              : "MEDIUM",
      })
    }
  }

  if (packagingStage && dispatchStage) {
    const packagingRisk = getRuntimeStageCalculatedRisk(packagingStage)
    const dispatchRisk = getRuntimeStageCalculatedRisk(dispatchStage)

    if (
      packagingRisk !== "LOW" ||
      dispatchRisk !== "LOW" ||
      dispatchStage.status === "WAITING"
    ) {
      chains.push({
        id: `packaging-dispatch-${packagingStage.id}-${dispatchStage.id}`,
        cause: "Packaging flow not secured",
        effect: "Dispatch readiness decreases",
        impact: `Dispatch is dependent on packed meals. Any packaging delay close to cut-off time can become a delivery risk.`,
        strength: clampStrength(
          getRuntimeTimePressure(packagingStage) * 0.4 +
            getRuntimeTimePressure(dispatchStage) * 0.4 +
            (dispatchStage.status === "WAITING" ? 18 : 0)
        ),
        risk:
          packagingRisk === "CRITICAL" || dispatchRisk === "CRITICAL"
            ? "CRITICAL"
            : packagingRisk === "HIGH" || dispatchRisk === "HIGH"
              ? "HIGH"
              : "MEDIUM",
      })
    }
  }

  if (runtime.summary.runtimeEfficiency < 75) {
    chains.push({
      id: "low-efficiency",
      cause: "Runtime efficiency below target",
      effect: "Workforce balance needs review",
      impact: `Current runtime efficiency is ${runtime.summary.runtimeEfficiency}%. AI should review output gaps and move support to the station with the highest pressure.`,
      strength: clampStrength(100 - runtime.summary.runtimeEfficiency + 35),
      risk:
        runtime.summary.runtimeEfficiency < 55
          ? "HIGH"
          : runtime.summary.runtimeEfficiency < 70
            ? "MEDIUM"
            : "LOW",
    })
  }

  if (decisions.length > 0) {
    const topDecision = decisions[0]

    chains.push({
      id: `decision-${topDecision.id}`,
      cause: `${topDecision.stageName} needs action`,
      effect: topDecision.title,
      impact: topDecision.body,
      strength: clampStrength(topDecision.priority * 22),
      risk: topDecision.risk,
    })
  }

  const visibleChains = chains
    .slice()
    .sort((a, b) => getRiskScore(b.risk) - getRiskScore(a.risk))
    .slice(0, 4)

  return (
    <section className="rounded-[30px] border border-white/10 bg-[#10140f]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
            Runtime Cause & Effect Engine
          </p>

          <h2 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white md:text-[34px]">
            The OS understands why pressure is spreading.
          </h2>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/55">
            Every runtime signal creates downstream consequences. This engine
            maps how blocked stages, delayed output, QC holds, packaging waits,
            and dispatch risk move through the kitchen.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 xl:min-w-[360px]">
          <CauseMetric label="Chains" value={visibleChains.length} />
          <CauseMetric label="Blocked" value={blockedStages.length} />
          <CauseMetric label="Delayed" value={delayedStages.length} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {visibleChains.length > 0 ? (
          visibleChains.map((chain) => (
            <div
              key={chain.id}
              className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 transition-all duration-500 hover:border-[#CCFF33]/25 hover:bg-[#CCFF33]/[0.04]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/35">
                  Cause → Effect Chain
                </p>

                <span
                  className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.16em] ${
                    riskStyles[chain.risk]
                  }`}
                >
                  {chain.risk}
                </span>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-[1fr_40px_1fr] md:items-center">
                <div
                  className={`rounded-2xl border p-3 ${
                    causeStyles[chain.risk]
                  }`}
                >
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-red-300">
                    Cause
                  </p>

                  <p className="mt-2 text-sm font-black text-white">
                    {chain.cause}
                  </p>
                </div>

                <div className="text-center text-xl font-black text-[#CCFF33]">
                  →
                </div>

                <div className="rounded-2xl border border-[#CCFF33]/20 bg-[#CCFF33]/10 p-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#CCFF33]">
                    Effect
                  </p>

                  <p className="mt-2 text-sm font-black text-white">
                    {chain.effect}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs font-semibold leading-5 text-white/55">
                {chain.impact}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#CCFF33]"
                    style={{ width: `${chain.strength}%` }}
                  />
                </div>

                <p className="text-[10px] font-black text-[#CCFF33]">
                  {chain.strength}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[22px] border border-[#CCFF33]/15 bg-[#CCFF33]/10 p-4 md:col-span-2">
            <p className="text-[12px] font-bold text-[#CCFF33]">
              No pressure chains detected. Runtime flow is currently stable.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function CauseMetric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-black/25 px-4 py-3 text-right">
      <p className="text-[8px] font-black uppercase tracking-[0.22em] text-white/35">
        {label}
      </p>

      <p className="mt-1 text-[24px] font-black text-white">{value}</p>
    </div>
  )
}