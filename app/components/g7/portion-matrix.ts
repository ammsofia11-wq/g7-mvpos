export type MealCount = 3 | 4 | 5

export type PortionMealRole =
  | "BREAKFAST"
  | "AM_SNACK"
  | "LUNCH"
  | "PM_SNACK"
  | "DINNER"

export type FatLevel = "LOW" | "MEDIUM" | "HIGH"

export type G7PortionSize = "S" | "M" | "L" | "XL"

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
    G7 Gym Core logic:
    - proteinRawWeight = protein before cooking
    - proteinCookedWeight = estimated cooked protein portion
    - carbCookedWeight = cooked carb portion inside the box
  */
  proteinRawWeight: number
  carbCookedWeight: number
  proteinCookedWeight: number

  vegRawWeight: number
  sauceWeight: number

  fatLevel: FatLevel
}

export type PortionMatrixPlan = {
  id: string
  label: string
  arabicLabel: string

  clientType: "GENERAL_GYM"

  planType:
    | "G7_SHRED"
    | "G7_CORE"
    | "G7_MASS"
    | "G7_FLEX"
    | "G7_PREMIUM"

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
    arabicLabel: "وزن التوزيع",
    description:
      "The final cooked weight placed inside the meal container using the scale.",
    arabicDescription:
      "الوزن النهائي بعد الطبخ اللي بيتحط في العلبة بالميزان حسب خريطة تجهيز العلب.",
  },
]

export const G7_STANDARD_PORTIONS: Record<G7PortionSize, PortionTarget> = {
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
    carbCookedWeight: 160,
    vegRawWeight: 100,
    sauceWeight: 35,
    fatLevel: "MEDIUM",
  }),
  XL: createPortionTarget({
    size: "XL",
    proteinRawWeight: 210,
    carbCookedWeight: 200,
    vegRawWeight: 100,
    sauceWeight: 40,
    fatLevel: "HIGH",
  }),
}

export const PORTION_MATRIX_PLANS: PortionMatrixPlan[] = [
  {
    id: "g7-shred",
    label: "G7 SHRED",
    arabicLabel: "تنشيف وحرق دهون",
    clientType: "GENERAL_GYM",
    planType: "G7_SHRED",
    mealCount: 3,
    displayKcalRange: "1650–1750 CAL",
    macroTarget: {
      kcal: 1700,
      protein: 180,
      carbs: 140,
      fat: 47,
    },
    meals: {
      BREAKFAST: createPortionTarget({
        size: "M",
        proteinRawWeight: 140,
        carbCookedWeight: 90,
        vegRawWeight: 100,
        sauceWeight: 20,
        fatLevel: "LOW",
      }),
      LUNCH: createPortionTarget({
        size: "L",
        proteinRawWeight: 190,
        carbCookedWeight: 120,
        vegRawWeight: 100,
        sauceWeight: 25,
        fatLevel: "LOW",
      }),
      DINNER: createPortionTarget({
        size: "L",
        proteinRawWeight: 190,
        carbCookedWeight: 100,
        vegRawWeight: 100,
        sauceWeight: 25,
        fatLevel: "LOW",
      }),
    },
  },
  {
    id: "g7-core",
    label: "G7 CORE",
    arabicLabel: "نظام جيم متوازن",
    clientType: "GENERAL_GYM",
    planType: "G7_CORE",
    mealCount: 3,
    displayKcalRange: "1950–2050 CAL",
    macroTarget: {
      kcal: 2000,
      protein: 180,
      carbs: 200,
      fat: 53,
    },
    meals: {
      BREAKFAST: createPortionTarget({
        size: "M",
        proteinRawWeight: 130,
        carbCookedWeight: 120,
        vegRawWeight: 100,
        sauceWeight: 25,
        fatLevel: "MEDIUM",
      }),
      LUNCH: createPortionTarget({
        size: "L",
        proteinRawWeight: 180,
        carbCookedWeight: 160,
        vegRawWeight: 100,
        sauceWeight: 30,
        fatLevel: "MEDIUM",
      }),
      DINNER: createPortionTarget({
        size: "L",
        proteinRawWeight: 180,
        carbCookedWeight: 150,
        vegRawWeight: 100,
        sauceWeight: 30,
        fatLevel: "MEDIUM",
      }),
    },
  },
  {
    id: "g7-mass",
    label: "G7 MASS",
    arabicLabel: "زيادة كتلة عضلية",
    clientType: "GENERAL_GYM",
    planType: "G7_MASS",
    mealCount: 3,
    displayKcalRange: "2450–2550 CAL",
    macroTarget: {
      kcal: 2500,
      protein: 200,
      carbs: 300,
      fat: 56,
    },
    meals: {
      BREAKFAST: createPortionTarget({
        size: "L",
        proteinRawWeight: 150,
        carbCookedWeight: 170,
        vegRawWeight: 100,
        sauceWeight: 30,
        fatLevel: "MEDIUM",
      }),
      LUNCH: createPortionTarget({
        size: "XL",
        proteinRawWeight: 190,
        carbCookedWeight: 220,
        vegRawWeight: 100,
        sauceWeight: 35,
        fatLevel: "MEDIUM",
      }),
      DINNER: createPortionTarget({
        size: "XL",
        proteinRawWeight: 190,
        carbCookedWeight: 210,
        vegRawWeight: 100,
        sauceWeight: 35,
        fatLevel: "MEDIUM",
      }),
    },
  },
  {
    id: "g7-flex",
    label: "G7 FLEX",
    arabicLabel: "نظام اقتصادي مرن",
    clientType: "GENERAL_GYM",
    planType: "G7_FLEX",
    mealCount: 3,
    displayKcalRange: "1850–1950 CAL",
    macroTarget: {
      kcal: 1900,
      protein: 160,
      carbs: 180,
      fat: 53,
    },
    meals: {
      BREAKFAST: createPortionTarget({
        size: "M",
        proteinRawWeight: 120,
        carbCookedWeight: 110,
        vegRawWeight: 90,
        sauceWeight: 20,
        fatLevel: "MEDIUM",
      }),
      LUNCH: createPortionTarget({
        size: "M",
        proteinRawWeight: 160,
        carbCookedWeight: 150,
        vegRawWeight: 100,
        sauceWeight: 25,
        fatLevel: "MEDIUM",
      }),
      DINNER: createPortionTarget({
        size: "M",
        proteinRawWeight: 160,
        carbCookedWeight: 130,
        vegRawWeight: 100,
        sauceWeight: 25,
        fatLevel: "MEDIUM",
      }),
    },
  },
  {
    id: "g7-premium",
    label: "G7 PREMIUM",
    arabicLabel: "نظام شيف بريميوم للجيم",
    clientType: "GENERAL_GYM",
    planType: "G7_PREMIUM",
    mealCount: 3,
    displayKcalRange: "2150–2250 CAL",
    macroTarget: {
      kcal: 2200,
      protein: 190,
      carbs: 230,
      fat: 58,
    },
    meals: {
      BREAKFAST: createPortionTarget({
        size: "L",
        proteinRawWeight: 140,
        carbCookedWeight: 130,
        vegRawWeight: 110,
        sauceWeight: 25,
        fatLevel: "MEDIUM",
      }),
      LUNCH: createPortionTarget({
        size: "L",
        proteinRawWeight: 190,
        carbCookedWeight: 180,
        vegRawWeight: 110,
        sauceWeight: 35,
        fatLevel: "MEDIUM",
      }),
      DINNER: createPortionTarget({
        size: "L",
        proteinRawWeight: 180,
        carbCookedWeight: 170,
        vegRawWeight: 110,
        sauceWeight: 35,
        fatLevel: "MEDIUM",
      }),
    },
  },
]

export function getPortionMatrixPlan(id: string) {
  return PORTION_MATRIX_PLANS.find((plan) => plan.id === id)
}

export function getDefaultPortionMatrixPlan() {
  return PORTION_MATRIX_PLANS.find((plan) => plan.id === "g7-core") ?? PORTION_MATRIX_PLANS[0]
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