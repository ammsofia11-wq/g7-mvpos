"use client"

import { useState } from "react"

import RuntimeBadge from "@/app/components/system/RuntimeBadge"
import RuntimeDock from "@/app/components/system/RuntimeDock"
import RuntimeHero from "@/app/components/system/RuntimeHero"
import RuntimePanel from "@/app/components/system/RuntimePanel"
import RuntimeSectionHeader from "@/app/components/system/RuntimeSectionHeader"
import RuntimeStatCard from "@/app/components/system/RuntimeStatCard"
import RuntimeWorkspaceNav from "@/app/components/system/RuntimeWorkspaceNav"

import {
  calculateGlobalRisk,
  getApprovalBlockedProduction,
  getCriticalSignals,
  getRuntimeOverview,
  getSignalsForSystem,
  getSystemBatches,
} from "@/app/components/system/runtime/runtime-actions"

import {
  approveRuntimeBatch,
  blockRuntimeBatch,
  getMutableRuntimeSnapshot,
} from "@/app/components/system/runtime/runtime-mutations"

const runtimeTimeline = [
  { time: "08:42", event: "Protein batch validated", status: "SUCCESS" },
  { time: "09:05", event: "Macro mismatch detected", status: "WARNING" },
  { time: "09:18", event: "Packaging approval locked", status: "LOCKED" },
  { time: "09:44", event: "Dispatch approved", status: "SUCCESS" },
]

const releaseChecks = [
  { label: "Chef Signature", value: "Required", state: "WAITING" },
  { label: "Nutrition Validation", value: "92%", state: "PASS" },
  { label: "QA Gate", value: "Locked", state: "LOCKED" },
  { label: "Dispatch Release", value: "Blocked", state: "HOLD" },
]

export default function ApprovalRuntimePage() {
  const [, setRuntimeRefresh] = useState(0)

  const approvalBatches = getSystemBatches("approval")

  const blockedProduction =
    getApprovalBlockedProduction()

  const criticalSignals =
    getCriticalSignals()

  const approvalSignals =
    getSignalsForSystem("approval")

  const runtimeOverview =
    getRuntimeOverview()

  function refreshRuntime() {
    getMutableRuntimeSnapshot()

    setRuntimeRefresh((prev) => prev + 1)
  }

  function handleApprove(batchId: string) {
    approveRuntimeBatch(batchId)

    refreshRuntime()
  }

  function handleBlock(batchId: string) {
    blockRuntimeBatch(batchId)

    refreshRuntime()
  }

  return (
    <main className="min-h-screen bg-[#140D05] text-white">
      <div className="w-full space-y-3 px-3 py-3 pb-28 sm:px-4 md:px-5">

        <RuntimeWorkspaceNav
          active="approval"
          items={[
            {
              label: "Kitchen",
              href: "/kitchen",
              status: "Execution Runtime",
              color: "lime",
            },
            {
              label: "Workforce",
              href: "/workforce",
              status: "Operations Runtime",
              color: "green",
            },
            {
              label: "Approval",
              href: "/approval",
              status: "Authority Runtime",
              color: "amber",
            },
          ]}
        />

        <RuntimeHero
          eyebrow="Approval Runtime OS"
          title="Command"
          accentTitle="Center"
          badge={calculateGlobalRisk()}
          color="amber"
          description="Approval intelligence connected directly to Kitchen Runtime."
          rightContent={
            <div className="grid grid-cols-2 gap-2">

              <RuntimeStatCard
                label="Approval Queue"
                value={approvalBatches.length}
                note="live runtime batches"
                color="amber"
              />

              <RuntimeStatCard
                label="Blocked Dispatch"
                value={blockedProduction.length}
                note="waiting release"
                color="red"
              />

              <RuntimeStatCard
                label="Critical Signals"
                value={criticalSignals.length}
                note="cross-runtime blockers"
                color="amber"
              />

              <RuntimeStatCard
                label="Global Runtime"
                value={runtimeOverview.globalRisk}
                note={`${runtimeOverview.activeBatches} active batches`}
                color="amber"
              />

            </div>
          }
        />

        <section className="grid gap-3 xl:grid-cols-[1.06fr_0.94fr]">

          {/* LEFT */}

          <div className="space-y-3">

            <RuntimePanel color="amber" compact>

              <RuntimeSectionHeader
                eyebrow="Runtime Queue"
                title="Approval Flow"
                badge="Live"
                color="amber"
              />

              <div className="mt-4 space-y-2.5">

                {approvalBatches.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[18px] border border-amber-300/10 bg-amber-300/[0.04] p-3"
                  >

                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-1.5">

                          <RuntimeBadge color="amber">
                            {item.id}
                          </RuntimeBadge>

                          <RuntimeBadge color="red">
                            {item.riskLevel}
                          </RuntimeBadge>

                          <RuntimeBadge color="amber">
                            {item.status}
                          </RuntimeBadge>

                        </div>

                        <h3 className="mt-2 text-[24px] font-black leading-none tracking-tight">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-[11px] font-semibold text-amber-100/55">
                          {item.portions} portions
                        </p>

                        <p className="mt-2 text-[12px] font-bold text-amber-200/75">
                          Runtime updated at {item.updatedAt}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">

                          <button
                            onClick={() =>
                              handleApprove(item.id)
                            }
                            className="rounded-[14px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#CCFF33] transition-all duration-300 hover:bg-[#CCFF33]/20"
                          >
                            Approve Batch
                          </button>

                          <button
                            onClick={() =>
                              handleBlock(item.id)
                            }
                            className="rounded-[14px] border border-red-400/20 bg-red-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-red-300 transition-all duration-300 hover:bg-red-500/20"
                          >
                            Block Dispatch
                          </button>

                        </div>

                      </div>

                      <div className="shrink-0">

                        <RuntimeBadge
                          color={
                            item.dispatchBlocked
                              ? "red"
                              : "lime"
                          }
                        >
                          {item.dispatchBlocked
                            ? "BLOCKED"
                            : "READY"}
                        </RuntimeBadge>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </RuntimePanel>

            <RuntimePanel color="lime" compact>

              <RuntimeSectionHeader
                eyebrow="Kitchen Runtime Link"
                title="Production Impact"
                color="lime"
              />

              <div className="mt-4 grid gap-2 sm:grid-cols-2">

                <RuntimeStatCard
                  label="Blocked Production"
                  value={blockedProduction.length}
                  note="approval dependent"
                  color="lime"
                />

                <RuntimeStatCard
                  label="Runtime Signals"
                  value={approvalSignals.length}
                  note="cross-system activity"
                  color="lime"
                />

                <RuntimeStatCard
                  label="Approval Risk"
                  value={calculateGlobalRisk()}
                  note="runtime severity"
                  color="lime"
                />

                <RuntimeStatCard
                  label="Kitchen Impact"
                  value="Connected"
                  note="live runtime sync"
                  color="lime"
                />

              </div>

              <div className="mt-3 rounded-[20px] border border-lime-300/10 bg-black/20 p-4">

                <RuntimeBadge color="lime">
                  Runtime Sync
                </RuntimeBadge>

                <h3 className="mt-3 text-[34px] font-black leading-[1] tracking-tight">
                  Approval decisions now affect Kitchen Runtime live
                </h3>

                <p className="mt-3 text-[12px] leading-5 text-lime-100/60">
                  Global Runtime Engine synchronizes approval blockage, production release, and dispatch readiness.
                </p>

              </div>

            </RuntimePanel>

          </div>

          {/* RIGHT */}

          <div className="space-y-3">

            <RuntimePanel color="amber" compact>

              <RuntimeSectionHeader
                eyebrow="Batch Release"
                title="Release Control"
                color="amber"
              />

              <div className="mt-4 space-y-2.5">

                {releaseChecks.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 rounded-[16px] border border-amber-300/10 bg-amber-300/[0.04] p-3"
                  >

                    <div>

                      <p className="text-[15px] font-black">
                        {item.label}
                      </p>

                      <p className="mt-1 text-[10px] font-semibold text-amber-100/50">
                        {item.value}
                      </p>

                    </div>

                    <RuntimeBadge color="amber">
                      {item.state}
                    </RuntimeBadge>

                  </div>
                ))}

              </div>

            </RuntimePanel>

            <RuntimePanel color="amber" compact>

              <RuntimeSectionHeader
                eyebrow="Cross Runtime Signals"
                title="Runtime Intelligence"
                color="amber"
              />

              <div className="mt-4 space-y-2.5">

                {approvalSignals.map((signal) => (
                  <div
                    key={signal.id}
                    className="rounded-[16px] border border-amber-300/10 bg-amber-300/[0.04] p-3"
                  >

                    <div className="flex items-start gap-3">

                      <RuntimeBadge color="amber">
                        {signal.type}
                      </RuntimeBadge>

                      <div className="flex-1">

                        <p className="text-[14px] font-bold text-white">
                          {signal.title}
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-white/55">
                          {signal.message}
                        </p>

                        <p className="mt-2 text-[9px] font-black uppercase tracking-[0.18em] text-amber-300">
                          {signal.source} → {signal.target}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </RuntimePanel>

            <RuntimePanel color="amber" compact>

              <RuntimeSectionHeader
                eyebrow="Live Runtime"
                title="Decision Timeline"
                color="amber"
              />

              <div className="mt-4 space-y-2.5">

                {runtimeTimeline.map((item) => (
                  <div
                    key={item.time}
                    className="rounded-[16px] border border-amber-300/10 bg-amber-300/[0.04] p-3"
                  >

                    <div className="flex items-start gap-3">

                      <RuntimeBadge color="amber">
                        {item.time}
                      </RuntimeBadge>

                      <div className="flex-1">

                        <p className="text-[14px] font-bold text-white">
                          {item.event}
                        </p>

                        <p className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-amber-300">
                          {item.status}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </RuntimePanel>

          </div>

        </section>

      </div>

      <RuntimeDock
        active="approval"
        items={[
          {
            label: "Kitchen",
            href: "/kitchen",
            icon: "🍳",
            color: "lime",
          },
          {
            label: "Workforce",
            href: "/workforce",
            icon: "👥",
            color: "green",
          },
          {
            label: "Approval",
            href: "/approval",
            icon: "🛡️",
            color: "amber",
          },
          {
            label: "Inventory",
            href: "/inventory",
            icon: "📦",
            color: "blue",
          },
          {
            label: "AI Chef",
            href: "/dashboard",
            icon: "🧠",
            color: "white",
          },
        ]}
      />
    </main>
  )
}