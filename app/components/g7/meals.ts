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

import { calculateNutritionFromRaw } from "./nutrition-calculator"

import { scaleRawIngredientsForPlan } from "./portion-scaler"

import { calculateMacroGap } from "./macro-gap-engine"

export type MealRole = "BREAKFAST" | "LUNCH" | "DINNER"

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

export type DigestionLoad = "LOW" | "MEDIUM" | "HIGH"

export type DayType =
  | "PERFORMANCE"
  | "GLYCOGEN"
  | "STREET_FIT"
  | "MIDWEEK_LIGHT"
  | "COMFORT"
  | "RECOVERY"
  | "FRESH_RESET"

export type MacroStatus = "UNDER" | "ON_TARGET" | "OVER"

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

const DEFAULT_PORTION_MATRIX = getDefaultPortionMatrixPlan()

const GYM_PLAN_DAILY_TARGETS: Record<
  PlanKey,
  {
    kcal: number
    protein: number
    carbs: number
    fat: number
  }
> = {
  shredding: {
    kcal: 1700,
    protein: 180,
    carbs: 140,
    fat: 47,
  },

  lean_bulk: {
    kcal: 2000,
    protein: 180,
    carbs: 200,
    fat: 53,
  },

  mass_gainer: {
    kcal: 2500,
    protein: 200,
    carbs: 300,
    fat: 56,
  },

  budget_athlete: {
    kcal: 1900,
    protein: 160,
    carbs: 180,
    fat: 53,
  },

  premium_chef: {
    kcal: 2200,
    protein: 190,
    carbs: 230,
    fat: 58,
  },
}

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
      "Balanced foundation day with stable energy and clear meal structure.",
  },

  2: {
    dayType: "GLYCOGEN",
    weekLogic:
      "Carb-controlled day supporting energy without pushing portions too high.",
  },

  3: {
    dayType: "STREET_FIT",
    weekLogic:
      "Familiar street-food style meals adapted into controlled G7 portions.",
  },

  4: {
    dayType: "MIDWEEK_LIGHT",
    weekLogic:
      "Midweek rhythm with lighter digestion and simple execution.",
  },

  5: {
    dayType: "COMFORT",
    weekLogic:
      "Comfort-food structure using burger and kofta systems with controlled portions.",
  },

  6: {
    dayType: "RECOVERY",
    weekLogic:
      "Recovery-focused meals with easier digestion and stable energy.",
  },

  7: {
    dayType: "FRESH_RESET",
    weekLogic:
      "Fresh reset day using lighter proteins and simple meal assembly.",
  },
}

function includesAny(text: string, words: string[]) {
  const normalized = text.toLowerCase()

  return words.some((word) => normalized.includes(word.toLowerCase()))
}

function detectProteinFamily(meal: MasterMeal): ProteinFamily {
  const text = `${meal.title} ${meal.subtitle}`

  if (includesAny(text, ["chicken"])) return "CHICKEN"

  if (includesAny(text, ["beef", "kofta", "hawawshi"])) return "BEEF"

  if (includesAny(text, ["tuna"])) return "TUNA"

  if (includesAny(text, ["fish"])) return "FISH"

  if (includesAny(text, ["whey", "protein shake", "protein oats"])) {
    return "WHEY"
  }

  if (includesAny(text, ["egg", "omelette", "shakshuka"])) {
    return "EGGS"
  }

  return "MIXED"
}

function detectCarbType(meal: MasterMeal): CarbType {
  const text = `${meal.title} ${meal.subtitle}`

  if (includesAny(text, ["rice"])) return "RICE"

  if (includesAny(text, ["pasta"])) return "PASTA"

  if (includesAny(text, ["potato", "sweet potato"])) return "POTATO"

  if (includesAny(text, ["wrap", "tortilla", "quesadilla"])) {
    return "WRAP"
  }

  if (includesAny(text, ["oats"])) return "OATS"

  if (includesAny(text, ["shake"])) return "SHAKE"

  if (includesAny(text, ["bread", "bun", "hawawshi"])) return "BREAD"

  return "MIXED"
}

function detectTexture(meal: MasterMeal): MealTexture {
  const text = `${meal.title} ${meal.subtitle}`

  if (includesAny(text, ["shake"])) return "LIQUID"

  if (includesAny(text, ["oats", "pink sauce", "creamy", "yogurt"])) {
    return "CREAMY"
  }

  if (includesAny(text, ["quesadilla", "burger", "hawawshi", "wrap"])) {
    return "CRUNCHY"
  }

  if (includesAny(text, ["kofta", "pasta", "tomato", "shakshuka"])) {
    return "SAUCY"
  }

  return "SOFT"
}

function detectDigestionLoad(
  carbType: CarbType,
  proteinFamily: ProteinFamily
): DigestionLoad {
  if (carbType === "BREAD" && proteinFamily === "BEEF") {
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

function detectFlavorBase(proteinFamily: ProteinFamily) {
  if (proteinFamily === "CHICKEN") {
    return {
      flavorBaseId: "week1-chicken-g7-spices",
      flavorBaseTitle: "Chicken G7 Spice Base",
    }
  }

  if (proteinFamily === "BEEF") {
    return {
      flavorBaseId: "week1-beef-kofta",
      flavorBaseTitle: "Beef Kofta Base",
    }
  }

  if (proteinFamily === "TUNA" || proteinFamily === "FISH") {
    return {
      flavorBaseId: "week1-fish-light",
      flavorBaseTitle: "Light Fish + Tuna Base",
    }
  }

  return {
    flavorBaseId: "week1-general-g7-base",
    flavorBaseTitle: "G7 General Base",
  }
}

function mapRoleToPortionRole(role: MealRole): PortionMealRole {
  if (role === "BREAKFAST") return "BREAKFAST"

  if (role === "LUNCH") return "LUNCH"

  return "DINNER"
}

function getPortionPlanId() {
  return DEFAULT_PORTION_MATRIX.id
}

function getGymMealMacroTarget(planId: PlanKey, role: MealRole) {
  const planTarget = GYM_PLAN_DAILY_TARGETS[planId]

  if (role === "BREAKFAST") {
    return {
      protein: Math.round(planTarget.protein * 0.25),
      carbs: Math.round(planTarget.carbs * 0.3),
      fat: Math.round(planTarget.fat * 0.28),
    }
  }

  if (role === "LUNCH") {
    return {
      protein: Math.round(planTarget.protein * 0.38),
      carbs: Math.round(planTarget.carbs * 0.36),
      fat: Math.round(planTarget.fat * 0.36),
    }
  }

  return {
    protein: Math.round(planTarget.protein * 0.37),
    carbs: Math.round(planTarget.carbs * 0.34),
    fat: Math.round(planTarget.fat * 0.36),
  }
}

function getGymSmartRole(role: MealRole, planId: PlanKey) {
  if (planId === "shredding") {
    if (role === "BREAKFAST") {
      return "High-protein fat-loss breakfast for controlled energy and better consistency."
    }

    if (role === "LUNCH") {
      return "Main fat-loss performance meal with strong protein and calculated carbs."
    }

    return "Recovery-focused fat-loss dinner with controlled carbs and stable satiety."
  }

  if (planId === "lean_bulk") {
    if (role === "BREAKFAST") {
      return "Balanced fitness breakfast for daily energy and routine consistency."
    }

    if (role === "LUNCH") {
      return "Core training-day meal with balanced protein, carbs, and practical portions."
    }

    return "Balanced recovery dinner to close the day without random eating."
  }

  if (planId === "mass_gainer") {
    if (role === "BREAKFAST") {
      return "Higher-energy breakfast to support muscle gain and training fuel."
    }

    if (role === "LUNCH") {
      return "High-carb muscle-gain main meal for performance and recovery."
    }

    return "Muscle-gain dinner with strong protein and enough carbs to support growth."
  }

  if (planId === "budget_athlete") {
    if (role === "BREAKFAST") {
      return "Budget-friendly fitness breakfast using simple practical ingredients."
    }

    if (role === "LUNCH") {
      return "Budget-friendly main meal with clear protein and controlled carbs."
    }

    return "Simple fitness dinner designed for cost control and consistency."
  }

  if (planId === "premium_chef") {
    if (role === "BREAKFAST") {
      return "Premium chef-style fitness breakfast with strong protein and better eating experience."
    }

    if (role === "LUNCH") {
      return "Premium main fitness meal with chef-based flavor and performance macros."
    }

    return "Premium recovery dinner designed for flavor, structure, and consistency."
  }

  if (role === "BREAKFAST") {
    return "Morning performance meal."
  }

  if (role === "LUNCH") {
    return "Main performance macro meal."
  }

  return "Recovery performance meal."
}

function scaleMealForPlan(meal: MasterMeal, planId: PlanKey): Meal {
  getPlanScaling(planId)

  const portionRole = mapRoleToPortionRole(meal.role)

  const portionPlanId = getPortionPlanId()

  const macroTarget = getGymMealMacroTarget(planId, meal.role)

  const proteinFamily = detectProteinFamily(meal)

  const carbType = detectCarbType(meal)

  const texture = detectTexture(meal)

  const digestionLoad = detectDigestionLoad(carbType, proteinFamily)

  const flavorBase = detectFlavorBase(proteinFamily)

  const portionTarget =
    getPortionTargetForMeal(portionPlanId, portionRole) ?? {
      size: "M",
      proteinRawWeight: meal.proteinCookedWeight ?? 160,
      proteinCookedWeight: meal.proteinCookedWeight ?? 115,
      carbCookedWeight: meal.carbCookedWeight ?? 130,
      vegRawWeight: 100,
      sauceWeight: 25,
      fatLevel: "MEDIUM",
    }

  const proteinCookedWeight = portionTarget.proteinCookedWeight

  const carbCookedWeight = portionTarget.carbCookedWeight

  const adjustedRaw = scaleRawIngredientsForPlan(meal.raw, planId)

  return buildMealOutput({
    meal,
    adjustedRaw,
    macroTarget,
    proteinCookedWeight,
    carbCookedWeight,
    proteinFamily,
    carbType,
    texture,
    digestionLoad,
    flavorBase,
    smartRole: getGymSmartRole(meal.role, planId),
  })
}

function buildMealOutput(input: {
  meal: MasterMeal
  adjustedRaw: [string, string][]
  macroTarget: {
    protein: number
    carbs: number
    fat: number
  }
  proteinCookedWeight: number
  carbCookedWeight: number
  proteinFamily: ProteinFamily
  carbType: CarbType
  texture: MealTexture
  digestionLoad: DigestionLoad
  flavorBase: {
    flavorBaseId: string
    flavorBaseTitle: string
  }
  smartRole: string
}): Meal {
  const {
    meal,
    adjustedRaw,
    macroTarget,
    proteinCookedWeight,
    carbCookedWeight,
    proteinFamily,
    carbType,
    texture,
    digestionLoad,
    flavorBase,
    smartRole,
  } = input

  const nutrition = calculateNutritionFromRaw(adjustedRaw)

  const protein = nutrition.protein

  const carbs = nutrition.carbs

  const fat = nutrition.fat

  const kcal = nutrition.kcal

  const fiber = nutrition.fiber

  const macroGap = calculateMacroGap({
    actualProtein: protein,
    actualCarbs: carbs,
    actualFat: fat,

    targetProtein: macroTarget.protein,
    targetCarbs: macroTarget.carbs,
    targetFat: macroTarget.fat,
  })

  const dayIntelligence = DAY_INTELLIGENCE[meal.day] ?? DAY_INTELLIGENCE[1]

  const cooked: [string, string][] = []

  if (proteinCookedWeight > 0) {
    cooked.push(["Cooked Protein Portion", `${proteinCookedWeight}g`])
  }

  if (carbCookedWeight > 0) {
    cooked.push(["Cooked Carb Portion", `${carbCookedWeight}g`])
  }

  cooked.push(...meal.cooked)

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

    targetProtein: macroTarget.protein,

    targetCarbs: macroTarget.carbs,

    targetFat: macroTarget.fat,

    proteinGap: macroGap.proteinGap,

    carbGap: macroGap.carbGap,

    fatGap: macroGap.fatGap,

    proteinStatus: macroGap.proteinStatus,

    carbStatus: macroGap.carbStatus,

    fatStatus: macroGap.fatStatus,

    macroAdjustments: [],

    adjustmentSummary: [],

    hero: "",

    raw: adjustedRaw,

    cooked,

    steps: meal.steps.map((step) => ({
      title: step.title,
      body: step.body,
    })),

    flavorBaseId: flavorBase.flavorBaseId,

    flavorBaseTitle: flavorBase.flavorBaseTitle,

    smartTags: [proteinFamily, carbType, texture, digestionLoad, meal.role],

    dayType: dayIntelligence.dayType,

    digestionLoad,

    texture,

    carbType,

    proteinFamily,

    smartRole,

    weekLogic: dayIntelligence.weekLogic,

    proteinCookedWeight,

    carbCookedWeight,
  }
}

export function getMealsForPlan(planId: PlanKey): Meal[] {
  return getMasterMeals().map((meal) => scaleMealForPlan(meal, planId))
}

export function getMealsGroupedByDay(planId: PlanKey) {
  const meals = getMealsForPlan(planId)

  const grouped: Record<string, Meal[]> = {}

  meals.forEach((meal) => {
    if (!grouped[meal.day]) {
      grouped[meal.day] = []
    }

    grouped[meal.day].push(meal)
  })

  return grouped
}

export function getDailyCalories(meals: Meal[]) {
  return meals.reduce((total, meal) => total + meal.kcal, 0)
}

export function getDailyProtein(meals: Meal[]) {
  return meals.reduce((total, meal) => total + meal.protein, 0)
}

export function getDailyCarbs(meals: Meal[]) {
  return meals.reduce((total, meal) => total + meal.carbs, 0)
}

export function getDailyFat(meals: Meal[]) {
  return meals.reduce((total, meal) => total + meal.fat, 0)
}