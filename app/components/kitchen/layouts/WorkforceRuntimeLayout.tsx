"use client"

import RuntimeCockpitTabs from "@/app/components/kitchen/RuntimeCockpitTabs"

type WorkforceRuntimeLayoutProps = {
  onOpenFull: () => void
}

export default function WorkforceRuntimeLayout({
  onOpenFull,
}: WorkforceRuntimeLayoutProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-[26px] border border-[#CCFF33]/10 bg-[#0B1108]/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Workforce Focus
            </p>

            <h2 className="mt-2 text-[24px] font-black tracking-[-0.05em] text-white">
              Compact workforce intelligence.
            </h2>

            <p className="mt-1 max-w-2xl text-[11px] leading-5 text-white/45">
              Lightweight workforce monitoring without loading the full
              workforce operating floor.
            </p>
          </div>

          <button
            onClick={onOpenFull}
            className="rounded-[18px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#CCFF33] transition-all duration-300 hover:bg-[#CCFF33]/20"
          >
            Open Workforce OS
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <CompactMetric
            label="Employees"
            value="45"
            note="Mapped"
          />

          <CompactMetric
            label="Active"
            value="42"
            note="Live"
          />

          <CompactMetric
            label="Break"
            value="2"
            note="Coverage"
          />

          <CompactMetric
            label="Capacity"
            value="5200"
            note="Meals/day"
          />
        </div>
      </section>

      <RuntimeCockpitTabs />
    </div>
  )
}

function CompactMetric({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white/35">
        {label}
      </p>

      <p className="mt-2 text-[24px] font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-semibold text-white/45">
        {note}
      </p>
    </div>
  )
}