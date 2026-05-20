"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import RuntimeHero from "@/app/components/system/RuntimeHero"
import RuntimeStatCard from "@/app/components/system/RuntimeStatCard"
import RuntimeWorkspaceNav from "@/app/components/system/RuntimeWorkspaceNav"
import RuntimeDock from "@/app/components/system/RuntimeDock"

import WorkerBoard from "@/app/components/kitchen/WorkerBoard"
import VoiceAssistant from "@/app/components/kitchen/VoiceAssistant"
import StaffTimeline from "@/app/components/kitchen/StaffTimeline"
import ProductionFlow from "@/app/components/kitchen/ProductionFlow"
import KitchenAlerts from "@/app/components/kitchen/KitchenAlerts"
import ApprovalQueue from "@/app/components/kitchen/ApprovalQueue"
import ApprovedProduction from "@/app/components/kitchen/ApprovedProduction"
import WorkforceMap from "@/app/components/kitchen/WorkforceMap"
import RealtimeRuntimeEngine from "@/app/components/kitchen/RealtimeRuntimeEngine"
import RuntimeAlertsFeed from "@/app/components/kitchen/RuntimeAlertsFeed"
import RuntimeCommandBar from "@/app/components/kitchen/RuntimeCommandBar"
import RuntimeActionCenter from "@/app/components/kitchen/RuntimeActionCenter"
import RuntimeFocusModes from "@/app/components/kitchen/RuntimeFocusModes"

import ExecutionRuntimeLayout from "@/app/components/kitchen/layouts/ExecutionRuntimeLayout"
import AnalysisRuntimeLayout from "@/app/components/kitchen/layouts/AnalysisRuntimeLayout"
import WorkforceRuntimeLayout from "@/app/components/kitchen/layouts/WorkforceRuntimeLayout"
import CommandRuntimeLayout from "@/app/components/kitchen/layouts/CommandRuntimeLayout"

import {
  RuntimeProvider,
  useRuntime,
} from "@/app/components/kitchen/runtime-context"

import { getRuntimeMood } from "@/app/components/kitchen/runtime-mood"
import { getRuntimeAttention } from "@/app/components/kitchen/runtime-attention"
import { getRuntimeMemory } from "@/app/components/kitchen/runtime-memory"

import {
  calculateGlobalRisk,
  getAIRecommendedAction,
  getApprovalBlockedProduction,
  getKitchenRuntimePressure,
  getRuntimeOverview,
} from "@/app/components/system/runtime/runtime-actions"

type KitchenWorkspaceSection =
  | "overview"
  | "runtime"
  | "alerts"
  | "workforce"
  | "production"
  | "assistant"

type RuntimeFocusMode =
  | "execution"
  | "analysis"
  | "workforce"
  | "command"

export default function KitchenPage() {
  return (
    <Suspense fallback={<KitchenLoading />}>
      <RuntimeProvider>
        <KitchenRuntimePage />
      </RuntimeProvider>
    </Suspense>
  )
}

function KitchenRuntimePage() {
  const searchParams = useSearchParams()
  const employeeId = searchParams.get("employeeId")

  const { runtime } = useRuntime()

  const runtimeMood = getRuntimeMood(runtime.summary)
  getRuntimeAttention(runtime.summary)
  const runtimeMemory = getRuntimeMemory(runtime.summary)

  const runtimeOverview = getRuntimeOverview()
  const kitchenPressure = getKitchenRuntimePressure()
  const aiAction = getAIRecommendedAction()
  const blockedProduction = getApprovalBlockedProduction()

  const [activeSection, setActiveSection] =
    useState<KitchenWorkspaceSection>("overview")

  const [activeFocusMode, setActiveFocusMode] =
    useState<RuntimeFocusMode>("execution")

  useEffect(() => {
    const savedSection = window.localStorage.getItem(
      "g7-kitchen-workspace"
    )

    if (
      savedSection === "overview" ||
      savedSection === "runtime" ||
      savedSection === "alerts" ||
      savedSection === "workforce" ||
      savedSection === "production" ||
      savedSection === "assistant"
    ) {
      setActiveSection(savedSection)
    }

    const savedFocusMode = window.localStorage.getItem(
      "g7-runtime-focus-mode"
    )

    if (
      savedFocusMode === "execution" ||
      savedFocusMode === "analysis" ||
      savedFocusMode === "workforce" ||
      savedFocusMode === "command"
    ) {
      setActiveFocusMode(savedFocusMode)
    }
  }, [])

  function changeSection(section: KitchenWorkspaceSection) {
    setActiveSection(section)

    window.localStorage.setItem(
      "g7-kitchen-workspace",
      section
    )
  }

  function changeFocusMode(mode: RuntimeFocusMode) {
    setActiveFocusMode(mode)

    window.localStorage.setItem(
      "g7-runtime-focus-mode",
      mode
    )
  }

  return (
    <main className="g7-page min-h-screen overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1460px] space-y-3 px-3 py-3 pb-28 sm:px-4 md:px-5">

        <RuntimeWorkspaceNav
          active="kitchen"
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
          eyebrow="G7 Kitchen OS Workspace"
          title="Kitchen"
          accentTitle="Runtime Floor"
          badge={calculateGlobalRisk()}
          color="lime"
          description={`${runtimeMood.message} ${aiAction.description}`}
          rightContent={
            <div className="grid gap-2 sm:grid-cols-2">

              <RuntimeStatCard
                label="Runtime Status"
                value={
                  employeeId
                    ? "Employee Linked"
                    : "Live Execution"
                }
                note={runtimeMood.title}
                color="lime"
              />

              <RuntimeStatCard
                label="Global Risk"
                value={runtimeOverview.globalRisk}
                note={`${runtimeOverview.criticalSignals} critical runtime signals`}
                color="red"
              />

              <RuntimeStatCard
                label="Blocked Production"
                value={blockedProduction.length}
                note="approval-linked blockage"
                color="amber"
              />

              <RuntimeStatCard
                label="Kitchen Pressure"
                value={kitchenPressure.pressureScore}
                note={`${kitchenPressure.blockers} blockers detected`}
                color="lime"
              />

            </div>
          }
        />

        <RuntimeCommandBar onSelect={changeSection} />

        <RuntimeActionCenter
          riskLevel={runtimeMemory.strongestPattern.riskLevel}
          onOpenAlerts={() => changeSection("alerts")}
          onOpenProduction={() => changeSection("production")}
          onOpenRuntime={() => changeSection("runtime")}
          onOpenWorkforce={() => changeSection("workforce")}
        />

        <section>
          {activeSection === "overview" && (
            <div className="space-y-3">
              <RuntimeFocusModes
                activeMode={activeFocusMode}
                onChange={changeFocusMode}
              />

              {activeFocusMode === "execution" && (
                <ExecutionRuntimeLayout />
              )}

              {activeFocusMode === "analysis" && (
                <AnalysisRuntimeLayout />
              )}

              {activeFocusMode === "workforce" && (
                <WorkforceRuntimeLayout
                  onOpenFull={() =>
                    changeSection("workforce")
                  }
                />
              )}

              {activeFocusMode === "command" && (
                <CommandRuntimeLayout />
              )}
            </div>
          )}

          {activeSection === "runtime" && (
            <RealtimeRuntimeEngine />
          )}

          {activeSection === "alerts" && (
            <div className="grid gap-3 xl:grid-cols-[1fr_0.85fr]">
              <RuntimeAlertsFeed />
              <KitchenAlerts />
            </div>
          )}

          {activeSection === "workforce" && (
            <WorkforceMap />
          )}

          {activeSection === "production" && (
            <div className="grid gap-3 xl:grid-cols-[1.25fr_0.75fr]">
              <div className="space-y-3">
                <WorkerBoard />

                <section className="grid gap-3 lg:grid-cols-[1fr_0.9fr]">
                  <KitchenAlerts />
                  <ApprovalQueue />
                </section>
              </div>

              <aside className="space-y-3">
                <ProductionFlow />
                <ApprovedProduction />
              </aside>
            </div>
          )}

          {activeSection === "assistant" && (
            <div className="grid gap-3 xl:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-3">
                <VoiceAssistant />
                <StaffTimeline />
              </div>

              <div className="space-y-3">
                <ProductionFlow />
                <ApprovedProduction />
              </div>
            </div>
          )}
        </section>
      </div>

      <RuntimeDock
        active="kitchen"
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

function KitchenLoading() {
  return (
    <main className="g7-page min-h-screen">
      <div className="mx-auto w-full max-w-[1460px] px-4 py-4">
        <section className="rounded-[32px] border border-[#CCFF33]/20 bg-white/[0.035] p-6">
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
            Loading Kitchen Runtime...
          </p>
        </section>
      </div>
    </main>
  )
}