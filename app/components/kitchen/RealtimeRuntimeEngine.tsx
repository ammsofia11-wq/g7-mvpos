"use client"

import {
  getRecommendedRuntimeActionLabel,
  getRuntimeEngineDecisions,
  getRuntimeEngineHeadline,
  getRuntimeEngineRecommendedFocus,
  getRuntimeOutputGap,
  getRuntimeStageCalculatedRisk,
  getRuntimeStageProgress,
  getRuntimeStageAiNote,
  getRuntimeTimePressure,
  type RuntimeRiskLevel,
  type RuntimeStage,
  type RuntimeStageStatus,
} from "./runtime-engine-data"

import { useRuntime } from "./runtime-context"

const statusStyles: Record<RuntimeStageStatus, string> = {
  WAITING: "border-white/10 bg-white/[0.04] text-white/60",
  ACTIVE: "border-[#CCFF33]/25 bg-[#CCFF33]/10 text-[#CCFF33]",
  DELAYED: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  COMPLETED: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  BLOCKED: "border-red-400/30 bg-red-400/10 text-red-300",
}

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "text-[#CCFF33]",
  MEDIUM: "text-yellow-300",
  HIGH: "text-orange-300",
  CRITICAL: "text-red-300",
}

const riskBorderStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20",
  MEDIUM: "border-yellow-300/25",
  HIGH: "border-orange-300/30",
  CRITICAL: "border-red-400/35",
}

const riskBackgroundStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "bg-[#CCFF33]/[0.05]",
  MEDIUM: "bg-yellow-300/[0.06]",
  HIGH: "bg-orange-400/[0.07]",
  CRITICAL: "bg-red-500/[0.08]",
}

const riskOrder: Record<RuntimeRiskLevel, number> = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
}

type RealtimeRuntimeEngineProps = {
  compact?: boolean
}

export default function RealtimeRuntimeEngine({
  compact = false,
}: RealtimeRuntimeEngineProps) {
  const { runtime, dispatch } = useRuntime()

  const headline = getRuntimeEngineHeadline(runtime.liveStages)
  const recommendedFocus = getRuntimeEngineRecommendedFocus(runtime.liveStages)
  const decisions = getRuntimeEngineDecisions(runtime.liveStages)

  const visibleStages = compact
    ? runtime.liveStages
        .slice()
        .sort(
          (a, b) =>
            riskOrder[getRuntimeStageCalculatedRisk(b)] -
            riskOrder[getRuntimeStageCalculatedRisk(a)]
        )
        .slice(0, 2)
    : runtime.liveStages

  return (
    <section
      className={`rounded-[30px] border border-[#CCFF33]/15 bg-white/[0.035] shadow-[0_24px_70px_rgba(0,0,0,0.30)] ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div
        className={`flex gap-4 ${
          compact
            ? "flex-col"
            : "flex-col xl:flex-row xl:items-start xl:justify-between"
        }`}
      >
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
            Realtime Runtime Engine
          </p>

          <h2
            className={`mt-2 font-black tracking-[-0.05em] text-white ${
              compact ? "text-[22px]" : "text-[34px]"
            }`}
          >
            {headline}
          </h2>

          <p
            className={`mt-2 max-w-2xl font-semibold leading-6 text-white/65 ${
              compact ? "text-[11px]" : "text-[12px]"
            }`}
          >
            {compact
              ? "Compact command view showing the highest-risk live stages."
              : "Live stage pressure, output gaps, dependencies, and AI recommended actions are calculated from the runtime engine."}
          </p>

          <div className="mt-4 rounded-[20px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-4">
            <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Recommended Focus
            </p>

            <p className="mt-2 text-sm font-black leading-6 text-white">
              {recommendedFocus}
            </p>
          </div>
        </div>

        <div className="rounded-[22px] border border-white/10 bg-black/20 p-4 text-right">
          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-white/40">
            AI Supervisor Status
          </p>

          <p
            className={`mt-2 font-black tracking-[-0.04em] ${
              compact ? "text-[20px]" : "text-[26px]"
            } ${riskStyles[runtime.summary.aiSupervisorStatus]}`}
          >
            {runtime.summary.aiSupervisorStatus}
          </p>

          <p className="mt-1 text-[10px] text-white/45">
            Runtime efficiency {runtime.summary.runtimeEfficiency}%
          </p>

          <p className="mt-2 text-[9px] text-white/35">
            Pulse #{runtime.runtimePulse}
          </p>
        </div>
      </div>

      <div
        className={`grid gap-3 ${
          compact
            ? "mt-4 grid-cols-2"
            : "mt-5 sm:grid-cols-2 xl:grid-cols-5"
        }`}
      >
        <SummaryCard label="Total Stages" value={runtime.summary.totalStages} />
        <SummaryCard label="Active" value={runtime.summary.activeStages} />
        <SummaryCard label="Delayed" value={runtime.summary.delayedStages} />
        <SummaryCard label="Blocked" value={runtime.summary.blockedStages} />
        <SummaryCard
          label="Output"
          value={`${runtime.summary.totalCurrentOutput}/${runtime.summary.totalCapacityTarget}`}
        />
      </div>

      {!compact && decisions.length > 0 && (
        <div className="mt-5 rounded-[26px] border border-white/10 bg-black/20 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
                Runtime Decision Queue
              </p>

              <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-white">
                AI recommended actions
              </h3>
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black text-white/60">
              {decisions.length} decisions
            </div>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {decisions.slice(0, 3).map((decision) => (
              <div
                key={decision.id}
                className={`rounded-[20px] border p-4 ${
                  riskBorderStyles[decision.risk]
                } ${riskBackgroundStyles[decision.risk]}`}
              >
                <p
                  className={`text-[8px] font-black uppercase tracking-[0.2em] ${
                    riskStyles[decision.risk]
                  }`}
                >
                  {decision.risk} · {decision.stageName}
                </p>

                <h4 className="mt-2 text-sm font-black leading-5 text-white">
                  {decision.title}
                </h4>

                <p className="mt-2 text-[11px] font-semibold leading-5 text-white/60">
                  {decision.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {compact && (
        <div className="mt-4 rounded-[18px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-3">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
            Compact Runtime Filter
          </p>

          <p className="mt-2 text-xs font-semibold leading-5 text-white/55">
            Showing the 2 highest-risk execution stages only. Open the full
            Runtime workspace to inspect all live stages and AI decisions.
          </p>
        </div>
      )}

      <div
        className={`grid gap-3 ${
          compact ? "mt-4 xl:grid-cols-2" : "mt-5 lg:grid-cols-2"
        }`}
      >
        {visibleStages.map((stage) => (
          <RuntimeStageCard
            key={stage.id}
            stage={stage}
            compact={compact}
            onStart={() =>
              dispatch({
                type: "START_STAGE",
                stageId: stage.id,
              })
            }
            onBlock={() =>
              dispatch({
                type: "BLOCK_STAGE",
                stageId: stage.id,
              })
            }
            onIncreaseOutput={() =>
              dispatch({
                type: "INCREASE_OUTPUT",
                stageId: stage.id,
                amount: 25,
              })
            }
            onComplete={() =>
              dispatch({
                type: "COMPLETE_STAGE",
                stageId: stage.id,
              })
            }
          />
        ))}
      </div>
    </section>
  )
}

function RuntimeStageCard({
  stage,
  compact,
  onStart,
  onBlock,
  onIncreaseOutput,
  onComplete,
}: {
  stage: RuntimeStage
  compact: boolean
  onStart: () => void
  onBlock: () => void
  onIncreaseOutput: () => void
  onComplete: () => void
}) {
  const outputProgress = getRuntimeStageProgress(stage)
  const timePressure = getRuntimeTimePressure(stage)
  const outputGap = getRuntimeOutputGap(stage)
  const calculatedRisk = getRuntimeStageCalculatedRisk(stage)
  const actionLabel = getRecommendedRuntimeActionLabel(stage)
  const aiNote = getRuntimeStageAiNote(stage)
  const pressureScore = Math.min(
    100,
    Math.round(timePressure * 0.55 + (100 - outputProgress) * 0.45)
  )

  return (
    <article
      className={`rounded-[24px] border bg-black/20 ${
        compact ? "p-3" : "p-4"
      } ${riskBorderStyles[calculatedRisk]} ${
        riskBackgroundStyles[calculatedRisk]
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/35">
            {stage.station}
          </p>

          <h3
            className={`mt-1 break-words font-black tracking-[-0.04em] text-white ${
              compact ? "text-[16px]" : "text-[18px]"
            }`}
          >
            {stage.name}
          </h3>

          <p className="mt-1 break-words text-[11px] text-white/45">
            {stage.assignedEmployee} · {stage.assignedRole}
          </p>
        </div>

        <div
          className={`shrink-0 rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.18em] ${
            statusStyles[stage.status]
          }`}
        >
          {stage.status}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <RuntimeBar
          label="Output Progress"
          value={outputProgress}
          detail={`${stage.currentOutput}/${stage.capacityTarget} meals`}
        />

        <RuntimeBar
          label="Time Pressure"
          value={timePressure}
          detail={`${stage.elapsedMinutes}/${stage.plannedMinutes} min`}
        />
      </div>

      <div className="mt-4 rounded-[18px] border border-white/10 bg-white/[0.035] p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-white/35">
            AI Runtime Note
          </p>

          <p
            className={`text-[9px] font-black uppercase tracking-[0.18em] ${
              riskStyles[calculatedRisk]
            }`}
          >
            {calculatedRisk}
          </p>
        </div>

        <p className="mt-2 break-words text-[11px] leading-5 text-white/60">
          {aiNote}
        </p>

        <div className="mt-3 rounded-[16px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-3">
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
            Recommended Action
          </p>

          <p className="mt-2 text-[12px] font-black leading-5 text-white">
            {actionLabel}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <ActionButton label="Start" onClick={onStart} />
          <ActionButton label="Block" danger onClick={onBlock} />
          <ActionButton label="+ Output" onClick={onIncreaseOutput} />
          <ActionButton label="Complete" success onClick={onComplete} />
        </div>

        <div className="mt-4 rounded-[16px] border border-white/10 bg-black/30 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
              Runtime Pressure
            </p>

            <p className="text-[10px] font-black text-white">
              {pressureScore}%
            </p>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#CCFF33]"
              style={{ width: `${pressureScore}%` }}
            />
          </div>

          <p className="mt-2 text-[10px] text-white/45">
            Output gap: {outputGap}
          </p>
        </div>
      </div>
    </article>
  )
}

function SummaryCard({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
      <p className="text-[8px] font-black uppercase tracking-[0.22em] text-white/35">
        {label}
      </p>

      <p className="mt-2 break-words text-[24px] font-black tracking-[-0.05em] text-white">
        {value}
      </p>
    </div>
  )
}

function RuntimeBar({
  label,
  value,
  detail,
}: {
  label: string
  value: number
  detail: string
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/35">
          {label}
        </p>

        <p className="break-words text-right text-[10px] font-bold text-white/55">
          {detail}
        </p>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#CCFF33]"
          style={{ width: `${value}%` }}
        />
      </div>

      <p className="mt-1 text-[10px] font-bold text-white/45">{value}%</p>
    </div>
  )
}

function ActionButton({
  label,
  onClick,
  danger,
  success,
}: {
  label: string
  onClick: () => void
  danger?: boolean
  success?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`min-h-[52px] rounded-[14px] border px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.16em] transition-all duration-200 ${
        danger
          ? "border-red-400/20 bg-red-400/10 text-red-300 hover:bg-red-400/20"
          : success
            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20"
            : "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33] hover:bg-[#CCFF33]/20"
      }`}
    >
      <span className="break-words">{label}</span>
    </button>
  )
}