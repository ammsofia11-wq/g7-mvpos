"use client"

import { useState } from "react"

import AdaptiveRuntimeLayoutEngine from "./AdaptiveRuntimeLayoutEngine"
import RuntimeDecisionTimeline from "./RuntimeDecisionTimeline"
import RuntimeMemoryGraph from "./RuntimeMemoryGraph"
import RuntimeCauseEffectEngine from "./RuntimeCauseEffectEngine"
import RuntimeInterventionPlanner from "./RuntimeInterventionPlanner"

type RuntimeCockpitTab =
  | "adaptive"
  | "decisions"
  | "memory"
  | "cause"
  | "intervention"

const tabs: {
  id: RuntimeCockpitTab
  label: string
  hint: string
}[] = [
  {
    id: "adaptive",
    label: "Adaptive",
    hint: "Layout",
  },
  {
    id: "decisions",
    label: "Decisions",
    hint: "AI log",
  },
  {
    id: "memory",
    label: "Memory",
    hint: "Graph",
  },
  {
    id: "cause",
    label: "Cause",
    hint: "Impact",
  },
  {
    id: "intervention",
    label: "Actions",
    hint: "Plan",
  },
]

export default function RuntimeCockpitTabs() {
  const [activeTab, setActiveTab] =
    useState<RuntimeCockpitTab>("adaptive")

  return (
    <section className="rounded-[28px] border border-[#CCFF33]/10 bg-[#0B1108]/90 p-3 shadow-[0_22px_70px_rgba(0,0,0,0.28)] md:p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Intelligence Drawer
            </p>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-white/40">
              {activeTab}
            </span>
          </div>

          <h2 className="mt-2 text-[24px] font-black tracking-[-0.055em] text-white">
            Runtime intelligence layers.
          </h2>

          <p className="mt-1 max-w-xl text-[11px] font-medium leading-5 text-white/45">
            Switch between AI layout, decisions, memory, cause-effect, and
            intervention planning without stretching the page.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-5 xl:min-w-[620px]">
          {tabs.map((tab) => {
            const active = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-[18px] border px-3 py-3 text-left transition-all duration-300 ${
                  active
                    ? "border-[#CCFF33]/35 bg-[#CCFF33]/12 shadow-[0_0_28px_rgba(204,255,51,0.08)]"
                    : "border-white/10 bg-white/[0.03] hover:border-[#CCFF33]/20 hover:bg-[#CCFF33]/[0.04]"
                }`}
              >
                <p
                  className={`text-[10px] font-black uppercase tracking-[0.14em] ${
                    active ? "text-[#CCFF33]" : "text-white/45"
                  }`}
                >
                  {tab.label}
                </p>

                <p className="mt-1 text-[10px] font-semibold text-white/35">
                  {tab.hint}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-4">
        {activeTab === "adaptive" && <AdaptiveRuntimeLayoutEngine />}

        {activeTab === "decisions" && <RuntimeDecisionTimeline />}

        {activeTab === "memory" && <RuntimeMemoryGraph />}

        {activeTab === "cause" && <RuntimeCauseEffectEngine />}

        {activeTab === "intervention" && <RuntimeInterventionPlanner />}
      </div>
    </section>
  )
}