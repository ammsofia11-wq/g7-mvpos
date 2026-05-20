import {
  getUrgentProductionTasks,
} from "@/app/ai/g7-production-engine"

export default function KitchenAlerts() {
  const urgentTasks = getUrgentProductionTasks()

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.20)]">

      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-cyan-300">
        AI Kitchen Alerts
      </p>

      <h2 className="mt-2 text-[26px] font-black leading-none tracking-[-0.05em] text-white">
        Critical Operations
      </h2>

      <div className="mt-5 space-y-3">

        {urgentTasks.map((task) => (

          <AlertCard
            key={task.id}
            title={task.recipe}
            text={`${task.station} pressure detected. Assigned to ${task.assignedWorker}.`}
            status={task.priority}
          />

        ))}

      </div>

    </div>
  )
}

function AlertCard({
  title,
  text,
  status,
}: {
  title: string
  text: string
  status: string
}) {
  return (
    <div className="rounded-[15px] border border-white/10 bg-black/20 p-3">

      <div className="flex items-center justify-between gap-3">

        <p className="text-[11px] font-black text-white">
          {title}
        </p>

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
  priority: string
}) {
  const active =
    priority === "URGENT"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : priority === "HIGH"
        ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
        : priority === "MEDIUM"
          ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300"
          : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${active}`}
    >
      {priority}
    </span>
  )
}