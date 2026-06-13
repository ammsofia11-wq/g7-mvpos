"use client"

import { useRuntime } from "@/app/components/kitchen/runtime-context"

import {
  getRuntimeEngineDecisions,
  getRuntimeEngineRecommendedFocus,
  getRuntimeStageCalculatedRisk,
  type RuntimeActionType,
  type RuntimeRiskLevel,
} from "@/app/components/kitchen/runtime-engine-data"

type DecisionLogItem = {
  id: string
  severity: RuntimeRiskLevel
  type: string
  title: string
  reason: string
  nextAction: string
  station: string
  stageName: string
  priority: number
}

function getSeverityClasses(severity: RuntimeRiskLevel) {
  if (severity === "CRITICAL") {
    return {
      border: "border-red-400/30",
      bg: "bg-red-500/10",
      text: "text-red-300",
      glow: "shadow-[0_0_30px_rgba(255,0,0,0.10)]",
    }
  }

  if (severity === "HIGH") {
    return {
      border: "border-orange-400/30",
      bg: "bg-orange-500/10",
      text: "text-orange-300",
      glow: "shadow-[0_0_30px_rgba(255,140,0,0.08)]",
    }
  }

  if (severity === "MEDIUM") {
    return {
      border: "border-[#CCFF33]/20",
      bg: "bg-[#CCFF33]/[0.05]",
      text: "text-[#CCFF33]",
      glow: "shadow-[0_0_30px_rgba(204,255,51,0.06)]",
    }
  }

  return {
    border: "border-white/10",
    bg: "bg-white/[0.03]",
    text: "text-white/55",
    glow: "",
  }
}

function getActionTypeLabel(action: RuntimeActionType) {
  if (action === "ESCALATE_TO_HEAD_CHEF") return "Escalation"
  if (action === "HOLD_DOWNSTREAM") return "Flow Protection"
  if (action === "MOVE_SUPPORT") return "Workforce Move"
  if (action === "CALL_PACKAGING_SUPPORT") return "Packaging Support"
  if (action === "REBALANCE_CAPACITY") return "Capacity Balance"
  if (action === "CHECK_INVENTORY") return "Inventory Check"
  if (action === "RELEASE_NEXT_STAGE") return "Stage Release"
  if (action === "MONITOR") return "Monitoring"

  return "Runtime Decision"
}

function buildDecisionLogs(
  decisions: ReturnType<typeof getRuntimeEngineDecisions>,
  liveStages: ReturnType<typeof useRuntime>["runtime"]["liveStages"]
): DecisionLogItem[] {
  const decisionLogs: DecisionLogItem[] = decisions.map((decision) => {
    const stage = liveStages.find((item) => item.id === decision.stageId)

    return {
      id: decision.id,
      severity: decision.risk,
      type: getActionTypeLabel(decision.action),
      title: decision.title,
      reason: decision.body,
      nextAction: `${decision.stageName}: ${decision.title}`,
      station: stage?.station ?? "Runtime Station",
      stageName: decision.stageName,
      priority: decision.priority,
    }
  })

  const highRiskStageLogs: DecisionLogItem[] = liveStages
    .filter((stage) => {
      const risk = getRuntimeStageCalculatedRisk(stage)

      return risk === "HIGH" || risk === "CRITICAL"
    })
    .map((stage) => {
      const risk = getRuntimeStageCalculatedRisk(stage)

      return {
        id: `stage-log-${stage.id}`,
        severity: risk,
        type: "Stage Pressure",
        title: `${stage.name} requires runtime attention`,
        reason: `${stage.station} is currently ${stage.status}. Output is ${stage.currentOutput}/${stage.capacityTarget} with timing pressure inside the live runtime engine.`,
        nextAction:
          stage.actionLabel ??
          stage.recommendedAction ??
          "Review this stage and protect downstream flow.",
        station: stage.station,
        stageName: stage.name,
        priority: risk === "CRITICAL" ? 4 : 3,
      }
    })

  const merged = [...decisionLogs, ...highRiskStageLogs]

  const unique = merged.filter(
    (item, index, list) =>
      list.findIndex(
        (candidate) =>
          candidate.title === item.title &&
          candidate.stageName === item.stageName
      ) === index
  )

  return unique
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 6)
}

export default function RuntimeDecisionTimeline() {
  const { runtime } = useRuntime()

  const decisions = getRuntimeEngineDecisions(runtime.liveStages)
  const decisionLogs = buildDecisionLogs(decisions, runtime.liveStages)
  const recommendedFocus = getRuntimeEngineRecommendedFocus(runtime.liveStages)

  return (
    <section className="rounded-[30px] border border-white/10 bg-[#10140f]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
            Autonomous Decision Log
          </p>

          <h2 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white md:text-[34px]">
            The runtime AI continuously explains its decisions.
          </h2>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/55">
            Every operational shift, escalation, expansion, or runtime focus
            change becomes part of the kitchen intelligence memory system.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 xl:min-w-[360px]">
          <DecisionMetric label="Pulse" value={runtime.runtimePulse} />
          <DecisionMetric label="Logs" value={decisionLogs.length} />
          <DecisionMetric label="Risk" value={runtime.summary.aiSupervisorStatus} />
        </div>
      </div>

      <div className="mt-5 rounded-[24px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-4">
        <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
          Current Runtime Focus
        </p>

        <p className="mt-2 text-sm font-black leading-6 text-white">
          {recommendedFocus}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {decisionLogs.length > 0 ? (
          decisionLogs.map((decision, index) => {
            const severityStyle = getSeverityClasses(decision.severity)

            return (
              <div
                key={decision.id}
                className={`grid gap-3 rounded-[22px] border p-4 transition-all duration-500 hover:scale-[1.01] md:grid-cols-[100px_1fr_220px] ${severityStyle.border} ${severityStyle.bg} ${severityStyle.glow}`}
              >
                <div>
                  <p
                    className={`text-[10px] font-black uppercase tracking-[0.18em] ${severityStyle.text}`}
                  >
                    {decision.severity}
                  </p>

                  <p className="mt-2 text-[9px] font-black uppercase tracking-[0.18em] text-white/35">
                    Log 0{index + 1}
                  </p>

                  <p className="mt-3 text-[9px] font-bold leading-4 text-white/35">
                    {decision.station}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                    {decision.type}
                  </p>

                  <h3 className="mt-1 text-lg font-black tracking-[-0.04em] text-white">
                    {decision.title}
                  </h3>

                  <p className="mt-2 text-xs font-semibold leading-5 text-white/55">
                    {decision.reason}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#CCFF33]">
                    Next AI Action
                  </p>

                  <p className="mt-2 text-xs font-bold leading-5 text-white/65">
                    {decision.nextAction}
                  </p>
                </div>
              </div>
            )
          })
        ) : (
          <div className="rounded-[22px] border border-[#CCFF33]/15 bg-[#CCFF33]/10 p-4">
            <p className="text-[12px] font-bold text-[#CCFF33]">
              No decision pressure detected. Runtime AI is monitoring the
              kitchen floor.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function DecisionMetric({
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