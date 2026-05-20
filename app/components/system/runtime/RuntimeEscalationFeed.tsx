"use client"

import { getWorkforceEscalations } from "./runtime-workforce-sync"

function severityStyle(
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
) {
  if (severity === "CRITICAL") {
    return "border-red-500/30 bg-red-500/10 text-red-300"
  }

  if (severity === "HIGH") {
    return "border-orange-400/30 bg-orange-500/10 text-orange-300"
  }

  if (severity === "MEDIUM") {
    return "border-yellow-300/30 bg-yellow-300/10 text-yellow-200"
  }

  return "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]"
}

export default function RuntimeEscalationFeed() {
  const escalations = getWorkforceEscalations()

  return (
    <section className="rounded-[28px] border border-red-500/20 bg-red-500/[0.04] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.30)] md:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-red-300">
            Workforce Runtime Escalations
          </p>

          <h3 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white">
            Active Escalations
          </h3>
        </div>

        <div className="rounded-[18px] border border-red-400/20 bg-red-500/10 px-4 py-3">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-red-300">
            Active
          </p>

          <p className="mt-1 text-[26px] font-black text-white">
            {escalations.length}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {escalations.length === 0 ? (
          <div className="rounded-[22px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-semibold text-white/60">
              No workforce escalations detected.
            </p>
          </div>
        ) : (
          escalations.map((item) => (
            <div
              key={item.id}
              className="rounded-[22px] border border-white/10 bg-black/25 p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <div
                  className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] ${severityStyle(
                    item.severity
                  )}`}
                >
                  {item.severity}
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/60">
                  {item.station}
                </div>
              </div>

              <h4 className="mt-3 text-[20px] font-black text-white">
                {item.requiredSupport}
              </h4>

              <p className="mt-2 text-[12px] leading-6 text-white/55">
                {item.reason}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35">
                  {item.id}
                </p>

                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-red-300">
                  {item.createdAt}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}