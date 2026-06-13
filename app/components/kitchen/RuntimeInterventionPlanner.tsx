"use client"

import { useRuntime } from "@/app/components/kitchen/runtime-context"

import {
  getRecommendedRuntimeActionLabel,
  getRuntimeEngineDecisions,
  getRuntimeEngineRecommendedFocus,
  getRuntimeStageCalculatedRisk,
  type RuntimeActionType,
  type RuntimeRiskLevel,
  type RuntimeStage,
} from "@/app/components/kitchen/runtime-engine-data"

type InterventionPlan = {
  id: string
  owner: string
  action: string
  priority: RuntimeRiskLevel
  eta: string
  impact: string
  station: string
  stageName: string
}

function getPriorityClass(priority: RuntimeRiskLevel) {
  if (priority === "CRITICAL") {
    return "border-red-400/30 bg-red-500/10 text-red-300"
  }

  if (priority === "HIGH") {
    return "border-orange-400/30 bg-orange-500/10 text-orange-300"
  }

  if (priority === "MEDIUM") {
    return "border-yellow-300/30 bg-yellow-300/10 text-yellow-200"
  }

  return "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]"
}

function getPriorityScore(priority: RuntimeRiskLevel) {
  if (priority === "CRITICAL") return 4
  if (priority === "HIGH") return 3
  if (priority === "MEDIUM") return 2
  return 1
}

function getOwnerFromAction(action: RuntimeActionType, stage?: RuntimeStage) {
  if (action === "ESCALATE_TO_HEAD_CHEF") return "Head Chef"
  if (action === "HOLD_DOWNSTREAM") return "Operations Supervisor"
  if (action === "MOVE_SUPPORT") return "Sous Chef"
  if (action === "CALL_PACKAGING_SUPPORT") return "Packaging Lead"
  if (action === "REBALANCE_CAPACITY") return "Production Manager"
  if (action === "CHECK_INVENTORY") return "Storekeeper"
  if (action === "RELEASE_NEXT_STAGE") return "QA / Head Chef"
  if (action === "MONITOR") return "AI Supervisor"

  if (stage?.stageType === "QC") return "Food Safety Officer"
  if (stage?.stageType === "PACKAGING") return "Packaging Lead"
  if (stage?.stageType === "COOKING") return "Sous Chef"

  return "AI Supervisor"
}

function getEtaFromRisk(risk: RuntimeRiskLevel) {
  if (risk === "CRITICAL") return "Now"
  if (risk === "HIGH") return "5 min"
  if (risk === "MEDIUM") return "10 min"

  return "Live"
}

function getImpactFromStage(stage?: RuntimeStage, fallback?: string) {
  if (!stage) {
    return fallback ?? "Keeps runtime focus aligned with current kitchen pressure."
  }

  if (stage.operationalImpact) return stage.operationalImpact

  if (stage.stageType === "QC") {
    return "Protects chef approval flow and prevents packaging blockage."
  }

  if (stage.stageType === "PACKAGING") {
    return "Protects dispatch readiness before delivery pressure increases."
  }

  if (stage.stageType === "COOKING") {
    return "Restores hot kitchen output and protects downstream assembly/QC."
  }

  if (stage.stageType === "PREP") {
    return "Improves upstream readiness and prevents cooking delay."
  }

  return fallback ?? "Protects downstream production flow."
}

function buildInterventionPlans(stages: RuntimeStage[]): InterventionPlan[] {
  const decisions = getRuntimeEngineDecisions(stages)

  const decisionPlans: InterventionPlan[] = decisions.map((decision) => {
    const stage = stages.find((item) => item.id === decision.stageId)

    return {
      id: `decision-${decision.id}`,
      owner: getOwnerFromAction(decision.action, stage),
      action: decision.title,
      priority: decision.risk,
      eta: getEtaFromRisk(decision.risk),
      impact: getImpactFromStage(stage, decision.body),
      station: stage?.station ?? "Runtime Station",
      stageName: decision.stageName,
    }
  })

  const riskyStagePlans: InterventionPlan[] = stages
    .filter((stage) => {
      const risk = getRuntimeStageCalculatedRisk(stage)

      return risk === "CRITICAL" || risk === "HIGH"
    })
    .map((stage) => {
      const risk = getRuntimeStageCalculatedRisk(stage)

      return {
        id: `stage-${stage.id}`,
        owner: getOwnerFromAction(stage.recommendedAction ?? "MONITOR", stage),
        action: getRecommendedRuntimeActionLabel(stage),
        priority: risk,
        eta: getEtaFromRisk(risk),
        impact: getImpactFromStage(stage),
        station: stage.station,
        stageName: stage.name,
      }
    })

  const merged = [...decisionPlans, ...riskyStagePlans]

  const unique = merged.filter(
    (item, index, list) =>
      list.findIndex(
        (candidate) =>
          candidate.action === item.action &&
          candidate.stageName === item.stageName
      ) === index
  )

  return unique
    .sort((a, b) => getPriorityScore(b.priority) - getPriorityScore(a.priority))
    .slice(0, 4)
}

export default function RuntimeInterventionPlanner() {
  const { runtime } = useRuntime()

  const interventionPlans = buildInterventionPlans(runtime.liveStages)
  const recommendedFocus = getRuntimeEngineRecommendedFocus(runtime.liveStages)

  return (
    <section className="rounded-[30px] border border-white/10 bg-[#10140f]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
            Runtime Intervention Planner
          </p>

          <h2 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white md:text-[34px]">
            The OS recommends who should act next.
          </h2>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/55">
            The planner converts live runtime intelligence into direct
            operational interventions with owner, priority, ETA, station, and
            expected impact.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 xl:min-w-[360px]">
          <PlannerMetric label="Pulse" value={runtime.runtimePulse} />
          <PlannerMetric label="Plans" value={interventionPlans.length} />
          <PlannerMetric label="Risk" value={runtime.summary.aiSupervisorStatus} />
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

      <div className="mt-6 grid gap-3 xl:grid-cols-4">
        {interventionPlans.length > 0 ? (
          interventionPlans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 transition-all duration-500 hover:border-[#CCFF33]/25 hover:bg-[#CCFF33]/[0.04]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/35">
                    Owner
                  </p>

                  <h3 className="mt-1 break-words text-lg font-black tracking-[-0.04em] text-white">
                    {plan.owner}
                  </h3>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${getPriorityClass(
                    plan.priority
                  )}`}
                >
                  {plan.priority}
                </span>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#CCFF33]">
                  Action
                </p>

                <p className="mt-2 text-sm font-black leading-5 text-white">
                  {plan.action}
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">
                  Station
                </p>

                <p className="mt-2 text-xs font-bold leading-5 text-white/65">
                  {plan.station}
                </p>

                <p className="mt-1 text-[10px] font-semibold leading-4 text-white/35">
                  {plan.stageName}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">
                  ETA
                </p>

                <p className="text-sm font-black text-[#CCFF33]">
                  {plan.eta}
                </p>
              </div>

              <p className="mt-4 text-xs font-semibold leading-5 text-white/55">
                {plan.impact}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-[22px] border border-[#CCFF33]/15 bg-[#CCFF33]/10 p-4 xl:col-span-4">
            <p className="text-[12px] font-bold text-[#CCFF33]">
              No intervention required. Runtime AI is monitoring the kitchen
              floor.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function PlannerMetric({
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