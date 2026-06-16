export type RecipeStudioRole =
  | "owner"
  | "chef"
  | "qa"
  | "worker"
  | "purchasing-manager"
  | "storekeeper"
  | "production-manager"

export type RecipeStudioPermissionKey =
  | "canViewCosting"
  | "canViewYield"
  | "canViewMarginConfidence"
  | "canViewProtectedAssetConfidence"
  | "canViewFullRecipeIp"
  | "canViewSop"
  | "canViewTestingNotes"
  | "canViewIngredientSource"
  | "canViewIngredientCostSource"
  | "canUpdateIngredientCost"
  | "canCoordinatePurchasing"
  | "canViewAllergens"
  | "canViewCooling"
  | "canViewQaGates"
  | "canHoldBatch"
  | "canReleaseBatch"
  | "canApproveRecipe"
  | "canSubmitForApproval"
  | "canViewApprovedTask"
  | "canViewWorkerInstructionsOnly"
  | "canViewStockNeed"
  | "canConfirmIssueToProduction"
  | "canViewBatchRuntimeLink"

export type RecipeStudioPermissions = Record<RecipeStudioPermissionKey, boolean>

export type RecipeStudioRoleContract = {
  role: RecipeStudioRole
  label: string
  operationalPurpose: string
  permissions: RecipeStudioPermissions
  allowedDataLayers: string[]
  blockedDataLayers: string[]
}

const EMPTY_PERMISSIONS: RecipeStudioPermissions = {
  canViewCosting: false,
  canViewYield: false,
  canViewMarginConfidence: false,
  canViewProtectedAssetConfidence: false,
  canViewFullRecipeIp: false,
  canViewSop: false,
  canViewTestingNotes: false,
  canViewIngredientSource: false,
  canViewIngredientCostSource: false,
  canUpdateIngredientCost: false,
  canCoordinatePurchasing: false,
  canViewAllergens: false,
  canViewCooling: false,
  canViewQaGates: false,
  canHoldBatch: false,
  canReleaseBatch: false,
  canApproveRecipe: false,
  canSubmitForApproval: false,
  canViewApprovedTask: false,
  canViewWorkerInstructionsOnly: false,
  canViewStockNeed: false,
  canConfirmIssueToProduction: false,
  canViewBatchRuntimeLink: false,
}

function createPermissions(
  overrides: Partial<RecipeStudioPermissions>,
): RecipeStudioPermissions {
  return {
    ...EMPTY_PERMISSIONS,
    ...overrides,
  }
}

export const RECIPE_STUDIO_ROLE_CONTRACTS: Record<
  RecipeStudioRole,
  RecipeStudioRoleContract
> = {
  owner: {
    role: "owner",
    label: "Owner",
    operationalPurpose:
      "Owns commercial control, recipe asset confidence, margin visibility, release authority and tenant-level governance.",
    permissions: createPermissions({
      canViewCosting: true,
      canViewYield: true,
      canViewMarginConfidence: true,
      canViewProtectedAssetConfidence: true,
      canViewFullRecipeIp: true,
      canViewSop: true,
      canViewTestingNotes: true,
      canViewIngredientSource: true,
      canViewIngredientCostSource: true,
      canCoordinatePurchasing: true,
      canViewAllergens: true,
      canViewCooling: true,
      canViewQaGates: true,
      canReleaseBatch: true,
      canApproveRecipe: true,
      canViewBatchRuntimeLink: true,
    }),
    allowedDataLayers: [
      "Costing",
      "Yield",
      "Margin confidence",
      "Protected asset confidence",
      "Full recipe IP",
      "SOP",
      "Testing notes",
      "Ingredient source",
      "Ingredient cost source",
      "QA gates",
      "Batch release",
    ],
    blockedDataLayers: [],
  },

  chef: {
    role: "chef",
    label: "Chef",
    operationalPurpose:
      "Builds, tests, improves and approves recipe readiness with visibility over cost, yield and purchasing coordination.",
    permissions: createPermissions({
      canViewCosting: true,
      canViewYield: true,
      canViewFullRecipeIp: true,
      canViewSop: true,
      canViewTestingNotes: true,
      canViewIngredientSource: true,
      canViewIngredientCostSource: true,
      canCoordinatePurchasing: true,
      canViewAllergens: true,
      canViewQaGates: true,
      canSubmitForApproval: true,
      canApproveRecipe: true,
      canViewBatchRuntimeLink: true,
    }),
    allowedDataLayers: [
      "Costing",
      "Yield",
      "Recipe SOP",
      "Testing notes",
      "Ingredient source",
      "Ingredient cost source",
      "Purchasing coordination",
      "Approval readiness",
    ],
    blockedDataLayers: ["Owner margin confidence"],
  },

  qa: {
    role: "qa",
    label: "QA",
    operationalPurpose:
      "Controls food safety, allergen checks, cooling validation, QC gates, batch hold and release control.",
    permissions: createPermissions({
      canViewAllergens: true,
      canViewCooling: true,
      canViewQaGates: true,
      canHoldBatch: true,
      canReleaseBatch: true,
      canViewBatchRuntimeLink: true,
    }),
    allowedDataLayers: [
      "Allergens",
      "Cooling",
      "QC gates",
      "Batch hold",
      "Release control",
      "Batch runtime link",
    ],
    blockedDataLayers: [
      "Costing",
      "Yield cost",
      "Margin confidence",
      "R&D notes",
      "Full recipe IP",
      "Ingredient cost source",
    ],
  },

  worker: {
    role: "worker",
    label: "Worker",
    operationalPurpose:
      "Executes simple approved station tasks with clear instructions and no exposure to protected commercial or R&D data.",
    permissions: createPermissions({
      canViewApprovedTask: true,
      canViewWorkerInstructionsOnly: true,
    }),
    allowedDataLayers: ["Approved station task", "Worker instructions"],
    blockedDataLayers: [
      "Costing",
      "Yield cost",
      "Margin confidence",
      "R&D notes",
      "Full recipe IP",
      "Ingredient database details",
      "Ingredient cost source",
    ],
  },

  "purchasing-manager": {
    role: "purchasing-manager",
    label: "Purchasing Manager",
    operationalPurpose:
      "Coordinates ingredient cost, supplier source, purchasing readiness and recipe cost updates with the chef.",
    permissions: createPermissions({
      canViewCosting: true,
      canViewYield: true,
      canViewIngredientSource: true,
      canViewIngredientCostSource: true,
      canUpdateIngredientCost: true,
      canCoordinatePurchasing: true,
      canViewStockNeed: true,
    }),
    allowedDataLayers: [
      "Ingredient cost source",
      "Supplier source",
      "Recipe cost inputs",
      "Yield impact",
      "Stock need",
      "Purchasing coordination",
    ],
    blockedDataLayers: [
      "Owner margin confidence",
      "Full protected recipe IP",
      "Worker task execution",
      "QA release authority",
    ],
  },

  storekeeper: {
    role: "storekeeper",
    label: "Storekeeper",
    operationalPurpose:
      "Controls stock issue, ingredient availability, batch preparation needs and production handover from storage.",
    permissions: createPermissions({
      canViewIngredientSource: true,
      canViewStockNeed: true,
      canConfirmIssueToProduction: true,
      canViewBatchRuntimeLink: true,
    }),
    allowedDataLayers: [
      "Ingredient need",
      "Stock link",
      "Issue to production",
      "Batch runtime link",
    ],
    blockedDataLayers: [
      "Costing",
      "Margin confidence",
      "R&D notes",
      "Full recipe IP",
      "QA release decision",
    ],
  },

  "production-manager": {
    role: "production-manager",
    label: "Production Manager",
    operationalPurpose:
      "Controls production readiness, batch runtime link, station pressure, release coordination and operational flow.",
    permissions: createPermissions({
      canViewYield: true,
      canViewSop: true,
      canViewIngredientSource: true,
      canViewAllergens: true,
      canViewQaGates: true,
      canViewStockNeed: true,
      canViewBatchRuntimeLink: true,
    }),
    allowedDataLayers: [
      "Yield",
      "SOP",
      "Ingredient source",
      "QA gate status",
      "Stock need",
      "Batch runtime link",
    ],
    blockedDataLayers: [
      "Costing",
      "Margin confidence",
      "Ingredient cost source",
      "R&D private notes",
    ],
  },
}

export function normalizeRecipeStudioRole(
  value: string | null,
): RecipeStudioRole {
  if (
    value === "chef" ||
    value === "qa" ||
    value === "worker" ||
    value === "purchasing-manager" ||
    value === "storekeeper" ||
    value === "production-manager"
  ) {
    return value
  }

  return "owner"
}

export function getRecipeStudioRoleContract(
  role: RecipeStudioRole,
): RecipeStudioRoleContract {
  return RECIPE_STUDIO_ROLE_CONTRACTS[role]
}

export function getRecipeStudioPermissions(
  role: RecipeStudioRole,
): RecipeStudioPermissions {
  return getRecipeStudioRoleContract(role).permissions
}

export function canViewRecipeCosting(role: RecipeStudioRole) {
  return getRecipeStudioPermissions(role).canViewCosting
}

export function canViewRecipeYield(role: RecipeStudioRole) {
  return getRecipeStudioPermissions(role).canViewYield
}

export function canViewFullRecipeIp(role: RecipeStudioRole) {
  return getRecipeStudioPermissions(role).canViewFullRecipeIp
}

export function canViewWorkerInstructionsOnly(role: RecipeStudioRole) {
  return getRecipeStudioPermissions(role).canViewWorkerInstructionsOnly
}