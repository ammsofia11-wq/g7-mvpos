import type { G7Ingredient, G7MacroTarget, G7PlanId } from "./g7-base-meals"

export type G7BudgetLevel = "budget" | "standard" | "premium"

export type G7PlanModifier = {
  id: G7PlanId
  publicName: string
  arabicName: string
  subtitle: string
  kcalMultiplier: number
  proteinMultiplier: number
  carbsMultiplier: number
  fatMultiplier: number
  fiberMultiplier: number
  ingredientRules: {
    proteinScale: number
    carbScale: number
    fatScale: number
    vegetableScale: number
    sauceScale: number
  }
  swaps: {
    carbSwap?: string
    proteinSwap?: string
    fatSwap?: string
    sauceNote?: string
  }
  aiRules: string[]
}

export type G7ModifiedMealResult = {
  planId: G7PlanId
  macros: G7MacroTarget
  ingredients: G7Ingredient[]
  notes: string[]
}

export const G7_PLAN_MODIFIERS: G7PlanModifier[] = [
  {
    id: "fat_loss",
    publicName: "Fat Loss",
    arabicName: "حرق دهون",
    subtitle: "High protein, controlled carbs, high satiety.",
    kcalMultiplier: 0.82,
    proteinMultiplier: 1.0,
    carbsMultiplier: 0.72,
    fatMultiplier: 0.82,
    fiberMultiplier: 1.15,
    ingredientRules: {
      proteinScale: 1.0,
      carbScale: 0.72,
      fatScale: 0.75,
      vegetableScale: 1.25,
      sauceScale: 0.75,
    },
    swaps: {
      sauceNote: "Use lighter sauces and increase vegetables for satiety.",
    },
    aiRules: [
      "Prioritize high satiety meals.",
      "Avoid very high-fat sauces.",
      "Reduce carb portions while keeping protein stable.",
    ],
  },
  {
    id: "lean_bulk",
    publicName: "Lean Bulk",
    arabicName: "زيادة عضلية نظيفة",
    subtitle: "More carbs, strong protein, controlled fat.",
    kcalMultiplier: 1.12,
    proteinMultiplier: 1.08,
    carbsMultiplier: 1.18,
    fatMultiplier: 1.0,
    fiberMultiplier: 1.0,
    ingredientRules: {
      proteinScale: 1.08,
      carbScale: 1.18,
      fatScale: 1.0,
      vegetableScale: 1.0,
      sauceScale: 1.0,
    },
    swaps: {
      sauceNote: "Keep sauces controlled; increase clean carbs around training.",
    },
    aiRules: [
      "Prioritize training-day meals.",
      "Increase rice, pasta, potato, oats, or bulgur portions.",
      "Keep fats controlled to avoid dirty bulk.",
    ],
  },
  {
    id: "athlete",
    publicName: "Athlete",
    arabicName: "أداء رياضي",
    subtitle: "Performance carbs, recovery protein, stable energy.",
    kcalMultiplier: 1.08,
    proteinMultiplier: 1.05,
    carbsMultiplier: 1.15,
    fatMultiplier: 0.95,
    fiberMultiplier: 1.0,
    ingredientRules: {
      proteinScale: 1.05,
      carbScale: 1.15,
      fatScale: 0.95,
      vegetableScale: 1.0,
      sauceScale: 0.95,
    },
    swaps: {
      sauceNote: "Use easy-digesting sauces before training and richer meals after training.",
    },
    aiRules: [
      "Prefer higher-carb meals around workouts.",
      "Avoid very heavy high-fat meals before training.",
      "Prioritize recovery meals at dinner.",
    ],
  },
  {
    id: "keto",
    publicName: "Keto",
    arabicName: "كيتو",
    subtitle: "Very low carbs, higher fats, protein controlled.",
    kcalMultiplier: 0.95,
    proteinMultiplier: 0.95,
    carbsMultiplier: 0.18,
    fatMultiplier: 1.55,
    fiberMultiplier: 1.1,
    ingredientRules: {
      proteinScale: 0.95,
      carbScale: 0.15,
      fatScale: 1.55,
      vegetableScale: 1.2,
      sauceScale: 1.0,
    },
    swaps: {
      carbSwap: "Replace rice, pasta, oats, potato, bulgur, and wraps with cauliflower rice, zucchini noodles, or leafy vegetables.",
      fatSwap: "Use avocado, olive oil, tahini, cheese, or nuts depending on client preference.",
      sauceNote: "Avoid sugary sauces and use creamy or olive-oil based sauces.",
    },
    aiRules: [
      "Avoid high-carb meals unless transformed.",
      "Replace starches with low-carb vegetables.",
      "Increase fats strategically without overloading calories.",
    ],
  },
  {
    id: "diabetic",
    publicName: "Diabetic Friendly",
    arabicName: "مناسب للسكري",
    subtitle: "Controlled carbs, higher fiber, stable blood sugar.",
    kcalMultiplier: 0.9,
    proteinMultiplier: 1.0,
    carbsMultiplier: 0.65,
    fatMultiplier: 0.9,
    fiberMultiplier: 1.25,
    ingredientRules: {
      proteinScale: 1.0,
      carbScale: 0.65,
      fatScale: 0.9,
      vegetableScale: 1.3,
      sauceScale: 0.75,
    },
    swaps: {
      carbSwap: "Prefer oats, bulgur, legumes, sweet potato, or controlled rice portions.",
      sauceNote: "Avoid added sugar sauces and keep carbs distributed.",
    },
    aiRules: [
      "Prioritize high-fiber ingredients.",
      "Avoid added sugars.",
      "Control carb portions and pair carbs with protein and vegetables.",
    ],
  },
  {
    id: "vegan",
    publicName: "Vegan",
    arabicName: "نباتي",
    subtitle: "Plant-based protein, legumes, tofu, grains, and smart fats.",
    kcalMultiplier: 0.98,
    proteinMultiplier: 0.9,
    carbsMultiplier: 1.05,
    fatMultiplier: 0.95,
    fiberMultiplier: 1.35,
    ingredientRules: {
      proteinScale: 1.0,
      carbScale: 1.0,
      fatScale: 0.95,
      vegetableScale: 1.35,
      sauceScale: 1.0,
    },
    swaps: {
      proteinSwap: "Replace animal protein with tofu, lentils, beans, chickpeas, seitan, or vegan protein powder.",
      fatSwap: "Use tahini, olive oil, nuts, or avocado.",
      sauceNote: "Use dairy-free yogurt alternatives or tahini-based sauces.",
    },
    aiRules: [
      "Replace all animal products.",
      "Increase legumes and plant protein density.",
      "Watch total carbs when using beans and grains together.",
    ],
  },
  {
    id: "gf_df",
    publicName: "Gluten Free / Dairy Free",
    arabicName: "بدون جلوتين / بدون ألبان",
    subtitle: "No gluten, no dairy, clean substitutions.",
    kcalMultiplier: 1.0,
    proteinMultiplier: 1.0,
    carbsMultiplier: 1.0,
    fatMultiplier: 1.0,
    fiberMultiplier: 1.05,
    ingredientRules: {
      proteinScale: 1.0,
      carbScale: 1.0,
      fatScale: 1.0,
      vegetableScale: 1.05,
      sauceScale: 0.9,
    },
    swaps: {
      carbSwap: "Replace pasta, wraps, toast, and couscous with rice, potato, sweet potato, quinoa, or gluten-free alternatives.",
      sauceNote: "Replace yogurt, cheese, cream, and whey with dairy-free alternatives.",
    },
    aiRules: [
      "Remove gluten ingredients.",
      "Remove dairy ingredients.",
      "Prefer rice, potato, quinoa, and vegetables.",
    ],
  },
  {
    id: "carnivore",
    publicName: "Carnivore",
    arabicName: "كارنيفور",
    subtitle: "Animal-based meals with very low plant foods.",
    kcalMultiplier: 1.0,
    proteinMultiplier: 1.15,
    carbsMultiplier: 0.05,
    fatMultiplier: 1.35,
    fiberMultiplier: 0.1,
    ingredientRules: {
      proteinScale: 1.25,
      carbScale: 0,
      fatScale: 1.35,
      vegetableScale: 0,
      sauceScale: 0.4,
    },
    swaps: {
      carbSwap: "Remove starches and replace with eggs, beef, chicken, fish, or cheese depending on tolerance.",
      sauceNote: "Use minimal sauces; prefer salt, butter, animal fats, or simple spices.",
    },
    aiRules: [
      "Remove carb sources.",
      "Prioritize beef, eggs, chicken, fish, and animal-based fats.",
      "Avoid plant-heavy meals.",
    ],
  },
]

export function getPlanModifierById(planId: G7PlanId) {
  return G7_PLAN_MODIFIERS.find((plan) => plan.id === planId)
}

export function scaleNumber(value: number | undefined, multiplier: number) {
  if (!value) return value
  return Math.round(value * multiplier)
}

export function modifyMacrosForPlan(
  macros: G7MacroTarget,
  planId: G7PlanId
): G7MacroTarget {
  const modifier = getPlanModifierById(planId)

  if (!modifier) {
    return macros
  }

  return {
    kcal: Math.round(macros.kcal * modifier.kcalMultiplier),
    protein: Math.round(macros.protein * modifier.proteinMultiplier),
    carbs: Math.round(macros.carbs * modifier.carbsMultiplier),
    fat: Math.round(macros.fat * modifier.fatMultiplier),
    fiber: Math.round(macros.fiber * modifier.fiberMultiplier),
  }
}

export function modifyIngredientsForPlan(
  ingredients: G7Ingredient[],
  planId: G7PlanId
): G7Ingredient[] {
  const modifier = getPlanModifierById(planId)

  if (!modifier) {
    return ingredients
  }

  return ingredients.map((ingredient) => {
    let scale = 1

    if (ingredient.category === "protein") {
      scale = modifier.ingredientRules.proteinScale
    }

    if (ingredient.category === "carb" || ingredient.category === "fruit") {
      scale = modifier.ingredientRules.carbScale
    }

    if (ingredient.category === "fat") {
      scale = modifier.ingredientRules.fatScale
    }

    if (ingredient.category === "vegetable") {
      scale = modifier.ingredientRules.vegetableScale
    }

    if (ingredient.category === "sauce") {
      scale = modifier.ingredientRules.sauceScale
    }

    return {
      ...ingredient,
      grams: scaleNumber(ingredient.grams, scale),
    }
  })
}

export function buildModifiedMealNotes(planId: G7PlanId): string[] {
  const modifier = getPlanModifierById(planId)

  if (!modifier) {
    return []
  }

  return [
    modifier.subtitle,
    modifier.swaps.proteinSwap ?? "",
    modifier.swaps.carbSwap ?? "",
    modifier.swaps.fatSwap ?? "",
    modifier.swaps.sauceNote ?? "",
  ].filter(Boolean)
}

export function applyPlanModifier(
  macros: G7MacroTarget,
  ingredients: G7Ingredient[],
  planId: G7PlanId
): G7ModifiedMealResult {
  return {
    planId,
    macros: modifyMacrosForPlan(macros, planId),
    ingredients: modifyIngredientsForPlan(ingredients, planId),
    notes: buildModifiedMealNotes(planId),
  }
}

export function getDefaultPlanModifier() {
  return G7_PLAN_MODIFIERS.find((plan) => plan.id === "lean_bulk")
}