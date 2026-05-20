"use client"

const interventionPlans = [
  {
    owner: "Head Chef",
    action: "Resolve blocked cooking stage",
    priority: "Critical",
    eta: "5 min",
    impact: "Restores production flow and reduces escalation pressure.",
  },
  {
    owner: "Sous Chef",
    action: "Rebalance prep support",
    priority: "High",
    eta: "8 min",
    impact: "Improves workforce efficiency before the next batch window.",
  },
  {
    owner: "Packaging Lead",
    action: "Prepare dispatch buffer",
    priority: "Medium",
    eta: "12 min",
    impact: "Protects delivery timing if production slips further.",
  },
  {
    owner: "AI Supervisor",
    action: "Monitor next risk window",
    priority: "High",
    eta: "Live",
    impact: "Keeps runtime focus aligned with predicted pressure.",
  },
]

function getPriorityClass(priority: string) {
  if (priority === "Critical") {
    return "border-red-400/30 bg-red-500/10 text-red-300"
  }

  if (priority === "High") {
    return "border-orange-400/30 bg-orange-500/10 text-orange-300"
  }

  return "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]"
}

export default function RuntimeInterventionPlanner() {
  return (
    <section className="rounded-[30px] border border-white/10 bg-[#10140f]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-5">
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
          Runtime Intervention Planner
        </p>

        <h2 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white md:text-[34px]">
          The OS recommends who should act next.
        </h2>

        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/55">
          The planner converts runtime intelligence into direct operational
          interventions with owner, priority, ETA, and expected impact.
        </p>
      </div>

      <div className="mt-6 grid gap-3 xl:grid-cols-4">
        {interventionPlans.map((plan) => (
          <div
            key={`${plan.owner}-${plan.action}`}
            className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 transition-all duration-500 hover:border-[#CCFF33]/25 hover:bg-[#CCFF33]/[0.04]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/35">
                  Owner
                </p>

                <h3 className="mt-1 text-lg font-black tracking-[-0.04em] text-white">
                  {plan.owner}
                </h3>
              </div>

              <span
                className={`rounded-full border px-2 py-1 text-[9px] font-black uppercase tracking-[0.14em] ${getPriorityClass(
                  plan.priority
                )}`}
              >
                {plan.priority}
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#CCFF33]">
                Action
              </p>

              <p className="mt-2 text-sm font-black leading-5 text-white">
                {plan.action}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">
                ETA
              </p>

              <p className="text-sm font-black text-[#CCFF33]">
                {plan.eta}
              </p>
            </div>

            <p className="mt-4 text-xs font-semibold leading-5 text-white/55">
              {plan.impact}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}