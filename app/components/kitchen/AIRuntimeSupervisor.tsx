"use client"

import { useEffect, useMemo, useState } from "react"

import { RuntimeDish } from "@/app/components/kitchen/kitchen-runtime-data"
import { CENTRAL_KITCHEN_WORKFORCE } from "@/app/components/kitchen/kitchen-workforce-data"

import {
  PRODUCTION_RUNTIME_EVENT,
  getProductionRuntimeDishes,
} from "@/app/ai/production-runtime-store"

import {
  WORKFORCE_RUNTIME_EVENT,
  WorkforceStatus,
  getWorkforceRuntimeState,
} from "@/app/ai/workforce-runtime-store"

type SupervisorAlert = {
  id: string
  title: string
  description: string
  recommendation: string
  severity: "LOW" | "MEDIUM" | "HIGH"
}

type StationInsight = {
  id: string
  name: string
  activeOperators: number
  minimumOperators: number
  optimalOperators: number
  maximumOperators: number
  status: "UNDERSTAFFED" | "OPTIMAL" | "OVERLOADED"
}

function getSeverityStyle(severity: SupervisorAlert["severity"]) {
  if (severity === "HIGH") {
    return "border-red-400/30 bg-red-500/15 text-red-200"
  }

  if (severity === "MEDIUM") {
    return "border-amber-300/30 bg-amber-300/10 text-amber-200"
  }

  return "border-cyan-400/30 bg-cyan-500/10 text-cyan-200"
}

function getStationStatusStyle(status: StationInsight["status"]) {
  if (status === "UNDERSTAFFED") {
    return "border-red-400/30 bg-red-500/15 text-red-200"
  }

  if (status === "OVERLOADED") {
    return "border-amber-300/30 bg-amber-300/10 text-amber-200"
  }

  return "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
}

function analyzeRuntime(dishes: RuntimeDish[]): SupervisorAlert[] {
  const alerts: SupervisorAlert[] = []

  const waitingPackaging = dishes.flatMap((dish) =>
    dish.stages.filter(
      (stage) => stage.stage === "PACKAGING" && stage.status === "WAITING"
    )
  )

  const waitingQc = dishes.flatMap((dish) =>
    dish.stages.filter(
      (stage) => stage.stage === "QC" && stage.status === "WAITING"
    )
  )

  if (waitingPackaging.length >= 2) {
    alerts.push({
      id: "PACKAGING-BOTTLENECK",
      title: "Packaging Queue Building Up",
      description: "Multiple dishes are waiting for packaging execution.",
      recommendation: "Move available support capacity into Packaging.",
      severity: "HIGH",
    })
  }

  if (waitingQc.length >= 1) {
    alerts.push({
      id: "QC-READY",
      title: "QC Attention Required",
      description: "One or more dishes are waiting for quality control.",
      recommendation: "Assign QC backup before bottleneck escalation.",
      severity: "MEDIUM",
    })
  }

  if (alerts.length === 0) {
    alerts.push({
      id: "RUNTIME-STABLE",
      title: "Runtime Stable",
      description: "No major production bottlenecks detected.",
      recommendation: "Maintain current allocation.",
      severity: "LOW",
    })
  }

  return alerts
}

function buildStationInsights(
  statusMap: Record<string, WorkforceStatus>
): StationInsight[] {
  return CENTRAL_KITCHEN_WORKFORCE.map((station) => {
    const activeOperators = station.employees.filter(
      (employee) => statusMap[employee.id] === "ACTIVE"
    ).length

    let status: StationInsight["status"] = "OPTIMAL"

    if (activeOperators < station.capacity.minimumOperators) {
      status = "UNDERSTAFFED"
    } else if (activeOperators > station.capacity.maximumOperators) {
      status = "OVERLOADED"
    }

    return {
      id: station.id,
      name: station.name,
      activeOperators,
      minimumOperators: station.capacity.minimumOperators,
      optimalOperators: station.capacity.optimalOperators,
      maximumOperators: station.capacity.maximumOperators,
      status,
    }
  })
}

export default function AIRuntimeSupervisor() {
  const [dishes, setDishes] = useState<RuntimeDish[]>([])
  const [statusMap, setStatusMap] = useState<Record<string, WorkforceStatus>>({})

  useEffect(() => {
    function syncRuntime() {
      setDishes(getProductionRuntimeDishes())
    }

    syncRuntime()

    window.addEventListener(PRODUCTION_RUNTIME_EVENT, syncRuntime)

    return () => {
      window.removeEventListener(PRODUCTION_RUNTIME_EVENT, syncRuntime)
    }
  }, [])

  useEffect(() => {
    function syncWorkforce() {
      const state = getWorkforceRuntimeState()
      const nextMap: Record<string, WorkforceStatus> = {}

      state.forEach((employee) => {
        nextMap[employee.id] = employee.status
      })

      setStatusMap(nextMap)
    }

    syncWorkforce()

    window.addEventListener(WORKFORCE_RUNTIME_EVENT, syncWorkforce)

    return () => {
      window.removeEventListener(WORKFORCE_RUNTIME_EVENT, syncWorkforce)
    }
  }, [])

  const alerts = useMemo(() => analyzeRuntime(dishes), [dishes])

  const stationInsights = useMemo(
    () => buildStationInsights(statusMap),
    [statusMap]
  )

  const totalActiveStages = dishes.reduce(
    (total, dish) =>
      total + dish.stages.filter((stage) => stage.status === "ACTIVE").length,
    0
  )

  const totalWaitingStages = dishes.reduce(
    (total, dish) =>
      total + dish.stages.filter((stage) => stage.status === "WAITING").length,
    0
  )

  const completedStages = dishes.reduce(
    (total, dish) =>
      total + dish.stages.filter((stage) => stage.status === "COMPLETED").length,
    0
  )

  return (
    <section className="rounded-[32px] border border-[#CCFF33]/20 bg-white/[0.035] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
            AI Runtime Supervisor
          </p>

          <h2 className="mt-2 text-[34px] font-black tracking-[-0.06em] text-white">
            Dynamic Position Allocation
          </h2>

          <p className="mt-2 max-w-2xl text-[13px] leading-6 text-white/45">
            Monitors production flow and compares active operators against each
            station capacity.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-[20px] border border-emerald-400/20 bg-emerald-500/10 p-3 text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.14em] text-white/35">
              Active
            </p>
            <p className="mt-1 text-[26px] font-black text-emerald-300">
              {totalActiveStages}
            </p>
          </div>

          <div className="rounded-[20px] border border-amber-300/20 bg-amber-300/10 p-3 text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.14em] text-white/35">
              Waiting
            </p>
            <p className="mt-1 text-[26px] font-black text-amber-200">
              {totalWaitingStages}
            </p>
          </div>

          <div className="rounded-[20px] border border-purple-400/20 bg-purple-500/10 p-3 text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.14em] text-white/35">
              Done
            </p>
            <p className="mt-1 text-[26px] font-black text-purple-300">
              {completedStages}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {alerts.map((alert) => (
          <article
            key={alert.id}
            className={`rounded-[24px] border p-5 ${getSeverityStyle(
              alert.severity
            )}`}
          >
            <p className="text-[8px] font-black uppercase tracking-[0.16em] opacity-70">
              {alert.severity} Priority
            </p>

            <h3 className="mt-2 text-[22px] font-black tracking-[-0.05em]">
              {alert.title}
            </h3>

            <p className="mt-3 text-[12px] font-bold leading-5 opacity-75">
              {alert.description}
            </p>

            <div className="mt-4 rounded-[18px] border border-white/10 bg-black/20 p-3">
              <p className="text-[8px] font-black uppercase tracking-[0.14em] text-white/40">
                AI Recommendation
              </p>

              <p className="mt-2 text-[12px] font-bold leading-5 text-white/85">
                {alert.recommendation}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-4">
        <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
          Station Capacity Intelligence
        </p>

        <h3 className="mt-2 text-[28px] font-black tracking-[-0.06em] text-white">
          Live Position Load Status
        </h3>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {stationInsights.map((station) => (
            <article
              key={station.id}
              className={`rounded-[22px] border p-4 ${getStationStatusStyle(
                station.status
              )}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] opacity-70">
                    {station.status}
                  </p>

                  <h4 className="mt-2 text-[20px] font-black tracking-[-0.04em]">
                    {station.name}
                  </h4>
                </div>

                <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em]">
                  {station.activeOperators}/{station.optimalOperators}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-[16px] border border-white/10 bg-black/20 p-3">
                  <p className="text-[8px] font-black uppercase tracking-[0.14em] opacity-50">
                    Min
                  </p>
                  <p className="mt-1 text-[18px] font-black">
                    {station.minimumOperators}
                  </p>
                </div>

                <div className="rounded-[16px] border border-white/10 bg-black/20 p-3">
                  <p className="text-[8px] font-black uppercase tracking-[0.14em] opacity-50">
                    Optimal
                  </p>
                  <p className="mt-1 text-[18px] font-black">
                    {station.optimalOperators}
                  </p>
                </div>

                <div className="rounded-[16px] border border-white/10 bg-black/20 p-3">
                  <p className="text-[8px] font-black uppercase tracking-[0.14em] opacity-50">
                    Max
                  </p>
                  <p className="mt-1 text-[18px] font-black">
                    {station.maximumOperators}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}