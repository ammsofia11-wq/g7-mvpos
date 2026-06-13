"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import { CENTRAL_KITCHEN_WORKFORCE } from "./kitchen-workforce-data"

import {
  RUNTIME_DISHES,
  RUNTIME_WORKERS,
  getDishRuntimeInsights,
} from "./kitchen-runtime-data"

import { useRuntime } from "./runtime-context"

import {
  getRuntimeStageCalculatedRisk,
  type RuntimeRiskLevel,
} from "./runtime-engine-data"

import {
  WorkforceStatus,
  getWorkforceRuntimeState,
  updateEmployeeRuntimeStatus,
} from "@/app/ai/workforce-runtime-store"

type WorkforceMapProps = {
  selectedEmployeeId?: string | null
}

type StationPressureLevel = "STABLE" | "WATCH" | "OVERLOADED"

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  MEDIUM: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
  HIGH: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  CRITICAL: "border-red-400/20 bg-red-400/10 text-red-300",
}

function getStatusStyles(status: WorkforceStatus) {
  if (status === "ACTIVE") {
    return "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
  }

  if (status === "BREAK") {
    return "border-amber-300/30 bg-amber-300/10 text-amber-200"
  }

  return "border-white/10 bg-white/[0.03] text-white/40"
}

function getStatusDot(status: WorkforceStatus) {
  if (status === "ACTIVE") return "bg-emerald-400"
  if (status === "BREAK") return "bg-amber-300"

  return "bg-white/30"
}

function getPressureLevel(
  active: number,
  total: number,
  highRiskStages: number
): StationPressureLevel {
  if (total <= 0) return "OVERLOADED"

  const ratio = active / total

  if (highRiskStages > 0 && ratio <= 0.7) return "OVERLOADED"

  if (highRiskStages > 0) return "WATCH"

  if (ratio <= 0.45) return "OVERLOADED"

  if (ratio <= 0.7) return "WATCH"

  return "STABLE"
}

function getPressureStyle(level: StationPressureLevel) {
  if (level === "OVERLOADED") {
    return "border-red-400/25 bg-red-500/10 text-red-300"
  }

  if (level === "WATCH") {
    return "border-amber-300/25 bg-amber-300/10 text-amber-200"
  }

  return "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
}

function getHighestRisk(risks: RuntimeRiskLevel[]): RuntimeRiskLevel {
  if (risks.includes("CRITICAL")) return "CRITICAL"
  if (risks.includes("HIGH")) return "HIGH"
  if (risks.includes("MEDIUM")) return "MEDIUM"

  return "LOW"
}

function normalize(value: string) {
  return value.toLowerCase().replaceAll("&", "and")
}

function stationMatchesRuntimeStage(
  stationName: string,
  stationSection: string,
  runtimeStation: string
) {
  const station = normalize(stationName)
  const section = normalize(stationSection)
  const runtime = normalize(runtimeStation)

  return (
    runtime.includes(station) ||
    runtime.includes(section) ||
    station.includes(runtime) ||
    section.includes(runtime)
  )
}

function getStationRuntimeLabel(
  runtimeStageCount: number,
  highRiskStageCount: number
) {
  if (runtimeStageCount === 0) return "No live stages"
  if (highRiskStageCount > 0) return `${highRiskStageCount} risky stages`

  return `${runtimeStageCount} live stages`
}

export default function WorkforceMap({
  selectedEmployeeId,
}: WorkforceMapProps) {
  const { runtime } = useRuntime()

  const [statusMap, setStatusMap] = useState<Record<string, WorkforceStatus>>({})

  useEffect(() => {
    const state = getWorkforceRuntimeState()

    const nextMap: Record<string, WorkforceStatus> = {}

    state.forEach((employee) => {
      nextMap[employee.id] = employee.status
    })

    setStatusMap(nextMap)
  }, [])

  function getStatus(employeeId: string): WorkforceStatus {
    return statusMap[employeeId] || "OFFLINE"
  }

  function updateEmployeeStatus(
    employeeId: string,
    nextStatus: WorkforceStatus
  ) {
    updateEmployeeRuntimeStatus(employeeId, nextStatus)

    setStatusMap((current) => ({
      ...current,
      [employeeId]: nextStatus,
    }))
  }

  const workforce = useMemo(() => {
    return CENTRAL_KITCHEN_WORKFORCE.map((station) => ({
      ...station,
      employees: station.employees.map((employee) => ({
        ...employee,
        status: getStatus(employee.id),
      })),
    }))
  }, [statusMap])

  const dishInsights = useMemo(() => getDishRuntimeInsights(RUNTIME_DISHES), [])

  const totalEmployees = workforce.reduce(
    (total, station) => total + station.employees.length,
    0
  )

  const totalCapacity = workforce.reduce(
    (total, station) => total + station.dailyCapacity,
    0
  )

  const activeEmployees = workforce.reduce(
    (total, station) =>
      total +
      station.employees.filter((employee) => employee.status === "ACTIVE")
        .length,
    0
  )

  const breakEmployees = workforce.reduce(
    (total, station) =>
      total +
      station.employees.filter((employee) => employee.status === "BREAK")
        .length,
    0
  )

  const activeRuntimeStages = runtime.liveStages.filter(
    (stage) => stage.status === "ACTIVE"
  )

  const highRiskRuntimeStages = runtime.liveStages.filter((stage) => {
    const risk = getRuntimeStageCalculatedRisk(stage)

    return risk === "HIGH" || risk === "CRITICAL"
  })

  const highestRuntimeRisk = runtime.summary.aiSupervisorStatus

  return (
    <section className="rounded-[28px] border border-[#CCFF33]/15 bg-white/[0.03] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.30)] md:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
            Central Kitchen Workforce Runtime
          </p>

          <h2 className="mt-2 text-[32px] font-black tracking-[-0.07em] text-white">
            Workforce
            <span className="block text-[#CCFF33]">Density Grid</span>
          </h2>

          <p className="mt-3 max-w-2xl text-[12px] leading-5 text-white/45">
            Workforce map is now connected to runtime stages, live risk,
            station pressure, dish batches, and shift status control.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 xl:min-w-[460px]">
          <HeaderMetric label="Employees" value={totalEmployees} />
          <HeaderMetric label="Active" value={activeEmployees} />
          <HeaderMetric label="Capacity" value={totalCapacity} />
        </div>
      </div>

      <div className="mt-5 grid gap-2 md:grid-cols-4">
        <HeaderMetric label="Break" value={breakEmployees} />
        <HeaderMetric label="Live Stages" value={activeRuntimeStages.length} />
        <HeaderMetric label="Risk Stages" value={highRiskRuntimeStages.length} />

        <div
          className={`rounded-[18px] border px-4 py-3 text-right ${
            riskStyles[highestRuntimeRisk]
          }`}
        >
          <p className="text-[8px] font-black uppercase tracking-[0.18em]">
            Runtime Risk
          </p>

          <p className="mt-1 text-[24px] font-black tracking-[-0.04em]">
            {highestRuntimeRisk}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[22px] border border-[#CCFF33]/15 bg-[#CCFF33]/[0.06] p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              AI Workforce Focus
            </p>

            <h3 className="mt-2 text-[18px] font-black tracking-[-0.04em] text-white">
              {highRiskRuntimeStages.length > 0
                ? "Move support toward risky runtime stations"
                : "Workforce balance is currently stable"}
            </h3>

            <p className="mt-2 max-w-2xl text-[11px] font-semibold leading-5 text-white/55">
              {highRiskRuntimeStages.length > 0
                ? `${highRiskRuntimeStages[0].station} is the highest priority station. Review available staff and move support before the pressure spreads.`
                : "No high-risk station is currently demanding extra workforce support."}
            </p>
          </div>

          <span
            className={`w-fit rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.16em] ${
              riskStyles[highestRuntimeRisk]
            }`}
          >
            {highestRuntimeRisk}
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {workforce.map((station) => {
          const activeCount = station.employees.filter(
            (employee) => employee.status === "ACTIVE"
          ).length

          const matchedRuntimeStages = runtime.liveStages.filter((stage) =>
            stationMatchesRuntimeStage(station.name, station.section, stage.station)
          )

          const matchedRisks = matchedRuntimeStages.map((stage) =>
            getRuntimeStageCalculatedRisk(stage)
          )

          const stationRisk = getHighestRisk(matchedRisks)

          const riskyStages = matchedRuntimeStages.filter((stage) => {
            const risk = getRuntimeStageCalculatedRisk(stage)

            return risk === "HIGH" || risk === "CRITICAL"
          })

          const pressureLevel = getPressureLevel(
            activeCount,
            station.employees.length,
            riskyStages.length
          )

          const visibleEmployees = station.employees.slice(0, 3)
          const remainingEmployees = station.employees.length - 3

          const relevantDishInsights = dishInsights.filter((insight) => {
            const currentStage = normalize(insight.currentStage)
            const stationName = normalize(station.name)
            const section = normalize(station.section)

            return (
              stationName.includes(currentStage) ||
              section.includes(currentStage) ||
              currentStage.includes("cook") && stationName.includes("kitchen") ||
              currentStage.includes("packaging") && stationName.includes("packaging") ||
              currentStage.includes("qc") && section.includes("food")
            )
          })

          return (
            <article
              key={station.id}
              className="rounded-[24px] border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#CCFF33]/70">
                    {station.section}
                  </p>

                  <h3 className="mt-1 truncate text-[20px] font-black tracking-[-0.05em] text-white">
                    {station.name}
                  </h3>
                </div>

                <div
                  className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.12em] ${getPressureStyle(
                    pressureLevel
                  )}`}
                >
                  {pressureLevel}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <StationMetric label="Team" value={station.employees.length} />
                <StationMetric label="Active" value={activeCount} />
                <StationMetric label="Capacity" value={station.dailyCapacity} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div
                  className={`rounded-[14px] border p-3 ${
                    riskStyles[stationRisk]
                  }`}
                >
                  <p className="text-[7px] font-black uppercase tracking-[0.14em]">
                    Station Risk
                  </p>

                  <p className="mt-1 text-[15px] font-black">{stationRisk}</p>
                </div>

                <div className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-[7px] font-black uppercase tracking-[0.14em] text-white/35">
                    Runtime
                  </p>

                  <p className="mt-1 text-[15px] font-black text-white">
                    {getStationRuntimeLabel(
                      matchedRuntimeStages.length,
                      riskyStages.length
                    )}
                  </p>
                </div>
              </div>

              {relevantDishInsights.length > 0 && (
                <div className="mt-3 rounded-[16px] border border-cyan-300/15 bg-cyan-300/[0.04] p-3">
                  <p className="text-[7px] font-black uppercase tracking-[0.18em] text-cyan-300">
                    Dish Load
                  </p>

                  <div className="mt-2 space-y-2">
                    {relevantDishInsights.slice(0, 2).map((insight) => (
                      <div
                        key={insight.dishId}
                        className="rounded-[12px] border border-white/10 bg-black/20 p-2"
                      >
                        <p className="truncate text-[10px] font-black text-white">
                          {insight.recipe}
                        </p>

                        <p className="mt-1 text-[8px] font-semibold text-white/40">
                          {insight.currentStage} · {insight.portions} portions
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-2">
                {visibleEmployees.map((employee) => {
                  const isSelected = employee.id === selectedEmployeeId

                  return (
                    <div
                      key={employee.id}
                      className={`rounded-[18px] border p-3 ${
                        isSelected
                          ? "border-[#CCFF33]/30 bg-[#CCFF33]/10"
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={`/employees?employeeId=${employee.id}`}
                          className="flex min-w-0 items-center gap-2 text-[11px] font-black text-white transition hover:text-[#CCFF33]"
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${getStatusDot(
                              employee.status
                            )}`}
                          />

                          <span className="truncate">{employee.name}</span>
                        </Link>

                        <span
                          className={`rounded-full border px-2 py-1 text-[7px] font-black uppercase tracking-[0.10em] ${getStatusStyles(
                            employee.status
                          )}`}
                        >
                          {employee.status}
                        </span>
                      </div>

                      <div className="mt-2 flex gap-1">
                        <button
                          onClick={() =>
                            updateEmployeeStatus(employee.id, "ACTIVE")
                          }
                          className="flex-1 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[7px] font-black uppercase tracking-[0.08em] text-emerald-300"
                        >
                          Active
                        </button>

                        <button
                          onClick={() =>
                            updateEmployeeStatus(employee.id, "BREAK")
                          }
                          className="flex-1 rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-[7px] font-black uppercase tracking-[0.08em] text-amber-200"
                        >
                          Break
                        </button>

                        <button
                          onClick={() =>
                            updateEmployeeStatus(employee.id, "OFFLINE")
                          }
                          className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[7px] font-black uppercase tracking-[0.08em] text-white/40"
                        >
                          Off
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {remainingEmployees > 0 && (
                <div className="mt-3 rounded-[16px] border border-dashed border-white/10 bg-white/[0.02] px-4 py-3 text-center">
                  <p className="text-[9px] font-black uppercase tracking-[0.14em] text-white/35">
                    +{remainingEmployees} more employees
                  </p>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

function HeaderMetric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-3">
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-1 text-[24px] font-black text-white">{value}</p>
    </div>
  )
}

function StationMetric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-black/20 p-3">
      <p className="text-[7px] font-black uppercase tracking-[0.14em] text-white/35">
        {label}
      </p>

      <p className="mt-1 text-[20px] font-black text-white">{value}</p>
    </div>
  )
}