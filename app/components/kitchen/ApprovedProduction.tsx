import {
  PRODUCTION_TASKS,
} from "@/app/ai/g7-production-engine"

export default function ApprovedProduction() {
  const approvedTasks = PRODUCTION_TASKS.filter((task) => {
    return task.status === "APPROVED"
  })

  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
      <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
        Approved Production
      </p>

      <div className="mt-4 space-y-2">
        {approvedTasks.length === 0 ? (
          <div className="rounded-[15px] border border-white/10 bg-black/20 p-3 text-[11px] text-slate-500">
            No approved production batches.
          </div>
        ) : (
          approvedTasks.map((task) => (
            <div
              key={task.id}
              className="rounded-[15px] border border-white/10 bg-black/20 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-black text-white">
                  {task.recipe}
                </p>

                <StatusBadge status={task.status} />
              </div>

              <p className="mt-2 text-[10px] leading-4 text-slate-400">
                {task.assignedWorker} • {task.station}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ")
}

function StatusBadge({
  status,
}: {
  status: string
}) {
  const active =
    status === "APPROVED"
      ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300"
      : status === "PACKAGING_READY" ||
        status === "STORED" ||
        status === "READY"
        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
        : status === "HEAD_CHEF_CHECK"
          ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
          : "border-orange-400/30 bg-orange-400/10 text-orange-300"

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${active}`}
    >
      {formatStatus(status)}
    </span>
  )
}