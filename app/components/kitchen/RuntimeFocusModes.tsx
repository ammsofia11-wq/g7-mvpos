"use client"

import { useRuntime } from "@/app/components/kitchen/runtime-context"

import {
  getRuntimeEngineRecommendedFocus,
  type RuntimeRiskLevel,
} from "@/app/components/kitchen/runtime-engine-data"

export type RuntimeFocusMode =
  | "execution"
  | "analysis"
  | "workforce"
  | "command"

type RuntimeModeConfig = {
  id: RuntimeFocusMode
  label: string
  description: string
  signal: string
}

const modes: RuntimeModeConfig[] = [
  {
    id: "execution",
    label: "Execution",
    description: "Live pressure",
    signal: "Stages / output / timing",
  },
  {
    id: "analysis",
    label: "Analysis",
    description: "AI intelligence",
    signal: "Risk / cause / decisions",
  },
  {
    id: "workforce",
    label: "Workforce",
    description: "Staff focus",
    signal: "Stations / support / density",
  },
  {
    id: "command",
    label: "Command",
    description: "Control layer",
    signal: "Escalation / intervention",
  },
]

type RuntimeFocusModesProps = {
  activeMode: RuntimeFocusMode
  onChange: (mode: RuntimeFocusMode) => void
}

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  MEDIUM: "border-yellow-400/25 bg-yellow-400/10 text-yellow-300",
  HIGH: "border-orange-400/25 bg-orange-400/10 text-orange-300",
  CRITICAL: "border-red-400/25 bg-red-400/10 text-red-300",
}

function getSuggestedMode(risk: RuntimeRiskLevel): RuntimeFocusMode {
  if (risk === "CRITICAL") return "command"
  if (risk === "HIGH") return "workforce"
  if (risk === "MEDIUM") return "analysis"

  return "execution"
}

function getModeRuntimeDescription(
  mode: RuntimeFocusMode,
  risk: RuntimeRiskLevel
) {
  if (mode === "command") {
    return risk === "CRITICAL"
      ? "Critical pressure detected. Command mode should focus on intervention, escalation, and blocking downstream risk."
      : "Command mode keeps intervention planning and control actions ready."
  }

  if (mode === "workforce") {
    return risk === "HIGH" || risk === "CRITICAL"
      ? "Workforce mode should review station density and move support toward high-pressure stages."
      : "Workforce mode monitors staff balance and station coverage."
  }

  if (mode === "analysis") {
    return "Analysis mode explains why pressure is spreading and what the runtime engine recommends next."
  }

  return "Execution mode tracks live stages, output gaps, time pressure, and current kitchen flow."
}

export default function RuntimeFocusModes({
  activeMode,
  onChange,
}: RuntimeFocusModesProps) {
  const { runtime } = useRuntime()

  const runtimeRisk = runtime.summary.aiSupervisorStatus
  const suggestedMode = getSuggestedMode(runtimeRisk)
  const recommendedFocus = getRuntimeEngineRecommendedFocus(runtime.liveStages)

  return (
    <section className="rounded-[26px] border border-[#CCFF33]/10 bg-[#0B1108]/85 p-3 shadow-[0_18px_55px_rgba(0,0,0,0.28)] md:p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Runtime Focus
            </p>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-white/40">
              {activeMode}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] ${riskStyles[runtimeRisk]}`}
            >
              {runtimeRisk}
            </span>

            <span className="rounded-full border border-[#CCFF33]/15 bg-[#CCFF33]/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#CCFF33]">
              Suggested: {suggestedMode}
            </span>
          </div>

          <h2 className="mt-2 text-[24px] font-black tracking-[-0.055em] text-white">
            Choose the operating personality.
          </h2>

          <p className="mt-1 max-w-xl text-[11px] font-medium leading-5 text-white/45">
            Switch the Kitchen OS between execution, analysis, workforce, and
            command views. The suggested focus is calculated from live runtime
            risk and operational pressure.
          </p>

          <div className="mt-4 rounded-[18px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-3">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
              Runtime Recommendation
            </p>

            <p className="mt-2 text-[12px] font-black leading-5 text-white">
              {recommendedFocus}
            </p>

            <p className="mt-2 text-[10px] font-semibold leading-5 text-white/45">
              {getModeRuntimeDescription(activeMode, runtimeRisk)}
            </p>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-4 xl:min-w-[680px]">
          {modes.map((mode) => {
            const active = activeMode === mode.id
            const suggested = suggestedMode === mode.id

            return (
              <button
                key={mode.id}
                onClick={() => onChange(mode.id)}
                className={`rounded-[18px] border px-3 py-3 text-left transition-all duration-300 ${
                  active
                    ? "border-[#CCFF33]/35 bg-[#CCFF33]/10 shadow-[0_0_28px_rgba(204,255,51,0.08)]"
                    : suggested
                      ? "border-cyan-300/25 bg-cyan-300/[0.06] hover:border-[#CCFF33]/25 hover:bg-[#CCFF33]/[0.06]"
                      : "border-white/10 bg-white/[0.03] hover:border-[#CCFF33]/20 hover:bg-[#CCFF33]/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-[10px] font-black uppercase tracking-[0.14em] ${
                      active
                        ? "text-[#CCFF33]"
                        : suggested
                          ? "text-cyan-300"
                          : "text-white/45"
                    }`}
                  >
                    {mode.label}
                  </p>

                  {suggested && (
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-[7px] font-black uppercase tracking-[0.1em] text-cyan-300">
                      AI
                    </span>
                  )}
                </div>

                <p className="mt-1 text-[10px] font-semibold text-white/35">
                  {mode.description}
                </p>

                <p className="mt-3 text-[9px] font-bold leading-4 text-white/40">
                  {mode.signal}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}