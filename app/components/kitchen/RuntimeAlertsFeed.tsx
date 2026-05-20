import {
  REALTIME_RUNTIME_STAGES,
  getRuntimeStageProgress,
  getRuntimeTimePressure,
  type RuntimeRiskLevel,
} from "./runtime-engine-data"

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  MEDIUM: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
  HIGH: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  CRITICAL: "border-red-400/20 bg-red-400/10 text-red-300",
}

export default function RuntimeAlertsFeed() {
  const alerts = REALTIME_RUNTIME_STAGES.map((stage) => {
    const outputProgress = getRuntimeStageProgress(stage)
    const timePressure = getRuntimeTimePressure(stage)

    return {
      id: stage.id,
      stage: stage.name,
      station: stage.station,
      risk: stage.risk,
      status: stage.status,
      message: buildRuntimeAlertMessage({
        stageName: stage.name,
        status: stage.status,
        risk: stage.risk,
        outputProgress,
        timePressure,
      }),
    }
  }).filter((alert) => alert.risk !== "LOW")

  return (
    <section className="rounded-[30px] border border-[#CCFF33]/15 bg-white/[0.035] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.30)] md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
            Runtime Alerts Feed
          </p>

          <h2 className="mt-2 text-[26px] font-black tracking-[-0.05em] text-white">
            AI Escalation Queue
          </h2>

          <p className="mt-2 max-w-xl text-[12px] leading-6 text-white/55">
            Live alert stream for blocked stations, delayed output, time
            pressure, and AI supervisor escalation.
          </p>
        </div>

        <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-right">
          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-white/35">
            Open Alerts
          </p>

          <p className="mt-1 text-[24px] font-black text-white">
            {alerts.length}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <article
              key={alert.id}
              className="rounded-[22px] border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/35">
                    {alert.station}
                  </p>

                  <h3 className="mt-1 text-[16px] font-black tracking-[-0.04em] text-white">
                    {alert.stage}
                  </h3>
                </div>

                <div
                  className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.18em] ${
                    riskStyles[alert.risk]
                  }`}
                >
                  {alert.risk}
                </div>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-white/55">
                {alert.message}
              </p>

              <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                Status: {alert.status}
              </p>
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

function buildRuntimeAlertMessage({
  stageName,
  status,
  risk,
  outputProgress,
  timePressure,
}: {
  stageName: string
  status: string
  risk: RuntimeRiskLevel
  outputProgress: number
  timePressure: number
}) {
  if (risk === "CRITICAL") {
    return `${stageName} requires immediate action. Current status is ${status}, output progress is ${outputProgress}%, and time pressure is ${timePressure}%.`
  }

  if (risk === "HIGH") {
    return `${stageName} is under high pressure. AI recommends adding support or reducing batch load. Output progress is ${outputProgress}%.`
  }

  if (risk === "MEDIUM") {
    return `${stageName} should be monitored. Station is not critical yet, but dependency pressure may increase.`
  }

  return `${stageName} is operating normally.`
}