type StaffSyncItem = {
  title: string
  text: string
  time: string
}

const staffSync: StaffSyncItem[] = [
  {
    title: "Grill Station Completed",
    text: "Chicken batches moved to Packaging",
    time: "1 min ago",
  },
  {
    title: "QC Alert",
    text: "Keto Salmon waiting approval",
    time: "3 min ago",
  },
  {
    title: "Packaging Ready",
    text: "Dispatch team notified",
    time: "5 min ago",
  },
  {
    title: "Low Stock Warning",
    text: "Olive oil running low",
    time: "8 min ago",
  },
]

export default function StaffTimeline() {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.20)]">
      <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
        Staff Sync Timeline
      </p>

      <div className="mt-4 space-y-3">
        {staffSync.map((item) => (
          <div
            key={item.title}
            className="rounded-[16px] border border-white/10 bg-black/20 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-black text-white">
                {item.title}
              </p>

              <span className="text-[9px] text-slate-500">
                {item.time}
              </span>
            </div>

            <p className="mt-2 text-[10px] leading-5 text-slate-400">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}