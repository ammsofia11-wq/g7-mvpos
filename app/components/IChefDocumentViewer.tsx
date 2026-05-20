"use client"

import { useEffect, useMemo, useState } from "react"

import type { IChefDocument } from "@/app/ai/g7-ichef-documentation-engine"

import KitchenExecutionPanel from "@/app/components/KitchenExecutionPanel"

type IChefDocumentViewerProps = {
  document: IChefDocument | null
  onClose: () => void
  onVoiceCommand?: (command: string) => void
}

type FlattenedStep = {
  sectionTitle: string
  step: string
  sectionIndex: number
  stepIndex: number
}

export default function IChefDocumentViewer({
  document,
  onClose,
  onVoiceCommand,
}: IChefDocumentViewerProps) {
  const [activeStep, setActiveStep] = useState<number>(0)

  useEffect(() => {
    setActiveStep(0)
  }, [document])

  const flattenedSteps = useMemo<FlattenedStep[]>(() => {
    if (!document) return []

    return document.sections.flatMap((section, sectionIndex) =>
      section.content.map((step, stepIndex) => ({
        sectionTitle: section.title,
        step,
        sectionIndex,
        stepIndex,
      }))
    )
  }, [document])

  const currentStep = flattenedSteps[activeStep]

  if (!document) return null

  function runCommand(command: string) {
    onVoiceCommand?.(command)

    if (command === "Start SOP") {
      setActiveStep(0)
    }

    if (command === "Next Step") {
      setActiveStep((current) => {
        if (current >= flattenedSteps.length - 1) {
          return current
        }

        return current + 1
      })
    }

    if (command === "Repeat Step") {
      setActiveStep((current) => current)
    }
  }

  const progressPercentage =
    flattenedSteps.length === 0
      ? 0
      : Math.round(((activeStep + 1) / flattenedSteps.length) * 100)

  const voiceCommands = [
    "Start SOP",
    "Next Step",
    "Repeat Step",
    "Mark Section Complete",
    "Send To Approval",
  ]

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/75 p-4 backdrop-blur-xl">
      <div className="mx-auto min-h-[92vh] w-full max-w-[1120px] rounded-[28px] border border-amber-400/20 bg-[#060912] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <div className="flex flex-wrap items-start justify-between gap-4 rounded-[24px] border border-amber-400/20 bg-[linear-gradient(135deg,rgba(251,191,36,0.10),rgba(255,255,255,0.025))] p-5">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.24em] text-amber-300">
              I-Chef Live SOP Viewer
            </p>

            <h2 className="mt-2 max-w-3xl text-[30px] font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-[42px]">
              {document.title}
            </h2>

            <p className="mt-3 max-w-3xl text-[12px] leading-5 text-slate-300">
              {document.summary}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:border-amber-400/30 hover:bg-amber-400/10"
          >
            Close
          </button>
        </div>

        <div className="mt-4 rounded-[20px] border border-amber-400/20 bg-amber-400/[0.04] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-amber-300">
                Current Execution Step
              </p>

              <h3 className="mt-2 text-[18px] font-black text-white">
                {currentStep?.sectionTitle}
              </h3>

              <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-300">
                {currentStep?.step}
              </p>
            </div>

            <div className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-3">
              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">
                SOP Progress
              </p>

              <p className="mt-1 text-[20px] font-black text-amber-300">
                {activeStep + 1}/{flattenedSteps.length}
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                {progressPercentage}% Completed
              </p>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/30">
            <div
              className="h-full rounded-full bg-amber-300 transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-4">
          <KitchenExecutionPanel
            recipe={document.linkedRecipe}
            worker="Kitchen Operator A"
          />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
          <section className="space-y-4">
            <div className="grid gap-3 md:grid-cols-4">
              <InfoTile label="Type" value={document.type} />
              <InfoTile label="Recipe" value={document.linkedRecipe} />
              <InfoTile label="Version" value={document.version} />
              <InfoTile label="Status" value={document.status} />
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
              <p className="text-[8px] font-black uppercase tracking-[0.24em] text-amber-300">
                SOP Sections
              </p>

              <div className="mt-4 space-y-3">
                {document.sections.map((section, sectionIndex) => (
                  <div
                    key={section.title}
                    className="rounded-[20px] border border-white/10 bg-black/25 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-[12px] font-black text-amber-300">
                        {sectionIndex + 1}
                      </div>

                      <h3 className="text-[17px] font-black text-white">
                        {section.title}
                      </h3>
                    </div>

                    <div className="mt-4 space-y-2">
                      {section.content.map((step, stepIndex) => {
                        const flatIndex = flattenedSteps.findIndex(
                          (item) =>
                            item.sectionIndex === sectionIndex &&
                            item.stepIndex === stepIndex
                        )

                        const isActive = flatIndex === activeStep

                        return (
                          <div
                            key={`${section.title}-${step}`}
                            className={`flex gap-3 rounded-[16px] border p-3 transition-all ${
                              isActive
                                ? "border-amber-400/40 bg-amber-400/10 shadow-[0_0_30px_rgba(251,191,36,0.08)]"
                                : "border-white/10 bg-black/20"
                            }`}
                          >
                            <div
                              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
                                isActive
                                  ? "bg-amber-300 text-[#1a1300]"
                                  : "bg-white/10 text-white"
                              }`}
                            >
                              {stepIndex + 1}
                            </div>

                            <p
                              className={`text-[12px] leading-5 ${
                                isActive
                                  ? "font-bold text-white"
                                  : "text-slate-300"
                              }`}
                            >
                              {step}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <Panel title="Chef Notes">
              <div className="space-y-2 text-[11px] leading-5 text-slate-300">
                <p>
                  This document is controlled by the I-Chef Documentation Engine.
                </p>

                <p>
                  Any recipe, quality, production, or portioning change should
                  create a new version before kitchen execution.
                </p>
              </div>
            </Panel>

            <Panel title="Quality Rules">
              <Checklist
                items={[
                  "Follow approved recipe version",
                  "Confirm batch quantity",
                  "Check taste and texture",
                  "Verify portion standard",
                  "Record approval decision",
                ]}
              />
            </Panel>

            <Panel title="Voice Navigation">
              <div className="grid gap-2">
                {voiceCommands.map((command) => (
                  <button
                    key={command}
                    onClick={() => runCommand(command)}
                    className="rounded-[14px] border border-white/10 bg-black/20 px-3 py-2.5 text-left text-[11px] font-black text-white transition hover:border-amber-400/30 hover:bg-amber-400/10"
                  >
                    “{command}”
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Current Step">
              <div className="rounded-[16px] border border-amber-400/20 bg-amber-400/[0.06] p-3">
                <p className="text-[8px] font-black uppercase tracking-[0.18em] text-amber-300">
                  Active Instruction
                </p>

                <p className="mt-3 text-[12px] leading-6 text-white">
                  {currentStep?.step}
                </p>
              </div>
            </Panel>

            <Panel title="Document Control">
              <div className="space-y-2">
                <OutputRow label="Created By" value={document.createdBy} />

                <OutputRow
                  label="Last Updated"
                  value={document.lastUpdated}
                />

                <OutputRow
                  label="Linked Recipe"
                  value={document.linkedRecipe}
                />
              </div>
            </Panel>
          </aside>
        </div>
      </div>
    </div>
  )
}

function InfoTile({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.035] p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 truncate text-[12px] font-black text-white">
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
      <p className="text-[8px] font-black uppercase tracking-[0.22em] text-amber-300">
        {title}
      </p>

      <div className="mt-3">{children}</div>
    </div>
  )
}

function Checklist({ items }: { items: string[] }) {
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />

          <p className="text-[11px] leading-4 text-slate-300">
            {item}
          </p>
        </div>
      ))}
    </div>
  )
}

function OutputRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between rounded-[14px] bg-black/20 px-3 py-2.5">
      <p className="text-[10px] font-bold text-slate-400">
        {label}
      </p>

      <p className="max-w-[150px] truncate text-right text-[11px] font-black text-white">
        {value}
      </p>
    </div>
  )
}