export type MealCount = 3 | 4 | 5

export type PortionMealRole =
  | "BREAKFAST"
  | "AM_SNACK"
  | "LUNCH"
  | "PM_SNACK"
  | "DINNER"

export type FatLevel = "LOW" | "MEDIUM" | "HIGH"

export type G7PortionSize = "JUNIOR" | "S" | "M" | "L"

export type G7WeightStage =
  | "PURCHASE_WEIGHT"
  | "PREP_WEIGHT"
  | "COOKING_INPUT_WEIGHT"
  | "PORTIONING_WEIGHT"

export type WeightLifecycleStage = {
  id: G7WeightStage
  label: string
  arabicLabel: string
  description: string
  arabicDescription: string
}

export type PortionTarget = {
  size: G7PortionSize

  /*
    NEW G7 Kitchen OS logic:
    - proteinRawWeight = protein before cooking
    - carbCookedWeight = carb after cooking / portioning weight
  */
  proteinRawWeight: number
  carbCookedWeight: number

  /*
    BACKWARD COMPATIBILITY:
    meals.ts still reads proteinCookedWeight.
    Keep this field so the current build does not break.
  */
  proteinCookedWeight: number

  vegRawWeight: number
  sauceWeight: number

  fatLevel: FatLevel
}

export type PortionMatrixPlan = {
  id: string
  label: string
  arabicLabel: string

  clientType:
    | "FATHER_46"
    | "MOTHER_34"
    | "CHILD_11"
    | "GRANDFATHER_65"
    | "GENERAL"

  planType:
    | "SHREDDING"
    | "CLASSIC_LIGHT"
    | "BALANCED_JUNIOR"
    | "CLASSIC_BALANCED"
    | "LEAN_BULK"
    | "MASS_GAINER"

  mealCount: MealCount
  displayKcalRange: string

  macroTarget: {
    kcal: number
    protein: number
    carbs: number
    fat: number
  }

  meals: Partial<Record<PortionMealRole, PortionTarget>>
}

function estimateCookedProteinFromRaw(rawWeight: number) {
  return Math.round(rawWeight * 0.72)
}

function createPortionTarget({
  size,
  proteinRawWeight,
  carbCookedWeight,
  vegRawWeight,
  sauceWeight,
  fatLevel,
}: {
  size: G7PortionSize
  proteinRawWeight: number
  carbCookedWeight: number
  vegRawWeight: number
  sauceWeight: number
  fatLevel: FatLevel
}): PortionTarget {
  return {
    size,
    proteinRawWeight,
    proteinCookedWeight: estimateCookedProteinFromRaw(proteinRawWeight),
    carbCookedWeight,
    vegRawWeight,
    sauceWeight,
    fatLevel,
  }
}

export const WEIGHT_LIFECYCLE_STAGES: WeightLifecycleStage[] = [
  {
    id: "PURCHASE_WEIGHT",
    label: "Purchase Weight",
    arabicLabel: "وزن الشراء",
    description:
      "The weight bought from the market or supplier before cleaning, peeling, trimming, or cooking.",
    arabicDescription:
      "الوزن اللي بتشتريه من السوق أو المورد قبل التنضيف أو التقشير أو التقطيع أو الطبخ.",
  },
  {
    id: "PREP_WEIGHT",
    label: "Prep Weight",
    arabicLabel: "وزن التحضير",
    description:
      "The weight after cleaning, peeling, trimming, cutting, and removing waste.",
    arabicDescription:
      "الوزن بعد التنضيف أو التقشير أو التقطيع وإزالة الهالك.",
  },
  {
    id: "COOKING_INPUT_WEIGHT",
    label: "Cooking Input Weight",
    arabicLabel: "وزن الطبخ",
    description:
      "The weight that enters the recipe or batch before cooking, including marinade or recipe ingredients when needed.",
    arabicDescription:
      "الوزن اللي يدخل الوصفة أو الباتش قبل الطبخ، ومعاه التتبيلة أو مكونات الوصفة حسب الحاجة.",
  },
  {
    id: "PORTIONING_WEIGHT",
    label: "Portioning Weight",
    arabicLabel: "وزن الغرف",
    description:
      "The final cooked weight placed inside the meal container using the scale.",
    arabicDescription:
      "الوزن النهائي بعد الطبخ اللي بيتحط في العلبة بالميزان.",
  },
]

export const G7_STANDARD_PORTIONS: Record<G7PortionSize, PortionTarget> = {
  JUNIOR: createPortionTarget({
    size: "JUNIOR",
    proteinRawWeight: 100,
    carbCookedWeight: 130,
    vegRawWeight: 80,
    sauceWeight: 25,
    fatLevel: "MEDIUM",
  }),
  S: createPortionTarget({
    size: "S",
    proteinRawWeight: 120,
    carbCookedWeight: 100,
    vegRawWeight: 100,
    sauceWeight: 25,
    fatLevel: "LOW",
  }),
  M: createPortionTarget({
    size: "M",
    proteinRawWeight: 160,
    carbCookedWeight: 130,
    vegRawWeight: 100,
    sauceWeight: 30,
    fatLevel: "MEDIUM",
  }),
  L: createPortionTarget({
    size: "L",
    proteinRawWeight: 190,
    carbCookedWeight: 140,
    vegRawWeight: 100,
    sauceWeight: 35,
    fatLevel: "MEDIUM",
  }),
}

export const PORTION_MATRIX_PLANS: PortionMatrixPlan[] = [
  {
    id: "father-46-shredding",
    label: "Father 46 · G7 Shred",
    arabicLabel: "الأب 46 · تنشيف متوازن",
    clientType: "FATHER_46",
    planType: "SHREDDING",
    mealCount: 3,
    displayKcalRange: "1900–2000 CAL",
    macroTarget: {
      kcal: 1950,
      protein: 155,
      carbs: 165,
      fat: 60,
    },
    meals: {
      BREAKFAST: createPortionTarget({
        size: "M",
        proteinRawWeight: 120,
        carbCookedWeight: 100,
        vegRawWeight: 80,
        sauceWeight: 20,
        fatLevel: "MEDIUM",
      }),
      LUNCH: createPortionTarget({
        size: "L",
        proteinRawWeight: 190,
        carbCookedWeight: 130,
        vegRawWeight: 100,
        sauceWeight: 30,
        fatLevel: "MEDIUM",
      }),
      DINNER: createPortionTarget({
        size: "M",
        proteinRawWeight: 160,
        carbCookedWeight: 100,
        vegRawWeight: 100,
        sauceWeight: 30,
        fatLevel: "MEDIUM",
      }),
    },
  },
  {
    id: "mother-34-classic-light",
    label: "Mother 34 · Classic Light",
    arabicLabel: "الأم 34 · نزول دهون بسيط",
    clientType: "MOTHER_34",
    planType: "CLASSIC_LIGHT",
    mealCount: 3,
    displayKcalRange: "1500–1650 CAL",
    macroTarget: {
      kcal: 1600,
      protein: 115,
      carbs: 140,
      fat: 50,
    },
    meals: {
      BREAKFAST: createPortionTarget({
        size: "S",
        proteinRawWeight: 100,
        carbCookedWeight: 100,
        vegRawWeight: 80,
        sauceWeight: 20,
        fatLevel: "MEDIUM",
      }),
      LUNCH: createPortionTarget({
        size: "M",
        proteinRawWeight: 160,
        carbCookedWeight: 130,
        vegRawWeight: 100,
        sauceWeight: 30,
        fatLevel: "MEDIUM",
      }),
      DINNER: createPortionTarget({
        size: "M",
        proteinRawWeight: 160,
        carbCookedWeight: 100,
        vegRawWeight: 100,
        sauceWeight: 25,
        fatLevel: "LOW",
      }),
    },
  },
  {
    id: "child-11-balanced-junior",
    label: "Child 11 · Balanced Junior",
    arabicLabel: "الطفل 11 · نظام صحي متوازن",
    clientType: "CHILD_11",
    planType: "BALANCED_JUNIOR",
    mealCount: 3,
    displayKcalRange: "1650–1750 CAL",
    macroTarget: {
      kcal: 1700,
      protein: 85,
      carbs: 210,
      fat: 55,
    },
    meals: {
      BREAKFAST: createPortionTarget({
        size: "JUNIOR",
        proteinRawWeight: 80,
        carbCookedWeight: 130,
        vegRawWeight: 80,
        sauceWeight: 15,
        fatLevel: "MEDIUM",
      }),
      LUNCH: createPortionTarget({
        size: "JUNIOR",
        proteinRawWeight: 100,
        carbCookedWeight: 140,
        vegRawWeight: 80,
        sauceWeight: 25,
        fatLevel: "MEDIUM",
      }),
      DINNER: createPortionTarget({
        size: "JUNIOR",
        proteinRawWeight: 100,
        carbCookedWeight: 130,
        vegRawWeight: 80,
        sauceWeight: 20,
        fatLevel: "MEDIUM",
      }),
    },
  },
  {
    id: "grandfather-65-classic-balanced",
    label: "Grandfather 65 · Classic Balanced",
    arabicLabel: "الجد 65 · نزول دهون آمن",
    clientType: "GRANDFATHER_65",
    planType: "CLASSIC_BALANCED",
    mealCount: 3,
    displayKcalRange: "1900–2000 CAL",
    macroTarget: {
      kcal: 1950,
      protein: 140,
      carbs: 185,
      fat: 60,
    },
    meals: {
      BREAKFAST: createPortionTarget({
        size: "M",
        proteinRawWeight: 120,
        carbCookedWeight: 130,
        vegRawWeight: 80,
        sauceWeight: 20,
        fatLevel: "MEDIUM",
      }),
      LUNCH: createPortionTarget({
        size: "M",
        proteinRawWeight: 160,
        carbCookedWeight: 140,
        vegRawWeight: 100,
        sauceWeight: 35,
        fatLevel: "MEDIUM",
      }),
      DINNER: createPortionTarget({
        size: "M",
        proteinRawWeight: 160,
        carbCookedWeight: 130,
        vegRawWeight: 100,
        sauceWeight: 30,
        fatLevel: "MEDIUM",
      }),
    },
  },
  {
    id: "mass-gainer-3-meals",
    label: "Mass Gainer · 3 Meal Plan",
    arabicLabel: "تضخيم · 3 وجبات",
    clientType: "GENERAL",
    planType: "MASS_GAINER",
    mealCount: 3,
    displayKcalRange: "3000–3300 CAL",
    macroTarget: {
      kcal: 3200,
      protein: 240,
      carbs: 320,
      fat: 90,
    },
    meals: {
      BREAKFAST: createPortionTarget({
        size: "L",
        proteinRawWeight: 190,
        carbCookedWeight: 140,
        vegRawWeight: 100,
        sauceWeight: 35,
        fatLevel: "MEDIUM",
      }),
      LUNCH: createPortionTarget({
        size: "L",
        proteinRawWeight: 190,
        carbCookedWeight: 220,
        vegRawWeight: 100,
        sauceWeight: 40,
        fatLevel: "HIGH",
      }),
      DINNER: createPortionTarget({
        size: "L",
        proteinRawWeight: 190,
        carbCookedWeight: 220,
        vegRawWeight: 100,
        sauceWeight: 40,
        fatLevel: "HIGH",
      }),
    },
  },
]

export function getPortionMatrixPlan(id: string) {
  return PORTION_MATRIX_PLANS.find((plan) => plan.id === id)
}

export function getDefaultPortionMatrixPlan() {
  return PORTION_MATRIX_PLANS[0]
}

export function getPortionTargetForMeal(
  planId: string,
  role: PortionMealRole
) {
  const plan = getPortionMatrixPlan(planId) ?? getDefaultPortionMatrixPlan()

  return plan.meals[role]
}

export function getWeightLifecycleStages() {
  return WEIGHT_LIFECYCLE_STAGES
}

export function getStandardPortion(size: G7PortionSize) {
  return G7_STANDARD_PORTIONS[size]
}

export function getClientPortionPlanByType(
  clientType: PortionMatrixPlan["clientType"]
) {
  return PORTION_MATRIX_PLANS.find((plan) => plan.clientType === clientType)
}

export function calculateCookingInputWeight({
  proteinRawWeight,
  marinadeWeight = 0,
}: {
  proteinRawWeight: number
  marinadeWeight?: number
}) {
  return proteinRawWeight + marinadeWeight
}

export function estimateCookedProteinYield({
  proteinRawWeight,
  yieldRatio,
}: {
  proteinRawWeight: number
  yieldRatio: number
}) {
  return Math.round(proteinRawWeight * yieldRatio)
}

export function calculatePurchaseWeightFromPrep({
  prepWeight,
  prepYieldRatio,
}: {
  prepWeight: number
  prepYieldRatio: number
}) {
  if (prepYieldRatio <= 0) return prepWeight
  return Math.ceil(prepWeight / prepYieldRatio)
}