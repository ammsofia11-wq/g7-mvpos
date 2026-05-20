import type { KitchenWorker } from "./kitchen-data"

export default function WorkerCard({
  worker,
}: {
  worker: KitchenWorker
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[18px] font-black text-white">
            {worker.name}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            {worker.station}
          </p>
        </div>

        <WorkerStatusBadge status={worker.status} />
      </div>

      <div className="mt-4 rounded-[16px] bg-white/[0.03] p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Active Task
          </p>

          <p className="text-[11px] font-black text-cyan-300">
            {worker.progress}%
          </p>
        </div>

        <p className="mt-2 text-[14px] font-black text-white">
          {worker.task}
        </p>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-300"
            style={{
              width: `${worker.progress}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <MetricBox label="Speed" value={`${worker.speed}%`} />
        <MetricBox label="Accuracy" value={`${worker.accuracy}%`} />
        <MetricBox label="Completed" value={worker.completed} />
      </div>
    </div>
  )
}

function MetricBox({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[14px] bg-white/[0.03] p-3">
      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-[14px] font-black text-white">
        {value}
      </p>
    </div>
  )
}

function WorkerStatusBadge({
  status,
}: {
  status: string
}) {
  const active =
    status === "BUSY"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : status === "AVAILABLE"
        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
        : status === "BREAK"
          ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
          : "border-white/10 bg-white/[0.04] text-slate-300"

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${active}`}
    >
      {status}
    </span>
  )
}