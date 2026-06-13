"use client"

import { useEffect, useMemo, useState } from "react"

import { useRuntime } from "@/app/components/kitchen/runtime-context"

import {
  getRecommendedRuntimeActionLabel,
  getRuntimeEngineDecisions,
  getRuntimeEngineRecommendedFocus,
  getRuntimeStageCalculatedRisk,
  type RuntimeRiskLevel,
  type RuntimeStage,
} from "@/app/components/kitchen/runtime-engine-data"

export type CommandTarget =
  | "overview"
  | "runtime"
  | "alerts"
  | "workforce"
  | "production"
  | "assistant"

type RuntimeCommandTone = "NORMAL" | "AI" | "CRITICAL"

type RuntimeCommand = {
  id: string
  label: string
  helper: string
  target: CommandTarget
  tone: RuntimeCommandTone
  shortcut?: string
  run?: () => void
}

const toneStyles: Record<RuntimeCommandTone, string> = {
  NORMAL: "border-white/10 bg-white/[0.035] text-white",
  AI: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  CRITICAL: "border-red-400/25 bg-red-400/10 text-red-300",
}

const riskStyles: Record<RuntimeRiskLevel, string> = {
  LOW: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  MEDIUM: "border-yellow-300/25 bg-yellow-300/10 text-yellow-200",
  HIGH: "border-orange-400/25 bg-orange-400/10 text-orange-300",
  CRITICAL: "border-red-400/25 bg-red-400/10 text-red-300",
}

function getCommandToneFromRisk(risk: RuntimeRiskLevel): RuntimeCommandTone {
  if (risk === "CRITICAL") return "CRITICAL"
  if (risk === "HIGH") return "CRITICAL"
  if (risk === "MEDIUM") return "AI"

  return "NORMAL"
}

function getHighestPriorityStage(stages: RuntimeStage[]) {
  const scored = stages
    .map((stage) => {
      const risk = getRuntimeStageCalculatedRisk(stage)

      let score = 1

      if (risk === "CRITICAL") score = 4
      if (risk === "HIGH") score = 3
      if (risk === "MEDIUM") score = 2

      if (stage.status === "BLOCKED") score += 2
      if (stage.status === "DELAYED") score += 1

      return {
        stage,
        risk,
        score,
      }
    })
    .sort((a, b) => b.score - a.score)

  return scored[0]
}

function getPrimaryRuntimeTarget(risk: RuntimeRiskLevel): CommandTarget {
  if (risk === "CRITICAL") return "alerts"
  if (risk === "HIGH") return "workforce"
  if (risk === "MEDIUM") return "runtime"

  return "overview"
}

export default function RuntimeCommandBar({
  onSelect,
}: {
  onSelect: (target: CommandTarget) => void
}) {
  const { runtime, dispatch } = useRuntime()

  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const runtimeRisk = runtime.summary.aiSupervisorStatus
  const recommendedFocus = getRuntimeEngineRecommendedFocus(runtime.liveStages)
  const decisions = getRuntimeEngineDecisions(runtime.liveStages)
  const priorityStage = getHighestPriorityStage(runtime.liveStages)

  const commands = useMemo<RuntimeCommand[]>(() => {
    const baseCommands: RuntimeCommand[] = [
      {
        id: "cmd-overview",
        label: "Open Overview",
        helper: "Return to command summary",
        target: "overview",
        tone: "NORMAL",
        shortcut: "1",
      },
      {
        id: "cmd-runtime",
        label: "Open Runtime Engine",
        helper: "Review live execution pressure",
        target: "runtime",
        tone: "AI",
        shortcut: "2",
      },
      {
        id: "cmd-alerts",
        label: "Open Escalations",
        helper: "Handle blocked stages and AI alerts",
        target: "alerts",
        tone: runtimeRisk === "CRITICAL" ? "CRITICAL" : "AI",
        shortcut: "3",
      },
      {
        id: "cmd-workforce",
        label: "Open Workforce",
        helper: "Check people map and station coverage",
        target: "workforce",
        tone: runtimeRisk === "HIGH" ? "CRITICAL" : "AI",
        shortcut: "4",
      },
      {
        id: "cmd-production",
        label: "Open Production Control",
        helper: "Control live floor execution",
        target: "production",
        tone: "NORMAL",
        shortcut: "5",
      },
      {
        id: "cmd-assistant",
        label: "Open Voice Assistant",
        helper: "Review voice runtime and timeline",
        target: "assistant",
        tone: "AI",
        shortcut: "6",
      },
    ]

    const dynamicCommands: RuntimeCommand[] = []

    if (priorityStage) {
      const stage = priorityStage.stage
      const stageRisk = priorityStage.risk
      const tone = getCommandToneFromRisk(stageRisk)

      dynamicCommands.push({
        id: `cmd-focus-${stage.id}`,
        label: `Focus ${stage.name}`,
        helper: `${stage.station} · ${getRecommendedRuntimeActionLabel(stage)}`,
        target: getPrimaryRuntimeTarget(stageRisk),
        tone,
        shortcut: "AI",
      })

      if (stage.status !== "COMPLETED" && stage.status !== "BLOCKED") {
        dynamicCommands.push({
          id: `cmd-block-${stage.id}`,
          label: `Block ${stage.name}`,
          helper: "Hold this stage before pressure spreads downstream",
          target: "alerts",
          tone: "CRITICAL",
          shortcut: "Hold",
          run: () => {
            dispatch({
              type: "BLOCK_STAGE",
              stageId: stage.id,
            })
          },
        })
      }

      if (stage.status === "BLOCKED") {
        dynamicCommands.push({
          id: `cmd-unblock-${stage.id}`,
          label: `Unblock ${stage.name}`,
          helper: "Release blocked stage back to active runtime flow",
          target: "runtime",
          tone: "AI",
          shortcut: "Release",
          run: () => {
            dispatch({
              type: "UNBLOCK_STAGE",
              stageId: stage.id,
            })
          },
        })
      }

      if (stage.status !== "COMPLETED") {
        dynamicCommands.push({
          id: `cmd-complete-${stage.id}`,
          label: `Complete ${stage.name}`,
          helper: "Mark the highest priority stage as completed",
          target: "production",
          tone: "NORMAL",
          shortcut: "Done",
          run: () => {
            dispatch({
              type: "COMPLETE_STAGE",
              stageId: stage.id,
            })
          },
        })
      }
    }

    if (decisions.length > 0) {
      const topDecision = decisions[0]

      dynamicCommands.push({
        id: `cmd-decision-${topDecision.id}`,
        label: topDecision.title,
        helper: topDecision.body,
        target: getPrimaryRuntimeTarget(topDecision.risk),
        tone: getCommandToneFromRisk(topDecision.risk),
        shortcut: "Top",
      })
    }

    dynamicCommands.push({
      id: "cmd-reset-runtime",
      label: "Reset Runtime Session",
      helper: "Restart live kitchen runtime state from the initial production plan",
      target: "runtime",
      tone: "NORMAL",
      shortcut: "Reset",
      run: () => {
        dispatch({
          type: "RESET_RUNTIME",
        })
      },
    })

    return [...dynamicCommands, ...baseCommands]
  }, [decisions, dispatch, priorityStage, runtimeRisk])

  const filteredCommands = commands.filter((command) => {
    const searchText =
      `${command.label} ${command.helper} ${command.target}`.toLowerCase()

    return searchText.includes(query.toLowerCase())
  })

  function runCommand(command: RuntimeCommand) {
    command.run?.()
    onSelect(command.target)
    setQuery("")
    setIsOpen(false)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isCommandKey = event.ctrlKey || event.metaKey

      if (isCommandKey && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setIsOpen((current) => !current)
      }

      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-black/25 px-4 py-3 text-left transition-all duration-200 hover:border-[#CCFF33]/30 hover:bg-[#CCFF33]/10"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
              Live Command Bar
            </p>

            <span
              className={`rounded-full border px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] ${riskStyles[runtimeRisk]}`}
            >
              {runtimeRisk}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-white/35">
              {runtime.runtimePulse}
            </span>
          </div>

          <p className="mt-1 truncate text-[13px] font-black text-white">
            {recommendedFocus}
          </p>
        </div>

        <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/45">
          Ctrl K
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-40 rounded-[28px] border border-[#CCFF33]/20 bg-[#07100f]/95 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type: runtime, alerts, workforce, production, block, reset..."
            className="w-full rounded-[18px] border border-white/10 bg-black/35 px-4 py-3 text-[13px] font-bold text-white outline-none placeholder:text-white/25 focus:border-[#CCFF33]/35"
          />

          <div className="mt-3 grid grid-cols-3 gap-2">
            <CommandMetric label="Risk" value={runtimeRisk} />
            <CommandMetric label="Stages" value={runtime.liveStages.length} />
            <CommandMetric label="Actions" value={decisions.length} />
          </div>

          <div className="mt-3 max-h-[360px] space-y-2 overflow-y-auto pr-1">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command) => (
                <button
                  key={command.id}
                  onClick={() => runCommand(command)}
                  className={`w-full rounded-[20px] border px-4 py-3 text-left transition-all duration-200 hover:scale-[1.01] ${toneStyles[command.tone]}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-black text-white">
                        {command.label}
                      </p>

                      <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-white/45">
                        {command.helper}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
                        {command.target}
                      </p>

                      {command.shortcut && (
                        <p className="mt-1 text-[8px] font-black uppercase tracking-[0.12em] text-[#CCFF33]">
                          {command.shortcut}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-[12px] font-bold text-white/45">
                  No matching command found.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function CommandMetric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-black/25 px-3 py-2 text-right">
      <p className="text-[7px] font-black uppercase tracking-[0.16em] text-white/35">
        {label}
      </p>

      <p className="mt-1 truncate text-[13px] font-black text-white">
        {value}
      </p>
    </div>
  )
}