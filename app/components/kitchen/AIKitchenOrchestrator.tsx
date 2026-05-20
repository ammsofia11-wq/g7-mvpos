"use client"

import { useEffect, useMemo, useState } from "react"

import { RUNTIME_WORKERS } from "./kitchen-runtime-data"

import {
  WORKFORCE_RUNTIME_EVENT,
  WorkforceStatus,
  getWorkforceRuntimeState,
} from "@/app/ai/workforce-runtime-store"

type StationRuntime = {
  total: number
  active: number
  break: number
  offline: number
}

function getWorkerStatus(
  workerId: string,
  statusMap: Record<string, WorkforceStatus>
): WorkforceStatus {
  return statusMap[workerId] || "ACTIVE"
}

export default function AIKitchenOrchestrator() {
  const [statusMap, setStatusMap] = useState<Record<string, WorkforceStatus>>({})

  useEffect(() => {
    function syncWorkforceRuntime() {
      const state = getWorkforceRuntimeState()
      const nextMap: Record<string, WorkforceStatus> = {}

      state.forEach((item) => {
        nextMap[item.id] = item.status
      })

      setStatusMap(nextMap)
    }

    syncWorkforceRuntime()

    window.addEventListener(WORKFORCE_RUNTIME_EVENT, syncWorkforceRuntime)

    return () => {
      window.removeEventListener(WORKFORCE_RUNTIME_EVENT, syncWorkforceRuntime)
    }
  }, [])

  const groupedStations = useMemo(() => {
    return RUNTIME_WORKERS.reduce<Record<string, StationRuntime>>(
      (acc, worker) => {
        if (!acc[worker.station]) {
          acc[worker.station] = {
            total: 0,
            active: 0,
            break: 0,
            offline: 0,
          }
        }

        const status = getWorkerStatus(worker.id, statusMap)

        acc[worker.station].total += 1

        if (status === "ACTIVE") {
          acc[worker.station].active += 1
        }

        if (status === "BREAK") {
          acc[worker.station].break += 1
        }

        if (status === "OFFLINE") {
          acc[worker.station].offline += 1
        }

        return acc
      },
      {}
    )
  }, [statusMap])

  const criticalStations = Object.entries(groupedStations).filter(
    ([, value]) => value.active <= 1
  )

  const overloadedStations = Object.entries(groupedStations).filter(
    ([, value]) => value.active >= Math.max(value.total - 1, 1)
  )

  const idleStations = Object.entries(groupedStations).filter(
    ([, value]) => value.offline + value.break >= 2
  )

  return (
    <section className="rounded-[32px] border border-[#CCFF33]/20 bg-white/[0.03] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#CCFF33]">
            AI Kitchen Orchestrator
          </p>

          <h2 className="mt-3 text-[42px] font-black tracking-[-0.04em] text-white">
            Live Runtime Intelligence
          </h2>

          <p className="mt-3 max-w-[760px] text-[14px] leading-[1.8] text-white/55">
            AI monitoring layer analyzing live staffing pressure, station
            coverage, idle workforce distribution, and runtime execution flow.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-[22px] border border-red-500/20 bg-red-500/10 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-300">
              Critical
            </p>
            <p className="mt-2 text-[34px] font-black text-white">
              {criticalStations.length}
            </p>
          </div>

          <div className="rounded-[22px] border border-yellow-500/20 bg-yellow-500/10 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-yellow-200">
              Full Load
            </p>
            <p className="mt-2 text-[34px] font-black text-white">
              {overloadedStations.length}
            </p>
          </div>

          <div className="rounded-[22px] border border-cyan-500/20 bg-cyan-500/10 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200">
              Idle Risk
            </p>
            <p className="mt-2 text-[34px] font-black text-white">
              {idleStations.length}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-3">
        <div className="rounded-[26px] border border-red-500/15 bg-red-500/[0.05] p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-red-300">
            Critical Stations
          </p>

          <div className="mt-5 space-y-4">
            {criticalStations.length === 0 ? (
              <p className="text-[13px] font-bold text-white/45">
                No critical stations detected.
              </p>
            ) : (
              criticalStations.map(([station, value]) => (
                <div
                  key={station}
                  className="rounded-[20px] border border-white/10 bg-black/20 p-4"
                >
                  <h3 className="text-[17px] font-black text-white">
                    {station}
                  </h3>

                  <p className="mt-3 text-[13px] text-white/60">
                    Active positions:
                    <span className="ml-2 font-black text-white">
                      {value.active}/{value.total}
                    </span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[26px] border border-yellow-500/15 bg-yellow-500/[0.05] p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-yellow-200">
            Full Load Stations
          </p>

          <div className="mt-5 space-y-4">
            {overloadedStations.map(([station, value]) => (
              <div
                key={station}
                className="rounded-[20px] border border-white/10 bg-black/20 p-4"
              >
                <h3 className="text-[17px] font-black text-white">
                  {station}
                </h3>

                <p className="mt-3 text-[13px] text-white/60">
                  Runtime load:
                  <span className="ml-2 font-black text-white">
                    {value.active}/{value.total}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[26px] border border-cyan-500/15 bg-cyan-500/[0.05] p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200">
            AI Recommendations
          </p>

          <div className="mt-5 space-y-4">
            {idleStations.length === 0 ? (
              <p className="text-[13px] font-bold text-white/45">
                No major idle risk detected.
              </p>
            ) : (
              idleStations.map(([station]) => (
                <div
                  key={station}
                  className="rounded-[20px] border border-white/10 bg-black/20 p-4"
                >
                  <h3 className="text-[16px] font-black text-white">
                    Reallocate Workforce
                  </h3>

                  <p className="mt-3 text-[13px] leading-[1.7] text-white/60">
                    Consider moving available capacity from{" "}
                    <span className="font-black text-white">{station}</span>{" "}
                    to stations under runtime pressure.
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}