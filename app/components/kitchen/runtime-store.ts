import {
  REALTIME_RUNTIME_STAGES,
  getRuntimeEngineSummary,
  type RuntimeStage,
  type RuntimeStageStatus,
} from "./runtime-engine-data"

export type RuntimeActionType =
  | "START_STAGE"
  | "PAUSE_STAGE"
  | "COMPLETE_STAGE"
  | "BLOCK_STAGE"
  | "UNBLOCK_STAGE"
  | "INCREASE_OUTPUT"
  | "DECREASE_OUTPUT"
  | "SYNC_RUNTIME"

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

export const INITIAL_RUNTIME_STATE: RuntimeStoreState = {
  stages: REALTIME_RUNTIME_STAGES,
  lastSyncedAt: new Date().toISOString(),
  runtimePulse: 0,
}

export function createRuntimeSnapshot(
  state: RuntimeStoreState = INITIAL_RUNTIME_STATE
) {
  const summary = getRuntimeEngineSummary(state.stages)

  return {
    ...state,
    summary,
    liveStages: state.stages.map((stage) => ({
      ...stage,
      pressureScore: calculateStagePressure(stage),
      outputGap: Math.max(stage.capacityTarget - stage.currentOutput, 0),
    })),
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
      return {
        ...state,
        lastSyncedAt: new Date().toISOString(),
        runtimePulse: state.runtimePulse + 1,
      }

    default:
      return state
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
    stages: state.stages.map((stage) =>
      stage.id === stageId
        ? {
            ...stage,
            status,
            risk: getRiskFromStatus(status),
            aiNote: getAINoteFromStatus(stage.name, status),
          }
        : stage
    ),
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

      return {
        ...stage,
        currentOutput: nextOutput,
      }
    }),
  }
}

function calculateStagePressure(stage: RuntimeStage) {
  const outputPressure =
    stage.capacityTarget > 0
      ? 100 - Math.round((stage.currentOutput / stage.capacityTarget) * 100)
      : 100

  const timePressure =
    stage.plannedMinutes > 0
      ? Math.round((stage.elapsedMinutes / stage.plannedMinutes) * 100)
      : 0

  const statusPressure =
    stage.status === "BLOCKED"
      ? 40
      : stage.status === "DELAYED"
        ? 25
        : stage.status === "WAITING"
          ? 10
          : 0

  return Math.min(100, Math.max(0, outputPressure + timePressure + statusPressure))
}

function getRiskFromStatus(status: RuntimeStageStatus) {
  if (status === "BLOCKED") return "CRITICAL"
  if (status === "DELAYED") return "HIGH"
  if (status === "WAITING") return "MEDIUM"
  return "LOW"
}

function getAINoteFromStatus(stageName: string, status: RuntimeStageStatus) {
  if (status === "ACTIVE") {
    return `${stageName} is now active. AI supervisor is monitoring output and timing.`
  }

  if (status === "WAITING") {
    return `${stageName} is waiting. Check upstream dependency before starting.`
  }

  if (status === "DELAYED") {
    return `${stageName} is delayed. AI recommends adding support or reducing batch load.`
  }

  if (status === "BLOCKED") {
    return `${stageName} is blocked. Immediate supervisor escalation required.`
  }

  return `${stageName} completed successfully. Downstream stages can continue.`
}