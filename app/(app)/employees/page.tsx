"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { RuntimeDish } from "@/app/components/kitchen/kitchen-runtime-data"

import { CENTRAL_KITCHEN_WORKFORCE } from "@/app/components/kitchen/kitchen-workforce-data"

import {
  calculateRuntimeProgress,
  finishStage,
  getEmployeeActiveStages,
  startStage,
} from "@/app/ai/runtime-engine"

import {
  WorkforceStatus,
  WORKFORCE_RUNTIME_EVENT,
  getEmployeeRuntimeStatus,
} from "@/app/ai/workforce-runtime-store"

import {
  PRODUCTION_RUNTIME_EVENT,
  getProductionRuntimeDishes,
  saveProductionRuntimeDishes,
} from "@/app/ai/production-runtime-store"

import { addProductionTimelineEvent } from "@/app/ai/production-timeline-store"

function nowTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getEmployeeLoadStatus(taskCount: number) {
  if (taskCount >= 3) {
    return {
      label: "BUSY",
      color: "border-red-400/35 bg-red-500/15 text-red-200",
    }
  }

  if (taskCount >= 1) {
    return {
      label: "ACTIVE",
      color: "border-emerald-400/35 bg-emerald-500/15 text-emerald-200",
    }
  }

  return {
    label: "IDLE",
    color: "border-white/10 bg-white/[0.04] text-white/45",
  }
}

function getRuntimeMode(status: WorkforceStatus) {
  if (status === "BREAK") {
    return {
      title: "Break Time",
      description: "Employee is currently on scheduled break.",
      color: "border-amber-300/25 bg-amber-300/10 text-amber-200",
    }
  }

  if (status === "OFFLINE") {
    return {
      title: "Offline",
      description: "Employee is currently unavailable for runtime execution.",
      color: "border-white/10 bg-white/[0.04] text-white/45",
    }
  }

  return {
    title: "Runtime Active",
    description: "Employee is active and connected to production runtime.",
    color: "border-emerald-400/25 bg-emerald-500/10 text-emerald-200",
  }
}

export default function EmployeesPage() {
  return (
    <Suspense fallback={<EmployeesLoading />}>
      <EmployeesRuntime />
    </Suspense>
  )
}

function EmployeesRuntime() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const urlEmployeeId = searchParams.get("employeeId")

  const [dishes, setDishes] = useState<RuntimeDish[]>([])
  const [runtimeStatus, setRuntimeStatus] =
    useState<WorkforceStatus>("OFFLINE")

  const allEmployees = CENTRAL_KITCHEN_WORKFORCE.flatMap((station) =>
    station.employees.map((employee) => ({
      id: employee.id,
      name: employee.name,
      station: employee.station,
      role: employee.role,
    }))
  )

  const selectedEmployeeId = urlEmployeeId || allEmployees[0]?.id || ""

  const employee =
    allEmployees.find((item) => item.id === selectedEmployeeId) ||
    allEmployees[0]

  useEffect(() => {
    function syncProductionRuntime() {
      setDishes(getProductionRuntimeDishes())
    }

    syncProductionRuntime()

    window.addEventListener(PRODUCTION_RUNTIME_EVENT, syncProductionRuntime)

    return () => {
      window.removeEventListener(PRODUCTION_RUNTIME_EVENT, syncProductionRuntime)
    }
  }, [])

  useEffect(() => {
    function syncRuntimeStatus() {
      const status = getEmployeeRuntimeStatus(selectedEmployeeId)
      setRuntimeStatus(status)
    }

    syncRuntimeStatus()

    window.addEventListener(WORKFORCE_RUNTIME_EVENT, syncRuntimeStatus)

    return () => {
      window.removeEventListener(WORKFORCE_RUNTIME_EVENT, syncRuntimeStatus)
    }
  }, [selectedEmployeeId])

  const runtimeMode = getRuntimeMode(runtimeStatus)

  const employeeTasks = useMemo(() => {
    return getEmployeeActiveStages(dishes, selectedEmployeeId).filter(
      ({ stage }) => stage.status !== "COMPLETED"
    )
  }, [dishes, selectedEmployeeId])

  const employeesWithStatus = useMemo(() => {
    return allEmployees.map((worker) => {
      const tasks = getEmployeeActiveStages(dishes, worker.id).filter(
        ({ stage }) => stage.status !== "COMPLETED"
      )

      return {
        ...worker,
        taskCount: tasks.length,
        status: getEmployeeLoadStatus(tasks.length),
      }
    })
  }, [allEmployees, dishes])

  function selectEmployee(id: string) {
    router.push(`/employees?employeeId=${id}`)
  }

  function updateDishes(nextDishes: RuntimeDish[]) {
    setDishes(nextDishes)
    saveProductionRuntimeDishes(nextDishes)
  }

  function handleStart(dishId: string, stageId: string) {
    const time = nowTime()

    const currentDish = dishes.find((dish) => dish.id === dishId)
    const currentStage = currentDish?.stages.find((stage) => stage.id === stageId)

    if (currentDish && currentStage && employee) {
      addProductionTimelineEvent({
        time,
        employeeId: employee.id,
        employeeName: employee.name,
        dishId: currentDish.id,
        recipe: currentDish.recipe,
        stage: currentStage.stage,
        action: "STARTED",
      })
    }

    const nextDishes = dishes.map((dish) =>
      dish.id === dishId ? startStage(dish, stageId, time) : dish
    )

    updateDishes(nextDishes)
  }

  function handleEnd(dishId: string, stageId: string) {
    const time = nowTime()

    const currentDish = dishes.find((dish) => dish.id === dishId)
    const currentStage = currentDish?.stages.find((stage) => stage.id === stageId)

    if (currentDish && currentStage && employee) {
      addProductionTimelineEvent({
        time,
        employeeId: employee.id,
        employeeName: employee.name,
        dishId: currentDish.id,
        recipe: currentDish.recipe,
        stage: currentStage.stage,
        action: "COMPLETED",
      })
    }

    const nextDishes = dishes.map((dish) =>
      dish.id === dishId ? finishStage(dish, stageId, time) : dish
    )

    updateDishes(nextDishes)
  }

  const profileStatus = getEmployeeLoadStatus(employeeTasks.length)

  return (
    <main className="g7-page min-h-screen overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-5">
        <section className="rounded-[32px] border border-purple-400/25 bg-white/[0.035] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)] md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.24em] text-purple-400">
                G7 Employees Runtime
              </p>

              <h1 className="mt-3 text-[44px] font-black leading-[0.9] tracking-[-0.07em] text-white md:text-[68px]">
                Workforce
                <span className="block text-purple-400">Runtime OS</span>
              </h1>

              <p className="mt-4 max-w-2xl text-[13px] leading-6 text-slate-300">
                Personal employee execution environment connected to shared
                production runtime.
              </p>
            </div>

            <div
              className={`rounded-[24px] border px-5 py-4 ${runtimeMode.color}`}
            >
              <p className="text-[9px] font-black uppercase tracking-[0.16em]">
                Runtime Mode
              </p>

              <p className="mt-2 text-[28px] font-black tracking-[-0.05em]">
                {runtimeMode.title}
              </p>

              <p className="mt-2 max-w-[280px] text-[12px] leading-5 opacity-70">
                {runtimeMode.description}
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {employeesWithStatus.map((worker) => (
              <button
                key={worker.id}
                onClick={() => selectEmployee(worker.id)}
                className={`rounded-[26px] border p-4 text-left transition duration-300 ${
                  selectedEmployeeId === worker.id
                    ? "border-purple-400/45 bg-purple-500/15"
                    : "border-white/10 bg-black/20 hover:border-purple-400/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[15px] font-black text-white">
                      {worker.name}
                    </p>

                    <p className="mt-1 text-[11px] font-bold text-white/40">
                      {worker.station}
                    </p>
                  </div>

                  <div
                    className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] ${worker.status.color}`}
                  >
                    {worker.status.label}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.14em] text-white/35">
                      Tasks
                    </p>

                    <p className="mt-1 text-[26px] font-black text-white">
                      {worker.taskCount}
                    </p>
                  </div>

                  <div className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-white/40">
                    {worker.role}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {runtimeStatus === "OFFLINE" && (
          <section className="mt-4 rounded-[32px] border border-white/10 bg-black/20 p-10 text-center">
            <p className="text-[80px]">🌙</p>

            <h2 className="mt-3 text-[42px] font-black tracking-[-0.06em] text-white">
              Employee Offline
            </h2>
          </section>
        )}

        {runtimeStatus === "BREAK" && (
          <section className="mt-4 rounded-[32px] border border-amber-300/20 bg-amber-300/10 p-10 text-center">
            <p className="text-[80px]">☕</p>

            <h2 className="mt-3 text-[42px] font-black tracking-[-0.06em] text-amber-200">
              Break Mode
            </h2>
          </section>
        )}

        {runtimeStatus === "ACTIVE" && (
          <section className="mt-4 rounded-[32px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-purple-400">
                  Employee Runtime
                </p>

                <h2 className="mt-2 text-[34px] font-black tracking-[-0.06em] text-white">
                  {employee?.name || "Employee"}
                </h2>

                <p className="mt-2 text-[13px] font-bold text-white/40">
                  {employee?.role} · {employee?.station}
                </p>
              </div>

              <div className="flex gap-3">
                <div
                  className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] ${profileStatus.color}`}
                >
                  {profileStatus.label}
                </div>

                <div className="rounded-full border border-purple-400/25 bg-black/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-purple-300">
                  {employeeTasks.length} Active Tasks
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {employeeTasks.length === 0 ? (
                <div className="rounded-[28px] border border-white/10 bg-black/20 p-8 text-center">
                  <p className="text-[28px] font-black tracking-[-0.06em] text-white">
                    No Active Tasks
                  </p>

                  <p className="mt-2 text-[13px] font-bold text-white/40">
                    This employee currently has no active production stages.
                  </p>
                </div>
              ) : (
                employeeTasks.map(({ dish, stage }) => {
                  const progress = calculateRuntimeProgress(dish)

                  const startDisabled =
                    stage.status === "ACTIVE" || stage.status === "COMPLETED"

                  const endDisabled = stage.status !== "ACTIVE"

                  return (
                    <article
                      key={`${dish.id}-${stage.id}`}
                      className="rounded-[30px] border border-purple-400/20 bg-black/20 p-5"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-300/80">
                            {dish.id} · {dish.priority} Priority ·{" "}
                            {dish.portions} Portions
                          </p>

                          <h3 className="mt-2 text-[34px] font-black tracking-[-0.06em] text-white">
                            {dish.recipe}
                          </h3>

                          <p className="mt-2 text-[14px] font-bold text-white/45">
                            Stage:
                            <span className="ml-2 text-purple-300">
                              {stage.stage}
                            </span>
                          </p>
                        </div>

                        <div className="rounded-full border border-purple-400/25 bg-purple-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-purple-300">
                          {stage.status}
                        </div>
                      </div>

                      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-purple-400 transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleStart(dish.id, stage.id)}
                          disabled={startDisabled}
                          className="min-h-[92px] rounded-[26px] border border-emerald-400/40 bg-emerald-500/15 text-[24px] font-black uppercase tracking-[0.12em] text-emerald-300 transition disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.025] disabled:text-white/20"
                        >
                          Start
                        </button>

                        <button
                          onClick={() => handleEnd(dish.id, stage.id)}
                          disabled={endDisabled}
                          className="min-h-[92px] rounded-[26px] border border-red-400/40 bg-red-500/15 text-[24px] font-black uppercase tracking-[0.12em] text-red-200 transition disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.025] disabled:text-white/20"
                        >
                          End
                        </button>
                      </div>
                    </article>
                  )
                })
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function EmployeesLoading() {
  return (
    <main className="g7-page min-h-screen">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-5">
        <section className="rounded-[32px] border border-purple-400/25 bg-white/[0.035] p-6">
          <p className="text-[12px] font-black uppercase tracking-[0.22em] text-purple-400">
            Loading Employees Runtime...
          </p>
        </section>
      </div>
    </main>
  )
}