"use client"

import { useEffect, useMemo, useState } from "react"

type ExecutionStep = {
  id: string
  title: string
  station: string
  duration: number
  completed: boolean
  qcRequired?: boolean
}

type KitchenExecutionPanelProps = {
  recipe: string
  worker: string
}

export default function KitchenExecutionPanel({
  recipe,
  worker,
}: KitchenExecutionPanelProps) {
  const [steps, setSteps] = useState<ExecutionStep[]>([
    {
      id: "1",
      title: "Prepare ingredients and confirm quantities",
      station: "Prep Station",
      duration: 8,
      completed: false,
    },
    {
      id: "2",
      title: "Cook protein to approved internal temperature",
      station: "Hot Section",
      duration: 14,
      completed: false,
      qcRequired: true,
    },
    {
      id: "3",
      title: "Portion and plating execution",
      station: "Assembly",
      duration: 6,
      completed: false,
    },
    {
      id: "4",
      title: "Final quality approval and holding",
      station: "Pass Counter",
      duration: 5,
      completed: false,
      qcRequired: true,
    },
  ])

  const [started, setStarted] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const activeStepIndex = steps.findIndex(
    (step) => !step.completed
  )

  const activeStep =
    activeStepIndex >= 0
      ? steps[activeStepIndex]
      : null

  useEffect(() => {
    if (!started) return

    const timer = setInterval(() => {
      setElapsedSeconds((current) => current + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [started])

  const completedCount = useMemo(() => {
    return steps.filter((step) => step.completed).length
  }, [steps])

  const progress =
    Math.round((completedCount / steps.length) * 100)

  function startExecution() {
    setStarted(true)
  }

  function completeCurrentStep() {
    if (!activeStep) return

    setSteps((currentSteps) =>
      currentSteps.map((step) => {
        if (step.id !== activeStep.id) {
          return step
        }

        return {
          ...step,
          completed: true,
        }
      })
    )
  }

  function resetExecution() {
    setStarted(false)
    setElapsedSeconds(0)

    setSteps((currentSteps) =>
      currentSteps.map((step) => ({
        ...step,
        completed: false,
      }))
    )
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <div className="rounded-[28px] border border-emerald-400/20 bg-[#050912] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-[24px] border border-emerald-400/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.10),rgba(255,255,255,0.02))] p-5">
        <div>
          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-emerald-300">
            Live Kitchen Execution
          </p>

          <h2 className="mt-2 text-[32px] font-black leading-[0.95] tracking-[-0.05em] text-white">
            {recipe}
          </h2>

          <p className="mt-3 text-[12px] text-slate-300">
            Active worker: {worker}
          </p>
        </div>

        <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3">
          <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">
            Kitchen Timer
          </p>

          <p className="mt-2 text-[28px] font-black text-emerald-300">
            {formatTime(elapsedSeconds)}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <StatCard label="Total Steps" value={steps.length} />

        <StatCard
          label="Completed"
          value={completedCount}
        />

        <StatCard
          label="Remaining"
          value={steps.length - completedCount}
        />

        <StatCard
          label="Execution Progress"
          value={`${progress}%`}
        />
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/30">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_320px]">
        <section className="space-y-3">
          {steps.map((step, index) => {
            const isActive =
              activeStep?.id === step.id

            return (
              <div
                key={step.id}
                className={`rounded-[22px] border p-4 transition-all ${
                  isActive
                    ? "border-emerald-400/40 bg-emerald-400/[0.08] shadow-[0_0_30px_rgba(16,185,129,0.12)]"
                    : "border-white/10 bg-black/20"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-2xl text-[12px] font-black ${
                        step.completed
                          ? "bg-emerald-400 text-[#04130f]"
                          : isActive
                          ? "bg-emerald-400 text-[#04130f]"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="text-[15px] font-black text-white">
                        {step.title}
                      </h3>

                      <p className="mt-1 text-[11px] text-slate-400">
                        {step.station}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-500">
                      Duration
                    </p>

                    <p className="mt-1 text-[12px] font-black text-white">
                      {step.duration} min
                    </p>
                  </div>
                </div>

                {step.qcRequired && (
                  <div className="mt-3 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-amber-300">
                    QC Required
                  </div>
                )}

                {step.completed && (
                  <div className="mt-3 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-emerald-300">
                    Completed
                  </div>
                )}
              </div>
            )
          })}
        </section>

        <aside className="space-y-4">
          <Panel title="Current Action">
            {activeStep ? (
              <div>
                <p className="text-[15px] font-black text-white">
                  {activeStep.title}
                </p>

                <p className="mt-2 text-[11px] leading-5 text-slate-300">
                  Execute current kitchen instruction before moving
                  to next production phase.
                </p>
              </div>
            ) : (
              <p className="text-[12px] text-emerald-300">
                All kitchen execution steps completed.
              </p>
            )}
          </Panel>

          <Panel title="Execution Controls">
            <div className="grid gap-2">
              {!started && (
                <button
                  onClick={startExecution}
                  className="rounded-[16px] bg-emerald-400 px-4 py-3 text-[11px] font-black text-[#04130f]"
                >
                  Start Kitchen Execution
                </button>
              )}

              {started && activeStep && (
                <button
                  onClick={completeCurrentStep}
                  className="rounded-[16px] bg-emerald-400 px-4 py-3 text-[11px] font-black text-[#04130f]"
                >
                  Mark Step Complete
                </button>
              )}

              <button
                onClick={resetExecution}
                className="rounded-[16px] border border-white/10 bg-black/20 px-4 py-3 text-[11px] font-black text-white"
              >
                Reset Execution
              </button>
            </div>
          </Panel>

          <Panel title="Kitchen Status">
            <StatusRow
              label="Recipe"
              value={recipe}
            />

            <StatusRow
              label="Worker"
              value={worker}
            />

            <StatusRow
              label="Progress"
              value={`${progress}%`}
            />

            <StatusRow
              label="Current Station"
              value={activeStep?.station ?? "Completed"}
            />
          </Panel>
        </aside>
      </div>
    </div>
  )
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

      <p className="mt-2 text-[18px] font-black text-white">
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
    <div className="rounded-[20px] border border-white/10 bg-white/[0.035] p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-300">
        {title}
      </p>

      <div className="mt-3">{children}</div>
    </div>
  )
}

function StatusRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between rounded-[14px] bg-black/20 px-3 py-2.5">
      <p className="text-[10px] font-bold text-slate-500">
        {label}
      </p>

      <p className="max-w-[140px] truncate text-right text-[11px] font-black text-white">
        {value}
      </p>
    </div>
  )
}