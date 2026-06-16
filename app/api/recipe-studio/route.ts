import { NextRequest, NextResponse } from "next/server"

import {
  G7_RECIPES,
  createBatchCode,
  getExpiryDate,
  getRecipeCost,
  getRecipeCostPerYield,
} from "../../ai/g7-recipe-system"

import { ingredientDB } from "../../ai/ingredient-db"

import {
  RecipeStudioRole,
  canViewRecipeCosting,
  getRecipeStudioRoleContract,
  normalizeRecipeStudioRole,
} from "../../ai/recipe-studio-permissions"

import {
  RecipeProductionRuntimeContract,
  createRecipeProductionRuntimeContract,
} from "../../ai/recipe-production-runtime-contract"

export const dynamic = "force-dynamic"

type StudioRole = RecipeStudioRole

type AnyRecord = Record<string, unknown>

type IngredientSource = {
  name: string
  sourceStatus: string
  allergens: string[]
  rawToCookedYield: unknown
}

type CostingLayer = {
  visible: true
  currencySource: string
  totalCost: unknown
  costPerYield: unknown
  marginSignal: string
  note: string
}

type YieldLayer = {
  yieldSource: string
  costPerYield: unknown
  operationalNote: string
}

type SanitizedRecipe = {
  id: string
  title: string
  station: string
  status: string
  batchCode: unknown
  expiryDate: unknown
  productionRuntime?: RecipeProductionRuntimeContract
  legacyMetadata: {
    category: unknown
    dietaryPlan: unknown
    cuisine: unknown
    tags: unknown
  }
  costing?: CostingLayer
  yield?: YieldLayer
  protectedAssetConfidence?: string[]
  chefSop?: string[]
  testing?: string[]
  approvalReadiness?: string[]
  ingredientSources?: IngredientSource[]
  qaGates?: string[]
  cooling?: string[]
  allergens?: string[]
  releaseControl?: string[]
  purchasingControl?: string[]
  stockControl?: string[]
  productionControl?: string[]
  approvedTask?: {
    title: string
    station: string
    comfortNote: string
    visibleInstructions: string[]
    hiddenFromWorker: string[]
  }
}

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function toRecordArray(value: unknown): AnyRecord[] {
  if (Array.isArray(value)) {
    return value.filter(isRecord)
  }

  if (isRecord(value)) {
    return Object.values(value).filter(isRecord)
  }

  return []
}

function readField(source: AnyRecord, keys: string[], fallback: unknown = null) {
  for (const key of keys) {
    if (source[key] !== undefined && source[key] !== null && source[key] !== "") {
      return source[key]
    }
  }

  return fallback
}

function readString(source: AnyRecord, keys: string[], fallback: string) {
  const value = readField(source, keys, fallback)

  if (typeof value === "string" && value.trim()) {
    return value.trim()
  }

  if (typeof value === "number") {
    return String(value)
  }

  return fallback
}

function readTextArray(source: AnyRecord, keys: string[], fallback: string[]) {
  const value = readField(source, keys, null)

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item.trim()

        if (isRecord(item)) {
          return readString(
            item,
            ["title", "name", "step", "instruction", "description", "note"],
            "",
          )
        }

        return ""
      })
      .filter(Boolean)
      .slice(0, 8)
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split(/\n|\r|\. /)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 8)
  }

  return fallback
}

function readIngredientNames(recipe: AnyRecord) {
  const rawIngredients = readField(
    recipe,
    ["ingredients", "ingredientList", "recipeIngredients", "components"],
    [],
  )

  if (!Array.isArray(rawIngredients)) return []

  return rawIngredients
    .map((ingredient) => {
      if (typeof ingredient === "string") return ingredient.trim()

      if (isRecord(ingredient)) {
        return readString(
          ingredient,
          ["name", "ingredient", "ingredientName", "item", "title"],
          "",
        )
      }

      return ""
    })
    .filter(Boolean)
    .slice(0, 12)
}

function safeHelperCall(
  helper: (...args: unknown[]) => unknown,
  recipeId: string,
  recipe: AnyRecord,
) {
  try {
    const byId = helper(recipeId)
    if (byId !== undefined && byId !== null) return byId
  } catch {
    // Try recipe object below.
  }

  try {
    const byRecipe = helper(recipe)
    if (byRecipe !== undefined && byRecipe !== null) return byRecipe
  } catch {
    // Return null if helper shape is different.
  }

  return null
}

function sanitizeCostingValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sanitizeCostingValue)
  }

  if (!isRecord(value)) {
    return value
  }

  const cleaned: AnyRecord = {}

  for (const [key, nestedValue] of Object.entries(value)) {
    const keyLooksLikeHardCodedCurrency =
      /currency|currencyCode|currencySymbol|egp|usd|qar|bhd|aed|sar/i.test(key)

    if (keyLooksLikeHardCodedCurrency) continue

    cleaned[key] = sanitizeCostingValue(nestedValue)
  }

  return cleaned
}

function buildCostingLayers(
  recipe: AnyRecord,
  recipeId: string,
  role: StudioRole,
): {
  costing: CostingLayer
  yield: YieldLayer
} {
  const totalCost = sanitizeCostingValue(
    safeHelperCall(
      getRecipeCost as unknown as (...args: unknown[]) => unknown,
      recipeId,
      recipe,
    ),
  )

  const costPerYield = sanitizeCostingValue(
    safeHelperCall(
      getRecipeCostPerYield as unknown as (...args: unknown[]) => unknown,
      recipeId,
      recipe,
    ),
  )

  const isOwner = role === "owner"
  const isChef = role === "chef"
  const isPurchasing = role === "purchasing-manager"

  return {
    costing: {
      visible: true,
      currencySource: "tenant.settings.currency",
      totalCost,
      costPerYield,
      marginSignal: isOwner
        ? "Owner commercial layer. Currency, locale, country, units and timezone must come from tenant settings."
        : isChef
          ? "Chef costing layer. Chef can review recipe cost and yield because costing is part of R&D and purchasing coordination."
          : isPurchasing
            ? "Purchasing cost layer. Purchasing Manager can coordinate ingredient price, supplier source and recipe cost inputs with Chef."
            : "Authorized costing layer. Access is controlled by the Recipe Studio permission contract.",
      note: isOwner
        ? "Owner can see commercial costing and margin confidence. Production must later authorize this by session permissions, not URL query params."
        : isChef
          ? "Chef can see costing for recipe development, purchasing coordination, yield testing and approval readiness. Worker and QA views do not receive this layer."
          : isPurchasing
            ? "Purchasing Manager can see costing inputs and ingredient cost source without receiving full protected recipe IP."
            : "Costing visibility is granted only through the centralized Recipe Studio permission contract.",
    },
    yield: {
      yieldSource: "Protected recipe and ingredient asset",
      costPerYield,
      operationalNote: isOwner
        ? "Use this layer to protect food cost, yield, batch sizing and margin confidence when team members change."
        : isChef
          ? "Chef uses this layer to validate yield, portioning, ingredient usage and purchasing cost before recipe approval."
          : isPurchasing
            ? "Purchasing uses this layer to understand ingredient usage impact on recipe cost and supplier planning."
            : "Yield visibility is controlled by Recipe Studio permissions.",
    },
  }
}

function getIngredientProfile(name: string): AnyRecord | null {
  const dbValue = ingredientDB as unknown

  if (Array.isArray(dbValue)) {
    const matched = dbValue.find((item) => {
      if (!isRecord(item)) return false

      const itemName = readString(
        item,
        ["name", "ingredient", "ingredientName", "id", "title"],
        "",
      )

      return itemName.toLowerCase() === name.toLowerCase()
    })

    return isRecord(matched) ? matched : null
  }

  if (isRecord(dbValue)) {
    const direct = dbValue[name]

    if (isRecord(direct)) return direct

    const matched = Object.values(dbValue).find((item) => {
      if (!isRecord(item)) return false

      const itemName = readString(
        item,
        ["name", "ingredient", "ingredientName", "id", "title"],
        "",
      )

      return itemName.toLowerCase() === name.toLowerCase()
    })

    return isRecord(matched) ? matched : null
  }

  return null
}

function buildIngredientSources(recipe: AnyRecord): IngredientSource[] {
  return readIngredientNames(recipe)
    .slice(0, 8)
    .map((name) => {
      const profile = getIngredientProfile(name)

      const allergens = profile
        ? readTextArray(profile, ["allergens", "allergenList"], [])
        : []

      return {
        name,
        sourceStatus: profile
          ? "Matched inside protected ingredient database"
          : "Recipe source only",
        allergens,
        rawToCookedYield: profile
          ? readField(profile, ["rawToCookedYield", "yield", "cookedYield"], null)
          : null,
      }
    })
}

function sanitizeRecipeCode(value: string) {
  const cleaned = value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32)

  return cleaned || "RECIPE"
}

function getTodayCode() {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")

  return `${year}${month}${day}`
}

function sanitizeBatchCode(value: unknown, recipeId: string) {
  if (typeof value === "string") {
    const cleaned = value.trim()

    const isInvalid =
      !cleaned ||
      cleaned.toLowerCase().includes("undefined") ||
      cleaned.toLowerCase().includes("null") ||
      cleaned.toLowerCase().includes("invalid")

    if (!isInvalid) return cleaned
  }

  const safeRecipeCode = sanitizeRecipeCode(recipeId || "RECIPE")

  return `${safeRecipeCode}-${getTodayCode()}`
}

function sanitizeExpiryDate(value: unknown) {
  if (typeof value === "string") {
    const cleaned = value.trim()

    const isInvalid =
      !cleaned ||
      cleaned.toLowerCase().includes("invalid") ||
      cleaned.toLowerCase().includes("undefined") ||
      cleaned.toLowerCase().includes("null")

    if (!isInvalid) return cleaned
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }

  return "Controlled by tenant.recipeExpiryPolicy"
}

function buildBaseRecipe(
  recipe: AnyRecord,
  role: StudioRole,
): SanitizedRecipe {
  const id = readString(recipe, ["id", "recipeId", "code", "slug"], "recipe")
  const title = readString(
    recipe,
    ["name", "title", "recipe", "dishName"],
    "Untitled Recipe",
  )
  const station = readString(
    recipe,
    ["station", "productionStation", "section", "kitchenStation"],
    "Recipe Studio",
  )
  const status = readString(
    recipe,
    ["status", "approvalStatus", "recipeStatus"],
    "APPROVED_RECIPE_ASSET",
  )

  const rawBatchCode = safeHelperCall(
    createBatchCode as unknown as (...args: unknown[]) => unknown,
    id,
    recipe,
  )

  const rawExpiryDate = safeHelperCall(
    getExpiryDate as unknown as (...args: unknown[]) => unknown,
    id,
    recipe,
  )

  const batchCode = sanitizeBatchCode(rawBatchCode, id)
  const expiryDate = sanitizeExpiryDate(rawExpiryDate)

  return {
    id,
    title,
    station,
    status,
    batchCode,
    expiryDate,
    productionRuntime: createRecipeProductionRuntimeContract({
      role,
      recipeId: id,
      recipeTitle: title,
      station,
      status,
      batchCode: String(batchCode),
      expiryDate: String(expiryDate),
    }),
    legacyMetadata: {
      category: readField(recipe, ["category", "legacyCategory"], null),
      dietaryPlan: readField(
        recipe,
        ["dietaryPlan", "plan", "legacyPlan", "planCategory"],
        null,
      ),
      cuisine: readField(recipe, ["cuisine", "cuisineType"], null),
      tags: readField(recipe, ["tags", "labels"], []),
    },
  }
}

function withCostingIfAllowed(
  recipe: SanitizedRecipe,
  sourceRecipe: AnyRecord,
  role: StudioRole,
): SanitizedRecipe {
  if (!canViewRecipeCosting(role)) {
    return recipe
  }

  const costingLayers = buildCostingLayers(sourceRecipe, recipe.id, role)

  return {
    ...recipe,
    ...costingLayers,
  }
}

function buildOwnerRecipe(recipe: AnyRecord): SanitizedRecipe {
  const base = withCostingIfAllowed(
    buildBaseRecipe(recipe, "owner"),
    recipe,
    "owner",
  )

  return {
    ...base,
    protectedAssetConfidence: [
      "Recipe data stays server-side.",
      "Ingredient database stays server-side.",
      "Client receives only sanitized role payload.",
      "No hard-coded currency is used in the UI contract.",
      "Owner sees commercial cost, yield, batch and margin confidence.",
      "RS-3A links approved recipe assets to production runtime contract.",
    ],
  }
}

function buildChefRecipe(recipe: AnyRecord): SanitizedRecipe {
  const base = withCostingIfAllowed(
    buildBaseRecipe(recipe, "chef"),
    recipe,
    "chef",
  )

  return {
    ...base,
    chefSop: readTextArray(recipe, ["sop", "steps", "recipeSteps", "method"], [
      "Review approved mise en place before production.",
      "Validate cooking method against the current SOP.",
      "Record testing notes before approval release.",
      "Escalate any deviation to Chef approval.",
    ]),
    testing: readTextArray(
      recipe,
      ["testing", "testingNotes", "rdNotes", "chefNotes"],
      [
        "Taste, texture, yield and plating should be checked before release.",
        "Any change must return to Recipe Studio approval before production use.",
      ],
    ),
    approvalReadiness: [
      "SOP available for chef review.",
      "Chef can review recipe cost and yield.",
      "Chef can coordinate ingredient cost with Purchasing Manager.",
      "Ingredient source visible to chef role.",
      "Recipe is now connected to production runtime contract.",
      "Ready for future Chef Signature / approval workflow connection.",
    ],
    ingredientSources: buildIngredientSources(recipe),
  }
}

function buildQaRecipe(recipe: AnyRecord): SanitizedRecipe {
  const base = buildBaseRecipe(recipe, "qa")
  const ingredientSources = buildIngredientSources(recipe)

  const allergens = Array.from(
    new Set(
      ingredientSources.flatMap((source) => {
        return source.allergens.length ? source.allergens : []
      }),
    ),
  )

  return {
    ...base,
    allergens,
    cooling: readTextArray(
      recipe,
      ["cooling", "coolingRules", "coolingSop", "qaCooling"],
      [
        "Confirm batch temperature before release.",
        "Hold batch if cooling time or temperature is outside QA limits.",
        "Record QA gate result before packaging or dispatch.",
      ],
    ),
    qaGates: readTextArray(recipe, ["qaGates", "qcGates", "qualityGates"], [
      "Allergen check",
      "Cooling check",
      "Label check",
      "Batch code check",
      "Release authority check",
    ]),
    releaseControl: [
      "QA can review safety gates without seeing costing.",
      "QA can block release if allergen, cooling, label or batch data is unsafe.",
      "Recipe runtime cannot be released without QA / authorized manager control.",
      "Release authority should later connect to real approval permissions.",
    ],
  }
}

function buildWorkerRecipe(recipe: AnyRecord): SanitizedRecipe {
  const base = buildBaseRecipe(recipe, "worker")

  return {
    id: base.id,
    title: base.title,
    station: base.station,
    status: base.status,
    batchCode: base.batchCode,
    expiryDate: base.expiryDate,
    productionRuntime: base.productionRuntime,
    legacyMetadata: base.legacyMetadata,
    approvedTask: {
      title: base.title,
      station: base.station,
      comfortNote:
        "This view is intentionally simple. Follow the approved station task and ask the supervisor if anything looks different.",
      visibleInstructions: [
        "Check the batch code on your station screen.",
        "Use only the prepared mise en place assigned to this batch.",
        "Follow the approved station task step-by-step.",
        "Mark the task complete only after supervisor or QA check when required.",
      ],
      hiddenFromWorker: [
        "Owner costing",
        "Chef costing",
        "Purchasing cost source",
        "Margin data",
        "R&D notes",
        "Full protected recipe IP",
        "Ingredient database details",
        "QA release authority",
      ],
    },
  }
}

function buildPurchasingManagerRecipe(recipe: AnyRecord): SanitizedRecipe {
  const base = withCostingIfAllowed(
    buildBaseRecipe(recipe, "purchasing-manager"),
    recipe,
    "purchasing-manager",
  )

  return {
    ...base,
    ingredientSources: buildIngredientSources(recipe),
    purchasingControl: [
      "Review ingredient cost source with Chef.",
      "Update supplier or price source only through approved purchasing permissions.",
      "Validate cost impact before recipe approval.",
      "Coordinate stock availability before production release.",
      "Confirm purchasing readiness before recipe-to-production release.",
    ],
  }
}

function buildStorekeeperRecipe(recipe: AnyRecord): SanitizedRecipe {
  const base = buildBaseRecipe(recipe, "storekeeper")

  return {
    ...base,
    ingredientSources: buildIngredientSources(recipe),
    stockControl: [
      "Check ingredient availability for the batch.",
      "Confirm issue to production before station start.",
      "Escalate shortage before production release.",
      "Confirm batch handover state against runtime contract.",
      "Do not expose costing or R&D recipe IP in storekeeper view.",
    ],
  }
}

function buildProductionManagerRecipe(recipe: AnyRecord): SanitizedRecipe {
  const base = buildBaseRecipe(recipe, "production-manager")

  return {
    ...base,
    ingredientSources: buildIngredientSources(recipe),
    productionControl: [
      "Review recipe readiness before production scheduling.",
      "Confirm batch runtime link before station assignment.",
      "Coordinate QA gate status before release.",
      "Escalate stock or station pressure before batch start.",
      "Use runtime contract to connect recipe to future production execution.",
    ],
  }
}

function buildRecipesForRole(role: StudioRole) {
  const recipes = toRecordArray(G7_RECIPES).slice(0, 12)

  if (role === "worker") return recipes.map(buildWorkerRecipe)
  if (role === "chef") return recipes.map(buildChefRecipe)
  if (role === "qa") return recipes.map(buildQaRecipe)
  if (role === "purchasing-manager") {
    return recipes.map(buildPurchasingManagerRecipe)
  }
  if (role === "storekeeper") return recipes.map(buildStorekeeperRecipe)
  if (role === "production-manager") {
    return recipes.map(buildProductionManagerRecipe)
  }

  return recipes.map(buildOwnerRecipe)
}

function getRoleSummary(role: StudioRole) {
  const contract = getRecipeStudioRoleContract(role)

  return contract.operationalPurpose
}

export async function GET(request: NextRequest) {
  const role = normalizeRecipeStudioRole(request.nextUrl.searchParams.get("role"))
  const contract = getRecipeStudioRoleContract(role)
  const recipes = buildRecipesForRole(role)

  return NextResponse.json(
    {
      patch: "RS-3A",
      system: "G7 Kitchen OS — Recipe Studio",
      role,
      roleLabel: contract.label,
      roleSummary: getRoleSummary(role),
      permissions: contract.permissions,
      allowedDataLayers: contract.allowedDataLayers,
      blockedDataLayers: contract.blockedDataLayers,
      costingVisible: contract.permissions.canViewCosting,
      productionRuntimeContract: {
        enabled: true,
        contractVersion: "RS-3A",
        source: "app/ai/recipe-production-runtime-contract.ts",
        path:
          "Recipe → Batch Code → Station Task → Worker Runtime → QA Gate → Release Control",
      },
      roleSource:
        "Temporary test role from query string. Production must use session / user / tenant permissions.",
      tenantSettings: {
        currency: "tenant.settings.currency",
        locale: "tenant.settings.locale",
        country: "tenant.settings.country",
        timezone: "tenant.settings.timezone",
        units: "tenant.settings.units",
      },
      security: {
        protectedRecipeDataServerSide: true,
        protectedIngredientDataServerSide: true,
        clientReceivesSanitizedPayload: true,
        directClientImportOfProtectedAssets: false,
        centralizedPermissionContract: true,
        permissionContractSource: "app/ai/recipe-studio-permissions.ts",
        productionRuntimeContractSource:
          "app/ai/recipe-production-runtime-contract.ts",
        costingAllowedRoles: ["owner", "chef", "purchasing-manager"],
        costingBlockedRoles: [
          "qa",
          "worker",
          "storekeeper",
          "production-manager",
        ],
      },
      recipes,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  )
}