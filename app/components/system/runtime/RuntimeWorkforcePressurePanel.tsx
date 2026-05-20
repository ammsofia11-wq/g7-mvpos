"use client"

import { getWorkforcePressureReports } from "./runtime-workforce-pressure"

function levelStyle(level: "STABLE" | "WATCH" | "OVERLOADED" | "CRITICAL") {
  if (level === "CRITICAL") {
    return "border-red-500/30 bg-red-500/10 text-red-300"
  }

  if (level === "OVERLOADED") {
    return "border-orange-400/30 bg-orange-500/10 text-orange-300"
  }

  if (level === "WATCH") {
    return "border-yellow-300/30 bg-yellow-300/10 text-yellow-200"
  }

  return "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]"
}

export default function RuntimeWorkforcePressurePanel() {
  const reports = getWorkforcePressureReports()

  return (
    <section className="rounded-[28px] border border-cyan-400/20 bg-cyan-400/[0.04] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.30)] md:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-cyan-300">
            Workforce Pressure Engine
          </p>

          <h3 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white">
            Staffing Pressure
          </h3>
        </div>

        <div className="rounded-[18px] border border-cyan-400/20 bg-cyan-400/10 px-4 py-3">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-300">
            Stations
          </p>

          <p className="mt-1 text-[26px] font-black text-white">
            {reports.length}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 xl:grid-cols-3">
        {reports.map((item) => (
          <div
            key={item.station}
            className="rounded-[22px] border border-white/10 bg-black/25 p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] ${levelStyle(
                  item.level
                )}`}
              >
                {item.level}
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/60">
                Support {item.requiredSupport}
              </div>
            </div>

            <h4 className="mt-3 text-[20px] font-black text-white">
              {item.station}
            </h4>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">
                  Pressure Score
                </p>

                <p className="text-[12px] font-black text-cyan-300">
                  {item.pressureScore}
                </p>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-cyan-300"
                  style={{
                    width: `${Math.min(item.pressureScore, 100)}%`,
                  }}
                />
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-6 text-white/55">
              {item.recommendation}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}