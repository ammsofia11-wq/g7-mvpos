import { NextResponse } from "next/server"

import {
  G7_RECIPES,
  createBatchCode,
  getExpiryDate,
  getRecipeCost,
  getRecipeCostPerYield,
} from "../../ai/g7-recipe-system"

import { ingredientDB } from "../../ai/ingredient-db"

type RecipeStudioRole = "owner" | "chef" | "qa" | "worker"

type SafeIngredientPreview = {
  name: string
  category: string
  unit: string
  nutritionAvailable: boolean
  yieldAvailable: boolean
  allergens: string[]
}

type SafeRecipePreview = {
  id: string
  name: string
  category: string
  station: string
  type: string
  baseYield: number
  yieldUnit: string
  estimatedMinutes: number
  shelfLifeDays: number
  storageTemp: string
  batchCode: string
  expiryDate: string
  ingredients: SafeIngredientPreview[]
  sop: {
    preparation: string[]
    cooking: string[]
    storage: string[]
    packaging: string[]
  }
  protection: {
    role: RecipeStudioRole
    costingVisible: boolean
    protectedFields: string[]
    safeClientView: string[]
  }
  costing?: {
    totalCost: number
    costPerYield: number
    note: string
  }
}

function normalizeRole(role: string | null): RecipeStudioRole {
  if (role === "owner" || role === "chef" || role === "qa" || role === "worker") {
    return role
  }

  return "chef"
}

function findIngredientByName(name: string) {
  const normalized = name.trim().toLowerCase()

  return ingredientDB.find((ingredient) => {
    return ingredient.name.trim().toLowerCase() === normalized
  })
}

function getRoleProtection(role: RecipeStudioRole) {
  if (role === "owner") {
    return {
      costingVisible: true,
      protectedFields: [],
      safeClientView: [
        "recipe",
        "ingredients",
        "sop",
        "yield",
        "costing",
        "batch",
        "expiry",
      ],
    }
  }

  if (role === "chef") {
    return {
      costingVisible: false,
      protectedFields: ["costing", "supplier prices", "margin"],
      safeClientView: [
        "recipe",
        "ingredients",
        "sop",
        "yield",
        "batch",
        "expiry",
      ],
    }
  }

  if (role === "qa") {
    return {
      costingVisible: false,
      protectedFields: [
        "costing",
        "supplier prices",
        "margin",
        "draft R&D notes",
      ],
      safeClientView: [
        "recipe",
        "allergens",
        "cooling",
        "storage",
        "expiry",
        "qc gates",
      ],
    }
  }

  return {
    costingVisible: false,
    protectedFields: [
      "costing",
      "supplier prices",
      "margin",
      "draft R&D notes",
      "unapproved recipe versions",
      "full recipe IP",
    ],
    safeClientView: ["approved task", "station", "step", "checkpoint"],
  }
}

function sanitizeRecipeForRole(
  recipeId: string | null,
  role: RecipeStudioRole
): SafeRecipePreview | null {
  const recipe =
    G7_RECIPES.find((item) => item.id === recipeId) ?? G7_RECIPES[0]

  if (!recipe) return null

  const protection = getRoleProtection(role)

  const safeIngredients = recipe.ingredients.map((recipeIngredient) => {
    const masterIngredient = findIngredientByName(recipeIngredient.name)

    return {
      name: recipeIngredient.name,
      category: masterIngredient?.category ?? "other",
      unit: masterIngredient?.unit ?? recipeIngredient.unit,
      nutritionAvailable: Boolean(masterIngredient),
      yieldAvailable: Boolean(masterIngredient?.rawToCookedYield),
      allergens: masterIngredient?.allergens ?? [],
    }
  })

  const safeRecipe: SafeRecipePreview = {
    id: recipe.id,
    name: recipe.name,
    category: recipe.category,
    station: recipe.station,
    type: recipe.type,
    baseYield: recipe.baseYield,
    yieldUnit: recipe.yieldUnit,
    estimatedMinutes: recipe.estimatedMinutes,
    shelfLifeDays: recipe.shelfLifeDays,
    storageTemp: recipe.storageTemp,
    batchCode: createBatchCode(recipe),
    expiryDate: getExpiryDate(recipe),
    ingredients: safeIngredients,
    sop: {
      preparation: role === "worker" ? [] : recipe.sop.preparation,
      cooking: role === "worker" ? [] : recipe.sop.cooking,
      storage:
        role === "worker"
          ? ["Follow assigned storage checkpoint only"]
          : recipe.sop.storage,
      packaging:
        role === "worker"
          ? ["Follow assigned packaging checkpoint only"]
          : recipe.sop.packaging,
    },
    protection: {
      role,
      costingVisible: protection.costingVisible,
      protectedFields: protection.protectedFields,
      safeClientView: protection.safeClientView,
    },
  }

  if (protection.costingVisible) {
    safeRecipe.costing = {
      totalCost: Number(getRecipeCost(recipe).toFixed(2)),
      costPerYield: Number(getRecipeCostPerYield(recipe).toFixed(2)),
      note: "Visible to owner role only. Currency must come from tenant settings.",
    }
  }

  return safeRecipe
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const role = normalizeRole(searchParams.get("role"))
  const recipeId = searchParams.get("recipeId")

  const recipe = sanitizeRecipeForRole(recipeId, role)

  if (!recipe) {
    return NextResponse.json(
      {
        ok: false,
        error: "No recipe source available",
      },
      { status: 404 }
    )
  }

  return NextResponse.json({
    ok: true,
    source: "server-safe-recipe-studio-contract",
    recipe,
  })
}