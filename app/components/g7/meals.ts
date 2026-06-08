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

import {
  ClientProfile,
  ClientProfileKey,
  ClientProfilePortions,
  getClientProfile,
} from "./client-profiles"

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

  if (includesAny(text, ["whey", "protein shake", "protein oats"]))
    return "WHEY"

  if (includesAny(text, ["egg", "omelette", "shakshuka"]))
    return "EGGS"

  return "MIXED"
}

function detectCarbType(meal: MasterMeal): CarbType {
  const text = `${meal.title} ${meal.subtitle}`

  if (includesAny(text, ["rice"])) return "RICE"

  if (includesAny(text, ["pasta"])) return "PASTA"

  if (includesAny(text, ["potato", "sweet potato"])) return "POTATO"

  if (includesAny(text, ["wrap", "tortilla", "quesadilla"]))
    return "WRAP"

  if (includesAny(text, ["oats"])) return "OATS"

  if (includesAny(text, ["shake"])) return "SHAKE"

  if (includesAny(text, ["bread", "bun", "hawawshi"])) return "BREAD"

  return "MIXED"
}

function detectTexture(meal: MasterMeal): MealTexture {
  const text = `${meal.title} ${meal.subtitle}`

  if (includesAny(text, ["shake"])) return "LIQUID"

  if (includesAny(text, ["oats", "pink sauce", "creamy", "yogurt"]))
    return "CREAMY"

  if (includesAny(text, ["quesadilla", "burger", "hawawshi", "wrap"]))
    return "CRUNCHY"

  if (includesAny(text, ["kofta", "pasta", "tomato", "shakshuka"]))
    return "SAUCY"

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

/*
  LEGACY PLAN SUPPORT

  This keeps the current family PDFs working exactly as they work now.
  We are not breaking selectedPlan / PlanKey yet.
*/

function getPortionPlanId(planId: PlanKey) {
  if (planId === "shredding") {
    return "father-46-shredding"
  }

  if (planId === "lean_bulk") {
    return "mother-34-classic-light"
  }

  if (planId === "budget_athlete") {
    return "child-11-balanced-junior"
  }

  if (planId === "premium_chef") {
    return "grandfather-65-classic-balanced"
  }

  if (planId === "mass_gainer") {
    return "grandmother-75-senior-light"
  }

  return DEFAULT_PORTION_MATRIX.id
}

function getLegacyMealMacroTarget(planId: PlanKey, role: MealRole) {
  if (planId === "shredding") {
    if (role === "BREAKFAST") {
      return { protein: 35, carbs: 45, fat: 15 }
    }

    if (role === "LUNCH") {
      return { protein: 65, carbs: 65, fat: 22 }
    }

    return { protein: 55, carbs: 55, fat: 23 }
  }

  if (planId === "lean_bulk") {
    if (role === "BREAKFAST") {
      return { protein: 25, carbs: 40, fat: 15 }
    }

    if (role === "LUNCH") {
      return { protein: 45, carbs: 55, fat: 18 }
    }

    return { protein: 45, carbs: 45, fat: 17 }
  }

  if (planId === "budget_athlete") {
    if (role === "BREAKFAST") {
      return { protein: 25, carbs: 70, fat: 18 }
    }

    if (role === "LUNCH") {
      return { protein: 30, carbs: 75, fat: 19 }
    }

    return { protein: 30, carbs: 65, fat: 18 }
  }

  if (planId === "premium_chef") {
    if (role === "BREAKFAST") {
      return { protein: 35, carbs: 55, fat: 18 }
    }

    if (role === "LUNCH") {
      return { protein: 55, carbs: 70, fat: 22 }
    }

    return { protein: 50, carbs: 60, fat: 20 }
  }

  if (planId === "mass_gainer") {
    if (role === "BREAKFAST") {
      return { protein: 25, carbs: 55, fat: 15 }
    }

    if (role === "LUNCH") {
      return { protein: 35, carbs: 65, fat: 18 }
    }

    return { protein: 30, carbs: 50, fat: 17 }
  }

  return { protein: 35, carbs: 45, fat: 15 }
}

function getLegacySmartRole(role: MealRole, planId: PlanKey) {
  if (planId === "budget_athlete") {
    if (role === "BREAKFAST") {
      return "Balanced junior breakfast for steady energy."
    }

    if (role === "LUNCH") {
      return "Balanced junior main meal for school-day energy."
    }

    return "Balanced junior dinner without harsh dieting."
  }

  if (planId === "lean_bulk") {
    if (role === "BREAKFAST") {
      return "Light balanced breakfast for daily energy."
    }

    if (role === "LUNCH") {
      return "Main balanced meal for simple fat-loss support."
    }

    return "Controlled dinner for light fat-loss structure."
  }

  if (planId === "premium_chef" || planId === "mass_gainer") {
    if (role === "BREAKFAST") {
      return "Senior-friendly breakfast for energy and satiety."
    }

    if (role === "LUNCH") {
      return "Senior-friendly main meal with controlled portions."
    }

    return "Senior-friendly dinner with easier digestion."
  }

  if (role === "BREAKFAST") {
    return "Morning macro target meal."
  }

  if (role === "LUNCH") {
    return "Main balanced macro meal."
  }

  return "Recovery balanced macro meal."
}

function scaleMealForPlan(meal: MasterMeal, planId: PlanKey): Meal {
  getPlanScaling(planId)

  const portionRole = mapRoleToPortionRole(meal.role)

  const portionPlanId = getPortionPlanId(planId)

  const macroTarget = getLegacyMealMacroTarget(planId, meal.role)

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
    smartRole: getLegacySmartRole(meal.role, planId),
  })
}

/*
  NEW CLIENT PROFILE SUPPORT

  This is the new G7 Profile Engine layer.
  It does not replace PlanKey yet. It adds a new clean API:
  getMealsForClientProfile("female_26_soft_gain")
*/

function getProfileMealMacroTarget(profile: ClientProfile, role: MealRole) {
  if (role === "BREAKFAST") {
    return {
      protein: Math.round(profile.protein * 0.25),
      carbs: Math.round(profile.carbs * 0.3),
      fat: Math.round(profile.fat * 0.28),
    }
  }

  if (role === "LUNCH") {
    return {
      protein: Math.round(profile.protein * 0.38),
      carbs: Math.round(profile.carbs * 0.36),
      fat: Math.round(profile.fat * 0.36),
    }
  }

  return {
    protein: Math.round(profile.protein * 0.37),
    carbs: Math.round(profile.carbs * 0.34),
    fat: Math.round(profile.fat * 0.36),
  }
}

function getProfileSmartRole(role: MealRole, profile: ClientProfile) {
  if (profile.tone === "JUNIOR") {
    if (role === "BREAKFAST") {
      return "Balanced junior breakfast for school-day energy."
    }

    if (role === "LUNCH") {
      return "Balanced junior main meal without harsh dieting."
    }

    return "Balanced junior dinner for steady energy and normal family eating."
  }

  if (profile.tone === "SENIOR") {
    if (role === "BREAKFAST") {
      return "Senior-friendly breakfast for energy and satiety."
    }

    if (role === "LUNCH") {
      return "Senior-friendly main meal with controlled portions."
    }

    return "Senior-friendly dinner with easier digestion."
  }

  if (profile.goal === "HEALTHY_WEIGHT_GAIN") {
    if (role === "BREAKFAST") {
      return "Higher-carb lifestyle breakfast for healthy weight gain."
    }

    if (role === "LUNCH") {
      return "Main higher-carb meal for steady weight gain and daily energy."
    }

    return "Balanced higher-carb dinner without random overeating."
  }

  if (profile.tone === "GYM") {
    if (role === "BREAKFAST") {
      return "Morning performance meal."
    }

    if (role === "LUNCH") {
      return "Main performance macro meal."
    }

    return "Recovery performance meal."
  }

  if (role === "BREAKFAST") {
    return "Balanced breakfast for daily energy."
  }

  if (role === "LUNCH") {
    return "Main balanced meal for the client goal."
  }

  return "Balanced dinner matched to the client goal."
}

function formatGrams(value: number) {
  return `${Math.round(value)}g`
}

function replaceGramAmount(amount: string, grams: number) {
  if (/[\d.]+\s*g/i.test(amount)) {
    return amount.replace(/[\d.]+\s*g/i, formatGrams(grams))
  }

  return formatGrams(grams)
}

function replaceEggAmount(amount: string, eggs: number) {
  if (/[\d.]+\s*egg/i.test(amount)) {
    return amount.replace(/[\d.]+\s*egg/i, `${eggs} eggs`)
  }

  return `${eggs} eggs`
}

function replaceCanAmount(amount: string, cans: number) {
  if (/[\d.]+\s*can/i.test(amount)) {
    return amount.replace(/[\d.]+\s*can/i, `${cans} cans`)
  }

  return `${cans} cans`
}

function shouldUseMainCottageCheese(meal: MasterMeal) {
  const text = `${meal.title} ${meal.subtitle}`

  return includesAny(text, ["oats", "shake", "omelette", "protein"])
}

function scaleProfileIngredient(
  name: string,
  amount: string,
  meal: MasterMeal,
  portions: ClientProfilePortions
): string {
  const normalized = name.toLowerCase()

  if (
    normalized.includes("chicken breast") ||
    normalized.includes("chicken raw")
  ) {
    return replaceGramAmount(amount, portions.chickenRaw)
  }

  if (
    normalized.includes("lean minced beef") ||
    normalized.includes("lean beef") ||
    normalized.includes("beef raw")
  ) {
    return replaceGramAmount(amount, portions.beefRaw)
  }

  if (
    normalized.includes("fish fillet") ||
    normalized.includes("fish raw")
  ) {
    return replaceGramAmount(amount, portions.fishRaw)
  }

  if (normalized.includes("tuna")) {
    return replaceCanAmount(amount, portions.tunaCans)
  }

  if (
    normalized.includes("whole egg") ||
    normalized.includes("whole eggs") ||
    normalized === "egg" ||
    normalized === "eggs"
  ) {
    return replaceEggAmount(amount, portions.eggsPerEggBreakfast)
  }

  if (
    normalized.includes("cottage cheese") ||
    normalized.includes("gebna") ||
    normalized.includes("quraish") ||
    normalized.includes("qareesh") ||
    normalized.includes("قريش")
  ) {
    const grams = shouldUseMainCottageCheese(meal)
      ? portions.cottageCheeseMain
      : portions.cottageCheeseLight

    return replaceGramAmount(amount, grams)
  }

  if (normalized.includes("basmati rice")) {
    return replaceGramAmount(amount, portions.riceRaw)
  }

  if (
    normalized.includes("penne") ||
    normalized.includes("pasta")
  ) {
    return replaceGramAmount(amount, portions.pastaRaw)
  }

  if (
    normalized.includes("sweet potato")
  ) {
    return replaceGramAmount(amount, portions.sweetPotatoRaw)
  }

  if (
    normalized.includes("potato")
  ) {
    return replaceGramAmount(amount, portions.potatoRaw)
  }

  if (normalized.includes("oats")) {
    return replaceGramAmount(amount, portions.oatsRaw)
  }

  if (normalized.includes("banana")) {
    return replaceGramAmount(amount, portions.banana)
  }

  if (
    normalized.includes("tahini") ||
    normalized.includes("yogurt sauce") ||
    normalized.includes("tomato sauce") ||
    normalized.includes("pink sauce") ||
    normalized.includes("burger sauce") ||
    normalized.includes("fajita sauce") ||
    normalized.includes("guacamole")
  ) {
    const grams = meal.role === "BREAKFAST" ? portions.sauceLight : portions.sauceMain

    return replaceGramAmount(amount, grams)
  }

  if (
    normalized.includes("green salad") ||
    normalized.includes("lettuce") ||
    normalized.includes("tomato & cucumber") ||
    normalized.includes("mushroom") ||
    normalized.includes("bell pepper") ||
    normalized.includes("colored peppers") ||
    normalized.includes("green pepper") ||
    normalized.includes("parsley") ||
    normalized.includes("pickles")
  ) {
    const grams = meal.role === "BREAKFAST" ? portions.saladSmall : portions.saladMain

    return replaceGramAmount(amount, grams)
  }

  return amount
}

function scaleRawIngredientsForProfile(
  meal: MasterMeal,
  profile: ClientProfile
): [string, string][] {
  return meal.raw.map(([name, amount]) => [
    name,
    scaleProfileIngredient(name, amount, meal, profile.portions),
  ])
}

function getProfileProteinCookedWeight(
  meal: MasterMeal,
  proteinFamily: ProteinFamily,
  portions: ClientProfilePortions
) {
  if (proteinFamily === "CHICKEN") {
    return portions.chickenCooked
  }

  if (proteinFamily === "BEEF") {
    return portions.beefCooked
  }

  if (proteinFamily === "FISH") {
    return portions.fishCooked
  }

  if (proteinFamily === "TUNA") {
    return 0
  }

  if (proteinFamily === "EGGS") {
    return portions.cottageCheeseLight
  }

  if (meal.role === "BREAKFAST") {
    return portions.cottageCheeseMain
  }

  return portions.chickenCooked
}

function getProfileCarbCookedWeight(
  carbType: CarbType,
  portions: ClientProfilePortions
) {
  if (carbType === "RICE") {
    return portions.riceCooked
  }

  if (carbType === "PASTA") {
    return portions.pastaCooked
  }

  if (carbType === "POTATO") {
    return portions.potatoCooked
  }

  if (carbType === "OATS") {
    return portions.oatsRaw
  }

  if (carbType === "WRAP") {
    return 0
  }

  if (carbType === "BREAD") {
    return 0
  }

  return portions.riceCooked
}

function scaleMealForClientProfile(
  meal: MasterMeal,
  profileId: ClientProfileKey
): Meal {
  const profile = getClientProfile(profileId)

  const macroTarget = getProfileMealMacroTarget(profile, meal.role)

  const proteinFamily = detectProteinFamily(meal)

  const carbType = detectCarbType(meal)

  const texture = detectTexture(meal)

  const digestionLoad = detectDigestionLoad(carbType, proteinFamily)

  const flavorBase = detectFlavorBase(proteinFamily)

  const adjustedRaw = scaleRawIngredientsForProfile(meal, profile)

  const proteinCookedWeight = getProfileProteinCookedWeight(
    meal,
    proteinFamily,
    profile.portions
  )

  const carbCookedWeight = getProfileCarbCookedWeight(
    carbType,
    profile.portions
  )

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
    smartRole: getProfileSmartRole(meal.role, profile),
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

export function getMealsForClientProfile(profileId: ClientProfileKey): Meal[] {
  return getMasterMeals().map((meal) =>
    scaleMealForClientProfile(meal, profileId)
  )
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

export function getMealsGroupedByDayForClientProfile(
  profileId: ClientProfileKey
) {
  const meals = getMealsForClientProfile(profileId)

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