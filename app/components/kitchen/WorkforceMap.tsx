"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import { CENTRAL_KITCHEN_WORKFORCE } from "./kitchen-workforce-data"

import {
  WorkforceStatus,
  getWorkforceRuntimeState,
  updateEmployeeRuntimeStatus,
} from "@/app/ai/workforce-runtime-store"

type WorkforceMapProps = {
  selectedEmployeeId?: string | null
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
  total: number
): "STABLE" | "WATCH" | "OVERLOADED" {
  const ratio = active / total

  if (ratio <= 0.45) {
    return "OVERLOADED"
  }

  if (ratio <= 0.7) {
    return "WATCH"
  }

  return "STABLE"
}

function getPressureStyle(
  level: "STABLE" | "WATCH" | "OVERLOADED"
) {
  if (level === "OVERLOADED") {
    return "border-red-400/25 bg-red-500/10 text-red-300"
  }

  if (level === "WATCH") {
    return "border-amber-300/25 bg-amber-300/10 text-amber-200"
  }

  return "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
}

export default function WorkforceMap({
  selectedEmployeeId,
}: WorkforceMapProps) {
  const [statusMap, setStatusMap] =
    useState<Record<string, WorkforceStatus>>({})

  useEffect(() => {
    const state = getWorkforceRuntimeState()

    const nextMap: Record<string, WorkforceStatus> = {}

    state.forEach((employee) => {
      nextMap[employee.id] = employee.status
    })

    setStatusMap(nextMap)
  }, [])

  function getStatus(
    employeeId: string
  ): WorkforceStatus {
    return statusMap[employeeId] || "OFFLINE"
  }

  function updateEmployeeStatus(
    employeeId: string,
    nextStatus: WorkforceStatus
  ) {
    updateEmployeeRuntimeStatus(
      employeeId,
      nextStatus
    )

    setStatusMap((current) => ({
      ...current,
      [employeeId]: nextStatus,
    }))
  }

  const workforce = useMemo(() => {
    return CENTRAL_KITCHEN_WORKFORCE.map(
      (station) => ({
        ...station,

        employees: station.employees.map(
          (employee) => ({
            ...employee,
            status: getStatus(employee.id),
          })
        ),
      })
    )
  }, [statusMap])

  const totalEmployees = workforce.reduce(
    (total, station) =>
      total + station.employees.length,
    0
  )

  const totalCapacity = workforce.reduce(
    (total, station) =>
      total + station.dailyCapacity,
    0
  )

  const activeEmployees = workforce.reduce(
    (total, station) =>
      total +
      station.employees.filter(
        (employee) =>
          employee.status === "ACTIVE"
      ).length,
    0
  )

  return (
    <section className="rounded-[28px] border border-[#CCFF33]/15 bg-white/[0.03] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.30)] md:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#CCFF33]">
            Central Kitchen Workforce Runtime
          </p>

          <h2 className="mt-2 text-[32px] font-black tracking-[-0.07em] text-white">
            Workforce
            <span className="block text-[#CCFF33]">
              Density Grid
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-[12px] leading-5 text-white/45">
            Compact workforce runtime board for
            operational balancing, staffing pressure,
            and live shift management.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-3">
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
              Employees
            </p>

            <p className="mt-1 text-[24px] font-black text-white">
              {totalEmployees}
            </p>
          </div>

          <div className="rounded-[18px] border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
              Active
            </p>

            <p className="mt-1 text-[24px] font-black text-emerald-300">
              {activeEmployees}
            </p>
          </div>

          <div className="rounded-[18px] border border-[#CCFF33]/20 bg-[#CCFF33]/10 px-4 py-3">
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
              Capacity
            </p>

            <p className="mt-1 text-[24px] font-black text-[#CCFF33]">
              {totalCapacity}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {workforce.map((station) => {
          const activeCount =
            station.employees.filter(
              (employee) =>
                employee.status === "ACTIVE"
            ).length

          const pressureLevel =
            getPressureLevel(
              activeCount,
              station.employees.length
            )

          const visibleEmployees =
            station.employees.slice(0, 3)

          const remainingEmployees =
            station.employees.length - 3

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
                <div className="rounded-[16px] border border-white/10 bg-black/20 p-3">
                  <p className="text-[7px] font-black uppercase tracking-[0.14em] text-white/35">
                    Team
                  </p>

                  <p className="mt-1 text-[20px] font-black text-white">
                    {station.employees.length}
                  </p>
                </div>

                <div className="rounded-[16px] border border-emerald-400/15 bg-emerald-500/10 p-3">
                  <p className="text-[7px] font-black uppercase tracking-[0.14em] text-white/35">
                    Active
                  </p>

                  <p className="mt-1 text-[20px] font-black text-emerald-300">
                    {activeCount}
                  </p>
                </div>

                <div className="rounded-[16px] border border-white/10 bg-black/20 p-3">
                  <p className="text-[7px] font-black uppercase tracking-[0.14em] text-white/35">
                    Capacity
                  </p>

                  <p className="mt-1 text-[20px] font-black text-white">
                    {station.dailyCapacity}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {visibleEmployees.map((employee) => {
                  const isSelected =
                    employee.id ===
                    selectedEmployeeId

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

                          <span className="truncate">
                            {employee.name}
                          </span>
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
                            updateEmployeeStatus(
                              employee.id,
                              "ACTIVE"
                            )
                          }
                          className="flex-1 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[7px] font-black uppercase tracking-[0.08em] text-emerald-300"
                        >
                          Active
                        </button>

                        <button
                          onClick={() =>
                            updateEmployeeStatus(
                              employee.id,
                              "BREAK"
                            )
                          }
                          className="flex-1 rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-[7px] font-black uppercase tracking-[0.08em] text-amber-200"
                        >
                          Break
                        </button>

                        <button
                          onClick={() =>
                            updateEmployeeStatus(
                              employee.id,
                              "OFFLINE"
                            )
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