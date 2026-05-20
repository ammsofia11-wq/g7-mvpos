import { GLOBAL_RUNTIME_STATE } from "./runtime-store"

export type WorkforceEscalation = {
  id: string
  station: string
  reason: string
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  requiredSupport: string
  createdAt: string
}

function nowRuntimeTime() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function createEscalationId() {
  return `WF-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`
}

export const WORKFORCE_RUNTIME_STATE: {
  escalations: WorkforceEscalation[]
} = {
  escalations: [],
}

export function createWorkforceEscalation({
  station,
  reason,
  severity,
  requiredSupport,
}: {
  station: string
  reason: string
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  requiredSupport: string
}) {
  const escalation: WorkforceEscalation = {
    id: createEscalationId(),
    station,
    reason,
    severity,
    requiredSupport,
    createdAt: nowRuntimeTime(),
  }

  WORKFORCE_RUNTIME_STATE.escalations.unshift(
    escalation
  )

  GLOBAL_RUNTIME_STATE.signals.unshift({
    id: `SIG-${Date.now()}`,
    source: "workforce",
    target: "kitchen",
    type: "ESCALATION",
    title: `${station} workforce escalation`,
    message: `${requiredSupport} required because ${reason}.`,
    createdAt: nowRuntimeTime(),
  })

  return escalation
}

export function getWorkforceEscalations() {
  return WORKFORCE_RUNTIME_STATE.escalations
}