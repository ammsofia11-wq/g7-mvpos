"use client"

import { useRuntime } from "./runtime-context"

import {
  getRuntimeEngineDecisions,
  type RuntimeRiskLevel,
} from "./runtime-engine-data"

const priorityStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  MEDIUM: "border-cyan-300/30 bg-cyan-300/10 text-cyan-300",
  HIGH: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  CRITICAL: "border-red-500/30 bg-red-500/10 text-red-300",
}

export default function KitchenAlerts() {
  const { runtime } = useRuntime()

  const liveAlerts = getRuntimeEngineDecisions(runtime.liveStages)
    .filter((decision) => decision.risk !== "LOW")
    .slice(0, 4)

  return (
    <div className="h-fit self-start rounded-[24px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.20)] xl:sticky xl:top-4">
      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-cyan-300">
        AI Kitchen Alerts
      </p>

      <h2 className="mt-2 text-[26px] font-black leading-none tracking-[-0.05em] text-white">
        Live Operations
      </h2>

      <p className="mt-2 text-[11px] font-semibold leading-5 text-white/45">
        Alerts are now generated from live runtime decisions, not static demo
        production tasks.
      </p>

      <div className="mt-5 space-y-3">
        {liveAlerts.length > 0 ? (
          liveAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              title={alert.stageName}
              action={alert.title}
              text={alert.body}
              status={alert.risk}
            />
          ))
        ) : (
          <div className="rounded-[15px] border border-[#CCFF33]/15 bg-[#CCFF33]/10 p-3">
            <p className="text-[11px] font-black text-[#CCFF33]">
              No critical live kitchen alerts.
            </p>

            <p className="mt-2 text-[10px] leading-4 text-white/50">
              Runtime AI is monitoring production flow and will surface alerts
              when pressure increases.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function AlertCard({
  title,
  action,
  text,
  status,
}: {
  title: string
  action: string
  text: string
  status: RuntimeRiskLevel
}) {
  return (
    <div className="rounded-[15px] border border-white/10 bg-black/20 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-words text-[11px] font-black text-white">
            {title}
          </p>

          <p className="mt-1 text-[10px] font-black leading-4 text-[#CCFF33]">
            {action}
          </p>
        </div>

        <PriorityBadge priority={status} />
      </div>

      <p className="mt-2 text-[10px] leading-4 text-slate-400">
        {text}
      </p>
    </div>
  )
}

function PriorityBadge({
  priority,
}: {
  priority: RuntimeRiskLevel
}) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${priorityStyles[priority]}`}
    >
      {priority}
    </span>
  )
}