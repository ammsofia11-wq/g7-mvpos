import {
  G7_BASE_MEALS,
  G7BaseMeal,
  G7FlavorId,
  G7MacroTarget,
  G7PlanId,
  getBaseMealById,
  getBaseMealsByDay,
  getBaseMealsByFlavor,
  getBaseMealsByPlan,
} from "../data/g7-base-meals"

import {
  G7_FLAVOR_PROFILES,
  G7FlavorProfile,
  getDefaultFlavorProfile,
  getFlavorProfileById,
} from "../data/g7-flavor-profiles"

import {
  applyPlanModifier,
  getDefaultPlanModifier,
  getPlanModifierById,
} from "../data/g7-plan-modifiers"

// ===============================
// LEGACY SUPPORT
// ===============================

export type G7Flavor =
  | "Chef Signature"
  | "Mediterranean"
  | "Asian Fusion"
  | "Mexican"
  | "Middle Eastern"
  | "Italian"
  | "American"

export const G7_FLAVORS: G7Flavor[] = [
  "Chef Signature",
  "Mediterranean",
  "Asian Fusion",
  "Mexican",
  "Middle Eastern",
  "Italian",
  "American",
]

const LEGACY_FLAVOR_MAP: Record<G7Flavor, G7FlavorId> = {
  "Chef Signature": "middle_eastern_performance",
  Mediterranean: "gulf_clean",
  "Asian Fusion": "asian_soy_ginger",
  Mexican: "mexican_fire",
  "Middle Eastern": "middle_eastern_performance",
  Italian: "italian_lean",
  American: "bbq_smoke",
}

// ===============================
// OUTPUT TYPES
// ===============================

export type G7KitchenOS = {
  prepMode: string
  storage: string
  reheat: string
  workflow: string
}

export type G7RecipeOutput = {
  id: string
  day: number
  name: string
  subtitle: string

  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number

  ingredients: string[]
  steps: string[]

  sauce: string

  aiDescription: string
  chefVoice: string
  systemMood: string

  repeatabilityReason: string
  executionPromise: string

  kitchenNote: string

  kitchenOS: G7KitchenOS

  flavorProfile: string
  planLabel: string

  imagePrompt: string
}

// ===============================
// LABELS
// ===============================

const PLAN_LABELS: Record<G7PlanId, string> = {
  fat_loss: "Fat Loss",
  lean_bulk: "Lean Bulk",
  athlete: "Athlete",
  keto: "Keto",
  diabetic: "Diabetic Friendly",
  vegan: "Vegan",
  gf_df: "GF & DF",
  carnivore: "Carnivore",
}

// ===============================
// HELPERS
// ===============================

function ingredientToString(
  ingredient: G7BaseMeal["ingredients"][number]
) {
  if (ingredient.grams) {
    return `${ingredient.name} — ${ingredient.grams}g`
  }

  if (ingredient.unit) {
    return `${ingredient.name} — ${ingredient.unit}`
  }

  return ingredient.name
}

function buildKitchenOS(
  planId: G7PlanId,
  flavor: G7FlavorProfile
): G7KitchenOS {
  return {
    prepMode: `${PLAN_LABELS[planId]} Batch Prep`,
    storage: "3 days chilled",
    reheat: "Microwave 60–90 sec or pan reheat",
    workflow: `${flavor.publicName} production workflow`,
  }
}

function buildChefVoice(
  planId: G7PlanId,
  flavor: G7FlavorProfile
) {
  const map: Record<G7PlanId, string> = {
    fat_loss: "Lean, clean, controlled.",
    lean_bulk: "Strong fuel with controlled growth.",
    athlete: "Performance, recovery, output.",
    keto: "Rich, stable, sharp.",
    diabetic: "Steady energy and smart balance.",
    vegan: "Creative plant-powered flavor.",
    gf_df: "Clean comfort and easy digestion.",
    carnivore: "Protein-first primal execution.",
  }

  return `${map[planId]} ${flavor.subtitle}`
}

function buildMood(
  planId: G7PlanId,
  flavor: G7FlavorProfile
) {
  return `${PLAN_LABELS[planId]} × ${flavor.publicName}`
}

function buildAiDescription(
  meal: G7BaseMeal,
  planId: G7PlanId,
  flavor: G7FlavorProfile
) {
  return `${meal.title} transformed into ${PLAN_LABELS[planId]} mode using ${flavor.publicName} flavor architecture. Built for repeatability, satisfaction, smart meal prep, and scalable culinary intelligence.`
}

// ===============================
// CORE ENGINE
// ===============================

export function assembleG7Meal(
  meal: G7BaseMeal,
  planId: G7PlanId,
  flavorId: G7FlavorId
): G7RecipeOutput {
  const flavor =
    getFlavorProfileById(flavorId) ??
    getDefaultFlavorProfile()

  const modified = applyPlanModifier(
    meal.baseMacros,
    meal.ingredients,
    planId
  )

  const sauce =
    flavor.sauceSystem[0] ??
    "G7 smart sauce system"

  return {
    id: meal.id,

    day: meal.day,

    name: meal.title,

    subtitle: `${meal.subtitle} • ${flavor.publicName}`,

    calories: modified.macros.kcal,
    protein: modified.macros.protein,
    carbs: modified.macros.carbs,
    fat: modified.macros.fat,
    fiber: modified.macros.fiber,

    ingredients: modified.ingredients.map(
      ingredientToString
    ),

    steps: meal.sop.map(
      (step, index) =>
        `${index + 1}. ${step.title} — ${step.instruction}`
    ),

    sauce,

    aiDescription: buildAiDescription(
      meal,
      planId,
      flavor
    ),

    chefVoice: buildChefVoice(
      planId,
      flavor
    ),

    systemMood: buildMood(
      planId,
      flavor
    ),

    repeatabilityReason:
      "Flavor rotation + macro scaling + reusable base meals make this system sustainable weekly.",

    executionPromise:
      "Designed for scalable prep, premium flavor experience, and adaptive nutrition execution.",

    kitchenNote:
      `${PLAN_LABELS[planId]} system running with ${flavor.publicName} flavor profile.`,

    kitchenOS: buildKitchenOS(
      planId,
      flavor
    ),

    flavorProfile: flavor.publicName,

    planLabel: PLAN_LABELS[planId],

    imagePrompt: meal.imagePrompt,
  }
}

// ===============================
// MAIN PUBLIC ENGINE
// ===============================

export function generateG7Meal(
  planId: G7PlanId,
  flavor: G7Flavor
): G7RecipeOutput {
  const mappedFlavor =
    LEGACY_FLAVOR_MAP[flavor]

  const meals =
    getBaseMealsByPlan(planId)

  const selected =
    meals[Math.floor(Math.random() * meals.length)]

  return assembleG7Meal(
    selected,
    planId,
    mappedFlavor
  )
}

// ===============================
// WEEK ENGINE
// ===============================

export function generateWeeklyPlan(
  planId: G7PlanId,
  flavorId: G7FlavorId
) {
  const meals =
    getBaseMealsByFlavor(flavorId).filter(
      (meal) =>
        meal.compatiblePlans.includes(planId)
    )

  const weekly: Record<
    number,
    G7RecipeOutput[]
  > = {}

  for (let day = 1; day <= 7; day++) {
    const dayMeals = meals.filter(
      (meal) => meal.day === day
    )

    weekly[day] = dayMeals.map((meal) =>
      assembleG7Meal(
        meal,
        planId,
        flavorId
      )
    )
  }

  return weekly
}

// ===============================
// AI MATCHING
// ===============================

export type G7ClientPreferences = {
  goal: G7PlanId
  likesSpicy?: boolean
  prefersComfortFood?: boolean
  budget?: "budget" | "standard" | "premium"
  dislikesFish?: boolean
}

export function recommendFlavorProfile(
  preferences: G7ClientPreferences
): G7FlavorProfile {
  if (
    preferences.likesSpicy &&
    preferences.goal !== "diabetic"
  ) {
    return (
      getFlavorProfileById(
        "mexican_fire"
      ) ?? getDefaultFlavorProfile()
    )
  }

  if (preferences.prefersComfortFood) {
    return (
      getFlavorProfileById(
        "italian_lean"
      ) ?? getDefaultFlavorProfile()
    )
  }

  if (
    preferences.budget === "budget"
  ) {
    return (
      getFlavorProfileById(
        "egyptian_home_fit"
      ) ?? getDefaultFlavorProfile()
    )
  }

  if (
    preferences.dislikesFish
  ) {
    return (
      getFlavorProfileById(
        "middle_eastern_performance"
      ) ?? getDefaultFlavorProfile()
    )
  }

  return getDefaultFlavorProfile()
}

// ===============================
// QUICK ACCESS HELPERS
// ===============================

export function getPlanLabel(
  plan: G7PlanId
) {
  return PLAN_LABELS[plan]
}

export function getMealById(id: string) {
  return getBaseMealById(id)
}

export function getMealsByDay(day: number) {
  return getBaseMealsByDay(day)
}

export function getMealsByPlan(
  planId: G7PlanId
) {
  return getBaseMealsByPlan(planId)
}

export function getAllFlavorProfiles() {
  return G7_FLAVOR_PROFILES
}

export function getAllBaseMeals() {
  return G7_BASE_MEALS
}

export function getDefaultPlan() {
  return (
    getDefaultPlanModifier()?.id ??
    "lean_bulk"
  )
}