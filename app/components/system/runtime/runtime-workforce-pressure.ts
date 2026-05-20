import {
  getApprovalBlockedProduction,
  getSignalsForSystem,
} from "./runtime-actions"

import { getWorkforceEscalations } from "./runtime-workforce-sync"

export type WorkforcePressureLevel =
  | "STABLE"
  | "WATCH"
  | "OVERLOADED"
  | "CRITICAL"

export type WorkforcePressureReport = {
  station: string
  pressureScore: number
  level: WorkforcePressureLevel
  requiredSupport: number
  recommendation: string
}

function getPressureLevel(
  score: number
): WorkforcePressureLevel {
  if (score >= 85) {
    return "CRITICAL"
  }

  if (score >= 60) {
    return "OVERLOADED"
  }

  if (score >= 35) {
    return "WATCH"
  }

  return "STABLE"
}

export function getWorkforcePressureReports(): WorkforcePressureReport[] {
  const approvalBlocks =
    getApprovalBlockedProduction().length

  const workforceSignals =
    getSignalsForSystem("workforce").length

  const escalations =
    getWorkforceEscalations().length

  const qaDispatchScore =
    approvalBlocks * 25 +
    escalations * 25 +
    workforceSignals * 10

  const packagingScore =
    approvalBlocks * 20 +
    escalations * 15 +
    20

  const hotKitchenScore =
    workforceSignals * 20 +
    30

  const reports: WorkforcePressureReport[] = [
    {
      station: "QA / Dispatch Support",
      pressureScore: qaDispatchScore,
      level: getPressureLevel(qaDispatchScore),
      requiredSupport:
        qaDispatchScore >= 85 ? 3 : qaDispatchScore >= 60 ? 2 : 1,
      recommendation:
        "Assign QA supervisor and dispatch support before release window.",
    },
    {
      station: "Packaging Team",
      pressureScore: packagingScore,
      level: getPressureLevel(packagingScore),
      requiredSupport:
        packagingScore >= 85 ? 3 : packagingScore >= 60 ? 2 : 1,
      recommendation:
        "Prepare backup packaging operators for blocked batches.",
    },
    {
      station: "Hot Kitchen Team",
      pressureScore: hotKitchenScore,
      level: getPressureLevel(hotKitchenScore),
      requiredSupport:
        hotKitchenScore >= 85 ? 3 : hotKitchenScore >= 60 ? 2 : 1,
      recommendation:
        "Monitor cooking line pressure and protect production timing.",
    },
  ]

  return reports
}