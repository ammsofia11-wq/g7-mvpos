import { NextRequest, NextResponse } from "next/server"

import {
  G7_RECIPES,
  createBatchCode,
  getExpiryDate,
  getRecipeCost,
  getRecipeCostPerYield,
} from "../../ai/g7-recipe-system"

import { ingredientDB } from "../../ai/ingredient-db"

export const dynamic = "force-dynamic"

type StudioRole = "owner" | "chef" | "qa" | "worker"

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
  ownerOnly: boolean,
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

  return {
    costing: {
      visible: true,
      currencySource: "tenant.settings.currency",
      totalCost,
      costPerYield,
      marginSignal: ownerOnly
        ? "Owner commercial layer. Currency, locale, country, units and timezone must come from tenant settings."
        : "Chef costing layer. Chef can review recipe cost and yield because costing is part of R&D and purchasing coordination.",
      note: ownerOnly
        ? "Owner can see commercial costing and margin confidence. Production must later authorize this by session permissions, not URL query params."
        : "Chef can see costing for recipe development, purchasing coordination, yield testing and approval readiness. Worker and QA views do not receive this layer.",
    },
    yield: {
      yieldSource: "Protected recipe and ingredient asset",
      costPerYield,
      operationalNote: ownerOnly
        ? "Use this layer to protect food cost, yield, batch sizing and margin confidence when team members change."
        : "Chef uses this layer to validate yield, portioning, ingredient usage and purchasing cost before recipe approval.",
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

function buildBaseRecipe(recipe: AnyRecord): SanitizedRecipe {
  const id = readString(recipe, ["id", "recipeId", "code", "slug"], "recipe")
  const title = readString(
    recipe,
    ["name", "title", "recipe", "dishName"],
    "Untitled Recipe",
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
    station: readString(
      recipe,
      ["station", "productionStation", "section", "kitchenStation"],
      "Recipe Studio",
    ),
    status: readString(
      recipe,
      ["status", "approvalStatus", "recipeStatus"],
      "APPROVED_RECIPE_ASSET",
    ),
    batchCode,
    expiryDate,
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

function buildOwnerRecipe(recipe: AnyRecord): SanitizedRecipe {
  const base = buildBaseRecipe(recipe)
  const costingLayers = buildCostingLayers(recipe, base.id, true)

  return {
    ...base,
    ...costingLayers,
    protectedAssetConfidence: [
      "Recipe data stays server-side.",
      "Ingredient database stays server-side.",
      "Client receives only sanitized role payload.",
      "No hard-coded currency is used in the UI contract.",
      "Owner sees commercial cost, yield, batch and margin confidence.",
    ],
  }
}

function buildChefRecipe(recipe: AnyRecord): SanitizedRecipe {
  const base = buildBaseRecipe(recipe)
  const costingLayers = buildCostingLayers(recipe, base.id, false)

  return {
    ...base,
    ...costingLayers,
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
      "Ready for future Chef Signature / approval workflow connection.",
    ],
    ingredientSources: buildIngredientSources(recipe),
  }
}

function buildQaRecipe(recipe: AnyRecord): SanitizedRecipe {
  const base = buildBaseRecipe(recipe)
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
      "Release authority should later connect to real approval permissions.",
    ],
  }
}

function buildWorkerRecipe(recipe: AnyRecord): SanitizedRecipe {
  const base = buildBaseRecipe(recipe)

  return {
    id: base.id,
    title: base.title,
    station: base.station,
    status: base.status,
    batchCode: base.batchCode,
    expiryDate: base.expiryDate,
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
        "Margin data",
        "R&D notes",
        "Full protected recipe IP",
        "Ingredient database details",
      ],
    },
  }
}

function normalizeRole(value: string | null): StudioRole {
  if (value === "chef" || value === "qa" || value === "worker") {
    return value
  }

  return "owner"
}

function buildRecipesForRole(role: StudioRole) {
  const recipes = toRecordArray(G7_RECIPES).slice(0, 12)

  if (role === "worker") return recipes.map(buildWorkerRecipe)
  if (role === "chef") return recipes.map(buildChefRecipe)
  if (role === "qa") return recipes.map(buildQaRecipe)

  return recipes.map(buildOwnerRecipe)
}

function getRoleSummary(role: StudioRole) {
  if (role === "owner") {
    return "Owner sees cost, yield, batch and protected asset confidence."
  }

  if (role === "chef") {
    return "Chef sees SOP, testing, approval readiness, ingredient source, costing and yield for purchasing coordination."
  }

  if (role === "qa") {
    return "QA sees cooling, allergens, QC gates and release control without costing."
  }

  return "Worker sees a simple approved task view only, without cost, R&D or full recipe IP."
}

export async function GET(request: NextRequest) {
  const role = normalizeRole(request.nextUrl.searchParams.get("role"))
  const recipes = buildRecipesForRole(role)

  return NextResponse.json(
    {
      patch: "RS-2C-FIX2",
      system: "G7 Kitchen OS — Recipe Studio",
      role,
      roleSummary: getRoleSummary(role),
      costingVisible: role === "owner" || role === "chef",
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
        costingAllowedRoles: ["owner", "chef"],
        costingBlockedRoles: ["qa", "worker"],
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