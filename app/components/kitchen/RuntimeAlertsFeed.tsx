"use client"

import {
  getBlockedRuntimeStages,
  getDelayedRuntimeStages,
  getRecommendedRuntimeActionLabel,
  getRuntimeEngineDecisions,
  getRuntimeOutputGap,
  getRuntimeStageAiNote,
  getRuntimeStageCalculatedRisk,
  getRuntimeStageProgress,
  getRuntimeTimePressure,
  type RuntimeRiskLevel,
  type RuntimeStageStatus,
} from "./runtime-engine-data"

import { useRuntime } from "./runtime-context"

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  MEDIUM: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
  HIGH: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  CRITICAL: "border-red-400/20 bg-red-400/10 text-red-300",
}

const statusStyles: Record<RuntimeStageStatus, string> = {
  WAITING: "border-white/10 bg-white/[0.04] text-white/50",
  ACTIVE: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  DELAYED: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  COMPLETED: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  BLOCKED: "border-red-400/20 bg-red-400/10 text-red-300",
}

type RuntimeAlert = {
  id: string
  stage: string
  station: string
  risk: RuntimeRiskLevel
  status: RuntimeStageStatus
  message: string
  actionLabel: string
  outputProgress: number
  timePressure: number
  outputGap: number
}

export default function RuntimeAlertsFeed() {
  const { runtime } = useRuntime()

  const blockedStages = getBlockedRuntimeStages(runtime.liveStages)
  const delayedStages = getDelayedRuntimeStages(runtime.liveStages)
  const decisions = getRuntimeEngineDecisions(runtime.liveStages)

  const alertStages = runtime.liveStages
    .filter((stage) => {
      const risk = getRuntimeStageCalculatedRisk(stage)

      return (
        risk !== "LOW" ||
        stage.status === "BLOCKED" ||
        stage.status === "DELAYED"
      )
    })
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

  const alerts: RuntimeAlert[] = alertStages.map((stage) => {
    const outputProgress = getRuntimeStageProgress(stage)
    const timePressure = getRuntimeTimePressure(stage)
    const outputGap = getRuntimeOutputGap(stage)
    const risk = getRuntimeStageCalculatedRisk(stage)

    return {
      id: stage.id,
      stage: stage.name,
      station: stage.station,
      risk,
      status: stage.status,
      outputProgress,
      timePressure,
      outputGap,
      actionLabel: getRecommendedRuntimeActionLabel(stage),
      message: getRuntimeStageAiNote(stage),
    }
  })

  return (
    <section className="rounded-[30px] border border-[#CCFF33]/15 bg-white/[0.035] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.30)] md:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
            Runtime Alerts Feed
          </p>

          <h2 className="mt-2 text-[26px] font-black tracking-[-0.05em] text-white">
            AI Escalation Queue
          </h2>

          <p className="mt-2 max-w-xl text-[12px] leading-6 text-white/55">
            Live alert stream generated from calculated risk, blocked stages,
            delayed stations, output gaps, time pressure, and AI runtime
            decisions.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 xl:min-w-[360px]">
          <AlertMetric label="Open Alerts" value={alerts.length} />
          <AlertMetric label="Blocked" value={blockedStages.length} />
          <AlertMetric label="Delayed" value={delayedStages.length} />
        </div>
      </div>

      {decisions.length > 0 && (
        <div className="mt-5 rounded-[24px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
                Top Runtime Decision
              </p>

              <h3 className="mt-2 text-[16px] font-black tracking-[-0.04em] text-white">
                {decisions[0].stageName}: {decisions[0].title}
              </h3>

              <p className="mt-2 max-w-2xl text-[11px] font-semibold leading-5 text-white/55">
                {decisions[0].body}
              </p>
            </div>

            <span
              className={`w-fit rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.18em] ${
                riskStyles[decisions[0].risk]
              }`}
            >
              {decisions[0].risk}
            </span>
          </div>
        </div>
      )}

      <div className="mt-5 space-y-3">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <article
              key={alert.id}
              className="rounded-[22px] border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/35">
                    {alert.station}
                  </p>

                  <h3 className="mt-1 break-words text-[16px] font-black tracking-[-0.04em] text-white">
                    {alert.stage}
                  </h3>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <div
                    className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.18em] ${
                      riskStyles[alert.risk]
                    }`}
                  >
                    {alert.risk}
                  </div>

                  <div
                    className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.18em] ${
                      statusStyles[alert.status]
                    }`}
                  >
                    {alert.status}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[11px] font-semibold leading-5 text-white/60">
                {alert.message}
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <AlertSmallStat
                  label="Output"
                  value={`${alert.outputProgress}%`}
                />

                <AlertSmallStat
                  label="Time"
                  value={`${alert.timePressure}%`}
                />

                <AlertSmallStat label="Gap" value={alert.outputGap} />
              </div>

              <div className="mt-4 rounded-[16px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-3">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
                  Recommended Action
                </p>

                <p className="mt-2 text-[11px] font-black leading-5 text-white">
                  {alert.actionLabel}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[22px] border border-[#CCFF33]/15 bg-[#CCFF33]/10 p-4">
            <p className="text-[12px] font-bold text-[#CCFF33]">
              No active runtime alerts. Kitchen floor is operating safely.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function AlertMetric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-right">
      <p className="text-[8px] font-black uppercase tracking-[0.22em] text-white/35">
        {label}
      </p>

      <p className="mt-1 text-[24px] font-black text-white">{value}</p>
    </div>
  )
}

function AlertSmallStat({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-1 text-[15px] font-black text-white">{value}</p>
    </div>
  )
}