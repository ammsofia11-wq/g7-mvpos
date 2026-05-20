import { GLOBAL_RUNTIME_STATE } from "./runtime-store"
import {
  RuntimeBatch,
  RuntimeRiskLevel,
  RuntimeSignal,
  RuntimeSystemId,
} from "./runtime-types"

export function getSystemState(systemId: RuntimeSystemId) {
  return GLOBAL_RUNTIME_STATE.systems.find(
    (system) => system.id === systemId
  )
}

export function getSystemBatches(systemId: RuntimeSystemId) {
  return GLOBAL_RUNTIME_STATE.batches.filter(
    (batch) => batch.currentSystem === systemId
  )
}

export function getBlockedBatches() {
  return GLOBAL_RUNTIME_STATE.batches.filter(
    (batch) => batch.dispatchBlocked
  )
}

export function getCriticalSignals() {
  return GLOBAL_RUNTIME_STATE.signals.filter(
    (signal) =>
      signal.type === "BLOCKER" ||
      signal.type === "ESCALATION"
  )
}

export function getSignalsForSystem(systemId: RuntimeSystemId) {
  return GLOBAL_RUNTIME_STATE.signals.filter(
    (signal) =>
      signal.target === systemId ||
      signal.source === systemId
  )
}

export function calculateGlobalRisk(): RuntimeRiskLevel {
  const criticalSignals = GLOBAL_RUNTIME_STATE.signals.filter(
    (signal) =>
      signal.type === "BLOCKER" ||
      signal.type === "ESCALATION"
  ).length

  const blockedBatches = GLOBAL_RUNTIME_STATE.batches.filter(
    (batch) => batch.dispatchBlocked
  ).length

  if (criticalSignals >= 3 || blockedBatches >= 3) {
    return "CRITICAL"
  }

  if (criticalSignals >= 1 || blockedBatches >= 1) {
    return "HIGH"
  }

  return "MEDIUM"
}

export function getRuntimeOverview() {
  return {
    systems: GLOBAL_RUNTIME_STATE.systems.length,

    activeBatches:
      GLOBAL_RUNTIME_STATE.batches.length,

    blockedBatches:
      getBlockedBatches().length,

    criticalSignals:
      getCriticalSignals().length,

    globalRisk:
      calculateGlobalRisk(),
  }
}

export function getApprovalBlockedProduction() {
  return GLOBAL_RUNTIME_STATE.batches.filter(
    (batch) =>
      batch.currentSystem === "approval" &&
      batch.dispatchBlocked
  )
}

export function getKitchenRuntimePressure() {
  const kitchenSignals =
    getSignalsForSystem("kitchen")

  const blockers = kitchenSignals.filter(
    (signal) => signal.type === "BLOCKER"
  ).length

  const warnings = kitchenSignals.filter(
    (signal) => signal.type === "WARNING"
  ).length

  return {
    blockers,
    warnings,
    pressureScore:
      blockers * 40 + warnings * 20,
  }
}

export function getAIRecommendedAction() {
  const risk = calculateGlobalRisk()

  if (risk === "CRITICAL") {
    return {
      title: "Escalate Runtime",
      description:
        "Immediate cross-runtime intervention required.",
    }
  }

  if (risk === "HIGH") {
    return {
      title: "Protect Production",
      description:
        "Approval and workforce balancing recommended.",
    }
  }

  return {
    title: "Monitor Runtime",
    description:
      "System stable with manageable pressure.",
  }
}