"use client"

type RuntimeActionCenterProps = {
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  onOpenAlerts: () => void
  onOpenWorkforce: () => void
  onOpenProduction: () => void
  onOpenRuntime: () => void
}

type RuntimeAction = {
  title: string
  description: string
  target: "alerts" | "workforce" | "production" | "runtime"
}

const ACTIONS: Record<RuntimeActionCenterProps["riskLevel"], RuntimeAction[]> = {
  LOW: [
    {
      title: "Monitor Runtime",
      description: "Keep tracking active stages.",
      target: "runtime",
    },
    {
      title: "Stay Overview",
      description: "Kitchen is stable.",
      target: "runtime",
    },
  ],

  MEDIUM: [
    {
      title: "Review Production",
      description: "Inspect production before pressure rises.",
      target: "production",
    },
    {
      title: "Check Workforce",
      description: "Validate station balance.",
      target: "workforce",
    },
  ],

  HIGH: [
    {
      title: "Reassign Support",
      description: "Move staff into overloaded stations.",
      target: "workforce",
    },
    {
      title: "Inspect Runtime",
      description: "Review delayed stages.",
      target: "runtime",
    },
    {
      title: "Review Production",
      description: "Protect output flow.",
      target: "production",
    },
  ],

  CRITICAL: [
    {
      title: "Open Escalations",
      description: "Critical blockage needs action.",
      target: "alerts",
    },
    {
      title: "Backup Line",
      description: "Activate production support.",
      target: "production",
    },
    {
      title: "Approval Priority",
      description: "Protect approval flow.",
      target: "alerts",
    },
  ],
}

function getRiskStyle(riskLevel: RuntimeActionCenterProps["riskLevel"]) {
  if (riskLevel === "CRITICAL") {
    return "border-red-400/30 bg-red-500/10 text-red-300"
  }

  if (riskLevel === "HIGH") {
    return "border-orange-400/30 bg-orange-500/10 text-orange-300"
  }

  if (riskLevel === "MEDIUM") {
    return "border-yellow-300/30 bg-yellow-300/10 text-yellow-200"
  }

  return "border-[#CCFF33]/25 bg-[#CCFF33]/10 text-[#CCFF33]"
}

export default function RuntimeActionCenter({
  riskLevel,
  onOpenAlerts,
  onOpenProduction,
  onOpenRuntime,
  onOpenWorkforce,
}: RuntimeActionCenterProps) {
  const actions = ACTIONS[riskLevel]

  function runAction(target: RuntimeAction["target"]) {
    if (target === "alerts") {
      onOpenAlerts()
      return
    }

    if (target === "workforce") {
      onOpenWorkforce()
      return
    }

    if (target === "production") {
      onOpenProduction()
      return
    }

    onOpenRuntime()
  }

  return (
    <section className="rounded-[26px] border border-white/10 bg-white/[0.03] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.22)] md:p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              AI Action Rail
            </p>

            <span
              className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] ${getRiskStyle(
                riskLevel
              )}`}
            >
              {riskLevel}
            </span>
          </div>

          <h3 className="mt-2 text-[22px] font-black tracking-[-0.05em] text-white">
            Recommended next moves.
          </h3>

          <p className="mt-1 max-w-xl text-[11px] font-medium leading-5 text-white/45">
            Compact runtime actions based on current kitchen pressure.
          </p>
        </div>

        <div className="grid gap-2 md:grid-cols-3 xl:min-w-[620px]">
          {actions.map((action) => (
            <button
              key={action.title}
              onClick={() => runAction(action.target)}
              className="min-w-0 rounded-[18px] border border-white/10 bg-black/25 p-3 text-left transition-all duration-300 hover:border-[#CCFF33]/30 hover:bg-[#CCFF33]/10"
            >
              <p className="truncate text-[11px] font-black text-white">
                {action.title}
              </p>

              <p className="mt-1 line-clamp-2 text-[10px] font-semibold leading-4 text-white/45">
                {action.description}
              </p>

              <p className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#CCFF33]">
                Execute →
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}