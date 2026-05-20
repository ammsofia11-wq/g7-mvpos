import {
  PRODUCTION_TASKS,
} from "@/app/ai/g7-production-engine"

export default function ApprovalQueue() {
  const approvalQueue = PRODUCTION_TASKS.filter((task) => {
    return task.status === "HEAD_CHEF_CHECK"
  })

  return (
    <div className="rounded-[24px] border border-amber-400/20 bg-amber-400/[0.03] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.20)]">
      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-amber-300">
        Approval Queue
      </p>

      <h2 className="mt-2 text-[26px] font-black leading-none tracking-[-0.05em] text-white">
        Head Chef Review
      </h2>

      <div className="mt-5 space-y-3">
        {approvalQueue.length === 0 ? (
          <div className="rounded-[16px] border border-white/10 bg-black/20 p-4 text-[12px] text-slate-400">
            No recipes waiting approval.
          </div>
        ) : (
          approvalQueue.map((task) => (
            <div
              key={task.id}
              className="rounded-[18px] border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[14px] font-black text-white">
                    {task.recipe}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">
                    {task.assignedWorker} • {task.station}
                  </p>
                </div>

                <StatusBadge status={task.status} />
              </div>
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