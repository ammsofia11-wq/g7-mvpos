"use client"

import ApprovedProduction from "@/app/components/kitchen/ApprovedProduction"
import KitchenStats from "@/app/components/kitchen/KitchenStats"
import RuntimeAlertsFeed from "@/app/components/kitchen/RuntimeAlertsFeed"

export default function ExecutionRuntimeLayout() {
  return (
    <div className="space-y-4">
      <KitchenStats />

      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <RuntimeAlertsFeed />
        <ApprovedProduction />
      </div>
    </div>
  )
}