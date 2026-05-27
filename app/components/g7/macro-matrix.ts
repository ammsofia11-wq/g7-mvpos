export type MealCount = 3 | 4 | 5

export type MealSlot =
  | "BREAKFAST"
  | "AM_SNACK"
  | "LUNCH"
  | "PM_SNACK"
  | "DINNER"

export type MacroSplit = {
  protein: number
  carbs: number
  fat: number
}

export type MacroMatrixPlan = {
  id: string
  label: string
  mealCount: MealCount
  targetKcal: number
  daily: MacroSplit
  meals: Partial<Record<MealSlot, MacroSplit>>
}

export const MACRO_MATRIX_PLANS: MacroMatrixPlan[] = [
  {
    id: "shredding-1700-3-meals",
    label: "Shredding 1700 · 3 Meal Plan",
    mealCount: 3,
    targetKcal: 1700,
    daily: {
      protein: 180,
      carbs: 140,
      fat: 47,
    },
    meals: {
      BREAKFAST: {
        protein: 45,
        carbs: 35,
        fat: 10,
      },
      LUNCH: {
        protein: 67.5,
        carbs: 52.5,
        fat: 18.5,
      },
      DINNER: {
        protein: 67.5,
        carbs: 52.5,
        fat: 18.5,
      },
    },
  },

  {
    id: "shredding-1700-4-meals",
    label: "Shredding 1700 · 4 Meal Plan",
    mealCount: 4,
    targetKcal: 1700,
    daily: {
      protein: 180,
      carbs: 140,
      fat: 47,
    },
    meals: {
      BREAKFAST: {
        protein: 35,
        carbs: 30,
        fat: 10,
      },
      LUNCH: {
        protein: 60,
        carbs: 45,
        fat: 14,
      },
      PM_SNACK: {
        protein: 25,
        carbs: 20,
        fat: 9,
      },
      DINNER: {
        protein: 60,
        carbs: 45,
        fat: 14,
      },
    },
  },

  {
    id: "shredding-1700-5-meals",
    label: "Shredding 1700 · 5 Meal Plan",
    mealCount: 5,
    targetKcal: 1700,
    daily: {
      protein: 180,
      carbs: 140,
      fat: 47,
    },
    meals: {
      BREAKFAST: {
        protein: 30,
        carbs: 25,
        fat: 9,
      },
      AM_SNACK: {
        protein: 20,
        carbs: 15,
        fat: 6,
      },
      LUNCH: {
        protein: 55,
        carbs: 40,
        fat: 12,
      },
      PM_SNACK: {
        protein: 20,
        carbs: 20,
        fat: 8,
      },
      DINNER: {
        protein: 55,
        carbs: 40,
        fat: 12,
      },
    },
  },
]

export function calculateKcal(split: MacroSplit) {
  return Math.round(
    split.protein * 4 +
      split.carbs * 4 +
      split.fat * 9
  )
}

export function getMacroMatrixPlan(id: string) {
  return MACRO_MATRIX_PLANS.find(
    (plan) => plan.id === id
  )
}

export function getDefaultMacroMatrixPlan() {
  return MACRO_MATRIX_PLANS[0]
}

export function getMacroSplitForMeal(
  planId: string,
  slot: MealSlot
) {
  const plan =
    getMacroMatrixPlan(planId) ??
    getDefaultMacroMatrixPlan()

  return plan.meals[slot]
}

export function getPlanDailyCalories(plan: MacroMatrixPlan) {
  return calculateKcal(plan.daily)
}

export function getPlanMealCalories(
  plan: MacroMatrixPlan,
  slot: MealSlot
) {
  const split = plan.meals[slot]

  if (!split) return 0

  return calculateKcal(split)
}