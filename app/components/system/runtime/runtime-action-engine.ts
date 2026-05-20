import { GLOBAL_RUNTIME_STATE } from "./runtime-store"

import {
  createRuntimeSignal,
} from "./runtime-mutations"

import {
  RuntimeRiskLevel,
} from "./runtime-types"

type RuntimeAction =
  | "MOVE_SUPPORT_TO_PACKAGING"
  | "ESCALATE_QA_SUPPORT"
  | "REDUCE_HOT_KITCHEN_PRESSURE"

function nowRuntimeTime() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function updateRuntimeRisk(
  systemId: "kitchen" | "approval" | "workforce",
  riskLevel: RuntimeRiskLevel
) {
  const system =
    GLOBAL_RUNTIME_STATE.systems.find(
      (item) => item.id === systemId
    )

  if (!system) {
    return
  }

  system.riskLevel = riskLevel
  system.lastUpdated = nowRuntimeTime()
}

export function executeRuntimeAction(
  action: RuntimeAction
) {
  switch (action) {
    case "MOVE_SUPPORT_TO_PACKAGING":
      return moveSupportToPackaging()

    case "ESCALATE_QA_SUPPORT":
      return escalateQASupport()

    case "REDUCE_HOT_KITCHEN_PRESSURE":
      return reduceHotKitchenPressure()

    default:
      return null
  }
}

function moveSupportToPackaging() {
  updateRuntimeRisk(
    "workforce",
    "MEDIUM"
  )

  updateRuntimeRisk(
    "kitchen",
    "LOW"
  )

  createRuntimeSignal({
    source: "workforce",
    target: "kitchen",
    type: "SUCCESS",
    title: "Packaging Support Assigned",
    message:
      "2 support operators moved into Packaging Runtime.",
  })

  return {
    success: true,
    updatedAt: nowRuntimeTime(),
  }
}

function escalateQASupport() {
  updateRuntimeRisk(
    "approval",
    "HIGH"
  )

  createRuntimeSignal({
    source: "approval",
    target: "workforce",
    type: "ESCALATION",
    title: "QA Escalation Triggered",
    message:
      "Approval Runtime requested additional QA staffing.",
  })

  return {
    success: true,
    updatedAt: nowRuntimeTime(),
  }
}

function reduceHotKitchenPressure() {
  updateRuntimeRisk(
    "kitchen",
    "LOW"
  )

  createRuntimeSignal({
    source: "kitchen",
    target: "workforce",
    type: "SUCCESS",
    title: "Kitchen Pressure Reduced",
    message:
      "AI staffing redistribution reduced hot kitchen pressure.",
  })

  return {
    success: true,
    updatedAt: nowRuntimeTime(),
  }
}