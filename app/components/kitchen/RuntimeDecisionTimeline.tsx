"use client"

import { useRuntime } from "@/app/components/kitchen/runtime-context"

import {
  generateRuntimeDecisionLog,
} from "@/app/components/kitchen/runtime-decision-log"

function getSeverityClasses(
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
) {
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

export default function RuntimeDecisionTimeline() {
  const { runtime } = useRuntime()

  const decisions = generateRuntimeDecisionLog(runtime.summary)

  return (
    <section className="rounded-[30px] border border-white/10 bg-[#10140f]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-5">
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

      <div className="mt-6 space-y-3">
        {decisions.map((decision, index) => {
          const severityStyle = getSeverityClasses(
            decision.severity
          )

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
        })}
      </div>
    </section>
  )
}