export type IngredientCategory =
  | "protein"
  | "carb"
  | "fat"
  | "vegetable"
  | "fruit"
  | "sauce"
  | "spice"
  | "dairy"
  | "drink"
  | "other"

export type IngredientUnit =
  | "g"
  | "ml"
  | "piece"
  | "scoop"
  | "tbsp"
  | "tsp"

export type IngredientData = {
  id: string
  name: string
  arabicName: string
  category: IngredientCategory
  unit: IngredientUnit

  kcalPer100: number
  proteinPer100: number
  carbsPer100: number
  fatPer100: number
  fiberPer100: number

  pricePer100g: number
  rawToCookedYield: number

  tags: string[]
  allergens?: string[]
}

export const ingredientDB: IngredientData[] = [
  {
    id: "chicken_breast",
    name: "Chicken Breast",
    arabicName: "صدور دجاج",
    category: "protein",
    unit: "g",
    kcalPer100: 120,
    proteinPer100: 23,
    carbsPer100: 0,
    fatPer100: 2.5,
    fiberPer100: 0,
    pricePer100g: 2,
    rawToCookedYield: 0.72,
    tags: ["lean", "gym", "budget", "high-protein"],
  },

  {
    id: "lean_beef",
    name: "Lean Beef",
    arabicName: "لحم بقري قليل الدهن",
    category: "protein",
    unit: "g",
    kcalPer100: 170,
    proteinPer100: 22,
    carbsPer100: 0,
    fatPer100: 8,
    fiberPer100: 0,
    pricePer100g: 4.5,
    rawToCookedYield: 0.75,
    tags: ["bulk", "premium", "high-protein"],
  },

  {
    id: "tuna_water",
    name: "Tuna in Water",
    arabicName: "تونة بالماء",
    category: "protein",
    unit: "g",
    kcalPer100: 110,
    proteinPer100: 24,
    carbsPer100: 0,
    fatPer100: 1,
    fiberPer100: 0,
    pricePer100g: 3.2,
    rawToCookedYield: 1,
    tags: ["cutting", "quick", "budget"],
    allergens: ["fish"],
  },

  {
    id: "egg_whites",
    name: "Egg Whites",
    arabicName: "بياض بيض",
    category: "protein",
    unit: "g",
    kcalPer100: 52,
    proteinPer100: 11,
    carbsPer100: 0.7,
    fatPer100: 0.2,
    fiberPer100: 0,
    pricePer100g: 1.2,
    rawToCookedYield: 0.92,
    tags: ["cutting", "breakfast", "low-fat"],
    allergens: ["egg"],
  },

  {
    id: "whole_egg",
    name: "Whole Egg",
    arabicName: "بيض كامل",
    category: "protein",
    unit: "piece",
    kcalPer100: 143,
    proteinPer100: 13,
    carbsPer100: 1,
    fatPer100: 10,
    fiberPer100: 0,
    pricePer100g: 1.5,
    rawToCookedYield: 0.9,
    tags: ["breakfast", "budget"],
    allergens: ["egg"],
  },

  {
    id: "rice",
    name: "Rice",
    arabicName: "أرز",
    category: "carb",
    unit: "g",
    kcalPer100: 360,
    proteinPer100: 7,
    carbsPer100: 80,
    fatPer100: 0.6,
    fiberPer100: 1,
    pricePer100g: 0.6,
    rawToCookedYield: 2.8,
    tags: ["bulk", "budget", "meal-prep"],
  },

  {
    id: "potato",
    name: "Potato",
    arabicName: "بطاطس",
    category: "carb",
    unit: "g",
    kcalPer100: 77,
    proteinPer100: 2,
    carbsPer100: 17,
    fatPer100: 0.1,
    fiberPer100: 2.2,
    pricePer100g: 0.5,
    rawToCookedYield: 0.85,
    tags: ["cutting", "budget", "satiety"],
  },

  {
    id: "oats",
    name: "Oats",
    arabicName: "شوفان",
    category: "carb",
    unit: "g",
    kcalPer100: 389,
    proteinPer100: 17,
    carbsPer100: 66,
    fatPer100: 7,
    fiberPer100: 10,
    pricePer100g: 1,
    rawToCookedYield: 2.4,
    tags: ["breakfast", "fiber", "bulk"],
  },

  {
    id: "pasta",
    name: "Pasta",
    arabicName: "مكرونة",
    category: "carb",
    unit: "g",
    kcalPer100: 350,
    proteinPer100: 12,
    carbsPer100: 72,
    fatPer100: 1.5,
    fiberPer100: 3,
    pricePer100g: 0.7,
    rawToCookedYield: 2.5,
    tags: ["bulk", "meal-prep"],
  },

  {
    id: "banana",
    name: "Banana",
    arabicName: "موز",
    category: "fruit",
    unit: "g",
    kcalPer100: 89,
    proteinPer100: 1.1,
    carbsPer100: 23,
    fatPer100: 0.3,
    fiberPer100: 2.6,
    pricePer100g: 0.8,
    rawToCookedYield: 1,
    tags: ["breakfast", "pre-workout"],
  },

  {
    id: "olive_oil",
    name: "Olive Oil",
    arabicName: "زيت زيتون",
    category: "fat",
    unit: "g",
    kcalPer100: 884,
    proteinPer100: 0,
    carbsPer100: 0,
    fatPer100: 100,
    fiberPer100: 0,
    pricePer100g: 2.5,
    rawToCookedYield: 1,
    tags: ["fat", "premium"],
  },

  {
    id: "peanut_butter",
    name: "Peanut Butter",
    arabicName: "زبدة فول سوداني",
    category: "fat",
    unit: "g",
    kcalPer100: 588,
    proteinPer100: 25,
    carbsPer100: 20,
    fatPer100: 50,
    fiberPer100: 6,
    pricePer100g: 2,
    rawToCookedYield: 1,
    tags: ["bulk", "breakfast"],
    allergens: ["peanut"],
  },

  {
    id: "mixed_vegetables",
    name: "Mixed Vegetables",
    arabicName: "خضار مشكل",
    category: "vegetable",
    unit: "g",
    kcalPer100: 55,
    proteinPer100: 3,
    carbsPer100: 10,
    fatPer100: 0.5,
    fiberPer100: 4,
    pricePer100g: 0.8,
    rawToCookedYield: 0.85,
    tags: ["fiber", "meal-prep"],
  },

  {
    id: "green_salad",
    name: "Green Salad",
    arabicName: "سلطة خضراء",
    category: "vegetable",
    unit: "g",
    kcalPer100: 25,
    proteinPer100: 1.5,
    carbsPer100: 5,
    fatPer100: 0.2,
    fiberPer100: 2.5,
    pricePer100g: 0.7,
    rawToCookedYield: 1,
    tags: ["cutting", "fiber"],
  },

  {
    id: "greek_yogurt",
    name: "Greek Yogurt",
    arabicName: "زبادي يوناني",
    category: "dairy",
    unit: "g",
    kcalPer100: 70,
    proteinPer100: 10,
    carbsPer100: 4,
    fatPer100: 2,
    fiberPer100: 0,
    pricePer100g: 1.5,
    rawToCookedYield: 1,
    tags: ["sauce", "protein", "cutting"],
    allergens: ["dairy"],
  },

  {
    id: "tomato_sauce",
    name: "Tomato Sauce",
    arabicName: "صلصة طماطم",
    category: "sauce",
    unit: "g",
    kcalPer100: 45,
    proteinPer100: 1.5,
    carbsPer100: 9,
    fatPer100: 0.5,
    fiberPer100: 2,
    pricePer100g: 0.6,
    rawToCookedYield: 1,
    tags: ["sauce", "italian", "budget"],
  },
]

export function getIngredientById(id: string) {
  return ingredientDB.find((ingredient) => ingredient.id === id)
}

export function getIngredientsByCategory(
  category: IngredientCategory
) {
  return ingredientDB.filter(
    (ingredient) => ingredient.category === category
  )
}

export function calculateIngredientMacros(
  ingredientId: string,
  amount: number
) {
  const ingredient = getIngredientById(ingredientId)

  if (!ingredient) {
    throw new Error(`Ingredient not found: ${ingredientId}`)
  }

  const factor = amount / 100

  return {
    kcal: Math.round(ingredient.kcalPer100 * factor),
    protein: Number(
      (ingredient.proteinPer100 * factor).toFixed(1)
    ),
    carbs: Number(
      (ingredient.carbsPer100 * factor).toFixed(1)
    ),
    fat: Number((ingredient.fatPer100 * factor).toFixed(1)),
    fiber: Number(
      (ingredient.fiberPer100 * factor).toFixed(1)
    ),
    cost: Number(
      (ingredient.pricePer100g * factor).toFixed(2)
    ),
  }
}