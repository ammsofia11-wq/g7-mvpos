"use client"

import { useEffect, useState } from "react"

import {
  PRODUCTION_LOGS,
  PRODUCTION_TASKS,
  ProductionStatus,
  updateTaskStatus,
  requestHeadChefCheck,
  approveTask,
  getCompletedTasks,
  getActiveTasks,
} from "@/app/ai/g7-production-engine"

const statusFlow: ProductionStatus[] = [
  "ASSIGNED",
  "INGREDIENT_COLLECTION",
  "PREP_STARTED",
  "COOKING",
  "READY",
  "HEAD_CHEF_CHECK",
  "APPROVED",
  "STORED",
  "PACKAGING_READY",
]

export default function StaffPage() {
  const [selectedTaskId, setSelectedTaskId] = useState(
    PRODUCTION_TASKS[0]?.id
  )

  const [, setRefresh] = useState(0)

  const selectedTask =
    PRODUCTION_TASKS.find((task) => task.id === selectedTaskId) ??
    PRODUCTION_TASKS[0]

  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((value) => value + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function triggerRefresh() {
    setRefresh((value) => value + 1)
  }

  function moveTask(status: ProductionStatus) {
    updateTaskStatus(selectedTask.id, status)
    triggerRefresh()
  }

  function sendToHeadChefCheck() {
    requestHeadChefCheck(selectedTask.id)
    triggerRefresh()
  }

  function approveCurrentTask() {
    approveTask(
      selectedTask.id,
      "Head Chef",
      "Taste, texture, temperature and presentation approved."
    )

    triggerRefresh()
  }

  function moveNext() {
    if (selectedTask.status === "READY") {
      sendToHeadChefCheck()
      return
    }

    if (selectedTask.status === "HEAD_CHEF_CHECK") {
      approveCurrentTask()
      return
    }

    const currentIndex = statusFlow.indexOf(selectedTask.status)

    const nextStatus =
      statusFlow[Math.min(currentIndex + 1, statusFlow.length - 1)]

    updateTaskStatus(selectedTask.id, nextStatus)

    triggerRefresh()
  }

  const completedTasks = getCompletedTasks("Ahmed").length
  const activeTasks = getActiveTasks("Ahmed").length

  return (
    <main className="g7-page min-h-screen overflow-x-hidden">
      <div className="mx-auto w-full max-w-[980px] px-4 py-4">

        <section className="rounded-[24px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(255,255,255,0.025))] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.22)]">

          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
            G7 Kitchen Workforce OS
          </p>

          <h1 className="mt-2 text-[32px] font-black leading-[0.95] tracking-[-0.05em] text-white">
            Staff Task
            <span className="block text-cyan-300">
              Execution App
            </span>
          </h1>

          <p className="mt-3 max-w-xl text-[12px] leading-5 text-slate-300">
            Workforce execution system with live kitchen workflow tracking,
            SOP execution, production timing, and head chef approval control.
          </p>

        </section>

        <section className="mt-3 grid gap-3 sm:grid-cols-4">
          <StatCard label="Worker" value="Ahmed" />
          <StatCard label="Station" value={selectedTask.station} />
          <StatCard label="Active Tasks" value={activeTasks} />
          <StatCard label="Completed" value={completedTasks} />
        </section>

        <section className="mt-3 grid gap-4 lg:grid-cols-[330px_1fr]">

          <div className="space-y-3">

            <Panel title="Today Tasks">

              <div className="space-y-2">

                {PRODUCTION_TASKS.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTaskId(task.id)}
                    className={`w-full rounded-[18px] border p-3 text-left transition ${
                      selectedTask.id === task.id
                        ? "border-cyan-300/50 bg-cyan-300/[0.10]"
                        : "border-white/10 bg-black/20 hover:border-cyan-300/25"
                    }`}
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-[13px] font-black text-white">
                          {task.recipe}
                        </p>

                        <p className="mt-1 text-[10px] font-bold text-slate-500">
                          {task.portions} portions • {task.estimatedMinutes} min
                        </p>

                        <p className="mt-1 text-[9px] font-bold text-slate-600">
                          Assigned to {task.assignedWorker}
                        </p>

                      </div>

                      <PriorityBadge priority={task.priority} />

                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">

                      <StatusBadge status={task.status} />

                      {task.startedAt && (
                        <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-slate-400">
                          LIVE
                        </span>
                      )}

                    </div>

                  </button>
                ))}

              </div>

            </Panel>

            <Panel title="Activity Log">

              <div className="space-y-2">

                {PRODUCTION_LOGS.length === 0 ? (
                  <p className="rounded-[16px] bg-black/20 p-3 text-[11px] leading-5 text-slate-400">
                    No actions recorded yet.
                  </p>
                ) : (
                  PRODUCTION_LOGS.slice(0, 8).map((item, index) => (
                    <p
                      key={index}
                      className="rounded-[16px] bg-black/20 p-3 text-[10px] leading-5 text-slate-400"
                    >
                      {item.timestamp} — {item.recipe} — {item.action}
                    </p>
                  ))
                )}

              </div>

            </Panel>

          </div>

          <div className="space-y-3">

            <section className="rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.06] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.22)]">

              <div className="flex flex-wrap items-start justify-between gap-3">

                <div>

                  <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Active Task
                  </p>

                  <h2 className="mt-2 text-[30px] font-black leading-none tracking-[-0.05em] text-white">
                    {selectedTask.recipe}
                  </h2>

                  <p className="mt-2 text-[12px] font-bold text-slate-400">
                    {selectedTask.station} • {selectedTask.portions} portions
                  </p>

                </div>

                <PriorityBadge priority={selectedTask.priority} />

              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">

                <MiniMetric
                  label="Estimated"
                  value={`${selectedTask.estimatedMinutes} min`}
                />

                <MiniMetric
                  label="Last Action"
                  value={selectedTask.lastActionAt ?? "--"}
                />

                <MiniMetric
                  label="Head Chef"
                  value={selectedTask.checkedBy ?? "--"}
                />

                <MiniMetric
                  label="Approved"
                  value={selectedTask.approvedAt ?? "--"}
                />

              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">

                <ActionButton
                  label="Collect Ingredients"
                  onClick={() =>
                    moveTask("INGREDIENT_COLLECTION")
                  }
                />

                <ActionButton
                  label="Start Preparation"
                  onClick={() =>
                    moveTask("PREP_STARTED")
                  }
                />

                <ActionButton
                  label="Start Cooking"
                  onClick={() =>
                    moveTask("COOKING")
                  }
                />

                <ActionButton
                  label="Move Next Step"
                  onClick={moveNext}
                  primary
                />

              </div>

              {selectedTask.status === "HEAD_CHEF_CHECK" && (
                <div className="mt-4 rounded-[18px] border border-amber-400/20 bg-amber-400/10 p-4">

                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-300">
                    Waiting For Approval
                  </p>

                  <p className="mt-2 text-[12px] leading-5 text-slate-300">
                    Head Chef quality control required before storage
                    and packaging.
                  </p>

                </div>
              )}

              {selectedTask.status === "APPROVED" && (
                <div className="mt-4 rounded-[18px] border border-emerald-400/20 bg-emerald-400/10 p-4">

                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300">
                    Quality Approved
                  </p>

                  <p className="mt-2 text-[12px] leading-5 text-slate-300">
                    {selectedTask.qualityNotes}
                  </p>

                </div>
              )}

              <div className="mt-4">

                <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Task Progress
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  {statusFlow.map((step, index) => {
                    const active =
                      statusFlow.indexOf(selectedTask.status) >= index

                    return (
                      <div
                        key={step}
                        className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.12em] ${
                          active
                            ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300"
                            : "border-white/10 bg-black/20 text-slate-500"
                        }`}
                      >
                        {formatStatus(step)}
                      </div>
                    )
                  })}

                </div>

              </div>

            </section>

          </div>

        </section>

      </div>
    </main>
  )
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ")
}

function StatCard({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.035] p-3">

      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-[20px] font-black leading-none text-white">
        {value}
      </p>

    </div>
  )
}

function MiniMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-black/20 p-3">

      <p className="text-[8px] font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-[12px] font-black text-white">
        {value}
      </p>

    </div>
  )
}

function Panel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-3">

      <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
        {title}
      </p>

      <div className="mt-3">
        {children}
      </div>

    </div>
  )
}

function ActionButton({
  label,
  onClick,
  primary,
}: {
  label: string
  onClick: () => void
  primary?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-3 text-[11px] font-black transition ${
        primary
          ? "bg-cyan-300 text-[#001018] hover:scale-[1.01]"
          : "border border-cyan-300/25 bg-white/[0.04] text-cyan-300 hover:bg-cyan-300 hover:text-[#001018]"
      }`}
    >
      {label}
    </button>
  )
}

function PriorityBadge({
  priority,
}: {
  priority: string
}) {
  const active =
    priority === "URGENT"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : priority === "HIGH"
      ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
      : priority === "MEDIUM"
      ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300"
      : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${active}`}
    >
      {priority}
    </span>
  )
}

function StatusBadge({
  status,
}: {
  status: string
}) {
  const active =
    status === "APPROVED" ||
    status === "PACKAGING_READY" ||
    status === "STORED"
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
      : status === "HEAD_CHEF_CHECK"
      ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
      : status === "COOKING" ||
        status === "PREP_STARTED"
      ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300"
      : "border-white/10 bg-white/[0.04] text-slate-300"

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] ${active}`}
    >
      {formatStatus(status)}
    </span>
  )
}