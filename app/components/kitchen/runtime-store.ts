import {
  getRuntimeEngineSummary,
  getRuntimeOutputGap,
  getRuntimeStageCalculatedRisk,
  getRuntimeStageProgress,
  getRuntimeTimePressure,
  type RuntimeRiskLevel,
  type RuntimeStage,
  type RuntimeStageStatus,
} from "./runtime-engine-data"

import { createRuntimeStagesFromDishes } from "./kitchen-runtime-data"

export type RuntimeLiveStage = RuntimeStage & {
  pressureScore: number
  outputGap: number
  calculatedRisk: RuntimeRiskLevel
}

export type RuntimeActionType =
  | "START_STAGE"
  | "PAUSE_STAGE"
  | "COMPLETE_STAGE"
  | "BLOCK_STAGE"
  | "UNBLOCK_STAGE"
  | "INCREASE_OUTPUT"
  | "DECREASE_OUTPUT"
  | "SYNC_RUNTIME"
  | "RESET_RUNTIME"

export type RuntimeAction = {
  type: RuntimeActionType
  stageId?: string
  amount?: number
}

export type RuntimeStoreState = {
  stages: RuntimeStage[]
  lastSyncedAt: string
  runtimePulse: number
}

function createInitialRuntimeStages() {
  return createRuntimeStagesFromDishes()
}

export const INITIAL_RUNTIME_STATE: RuntimeStoreState = {
  stages: createInitialRuntimeStages(),
  lastSyncedAt: new Date().toISOString(),
  runtimePulse: 0,
}

export function createRuntimeSnapshot(
  state: RuntimeStoreState = INITIAL_RUNTIME_STATE
) {
  const liveStages: RuntimeLiveStage[] = state.stages.map((stage) => {
    const outputGap = getRuntimeOutputGap(stage)
    const calculatedRisk = getRuntimeStageCalculatedRisk(stage)
    const pressureScore = calculateStagePressure(stage)

    return {
      ...stage,
      risk: calculatedRisk,
      aiNote: getAINoteFromRuntime(stage, calculatedRisk),
      outputGap,
      calculatedRisk,
      pressureScore,
    }
  })

  const summary = getRuntimeEngineSummary(liveStages)

  return {
    ...state,
    summary,
    liveStages,
  }
}

export function runtimeReducer(
  state: RuntimeStoreState,
  action: RuntimeAction
): RuntimeStoreState {
  switch (action.type) {
    case "START_STAGE":
      return updateStageStatus(state, action.stageId, "ACTIVE")

    case "PAUSE_STAGE":
      return updateStageStatus(state, action.stageId, "WAITING")

    case "COMPLETE_STAGE":
      return updateStageStatus(state, action.stageId, "COMPLETED")

    case "BLOCK_STAGE":
      return updateStageStatus(state, action.stageId, "BLOCKED")

    case "UNBLOCK_STAGE":
      return updateStageStatus(state, action.stageId, "ACTIVE")

    case "INCREASE_OUTPUT":
      return updateStageOutput(state, action.stageId, action.amount ?? 10)

    case "DECREASE_OUTPUT":
      return updateStageOutput(state, action.stageId, -(action.amount ?? 10))

    case "SYNC_RUNTIME":
      return syncRuntimeState(state)

    case "RESET_RUNTIME":
      return {
        stages: createInitialRuntimeStages(),
        lastSyncedAt: new Date().toISOString(),
        runtimePulse: state.runtimePulse + 1,
      }

    default:
      return state
  }
}

function syncRuntimeState(state: RuntimeStoreState): RuntimeStoreState {
  return {
    ...state,
    lastSyncedAt: new Date().toISOString(),
    runtimePulse: state.runtimePulse + 1,
    stages: state.stages.map((stage) => {
      const calculatedRisk = getRuntimeStageCalculatedRisk(stage)

      return {
        ...stage,
        risk: calculatedRisk,
        aiNote: getAINoteFromRuntime(stage, calculatedRisk),
      }
    }),
  }
}

function updateStageStatus(
  state: RuntimeStoreState,
  stageId: string | undefined,
  status: RuntimeStageStatus
): RuntimeStoreState {
  if (!stageId) return state

  return {
    ...state,
    lastSyncedAt: new Date().toISOString(),
    runtimePulse: state.runtimePulse + 1,
    stages: state.stages.map((stage) => {
      if (stage.id !== stageId) return stage

      const nextStage: RuntimeStage = {
        ...stage,
        status,
      }

      const calculatedRisk = getRuntimeStageCalculatedRisk(nextStage)

      return {
        ...nextStage,
        risk: calculatedRisk,
        aiNote: getAINoteFromRuntime(nextStage, calculatedRisk),
      }
    }),
  }
}

function updateStageOutput(
  state: RuntimeStoreState,
  stageId: string | undefined,
  amount: number
): RuntimeStoreState {
  if (!stageId) return state

  return {
    ...state,
    lastSyncedAt: new Date().toISOString(),
    runtimePulse: state.runtimePulse + 1,
    stages: state.stages.map((stage) => {
      if (stage.id !== stageId) return stage

      const nextOutput = Math.max(
        0,
        Math.min(stage.capacityTarget, stage.currentOutput + amount)
      )

      const nextStage: RuntimeStage = {
        ...stage,
        currentOutput: nextOutput,
      }

      const calculatedRisk = getRuntimeStageCalculatedRisk(nextStage)

      return {
        ...nextStage,
        risk: calculatedRisk,
        aiNote: getAINoteFromRuntime(nextStage, calculatedRisk),
      }
    }),
  }
}

function calculateStagePressure(stage: RuntimeStage) {
  const outputProgress = getRuntimeStageProgress(stage)
  const timePressure = getRuntimeTimePressure(stage)
  const calculatedRisk = getRuntimeStageCalculatedRisk(stage)

  const outputPressure = 100 - outputProgress

  const riskPressure =
    calculatedRisk === "CRITICAL"
      ? 35
      : calculatedRisk === "HIGH"
        ? 25
        : calculatedRisk === "MEDIUM"
          ? 12
          : 0

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(timePressure * 0.45 + outputPressure * 0.4 + riskPressure)
    )
  )
}

function getAINoteFromRuntime(stage: RuntimeStage, risk: RuntimeRiskLevel) {
  const progress = getRuntimeStageProgress(stage)
  const timePressure = getRuntimeTimePressure(stage)
  const outputGap = getRuntimeOutputGap(stage)

  if (stage.status === "COMPLETED") {
    return `${stage.name} completed successfully. Downstream stages can continue.`
  }

  if (risk === "CRITICAL") {
    return `${stage.name} requires immediate attention. Current progress is ${progress}%, time pressure is ${timePressure}%, and output gap is ${outputGap}.`
  }

  if (risk === "HIGH") {
    return `${stage.name} is under high pressure. Output is behind target and may affect downstream stages.`
  }

  if (risk === "MEDIUM") {
    return `${stage.name} should be monitored. Dependency or output pressure may increase soon.`
  }

  if (stage.status === "ACTIVE") {
    return `${stage.name} is active. AI supervisor is monitoring output and timing.`
  }

  if (stage.status === "WAITING") {
    return `${stage.name} is waiting. Check upstream dependency before starting.`
  }

  return stage.aiNote
}