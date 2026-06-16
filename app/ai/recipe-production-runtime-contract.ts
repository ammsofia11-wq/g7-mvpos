import { RecipeStudioRole } from "./recipe-studio-permissions"

export type ProductionRuntimeState =
  | "RECIPE_APPROVED"
  | "BATCH_READY"
  | "STATION_TASK_READY"
  | "QA_GATE_PENDING"
  | "RELEASE_READY"

export type ProductionRuntimeGateStatus =
  | "NOT_STARTED"
  | "READY"
  | "PENDING_QA"
  | "QA_HOLD"
  | "RELEASED"

export type RecipeProductionRuntimeContractInput = {
  role: RecipeStudioRole
  recipeId: string
  recipeTitle: string
  station: string
  status: string
  batchCode: string
  expiryDate: string
}

export type RecipeProductionRuntimeContract = {
  contractVersion: "RS-3A"
  recipeId: string
  recipeTitle: string
  batchCode: string
  expiryDate: string
  station: string
  recipeStatus: string
  currentState: ProductionRuntimeState
  runtimePath: {
    step: number
    code: string
    label: string
    owner: string
    status: ProductionRuntimeGateStatus
  }[]
  stationTask: {
    taskId: string
    station: string
    title: string
    workerInstructionMode: "APPROVED_TASK_ONLY"
    requiresSupervisorCheck: boolean
    requiresQaGate: boolean
  }
  qaGate: {
    gateId: string
    coolingRequired: boolean
    allergenCheckRequired: boolean
    labelCheckRequired: boolean
    batchCodeCheckRequired: boolean
    releaseAuthority: "QA_OR_AUTHORIZED_MANAGER"
  }
  releaseControl: {
    canReleaseWithoutQa: false
    releaseStatus: ProductionRuntimeGateStatus
    releaseBlockedByDefault: boolean
    releaseNote: string
  }
  roleRuntimeView: {
    role: RecipeStudioRole
    summary: string
    allowedRuntimeActions: string[]
    blockedRuntimeActions: string[]
  }
  protectedRuntimeBoundaries: string[]
}

function createTaskId(recipeId: string, batchCode: string) {
  return `${recipeId}-${batchCode}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

function getRoleRuntimeView(role: RecipeStudioRole) {
  if (role === "owner") {
    return {
      summary:
        "Owner can see the full recipe-to-production runtime bridge, release confidence and operational governance.",
      allowedRuntimeActions: [
        "View runtime bridge",
        "View batch readiness",
        "View QA release dependency",
        "View protected operational boundaries",
        "Review release confidence",
      ],
      blockedRuntimeActions: [
        "Direct worker execution from owner view",
        "Bypass QA gate",
      ],
    }
  }

  if (role === "chef") {
    return {
      summary:
        "Chef can connect approved recipe readiness to batch production, station execution and QA handoff.",
      allowedRuntimeActions: [
        "View recipe-to-batch bridge",
        "View station task readiness",
        "Review SOP readiness",
        "Coordinate production release with QA",
      ],
      blockedRuntimeActions: [
        "Bypass QA release",
        "Expose owner margin confidence to worker",
      ],
    }
  }

  if (role === "qa") {
    return {
      summary:
        "QA can see safety gates, hold/release dependency and release control without costing.",
      allowedRuntimeActions: [
        "View QA gate",
        "View cooling dependency",
        "View allergen and label checks",
        "Hold batch",
        "Release or block when authorized",
      ],
      blockedRuntimeActions: [
        "View costing",
        "Edit recipe R&D data",
        "Update ingredient cost source",
      ],
    }
  }

  if (role === "worker") {
    return {
      summary:
        "Worker receives only the approved station task and does not receive costing, R&D or full recipe IP.",
      allowedRuntimeActions: [
        "View approved station task",
        "Follow step-by-step worker instructions",
        "Mark assigned task progress when connected to runtime",
      ],
      blockedRuntimeActions: [
        "View costing",
        "View R&D notes",
        "View full recipe IP",
        "Release batch",
        "Override QA hold",
      ],
    }
  }

  if (role === "purchasing-manager") {
    return {
      summary:
        "Purchasing Manager can see ingredient cost source, supplier readiness and purchasing impact before production release.",
      allowedRuntimeActions: [
        "View purchasing readiness",
        "View ingredient cost source",
        "View stock need",
        "Coordinate cost changes with Chef",
      ],
      blockedRuntimeActions: [
        "View owner margin confidence",
        "Release QA gate",
        "Execute worker task",
      ],
    }
  }

  if (role === "storekeeper") {
    return {
      summary:
        "Storekeeper can see stock issue and batch handover needs without recipe costing or protected R&D data.",
      allowedRuntimeActions: [
        "View stock need",
        "Confirm issue to production",
        "View batch handover state",
        "Escalate stock shortage",
      ],
      blockedRuntimeActions: [
        "View costing",
        "View R&D notes",
        "View full recipe IP",
        "Release QA gate",
      ],
    }
  }

  return {
    summary:
      "Production Manager can see station readiness, runtime bridge, QA dependency and production flow without costing.",
    allowedRuntimeActions: [
      "View runtime bridge",
      "View station readiness",
      "View QA dependency",
      "Coordinate production flow",
      "Escalate blocked batch",
    ],
    blockedRuntimeActions: [
      "View costing",
      "View ingredient cost source",
      "Bypass QA gate",
    ],
  }
}

export function createRecipeProductionRuntimeContract(
  input: RecipeProductionRuntimeContractInput,
): RecipeProductionRuntimeContract {
  const taskId = createTaskId(input.recipeId, input.batchCode)
  const roleRuntimeView = getRoleRuntimeView(input.role)

  return {
    contractVersion: "RS-3A",
    recipeId: input.recipeId,
    recipeTitle: input.recipeTitle,
    batchCode: input.batchCode,
    expiryDate: input.expiryDate,
    station: input.station,
    recipeStatus: input.status,
    currentState: "STATION_TASK_READY",
    runtimePath: [
      {
        step: 1,
        code: "RECIPE_APPROVED",
        label: "Approved recipe asset is available for production planning.",
        owner: "Chef / Owner",
        status: "READY",
      },
      {
        step: 2,
        code: "BATCH_READY",
        label: "Batch identity, expiry policy and station target are prepared.",
        owner: "Production Manager",
        status: "READY",
      },
      {
        step: 3,
        code: "STATION_TASK_READY",
        label: "Worker-facing approved task can be generated from this recipe.",
        owner: "Station Supervisor",
        status: "READY",
      },
      {
        step: 4,
        code: "QA_GATE_PENDING",
        label: "Cooling, allergen, label and batch checks must pass before release.",
        owner: "QA",
        status: "PENDING_QA",
      },
      {
        step: 5,
        code: "RELEASE_READY",
        label: "Batch can be released only after QA or authorized manager control.",
        owner: "QA / Authorized Manager",
        status: "NOT_STARTED",
      },
    ],
    stationTask: {
      taskId,
      station: input.station,
      title: input.recipeTitle,
      workerInstructionMode: "APPROVED_TASK_ONLY",
      requiresSupervisorCheck: true,
      requiresQaGate: true,
    },
    qaGate: {
      gateId: `${taskId}-qa-gate`,
      coolingRequired: true,
      allergenCheckRequired: true,
      labelCheckRequired: true,
      batchCodeCheckRequired: true,
      releaseAuthority: "QA_OR_AUTHORIZED_MANAGER",
    },
    releaseControl: {
      canReleaseWithoutQa: false,
      releaseStatus: "PENDING_QA",
      releaseBlockedByDefault: true,
      releaseNote:
        "Recipe Studio can prepare production runtime, but final release must pass QA / authorized manager control.",
    },
    roleRuntimeView: {
      role: input.role,
      ...roleRuntimeView,
    },
    protectedRuntimeBoundaries: [
      "Recipe Studio does not expose protected recipe data to worker runtime.",
      "Worker runtime receives approved task instructions only.",
      "Costing is controlled by Recipe Studio permission contract.",
      "QA release cannot be bypassed by station execution.",
      "Future production runtime should replace query-string role testing with session / tenant permissions.",
    ],
  }
}