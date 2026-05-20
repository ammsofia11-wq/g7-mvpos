export type AttentionLevel = "NORMAL" | "PRIORITY" | "CRITICAL"

export type AttentionTarget =
  | "overview"
  | "runtime"
  | "alerts"
  | "workforce"
  | "production"
  | "assistant"

export type RuntimeAttentionSignal = {
  target: AttentionTarget
  level: AttentionLevel
  label: string
  reason: string
  action: string
}

export function getRuntimeAttention(summary: {
  aiSupervisorStatus: string
  blockedStages: number
  delayedStages: number
  activeStages: number
  runtimeEfficiency: number
}): RuntimeAttentionSignal {
  if (summary.aiSupervisorStatus === "CRITICAL" || summary.blockedStages > 0) {
    return {
      target: "alerts",
      level: "CRITICAL",
      label: "Critical Attention",
      reason: `${summary.blockedStages} blocked stage detected.`,
      action: "Open escalation queue now",
    }
  }

  if (summary.delayedStages > 0) {
    return {
      target: "runtime",
      level: "PRIORITY",
      label: "Runtime Priority",
      reason: `${summary.delayedStages} delayed stage detected.`,
      action: "Review runtime pressure",
    }
  }

  if (summary.runtimeEfficiency < 70) {
    return {
      target: "workforce",
      level: "PRIORITY",
      label: "Workforce Priority",
      reason: `Runtime efficiency is ${summary.runtimeEfficiency}%.`,
      action: "Check staff allocation",
    }
  }

  if (summary.activeStages === 0) {
    return {
      target: "production",
      level: "PRIORITY",
      label: "Production Idle",
      reason: "No active stages are running.",
      action: "Start production control",
    }
  }

  return {
    target: "overview",
    level: "NORMAL",
    label: "Normal Attention",
    reason: "Kitchen runtime is stable.",
    action: "Continue monitoring",
  }
}

export function getAttentionTabClass(level: AttentionLevel, isTarget: boolean) {
  if (!isTarget) {
    return "border-white/10 bg-black/20 hover:border-white/20"
  }

  if (level === "CRITICAL") {
    return "border-red-400/40 bg-red-400/15 shadow-[0_0_35px_rgba(248,113,113,0.14)] animate-pulse"
  }

  if (level === "PRIORITY") {
    return "border-orange-400/35 bg-orange-400/10 shadow-[0_0_30px_rgba(251,146,60,0.12)]"
  }

  return "border-[#CCFF33]/35 bg-[#CCFF33]/10 shadow-[0_0_30px_rgba(204,255,51,0.10)]"
}

export function getAttentionAccentClass(level: AttentionLevel) {
  if (level === "CRITICAL") return "text-red-300"
  if (level === "PRIORITY") return "text-orange-300"
  return "text-[#CCFF33]"
}