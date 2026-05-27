export type G7YieldItem = {
  id: string

  displayName: string

  category:
    | "protein"
    | "carb"
    | "vegetable"
    | "fruit"

  rawToCookedMultiplier: number

  cookedToRawMultiplier: number

  cookingLossPercent: number

  notes?: string
}

export const G7_YIELD_SYSTEM: Record<
  string,
  G7YieldItem
> = {
  chicken_breast: {
    id: "chicken_breast",

    displayName: "Chicken Breast",

    category: "protein",

    rawToCookedMultiplier: 0.72,

    cookedToRawMultiplier: 1.38,

    cookingLossPercent: 28,

    notes:
      "Skinless boneless chicken breast grilled or baked.",
  },

  lean_beef: {
    id: "lean_beef",

    displayName: "Lean Beef",

    category: "protein",

    rawToCookedMultiplier: 0.75,

    cookedToRawMultiplier: 1.33,

    cookingLossPercent: 25,

    notes:
      "Lean minced beef or steak average yield.",
  },

  salmon: {
    id: "salmon",

    displayName: "Salmon",

    category: "protein",

    rawToCookedMultiplier: 0.8,

    cookedToRawMultiplier: 1.25,

    cookingLossPercent: 20,

    notes:
      "Pan-seared or baked salmon fillet.",
  },

  white_fish: {
    id: "white_fish",

    displayName: "White Fish",

    category: "protein",

    rawToCookedMultiplier: 0.82,

    cookedToRawMultiplier: 1.22,

    cookingLossPercent: 18,

    notes:
      "White fish fillet average cooked yield.",
  },

  shrimp: {
    id: "shrimp",

    displayName: "Shrimp",

    category: "protein",

    rawToCookedMultiplier: 0.78,

    cookedToRawMultiplier: 1.28,

    cookingLossPercent: 22,

    notes:
      "Peeled shrimp average yield after cooking.",
  },

  turkey_breast: {
    id: "turkey_breast",

    displayName: "Turkey Breast",

    category: "protein",

    rawToCookedMultiplier: 0.74,

    cookedToRawMultiplier: 1.35,

    cookingLossPercent: 26,

    notes:
      "Turkey breast grilled or baked.",
  },

  rice: {
    id: "rice",

    displayName: "Rice",

    category: "carb",

    rawToCookedMultiplier: 3,

    cookedToRawMultiplier: 0.33,

    cookingLossPercent: -200,

    notes:
      "100g raw rice yields around 300g cooked.",
  },

  pasta: {
    id: "pasta",

    displayName: "Pasta",

    category: "carb",

    rawToCookedMultiplier: 2.4,

    cookedToRawMultiplier: 0.42,

    cookingLossPercent: -140,

    notes:
      "Dry pasta cooked yield average.",
  },

  bulgur: {
    id: "bulgur",

    displayName: "Bulgur",

    category: "carb",

    rawToCookedMultiplier: 2.5,

    cookedToRawMultiplier: 0.4,

    cookingLossPercent: -150,

    notes:
      "Bulgur cooked yield average.",
  },

  couscous: {
    id: "couscous",

    displayName: "Couscous",

    category: "carb",

    rawToCookedMultiplier: 2.3,

    cookedToRawMultiplier: 0.43,

    cookingLossPercent: -130,

    notes:
      "Hydrated couscous yield.",
  },

  potato: {
    id: "potato",

    displayName: "Potato",

    category: "carb",

    rawToCookedMultiplier: 0.83,

    cookedToRawMultiplier: 1.2,

    cookingLossPercent: 17,

    notes:
      "Potato after peeling and roasting.",
  },

  sweet_potato: {
    id: "sweet_potato",

    displayName: "Sweet Potato",

    category: "carb",

    rawToCookedMultiplier: 0.85,

    cookedToRawMultiplier: 1.17,

    cookingLossPercent: 15,

    notes:
      "Sweet potato average roasting yield.",
  },

  oats: {
    id: "oats",

    displayName: "Oats",

    category: "carb",

    rawToCookedMultiplier: 2.2,

    cookedToRawMultiplier: 0.45,

    cookingLossPercent: -120,

    notes:
      "Oats absorb water after cooking.",
  },
}

// ==============================
// HELPERS
// ==============================

export function getYieldItem(id: string) {
  return G7_YIELD_SYSTEM[id]
}

export function cookedToRaw(
  cookedWeight: number,
  ingredientId: string
) {
  const item = getYieldItem(ingredientId)

  if (!item) {
    return cookedWeight
  }

  return Math.round(
    cookedWeight *
      item.cookedToRawMultiplier
  )
}

export function rawToCooked(
  rawWeight: number,
  ingredientId: string
) {
  const item = getYieldItem(ingredientId)

  if (!item) {
    return rawWeight
  }

  return Math.round(
    rawWeight *
      item.rawToCookedMultiplier
  )
}