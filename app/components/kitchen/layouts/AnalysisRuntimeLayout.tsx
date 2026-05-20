"use client"

import KitchenStats from "@/app/components/kitchen/KitchenStats"
import RuntimeCockpitTabs from "@/app/components/kitchen/RuntimeCockpitTabs"

export default function AnalysisRuntimeLayout() {
  return (
    <div className="space-y-4">
      <KitchenStats />

      <RuntimeCockpitTabs />
    </div>
  )
}