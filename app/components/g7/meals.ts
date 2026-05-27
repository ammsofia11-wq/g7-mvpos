import { PlanKey } from "./plans"

import {
  getMasterMeals,
  getPlanScaling,
  MasterMeal,
} from "./master-meals"

import {
  getDefaultPortionMatrixPlan,
  getPortionTargetForMeal,
  PortionMealRole,
} from "./portion-matrix"

import {
  calculateNutritionFromRaw,
} from "./nutrition-calculator"

import {
  scaleRawIngredientsForPlan,
} from "./portion-scaler"

import {
  CoachMacroPresetId,
  getMealMacroSplit,
} from "./macro-distribution"

import {
  calculateMacroGap,
} from "./macro-gap-engine"

import {
  applyMacroAdjustmentsToRaw,
  buildMacroAdjustments,
} from "./macro-adjustment-engine"

export type MealRole =
  | "BREAKFAST"
  | "LUNCH"
  | "DINNER"

export type MealStep = {
  title: string
  body: string
}

export type CarbType =
  | "BREAD"
  | "OATS"
  | "POTATO"
  | "RICE"
  | "PASTA"
  | "WRAP"
  | "SHAKE"
  | "MIXED"

export type ProteinFamily =
  | "EGGS"
  | "CHICKEN"
  | "BEEF"
  | "TUNA"
  | "FISH"
  | "WHEY"
  | "MIXED"

export type MealTexture =
  | "SOFT"
  | "CREAMY"
  | "SAUCY"
  | "CRUNCHY"
  | "LIQUID"

export type DigestionLoad =
  | "LOW"
  | "MEDIUM"
  | "HIGH"

export type DayType =
  | "PERFORMANCE"
  | "GLYCOGEN"
  | "STREET_FIT"
  | "MIDWEEK_LIGHT"
  | "COMFORT"
  | "RECOVERY"
  | "FRESH_RESET"

export type MacroStatus =
  | "UNDER"
  | "ON_TARGET"
  | "OVER"

export type MealAdjustment = {
  ingredient: string
  increaseGrams: number
  reason: string
}

export type Meal = {
  id: string
  day: string
  role: MealRole

  title: string
  subtitle: string

  purpose: string
  icon: string

  kcal: number
  protein: number
  carbs: number
  fat: number
  fiber: number

  targetProtein: number
  targetCarbs: number
  targetFat: number

  proteinGap: number
  carbGap: number
  fatGap: number

  proteinStatus: MacroStatus
  carbStatus: MacroStatus
  fatStatus: MacroStatus

  macroAdjustments: MealAdjustment[]
  adjustmentSummary: string[]

  hero: string

  raw: [string, string][]
  cooked: [string, string][]

  steps: MealStep[]

  flavorBaseId: string
  flavorBaseTitle: string
  smartTags: string[]

  dayType: DayType

  digestionLoad: DigestionLoad

  texture: MealTexture

  carbType: CarbType

  proteinFamily: ProteinFamily

  smartRole: string

  weekLogic: string

  proteinCookedWeight: number
  carbCookedWeight: number
}

const DEFAULT_PORTION_MATRIX =
  getDefaultPortionMatrixPlan()

const DAY_INTELLIGENCE: Record<
  number,
  {
    dayType: DayType
    weekLogic: string
  }
> = {
  1: {
    dayType: "PERFORMANCE",
    weekLogic:
      "Performance foundation day with stable energy and structured adherence.",
  },

  2: {
    dayType: "GLYCOGEN",
    weekLogic:
      "Higher-carb performance rhythm supporting glycogen recovery.",
  },

  3: {
    dayType: "STREET_FIT",
    weekLogic:
      "Street-food psychological adherence without breaking portion structure.",
  },

  4: {
    dayType: "MIDWEEK_LIGHT",
    weekLogic:
      "Midweek digestion control and lighter operational rhythm.",
  },

  5: {
    dayType: "COMFORT",
    weekLogic:
      "Comfort-food adherence structure using burger and kofta systems.",
  },

  6: {
    dayType: "RECOVERY",
    weekLogic:
      "Recovery-focused meals with easier digestion and stable energy.",
  },

  7: {
    dayType: "FRESH_RESET",
    weekLogic:
      "Fresh reset day using lighter proteins and lower digestion load.",
  },
}

function includesAny(
  text: string,
  words: string[]
) {
  const normalized = text.toLowerCase()

  return words.some((word) =>
    normalized.includes(word.toLowerCase())
  )
}

function detectProteinFamily(
  meal: MasterMeal
): ProteinFamily {
  const text = `${meal.title} ${meal.subtitle}`

  if (includesAny(text, ["chicken"]))
    return "CHICKEN"

  if (
    includesAny(text, [
      "beef",
      "kofta",
      "hawawshi",
    ])
  )
    return "BEEF"

  if (includesAny(text, ["tuna"]))
    return "TUNA"

  if (includesAny(text, ["fish"]))
    return "FISH"

  if (
    includesAny(text, [
      "whey",
      "protein shake",
      "protein oats",
    ])
  )
    return "WHEY"

  if (
    includesAny(text, [
      "egg",
      "omelette",
      "shakshuka",
    ])
  )
    return "EGGS"

  return "MIXED"
}

function detectCarbType(
  meal: MasterMeal
): CarbType {
  const text = `${meal.title} ${meal.subtitle}`

  if (includesAny(text, ["rice"]))
    return "RICE"

  if (includesAny(text, ["pasta"]))
    return "PASTA"

  if (
    includesAny(text, [
      "potato",
      "sweet potato",
    ])
  )
    return "POTATO"

  if (
    includesAny(text, [
      "wrap",
      "tortilla",
      "quesadilla",
    ])
  )
    return "WRAP"

  if (includesAny(text, ["oats"]))
    return "OATS"

  if (includesAny(text, ["shake"]))
    return "SHAKE"

  if (
    includesAny(text, [
      "bread",
      "bun",
      "hawawshi",
    ])
  )
    return "BREAD"

  return "MIXED"
}

function detectTexture(
  meal: MasterMeal
): MealTexture {
  const text = `${meal.title} ${meal.subtitle}`

  if (includesAny(text, ["shake"]))
    return "LIQUID"

  if (
    includesAny(text, [
      "oats",
      "pink sauce",
      "creamy",
      "yogurt",
    ])
  )
    return "CREAMY"

  if (
    includesAny(text, [
      "quesadilla",
      "burger",
      "hawawshi",
      "wrap",
    ])
  )
    return "CRUNCHY"

  if (
    includesAny(text, [
      "kofta",
      "pasta",
      "tomato",
      "shakshuka",
    ])
  )
    return "SAUCY"

  return "SOFT"
}

function detectDigestionLoad(
  carbType: CarbType,
  proteinFamily: ProteinFamily
): DigestionLoad {
  if (
    carbType === "BREAD" &&
    proteinFamily === "BEEF"
  ) {
    return "HIGH"
  }

  if (
    proteinFamily === "TUNA" ||
    proteinFamily === "FISH" ||
    carbType === "SHAKE"
  ) {
    return "LOW"
  }

  return "MEDIUM"
}

function detectFlavorBase(
  proteinFamily: ProteinFamily
) {
  if (proteinFamily === "CHICKEN") {
    return {
      flavorBaseId:
        "week1-chicken-g7-spices",

      flavorBaseTitle:
        "Chicken G7 Spice Base",
    }
  }

  if (proteinFamily === "BEEF") {
    return {
      flavorBaseId:
        "week1-beef-kofta",

      flavorBaseTitle:
        "Beef Kofta Base",
    }
  }

  if (
    proteinFamily === "TUNA" ||
    proteinFamily === "FISH"
  ) {
    return {
      flavorBaseId:
        "week1-fish-light",

      flavorBaseTitle:
        "Light Fish + Tuna Base",
    }
  }

  return {
    flavorBaseId:
      "week1-general-g7-base",

    flavorBaseTitle:
      "G7 General Base",
  }
}

function mapRoleToPortionRole(
  role: MealRole
): PortionMealRole {
  if (role === "BREAKFAST")
    return "BREAKFAST"

  if (role === "LUNCH")
    return "LUNCH"

  return "DINNER"
}

function getPortionPlanId(
  planId: PlanKey
) {
  if (planId === "shredding") {
    return "shredding-3-meals"
  }

  if (planId === "lean_bulk") {
    return "lean-bulk-3-meals"
  }

  if (planId === "mass_gainer") {
    return "mass-gainer-3-meals"
  }

  return DEFAULT_PORTION_MATRIX.id
}

function getCoachPresetFromPlan(
  planId: PlanKey
): CoachMacroPresetId {
  if (planId === "shredding") {
    return "lean_cut"
  }

  if (planId === "lean_bulk") {
    return "gym_standard"
  }

  if (planId === "mass_gainer") {
    return "lean_bulk"
  }

  if (planId === "premium_chef") {
    return "athlete_performance"
  }

  return "gym_standard"
}

function scaleMeal(
  meal: MasterMeal,
  planId: PlanKey
): Meal {
  getPlanScaling(planId)

  const portionRole =
    mapRoleToPortionRole(meal.role)

  const portionPlanId =
    getPortionPlanId(planId)

  const coachPresetId =
    getCoachPresetFromPlan(planId)

  const macroTarget =
    getMealMacroSplit(
      coachPresetId,
      meal.role
    )

  const proteinFamily =
    detectProteinFamily(meal)

  const carbType =
    detectCarbType(meal)

  const texture =
    detectTexture(meal)

  const digestionLoad =
    detectDigestionLoad(
      carbType,
      proteinFamily
    )

  const flavorBase =
    detectFlavorBase(
      proteinFamily
    )

  const portionTarget =
    getPortionTargetForMeal(
      portionPlanId,
      portionRole
    ) ?? {
      proteinCookedWeight:
        meal.proteinCookedWeight ??
        200,

      carbCookedWeight:
        meal.carbCookedWeight ??
        150,

      fatLevel: "LOW",
    }

  const proteinCookedWeight =
    portionTarget.proteinCookedWeight

  const carbCookedWeight =
    portionTarget.carbCookedWeight

  const scaledRaw =
    scaleRawIngredientsForPlan(
      meal.raw,
      planId
    )

  const initialNutrition =
    calculateNutritionFromRaw(
      scaledRaw
    )

  const initialMacroGap =
    calculateMacroGap({
      actualProtein:
        initialNutrition.protein,

      actualCarbs:
        initialNutrition.carbs,

      actualFat:
        initialNutrition.fat,

      targetProtein:
        macroTarget.protein,

      targetCarbs:
        macroTarget.carbs,

      targetFat:
        macroTarget.fat,
    })

  const macroAdjustments =
    buildMacroAdjustments({
      proteinGap:
        initialMacroGap.proteinGap,

      carbGap:
        initialMacroGap.carbGap,

      fatGap:
        initialMacroGap.fatGap,

      carbType,

      proteinFamily,
    })

  const adjustedRaw =
    applyMacroAdjustmentsToRaw(
      scaledRaw,
      macroAdjustments.adjustments
    )

  const nutrition =
    calculateNutritionFromRaw(
      adjustedRaw
    )

  const protein =
    nutrition.protein

  const carbs =
    nutrition.carbs

  const fat =
    nutrition.fat

  const kcal =
    nutrition.kcal

  const fiber =
    nutrition.fiber

  const macroGap =
    calculateMacroGap({
      actualProtein: protein,
      actualCarbs: carbs,
      actualFat: fat,

      targetProtein:
        macroTarget.protein,

      targetCarbs:
        macroTarget.carbs,

      targetFat:
        macroTarget.fat,
    })

  const dayIntelligence =
    DAY_INTELLIGENCE[
      meal.day
    ] ?? DAY_INTELLIGENCE[1]

  return {
    id: meal.id,

    day: `Day ${meal.day}`,

    role: meal.role,

    title: meal.title,

    subtitle: meal.subtitle,

    purpose: meal.purpose,

    icon: meal.icon,

    kcal,

    protein,

    carbs,

    fat,

    fiber,

    targetProtein:
      macroTarget.protein,

    targetCarbs:
      macroTarget.carbs,

    targetFat:
      macroTarget.fat,

    proteinGap:
      macroGap.proteinGap,

    carbGap:
      macroGap.carbGap,

    fatGap:
      macroGap.fatGap,

    proteinStatus:
      macroGap.proteinStatus,

    carbStatus:
      macroGap.carbStatus,

    fatStatus:
      macroGap.fatStatus,

    macroAdjustments:
      macroAdjustments.adjustments,

    adjustmentSummary:
      macroAdjustments.adjustments.map(
        (item) =>
          `+${item.increaseGrams}g ${item.ingredient}`
      ),

    hero: "",

    raw: adjustedRaw,

    cooked: [
      [
        "Cooked Protein Portion",
        `${proteinCookedWeight}g`,
      ],

      [
        "Cooked Carb Portion",
        `${carbCookedWeight}g`,
      ],

      ...meal.cooked,
    ],

    steps: meal.steps.map(
      (step) => ({
        title: step.title,
        body: step.body,
      })
    ),

    flavorBaseId:
      flavorBase.flavorBaseId,

    flavorBaseTitle:
      flavorBase.flavorBaseTitle,

    smartTags: [
      proteinFamily,
      carbType,
      texture,
      digestionLoad,
      meal.role,
    ],

    dayType:
      dayIntelligence.dayType,

    digestionLoad,

    texture,

    carbType,

    proteinFamily,

    smartRole:
      meal.role === "BREAKFAST"
        ? "Morning macro target meal."
        : meal.role === "LUNCH"
        ? "Main coach-macro performance meal."
        : "Recovery coach-macro meal.",

    weekLogic:
      dayIntelligence.weekLogic,

    proteinCookedWeight,

    carbCookedWeight,
  }
}

export function getMealsForPlan(
  planId: PlanKey
): Meal[] {
  return getMasterMeals().map(
    (meal) =>
      scaleMeal(meal, planId)
  )
}

export function getMealsGroupedByDay(
  planId: PlanKey
) {
  const meals =
    getMealsForPlan(planId)

  const grouped: Record<
    string,
    Meal[]
  > = {}

  meals.forEach((meal) => {
    if (!grouped[meal.day]) {
      grouped[meal.day] = []
    }

    grouped[meal.day].push(meal)
  })

  return grouped
}

export function getDailyCalories(
  meals: Meal[]
) {
  return meals.reduce(
    (total, meal) =>
      total + meal.kcal,
    0
  )
}

export function getDailyProtein(
  meals: Meal[]
) {
  return meals.reduce(
    (total, meal) =>
      total + meal.protein,
    0
  )
}

export function getDailyCarbs(
  meals: Meal[]
) {
  return meals.reduce(
    (total, meal) =>
      total + meal.carbs,
    0
  )
}

export function getDailyFat(
  meals: Meal[]
) {
  return meals.reduce(
    (total, meal) =>
      total + meal.fat,
    0
  )
}