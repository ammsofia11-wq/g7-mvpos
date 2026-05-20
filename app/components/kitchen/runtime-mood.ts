export type RuntimeMood = "CALM" | "FOCUSED" | "PRESSURE" | "CRITICAL"

export type RuntimeMoodStyle = {
  mood: RuntimeMood
  label: string
  title: string
  message: string
  shellClass: string
  cardClass: string
  accentClass: string
  glowClass: string
}

export function getRuntimeMood(summary: {
  aiSupervisorStatus: string
  blockedStages: number
  delayedStages: number
  activeStages: number
  runtimeEfficiency: number
}): RuntimeMoodStyle {
  if (summary.aiSupervisorStatus === "CRITICAL" || summary.blockedStages > 0) {
    return {
      mood: "CRITICAL",
      label: "Critical Mode",
      title: "Kitchen needs immediate attention",
      message:
        "AI detected blocking pressure. Escalations should be handled before continuing normal flow.",
      shellClass:
        "border-red-400/30 bg-red-400/[0.07] shadow-[0_0_55px_rgba(248,113,113,0.12)]",
      cardClass: "border-red-400/25 bg-red-400/10",
      accentClass: "text-red-300",
      glowClass: "bg-red-400",
    }
  }

  if (summary.delayedStages > 0 || summary.runtimeEfficiency < 70) {
    return {
      mood: "PRESSURE",
      label: "Pressure Mode",
      title: "Kitchen pressure is rising",
      message:
        "AI recommends checking runtime flow and workforce allocation before pressure escalates.",
      shellClass:
        "border-orange-400/30 bg-orange-400/[0.07] shadow-[0_0_55px_rgba(251,146,60,0.11)]",
      cardClass: "border-orange-400/25 bg-orange-400/10",
      accentClass: "text-orange-300",
      glowClass: "bg-orange-400",
    }
  }

  if (summary.activeStages > 0) {
    return {
      mood: "FOCUSED",
      label: "Focused Mode",
      title: "Kitchen is actively running",
      message:
        "Live execution is in progress. Keep monitoring output, pressure, and AI recommendations.",
      shellClass:
        "border-[#CCFF33]/25 bg-[#CCFF33]/[0.045] shadow-[0_0_55px_rgba(204,255,51,0.09)]",
      cardClass: "border-[#CCFF33]/20 bg-[#CCFF33]/10",
      accentClass: "text-[#CCFF33]",
      glowClass: "bg-[#CCFF33]",
    }
  }

  return {
    mood: "CALM",
    label: "Calm Mode",
    title: "Kitchen is stable",
    message:
      "No major runtime pressure detected. The system is ready for production control.",
    shellClass:
      "border-white/10 bg-white/[0.035] shadow-[0_24px_70px_rgba(0,0,0,0.32)]",
    cardClass: "border-white/10 bg-black/20",
    accentClass: "text-[#CCFF33]",
    glowClass: "bg-[#CCFF33]",
  }
}