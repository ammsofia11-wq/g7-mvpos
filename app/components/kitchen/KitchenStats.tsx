import {
  PRODUCTION_TASKS,
  getBottleneckStation,
  getDelayRisk,
  getProductionEfficiencyScore,
  getTotalProductionPortions,
} from "@/app/ai/g7-production-engine"

import { WORKERS } from "./kitchen-data"

export default function KitchenStats() {
  const totalProduction = getTotalProductionPortions()

  const efficiencyScore = getProductionEfficiencyScore()

  const bottleneck = getBottleneckStation()

  const delayRisk = getDelayRisk()

  return (
    <section className="mt-4 grid gap-3 md:grid-cols-6">

      <StatCard
        label="Production Tasks"
        value={PRODUCTION_TASKS.length}
      />

      <StatCard
        label="Total Portions"
        value={totalProduction}
      />

      <StatCard
        label="Efficiency Score"
        value={`${efficiencyScore}%`}
      />

      <StatCard
        label="Bottleneck"
        value={bottleneck}
      />

      <StatCard
        label="Delay Risk"
        value={delayRisk}
      />

      <StatCard
        label="Workers Online"
        value={WORKERS.length}
      />

    </section>
  )
}

function StatCard({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.035] p-3 shadow-[0_12px_35px_rgba(0,0,0,0.18)]">

      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-[18px] font-black leading-none tracking-[-0.03em] text-white">
        {value}
      </p>

    </div>
  )
}