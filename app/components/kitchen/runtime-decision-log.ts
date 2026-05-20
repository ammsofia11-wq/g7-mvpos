export type RuntimeDecisionLog = {
  id: string
  type: string
  title: string
  reason: string
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  nextAction: string
}

type RuntimeSummary = {
  aiSupervisorStatus: string
  blockedStages: number
  delayedStages: number
  runtimeEfficiency: number
  activeStages: number
}

export function generateRuntimeDecisionLog(
  summary: RuntimeSummary
): RuntimeDecisionLog[] {
  const logs: RuntimeDecisionLog[] = []

  if (summary.aiSupervisorStatus === "CRITICAL") {
    logs.push({
      id: "critical-alerts",
      type: "Escalation",
      title: "AI raised kitchen escalation level",
      reason:
        "Supervisor engine detected critical operational instability.",
      severity: "CRITICAL",
      nextAction: "Review alerts and blocked stages immediately.",
    })
  }

  if (summary.blockedStages > 0) {
    logs.push({
      id: "blocked-production",
      type: "Production",
      title: "Production zone expanded automatically",
      reason:
        "Blocked stages increased execution risk across the kitchen.",
      severity: "HIGH",
      nextAction: "Resolve blocked stations and rebalance flow.",
    })
  }

  if (summary.delayedStages > 0) {
    logs.push({
      id: "runtime-delay",
      type: "Runtime",
      title: "Runtime monitoring priority increased",
      reason:
        "Execution delays detected inside active production flow.",
      severity: "MEDIUM",
      nextAction: "Inspect delayed runtime stages.",
    })
  }

  if (summary.runtimeEfficiency < 70) {
    logs.push({
      id: "workforce-efficiency",
      type: "Workforce",
      title: "Workforce attention level increased",
      reason:
        "Runtime efficiency dropped below operational target.",
      severity: "HIGH",
      nextAction: "Reallocate workforce capacity.",
    })
  }

  if (summary.activeStages >= 4) {
    logs.push({
      id: "dispatch-window",
      type: "Dispatch",
      title: "Dispatch intelligence activated",
      reason:
        "High active-stage volume approaching delivery window.",
      severity: "MEDIUM",
      nextAction: "Monitor dispatch timing and routing.",
    })
  }

  if (logs.length === 0) {
    logs.push({
      id: "stable-runtime",
      type: "Stability",
      title: "Kitchen runtime operating normally",
      reason:
        "No critical operational anomalies detected.",
      severity: "LOW",
      nextAction: "Continue runtime observation.",
    })
  }

  return logs
}