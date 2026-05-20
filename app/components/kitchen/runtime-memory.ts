export type RuntimeMemoryRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

export type RuntimeMemoryPattern = {
  id: string
  title: string
  area: string
  riskLevel: RuntimeMemoryRiskLevel
  confidence: number
  predictedInMinutes: number
  reason: string
  recommendedAction: string
}

export type RuntimeMemorySummary = {
  riskScore: number
  strongestPattern: RuntimeMemoryPattern
  patterns: RuntimeMemoryPattern[]
}

export function getRuntimeMemory(summary: {
  aiSupervisorStatus: string
  blockedStages: number
  delayedStages: number
  activeStages: number
  runtimeEfficiency: number
}): RuntimeMemorySummary {
  const patterns: RuntimeMemoryPattern[] = []

  if (summary.blockedStages > 0) {
    patterns.push({
      id: "blocked-stage-memory",
      title: "Blocked stage recurrence detected",
      area: "Escalations",
      riskLevel: "CRITICAL",
      confidence: 94,
      predictedInMinutes: 0,
      reason:
        "Runtime memory detected a blocked production stage. This usually creates a downstream delay across packaging and dispatch.",
      recommendedAction:
        "Open escalations, resolve the blocked stage, and reassign support before dispatch pressure increases.",
    })
  }

  if (summary.delayedStages >= 2) {
    patterns.push({
      id: "runtime-delay-cluster",
      title: "Delay cluster forming",
      area: "Runtime Engine",
      riskLevel: "HIGH",
      confidence: 88,
      predictedInMinutes: 12,
      reason:
        "Multiple delayed stages indicate a bottleneck is forming before the final production checkpoint.",
      recommendedAction:
        "Move one available worker to the delayed station and review current batch priority.",
    })
  }

  if (summary.runtimeEfficiency < 70) {
    patterns.push({
      id: "workforce-efficiency-drop",
      title: "Workforce efficiency drop pattern",
      area: "Workforce",
      riskLevel: "HIGH",
      confidence: 81,
      predictedInMinutes: 18,
      reason:
        "Efficiency below 70% usually signals station fatigue, unclear ownership, or load imbalance.",
      recommendedAction:
        "Review workforce allocation and shift one employee from a stable station into the pressure zone.",
    })
  }

  if (summary.activeStages === 0) {
    patterns.push({
      id: "inactive-floor-risk",
      title: "Inactive production floor",
      area: "Production",
      riskLevel: "MEDIUM",
      confidence: 76,
      predictedInMinutes: 8,
      reason:
        "No active stages are running. Runtime memory expects upcoming order pressure if production is not restarted.",
      recommendedAction:
        "Start the next approved batch and confirm station readiness.",
    })
  }

  if (patterns.length === 0) {
    patterns.push({
      id: "stable-runtime-memory",
      title: "Stable operating rhythm",
      area: "Overview",
      riskLevel: "LOW",
      confidence: 91,
      predictedInMinutes: 30,
      reason:
        "Runtime memory sees no immediate bottleneck pattern. Current kitchen rhythm is stable.",
      recommendedAction:
        "Keep monitoring the command summary and maintain current staffing distribution.",
    })
  }

  const strongestPattern = patterns[0]

  const riskScore = patterns.reduce((score, pattern) => {
    if (pattern.riskLevel === "CRITICAL") return score + 40
    if (pattern.riskLevel === "HIGH") return score + 28
    if (pattern.riskLevel === "MEDIUM") return score + 16
    return score + 6
  }, 0)

  return {
    riskScore: Math.min(riskScore, 100),
    strongestPattern,
    patterns,
  }
}