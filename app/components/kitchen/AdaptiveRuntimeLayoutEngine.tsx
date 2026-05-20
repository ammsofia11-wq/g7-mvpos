"use client"

import { useEffect, useState } from "react"

import { useRuntime } from "@/app/components/kitchen/runtime-context"
import { getDynamicRuntimeZones } from "@/app/components/kitchen/dynamic-runtime-zones"

const layoutSignals = [
  {
    label: "Kitchen Pressure",
    value: "High",
    score: 82,
    impact: "Switching dashboard into execution-first layout",
  },
  {
    label: "Production Risk",
    value: "Medium",
    score: 61,
    impact: "Prioritizing delayed batches and approval checkpoints",
  },
  {
    label: "Workforce Load",
    value: "Balanced",
    score: 48,
    impact: "Keeping workforce panel visible but secondary",
  },
  {
    label: "Dispatch Window",
    value: "Critical",
    score: 88,
    impact: "Moving dispatch intelligence higher in runtime view",
  },
]

function getZoneExplanation(zoneId: string) {
  if (zoneId === "alerts") {
    return "Critical alerts are expanded because the kitchen has active escalation pressure."
  }

  if (zoneId === "production") {
    return "Production control is expanded because blocked or delayed stages require floor action."
  }

  if (zoneId === "workforce") {
    return "Workforce runtime is expanded because allocation or efficiency needs attention."
  }

  if (zoneId === "runtime") {
    return "Live runtime is expanded because the execution engine needs monitoring."
  }

  if (zoneId === "dispatch") {
    return "Dispatch intelligence is expanded because delivery timing pressure is increasing."
  }

  return "This operational zone is being monitored by the runtime engine."
}

export default function AdaptiveRuntimeLayoutEngine() {
  const { runtime } = useRuntime()

  const dynamicZones = getDynamicRuntimeZones(runtime.summary)

  const focusZone = dynamicZones[0]

  const [focusPulse, setFocusPulse] = useState(false)

  useEffect(() => {
    setFocusPulse(true)

    const timeout = setTimeout(() => {
      setFocusPulse(false)
    }, 1600)

    return () => clearTimeout(timeout)
  }, [focusZone.id])

  return (
    <section className="rounded-[30px] border border-[#CCFF33]/15 bg-[#10140f]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
            Adaptive Runtime Layout Engine
          </p>

          <h2 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white md:text-[34px]">
            Kitchen OS reorganizes itself based on live pressure.
          </h2>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/55">
            The runtime layout changes priority automatically when production
            pressure, dispatch urgency, workforce load, or operational risk
            increases.
          </p>
        </div>

        <div className="rounded-2xl border border-[#CCFF33]/20 bg-[#CCFF33]/10 px-4 py-3 text-right">
          <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
            Current Mode
          </p>

          <p className="mt-1 text-2xl font-black text-white">
            Execution First
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {layoutSignals.map((signal) => (
          <div
            key={signal.label}
            className="rounded-[22px] border border-white/10 bg-white/[0.045] p-4 transition-all duration-500 hover:border-[#CCFF33]/20 hover:bg-[#CCFF33]/[0.04]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">
                {signal.label}
              </p>

              <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-black text-white">
                {signal.value}
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#CCFF33] transition-all duration-700"
                style={{ width: `${signal.score}%` }}
              />
            </div>

            <p className="mt-4 text-xs font-semibold leading-5 text-white/55">
              {signal.impact}
            </p>
          </div>
        ))}
      </div>

      <div
        className={`mt-5 rounded-[24px] border p-4 transition-all duration-700 ${
          focusPulse
            ? "border-[#CCFF33]/40 bg-[#CCFF33]/[0.09] shadow-[0_0_50px_rgba(204,255,51,0.10)]"
            : "border-[#CCFF33]/20 bg-[#CCFF33]/[0.06]"
        }`}
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
              Cinematic Runtime Focus
            </p>

            <h3 className="mt-2 text-[28px] font-black tracking-[-0.05em] text-white">
              {focusZone.title} is now dominating the runtime.
            </h3>

            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-white/55">
              {getZoneExplanation(focusZone.id)}
            </p>
          </div>

          <div className="rounded-[22px] border border-[#CCFF33]/20 bg-black/30 px-5 py-4 text-right">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/45">
              Focus Priority
            </p>

            <p className="mt-1 text-[34px] font-black text-[#CCFF33]">
              {focusZone.priority}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#CCFF33]">
              Dynamic Runtime Zones
            </p>

            <p className="mt-1 text-sm font-semibold text-white/55">
              The OS recalculates live zone priority from runtime pressure.
            </p>
          </div>

          <p className="rounded-full border border-[#CCFF33]/20 bg-[#CCFF33]/10 px-3 py-2 text-xs font-black text-[#CCFF33]">
            Live Reordered
          </p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {dynamicZones.map((zone, index) => (
            <div
              key={zone.id}
              className={`rounded-2xl border p-3 transition-all duration-700 ${
                index === 0
                  ? "md:col-span-2 border-[#CCFF33]/40 bg-[#CCFF33]/10 shadow-[0_0_35px_rgba(204,255,51,0.14)] scale-[1.02]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-black text-[#CCFF33]">
                  0{index + 1}
                </p>

                <p className="rounded-full bg-black/30 px-2 py-1 text-[9px] font-black text-white/45">
                  {zone.priority}
                </p>
              </div>

              <p
                className={`mt-2 font-black text-white transition-all duration-500 ${
                  index === 0 ? "text-xl" : "text-sm"
                }`}
              >
                {zone.title}
              </p>

              {index === 0 && (
                <div className="mt-4 rounded-xl border border-[#CCFF33]/20 bg-black/25 p-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#CCFF33]">
                    Active Runtime Focus
                  </p>

                  <p className="mt-2 text-xs font-semibold leading-5 text-white/55">
                    This operational zone currently dominates the kitchen runtime
                    layout and receives expanded visual weight.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}