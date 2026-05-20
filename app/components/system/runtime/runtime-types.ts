export type RuntimeRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

export type RuntimeSystemId =
  | "kitchen"
  | "workforce"
  | "approval"
  | "inventory"
  | "procurement"
  | "dispatch"
  | "ai-chef"

export type RuntimeSignalType =
  | "INFO"
  | "SUCCESS"
  | "WARNING"
  | "BLOCKER"
  | "ESCALATION"

export type RuntimeBatchStatus =
  | "QA_HOLD"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "PRODUCTION_RELEASED"
  | "DISPATCH_BLOCKED"
  | "DISPATCH_READY"

export type RuntimeBatch = {
  id: string
  title: string
  portions: number
  currentSystem: RuntimeSystemId
  status: RuntimeBatchStatus
  riskLevel: RuntimeRiskLevel
  approvalRequired: boolean
  chefSignatureRequired: boolean
  qaLocked: boolean
  dispatchBlocked: boolean
  updatedAt: string
}

export type RuntimeSignal = {
  id: string
  source: RuntimeSystemId
  target: RuntimeSystemId
  type: RuntimeSignalType
  title: string
  message: string
  createdAt: string
}

export type RuntimeSystemState = {
  id: RuntimeSystemId
  label: string
  riskLevel: RuntimeRiskLevel
  activeBatches: number
  blockers: number
  lastUpdated: string
}

export type GlobalRuntimeState = {
  systems: RuntimeSystemState[]
  batches: RuntimeBatch[]
  signals: RuntimeSignal[]
}