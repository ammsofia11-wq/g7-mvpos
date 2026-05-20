"use client"

import ApprovedProduction from "@/app/components/kitchen/ApprovedProduction"
import RealtimeRuntimeEngine from "@/app/components/kitchen/RealtimeRuntimeEngine"
import RuntimeCockpitTabs from "@/app/components/kitchen/RuntimeCockpitTabs"

export default function CommandRuntimeLayout() {
  return (
    <div className="space-y-4">
      <RuntimeCockpitTabs />

      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <RealtimeRuntimeEngine compact />
        <ApprovedProduction />
      </div>
    </div>
  )
}