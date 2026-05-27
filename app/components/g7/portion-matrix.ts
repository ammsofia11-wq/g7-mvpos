export type MealCount = 3 | 4 | 5

export type PortionMealRole =
  | "BREAKFAST"
  | "AM_SNACK"
  | "LUNCH"
  | "PM_SNACK"
  | "DINNER"

export type PortionTarget = {
  proteinCookedWeight: number
  carbCookedWeight: number
  fatLevel: "LOW" | "MEDIUM" | "HIGH"
}

export type PortionMatrixPlan = {
  id: string
  label: string
  planType: "SHREDDING" | "LEAN_BULK" | "MASS_GAINER"
  mealCount: MealCount
  displayKcalRange: string
  meals: Partial<Record<PortionMealRole, PortionTarget>>
}

export const PORTION_MATRIX_PLANS: PortionMatrixPlan[] = [
  {
    id: "shredding-3-meals",
    label: "Shredding · 3 Meal Plan",
    planType: "SHREDDING",
    mealCount: 3,
    displayKcalRange: "1000–1400 CAL",
    meals: {
      BREAKFAST: {
        proteinCookedWeight: 150,
        carbCookedWeight: 80,
        fatLevel: "LOW",
      },
      LUNCH: {
        proteinCookedWeight: 200,
        carbCookedWeight: 150,
        fatLevel: "LOW",
      },
      DINNER: {
        proteinCookedWeight: 200,
        carbCookedWeight: 150,
        fatLevel: "LOW",
      },
    },
  },
  {
    id: "lean-bulk-3-meals",
    label: "Lean Bulk · 3 Meal Plan",
    planType: "LEAN_BULK",
    mealCount: 3,
    displayKcalRange: "1400–2000 CAL",
    meals: {
      BREAKFAST: {
        proteinCookedWeight: 180,
        carbCookedWeight: 120,
        fatLevel: "MEDIUM",
      },
      LUNCH: {
        proteinCookedWeight: 220,
        carbCookedWeight: 180,
        fatLevel: "MEDIUM",
      },
      DINNER: {
        proteinCookedWeight: 220,
        carbCookedWeight: 180,
        fatLevel: "MEDIUM",
      },
    },
  },
  {
    id: "mass-gainer-3-meals",
    label: "Mass Gainer · 3 Meal Plan",
    planType: "MASS_GAINER",
    mealCount: 3,
    displayKcalRange: "1900–2300 CAL",
    meals: {
      BREAKFAST: {
        proteinCookedWeight: 200,
        carbCookedWeight: 160,
        fatLevel: "MEDIUM",
      },
      LUNCH: {
        proteinCookedWeight: 250,
        carbCookedWeight: 220,
        fatLevel: "HIGH",
      },
      DINNER: {
        proteinCookedWeight: 250,
        carbCookedWeight: 220,
        fatLevel: "HIGH",
      },
    },
  },
]

export function getPortionMatrixPlan(id: string) {
  return PORTION_MATRIX_PLANS.find(
    (plan) => plan.id === id
  )
}

export function getDefaultPortionMatrixPlan() {
  return PORTION_MATRIX_PLANS[0]
}

export function getPortionTargetForMeal(
  planId: string,
  role: PortionMealRole
) {
  const plan =
    getPortionMatrixPlan(planId) ??
    getDefaultPortionMatrixPlan()

  return plan.meals[role]
}