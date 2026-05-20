import { GLOBAL_RUNTIME_STATE } from "./runtime-store"

import {
  createWorkforceEscalation,
} from "./runtime-workforce-sync"

import {
  RuntimeBatchStatus,
  RuntimeRiskLevel,
  RuntimeSignal,
  RuntimeSignalType,
  RuntimeSystemId,
} from "./runtime-types"

function nowRuntimeTime() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function createRuntimeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

export function updateBatchStatus(
  batchId: string,
  status: RuntimeBatchStatus
) {
  const batch = GLOBAL_RUNTIME_STATE.batches.find(
    (item) => item.id === batchId
  )

  if (!batch) {
    return null
  }

  batch.status = status
  batch.updatedAt = nowRuntimeTime()

  return batch
}

export function approveRuntimeBatch(batchId: string) {
  const batch = GLOBAL_RUNTIME_STATE.batches.find(
    (item) => item.id === batchId
  )

  if (!batch) {
    return null
  }

  batch.status = "APPROVED"
  batch.riskLevel = "LOW"
  batch.approvalRequired = false
  batch.chefSignatureRequired = false
  batch.qaLocked = false
  batch.dispatchBlocked = false
  batch.currentSystem = "kitchen"
  batch.updatedAt = nowRuntimeTime()

  createRuntimeSignal({
    source: "approval",
    target: "kitchen",
    type: "SUCCESS",
    title: "Batch approved",
    message: `${batch.title} approved and released to Kitchen Runtime.`,
  })

  return batch
}

export function blockRuntimeBatch(batchId: string) {
  const batch = GLOBAL_RUNTIME_STATE.batches.find(
    (item) => item.id === batchId
  )

  if (!batch) {
    return null
  }

  batch.status = "DISPATCH_BLOCKED"
  batch.riskLevel = "CRITICAL"
  batch.dispatchBlocked = true
  batch.qaLocked = true
  batch.currentSystem = "approval"
  batch.updatedAt = nowRuntimeTime()

  createRuntimeSignal({
    source: "approval",
    target: "kitchen",
    type: "BLOCKER",
    title: "Dispatch blocked",
    message: `${batch.title} is blocked by Approval Runtime.`,
  })

  createWorkforceEscalation({
    station: "QA / Dispatch Support",
    reason: `${batch.title} is blocked by approval and requires operational support`,
    severity: "HIGH",
    requiredSupport: "Supervisor and QA support",
  })

  return batch
}

export function createRuntimeSignal({
  source,
  target,
  type,
  title,
  message,
}: {
  source: RuntimeSystemId
  target: RuntimeSystemId
  type: RuntimeSignalType
  title: string
  message: string
}) {
  const signal: RuntimeSignal = {
    id: createRuntimeId("SIG"),
    source,
    target,
    type,
    title,
    message,
    createdAt: nowRuntimeTime(),
  }

  GLOBAL_RUNTIME_STATE.signals.unshift(signal)

  return signal
}

export function escalateRuntime({
  source,
  target,
  title,
  message,
}: {
  source: RuntimeSystemId
  target: RuntimeSystemId
  title: string
  message: string
}) {
  return createRuntimeSignal({
    source,
    target,
    type: "ESCALATION",
    title,
    message,
  })
}

export function updateSystemRisk(
  systemId: RuntimeSystemId,
  riskLevel: RuntimeRiskLevel
) {
  const system = GLOBAL_RUNTIME_STATE.systems.find(
    (item) => item.id === systemId
  )

  if (!system) {
    return null
  }

  system.riskLevel = riskLevel
  system.lastUpdated = nowRuntimeTime()

  return system
}

export function getMutableRuntimeSnapshot() {
  return {
    systems: [...GLOBAL_RUNTIME_STATE.systems],
    batches: [...GLOBAL_RUNTIME_STATE.batches],
    signals: [...GLOBAL_RUNTIME_STATE.signals],
  }
}