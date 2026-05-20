"use client"

import {
  getRuntimeStageProgress,
  getRuntimeTimePressure,
  type RuntimeRiskLevel,
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

type RealtimeRuntimeEngineProps = {
  compact?: boolean
}

export default function RealtimeRuntimeEngine({
  compact = false,
}: RealtimeRuntimeEngineProps) {
  const { runtime, dispatch } = useRuntime()

  const visibleStages = compact
    ? runtime.liveStages
        .slice()
        .sort((a, b) => {
          const riskOrder: Record<RuntimeRiskLevel, number> = {
            CRITICAL: 4,
            HIGH: 3,
            MEDIUM: 2,
            LOW: 1,
          }

          return riskOrder[b.risk] - riskOrder[a.risk]
        })
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
            Live Kitchen Execution Layer
          </h2>

          <p
            className={`mt-2 max-w-2xl leading-6 text-white/55 ${
              compact ? "text-[11px]" : "text-[12px]"
            }`}
          >
            {compact
              ? "Compact command view showing only the highest-risk live stages."
              : "Runtime state is now shared globally across the Kitchen OS runtime layer."}
          </p>
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
        <SummaryCard
          label="Total Stages"
          value={runtime.summary.totalStages}
        />

        <SummaryCard
          label="Active"
          value={runtime.summary.activeStages}
        />

        <SummaryCard
          label="Delayed"
          value={runtime.summary.delayedStages}
        />

        <SummaryCard
          label="Blocked"
          value={runtime.summary.blockedStages}
        />

        <SummaryCard
          label="Output"
          value={`${runtime.summary.totalCurrentOutput}/${runtime.summary.totalCapacityTarget}`}
        />
      </div>

      {compact && (
        <div className="mt-4 rounded-[18px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-3">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
            Compact Runtime Filter
          </p>

          <p className="mt-2 text-xs font-semibold leading-5 text-white/55">
            Showing the 2 highest-risk execution stages only. Open the full
            Runtime workspace to inspect all live stages.
          </p>
        </div>
      )}

      <div
        className={`grid gap-3 ${
          compact ? "mt-4 xl:grid-cols-2" : "mt-5 lg:grid-cols-2"
        }`}
      >
        {visibleStages.map((stage) => {
          const outputProgress = getRuntimeStageProgress(stage)
          const timePressure = getRuntimeTimePressure(stage)

          return (
            <article
              key={stage.id}
              className={`rounded-[24px] border border-white/10 bg-black/20 ${
                compact ? "p-3" : "p-4"
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
                      riskStyles[stage.risk]
                    }`}
                  >
                    {stage.risk}
                  </p>
                </div>

                <p className="mt-2 break-words text-[11px] leading-5 text-white/55">
                  {stage.aiNote}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <ActionButton
                    label="Start"
                    onClick={() =>
                      dispatch({
                        type: "START_STAGE",
                        stageId: stage.id,
                      })
                    }
                  />

                  <ActionButton
                    label="Block"
                    danger
                    onClick={() =>
                      dispatch({
                        type: "BLOCK_STAGE",
                        stageId: stage.id,
                      })
                    }
                  />

                  <ActionButton
                    label="+ Output"
                    onClick={() =>
                      dispatch({
                        type: "INCREASE_OUTPUT",
                        stageId: stage.id,
                        amount: 25,
                      })
                    }
                  />

                  <ActionButton
                    label="Complete"
                    success
                    onClick={() =>
                      dispatch({
                        type: "COMPLETE_STAGE",
                        stageId: stage.id,
                      })
                    }
                  />
                </div>

                <div className="mt-4 rounded-[16px] border border-white/10 bg-black/30 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
                      Runtime Pressure
                    </p>

                    <p className="text-[10px] font-black text-white">
                      {stage.pressureScore}%
                    </p>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#CCFF33]"
                      style={{ width: `${stage.pressureScore}%` }}
                    />
                  </div>

                  <p className="mt-2 text-[10px] text-white/45">
                    Output gap: {stage.outputGap}
                  </p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
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

      <p className="mt-1 text-[10px] font-bold text-white/45">
        {value}%
      </p>
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