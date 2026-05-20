export type RuntimeZone = {
  id: string
  title: string
  priority: number
}

type RuntimeSummary = {
  aiSupervisorStatus: string
  blockedStages: number
  delayedStages: number
  runtimeEfficiency: number
  activeStages: number
}

export function getDynamicRuntimeZones(
  summary: RuntimeSummary
): RuntimeZone[] {
  const zones: RuntimeZone[] = [
    {
      id: "alerts",
      title: "AI Alerts",
      priority: 40,
    },
    {
      id: "runtime",
      title: "Live Runtime",
      priority: 50,
    },
    {
      id: "production",
      title: "Production Control",
      priority: 45,
    },
    {
      id: "workforce",
      title: "Workforce Runtime",
      priority: 35,
    },
    {
      id: "dispatch",
      title: "Dispatch Intelligence",
      priority: 30,
    },
  ]

  if (summary.aiSupervisorStatus === "CRITICAL") {
    const alerts = zones.find((z) => z.id === "alerts")

    if (alerts) {
      alerts.priority += 60
    }
  }

  if (summary.blockedStages > 0) {
    const production = zones.find((z) => z.id === "production")

    if (production) {
      production.priority += 45
    }
  }

  if (summary.delayedStages > 0) {
    const runtime = zones.find((z) => z.id === "runtime")

    if (runtime) {
      runtime.priority += 35
    }
  }

  if (summary.runtimeEfficiency < 70) {
    const workforce = zones.find((z) => z.id === "workforce")

    if (workforce) {
      workforce.priority += 30
    }
  }

  if (summary.activeStages >= 4) {
    const dispatch = zones.find((z) => z.id === "dispatch")

    if (dispatch) {
      dispatch.priority += 40
    }
  }

  return zones.sort((a, b) => b.priority - a.priority)
}