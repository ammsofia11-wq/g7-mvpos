import {
  GlobalRuntimeState,
  RuntimeBatch,
  RuntimeSignal,
  RuntimeSystemState,
} from "./runtime-types"

const systems: RuntimeSystemState[] = [
  {
    id: "kitchen",
    label: "Kitchen Runtime",
    riskLevel: "HIGH",
    activeBatches: 12,
    blockers: 2,
    lastUpdated: "09:42",
  },

  {
    id: "workforce",
    label: "Workforce Runtime",
    riskLevel: "MEDIUM",
    activeBatches: 8,
    blockers: 1,
    lastUpdated: "09:40",
  },

  {
    id: "approval",
    label: "Approval Runtime",
    riskLevel: "HIGH",
    activeBatches: 6,
    blockers: 3,
    lastUpdated: "09:44",
  },

  {
    id: "inventory",
    label: "Inventory Runtime",
    riskLevel: "LOW",
    activeBatches: 4,
    blockers: 0,
    lastUpdated: "09:31",
  },
]

const batches: RuntimeBatch[] = [
  {
    id: "BATCH-221",
    title: "High Protein Chicken Bowl",
    portions: 420,
    currentSystem: "approval",
    status: "PENDING_APPROVAL",
    riskLevel: "HIGH",
    approvalRequired: true,
    chefSignatureRequired: true,
    qaLocked: true,
    dispatchBlocked: true,
    updatedAt: "09:44",
  },

  {
    id: "BATCH-228",
    title: "Packaging Label Update",
    portions: 280,
    currentSystem: "approval",
    status: "QA_HOLD",
    riskLevel: "CRITICAL",
    approvalRequired: true,
    chefSignatureRequired: false,
    qaLocked: true,
    dispatchBlocked: true,
    updatedAt: "09:48",
  },

  {
    id: "BATCH-301",
    title: "Keto Salmon Meal",
    portions: 190,
    currentSystem: "kitchen",
    status: "PRODUCTION_RELEASED",
    riskLevel: "MEDIUM",
    approvalRequired: false,
    chefSignatureRequired: false,
    qaLocked: false,
    dispatchBlocked: false,
    updatedAt: "09:21",
  },
]

const signals: RuntimeSignal[] = [
  {
    id: "SIG-001",
    source: "approval",
    target: "kitchen",
    type: "BLOCKER",
    title: "Dispatch blocked",
    message: "Kitchen dispatch paused until QA unlock.",
    createdAt: "09:42",
  },

  {
    id: "SIG-002",
    source: "workforce",
    target: "kitchen",
    type: "WARNING",
    title: "Station overload",
    message: "Hot kitchen team overloaded.",
    createdAt: "09:37",
  },

  {
    id: "SIG-003",
    source: "inventory",
    target: "approval",
    type: "INFO",
    title: "Ingredient validated",
    message: "Protein stock confirmed for release.",
    createdAt: "09:18",
  },
]

export const GLOBAL_RUNTIME_STATE: GlobalRuntimeState = {
  systems,
  batches,
  signals,
}