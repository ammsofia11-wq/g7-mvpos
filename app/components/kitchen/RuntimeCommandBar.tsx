"use client"

import { useState } from "react"

type CommandTarget =
  | "overview"
  | "runtime"
  | "alerts"
  | "workforce"
  | "production"
  | "assistant"

type RuntimeCommand = {
  id: string
  label: string
  helper: string
  target: CommandTarget
  tone: "NORMAL" | "AI" | "CRITICAL"
}

const runtimeCommands: RuntimeCommand[] = [
  {
    id: "cmd-overview",
    label: "Open Overview",
    helper: "Return to command summary",
    target: "overview",
    tone: "NORMAL",
  },
  {
    id: "cmd-runtime",
    label: "Open Runtime Engine",
    helper: "Review live execution pressure",
    target: "runtime",
    tone: "AI",
  },
  {
    id: "cmd-alerts",
    label: "Open Escalations",
    helper: "Handle blocked stages and AI alerts",
    target: "alerts",
    tone: "CRITICAL",
  },
  {
    id: "cmd-workforce",
    label: "Open Workforce",
    helper: "Check people map and station coverage",
    target: "workforce",
    tone: "AI",
  },
  {
    id: "cmd-production",
    label: "Open Production Control",
    helper: "Control live floor execution",
    target: "production",
    tone: "NORMAL",
  },
  {
    id: "cmd-assistant",
    label: "Open Voice Assistant",
    helper: "Review voice runtime and timeline",
    target: "assistant",
    tone: "AI",
  },
]

const toneStyles: Record<RuntimeCommand["tone"], string> = {
  NORMAL: "border-white/10 bg-white/[0.035] text-white",
  AI: "border-[#CCFF33]/20 bg-[#CCFF33]/10 text-[#CCFF33]",
  CRITICAL: "border-red-400/25 bg-red-400/10 text-red-300",
}

export default function RuntimeCommandBar({
  onSelect,
}: {
  onSelect: (target: CommandTarget) => void
}) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredCommands = runtimeCommands.filter((command) => {
    const searchText = `${command.label} ${command.helper} ${command.target}`.toLowerCase()

    return searchText.includes(query.toLowerCase())
  })

  function runCommand(target: CommandTarget) {
    onSelect(target)
    setQuery("")
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-black/25 px-4 py-3 text-left transition-all duration-200 hover:border-[#CCFF33]/30 hover:bg-[#CCFF33]/10"
      >
        <div>
          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#CCFF33]">
            Live Command Bar
          </p>

          <p className="mt-1 text-[13px] font-black text-white">
            Search action, jump workspace, or run AI operation
          </p>
        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/45">
          Ctrl K
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-40 rounded-[28px] border border-[#CCFF33]/20 bg-[#07100f]/95 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type: runtime, alerts, workforce, production..."
            className="w-full rounded-[18px] border border-white/10 bg-black/35 px-4 py-3 text-[13px] font-bold text-white outline-none placeholder:text-white/25 focus:border-[#CCFF33]/35"
          />

          <div className="mt-3 max-h-[320px] space-y-2 overflow-y-auto pr-1">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command) => (
                <button
                  key={command.id}
                  onClick={() => runCommand(command.target)}
                  className={`w-full rounded-[20px] border px-4 py-3 text-left transition-all duration-200 hover:scale-[1.01] ${toneStyles[command.tone]}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[13px] font-black text-white">
                        {command.label}
                      </p>

                      <p className="mt-1 text-[10px] leading-4 text-white/45">
                        {command.helper}
                      </p>
                    </div>

                    <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/35">
                      {command.target}
                    </p>
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