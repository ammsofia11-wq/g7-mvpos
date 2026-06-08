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

/*
  TEMPORARY REAL CLIENT MAPPING

  PlanKey mapping currently used in the admin:
  - shredding = Father 46 · G7 Balanced Shred
  - lean_bulk = Mother 34 · Classic Light
  - budget_athlete = Child 11 · Balanced Junior
  - premium_chef = Grandfather 65 · Classic Senior
  - mass_gainer = Grandmother 75 · Senior Light

  Important:
  These macro splits are not public package names.
  They are the actual nutrition profile targets for the first real household clients.
*/

export const MACRO_MATRIX_PLANS: MacroMatrixPlan[] = [
  {
    id: "shredding",
    label: "Father 46 · G7 Balanced Shred · 3 Meals",
    mealCount: 3,
    targetKcal: 1950,
    daily: {
      protein: 155,
      carbs: 165,
      fat: 60,
    },
    meals: {
      BREAKFAST: {
        protein: 35,
        carbs: 45,
        fat: 15,
      },
      LUNCH: {
        protein: 65,
        carbs: 65,
        fat: 22,
      },
      DINNER: {
        protein: 55,
        carbs: 55,
        fat: 23,
      },
    },
  },

  {
    id: "lean_bulk",
    label: "Mother 34 · Classic Light · 3 Meals",
    mealCount: 3,
    targetKcal: 1600,
    daily: {
      protein: 115,
      carbs: 140,
      fat: 50,
    },
    meals: {
      BREAKFAST: {
        protein: 25,
        carbs: 40,
        fat: 15,
      },
      LUNCH: {
        protein: 45,
        carbs: 55,
        fat: 18,
      },
      DINNER: {
        protein: 45,
        carbs: 45,
        fat: 17,
      },
    },
  },

  {
    id: "budget_athlete",
    label: "Child 11 · Balanced Junior · 3 Meals",
    mealCount: 3,
    targetKcal: 1700,
    daily: {
      protein: 85,
      carbs: 210,
      fat: 55,
    },
    meals: {
      BREAKFAST: {
        protein: 25,
        carbs: 70,
        fat: 18,
      },
      LUNCH: {
        protein: 30,
        carbs: 75,
        fat: 19,
      },
      DINNER: {
        protein: 30,
        carbs: 65,
        fat: 18,
      },
    },
  },

  {
    id: "premium_chef",
    label: "Grandfather 65 · Classic Senior · 3 Meals",
    mealCount: 3,
    targetKcal: 1950,
    daily: {
      protein: 140,
      carbs: 185,
      fat: 60,
    },
    meals: {
      BREAKFAST: {
        protein: 35,
        carbs: 55,
        fat: 18,
      },
      LUNCH: {
        protein: 55,
        carbs: 70,
        fat: 22,
      },
      DINNER: {
        protein: 50,
        carbs: 60,
        fat: 20,
      },
    },
  },

  {
    id: "mass_gainer",
    label: "Grandmother 75 · Senior Light · 3 Meals",
    mealCount: 3,
    targetKcal: 1550,
    daily: {
      protein: 90,
      carbs: 170,
      fat: 50,
    },
    meals: {
      BREAKFAST: {
        protein: 25,
        carbs: 55,
        fat: 15,
      },
      LUNCH: {
        protein: 35,
        carbs: 65,
        fat: 18,
      },
      DINNER: {
        protein: 30,
        carbs: 50,
        fat: 17,
      },
    },
  },

  /*
    Legacy IDs kept for compatibility.
    If any old component still calls these IDs, they will not fall into the wrong default.
  */
  {
    id: "shredding-1700-3-meals",
    label: "Legacy Shredding 1700 · 3 Meal Plan",
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
    label: "Legacy Shredding 1700 · 4 Meal Plan",
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
    label: "Legacy Shredding 1700 · 5 Meal Plan",
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
  return Math.round(split.protein * 4 + split.carbs * 4 + split.fat * 9)
}

export function getMacroMatrixPlan(id: string) {
  return MACRO_MATRIX_PLANS.find((plan) => plan.id === id)
}

export function getDefaultMacroMatrixPlan() {
  return MACRO_MATRIX_PLANS.find((plan) => plan.id === "lean_bulk") ?? MACRO_MATRIX_PLANS[0]
}

export function getMacroSplitForMeal(planId: string, slot: MealSlot) {
  const plan = getMacroMatrixPlan(planId) ?? getDefaultMacroMatrixPlan()

  return plan.meals[slot]
}

export function getPlanDailyCalories(plan: MacroMatrixPlan) {
  return calculateKcal(plan.daily)
}

export function getPlanMealCalories(plan: MacroMatrixPlan, slot: MealSlot) {
  const split = plan.meals[slot]

  if (!split) return 0

  return calculateKcal(split)
}