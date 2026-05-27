import type { G7MealType, G7PlanId } from "./g7-base-meals"

export type G7MealWeight = "light" | "medium" | "heavy"

export type G7ProteinCore =
  | "eggs"
  | "oats"
  | "protein_shake"
  | "chicken"
  | "lean_beef"
  | "tuna"
  | "fish"

export type G7CarbCore =
  | "rice"
  | "pasta"
  | "whole_wheat_bread"
  | "burger_bun"
  | "sweet_potato"
  | "potato"
  | "oats"
  | "low_carb"

export type G7WeeklyAssemblyRule = {
  id: string
  title: string
  description: string
}

export type G7MealSlotTarget = {
  mealType: G7MealType
  kcalPercent: number
  cookedProteinTarget: number
  cookedCarbTarget: number
  maxFat: number
  weight: G7MealWeight
}

export type G7DailyDistribution = {
  planId: G7PlanId
  kcal: number
  breakfast: G7MealSlotTarget
  lunch: G7MealSlotTarget
  dinner: G7MealSlotTarget
}

export const G7_WEEKLY_ASSEMBLY_RULES: G7WeeklyAssemblyRule[] = [
  {
    id: "no-same-protein-lunch-dinner",
    title: "No same protein in lunch and dinner",
    description:
      "Lunch and dinner should not use the same core protein unless the client requested a simple budget week.",
  },
  {
    id: "heavy-light-balance",
    title: "Heavy meal balance",
    description:
      "If lunch is heavy, dinner should be medium or light to keep the day comfortable.",
  },
  {
    id: "carb-rotation",
    title: "Carb rotation",
    description:
      "Rotate rice, pasta, bread, wraps, potato, and sweet potato to reduce boredom.",
  },
  {
    id: "fish-tuna-placement",
    title: "Fish and tuna placement",
    description:
      "Place tuna and fish later in the week or on lighter days for variety and cost control.",
  },
  {
    id: "breakfast-satiety",
    title: "Breakfast satiety logic",
    description:
      "Use eggs for high satiety days, oats for training-energy days, and protein shake for a fast/light day.",
  },
]

export const G7_PLAN_DISTRIBUTIONS: Record<G7PlanId, G7DailyDistribution> = {
  fat_loss: {
    planId: "fat_loss",
    kcal: 1700,
    breakfast: {
      mealType: "breakfast",
      kcalPercent: 0.23,
      cookedProteinTarget: 45,
      cookedCarbTarget: 35,
      maxFat: 12,
      weight: "light",
    },
    lunch: {
      mealType: "lunch",
      kcalPercent: 0.39,
      cookedProteinTarget: 80,
      cookedCarbTarget: 60,
      maxFat: 10,
      weight: "heavy",
    },
    dinner: {
      mealType: "dinner",
      kcalPercent: 0.38,
      cookedProteinTarget: 75,
      cookedCarbTarget: 55,
      maxFat: 10,
      weight: "medium",
    },
  },

  lean_bulk: {
    planId: "lean_bulk",
    kcal: 2200,
    breakfast: {
      mealType: "breakfast",
      kcalPercent: 0.25,
      cookedProteinTarget: 55,
      cookedCarbTarget: 55,
      maxFat: 15,
      weight: "medium",
    },
    lunch: {
      mealType: "lunch",
      kcalPercent: 0.38,
      cookedProteinTarget: 90,
      cookedCarbTarget: 80,
      maxFat: 12,
      weight: "heavy",
    },
    dinner: {
      mealType: "dinner",
      kcalPercent: 0.37,
      cookedProteinTarget: 85,
      cookedCarbTarget: 75,
      maxFat: 12,
      weight: "heavy",
    },
  },

  athlete: {
    planId: "athlete",
    kcal: 2500,
    breakfast: {
      mealType: "breakfast",
      kcalPercent: 0.25,
      cookedProteinTarget: 60,
      cookedCarbTarget: 65,
      maxFat: 16,
      weight: "medium",
    },
    lunch: {
      mealType: "lunch",
      kcalPercent: 0.39,
      cookedProteinTarget: 95,
      cookedCarbTarget: 95,
      maxFat: 14,
      weight: "heavy",
    },
    dinner: {
      mealType: "dinner",
      kcalPercent: 0.36,
      cookedProteinTarget: 90,
      cookedCarbTarget: 85,
      maxFat: 14,
      weight: "heavy",
    },
  },

  keto: {
    planId: "keto",
    kcal: 1900,
    breakfast: {
      mealType: "breakfast",
      kcalPercent: 0.3,
      cookedProteinTarget: 55,
      cookedCarbTarget: 10,
      maxFat: 35,
      weight: "medium",
    },
    lunch: {
      mealType: "lunch",
      kcalPercent: 0.36,
      cookedProteinTarget: 80,
      cookedCarbTarget: 10,
      maxFat: 35,
      weight: "heavy",
    },
    dinner: {
      mealType: "dinner",
      kcalPercent: 0.34,
      cookedProteinTarget: 75,
      cookedCarbTarget: 8,
      maxFat: 35,
      weight: "medium",
    },
  },

  diabetic: {
    planId: "diabetic",
    kcal: 1800,
    breakfast: {
      mealType: "breakfast",
      kcalPercent: 0.24,
      cookedProteinTarget: 45,
      cookedCarbTarget: 35,
      maxFat: 12,
      weight: "light",
    },
    lunch: {
      mealType: "lunch",
      kcalPercent: 0.39,
      cookedProteinTarget: 80,
      cookedCarbTarget: 55,
      maxFat: 10,
      weight: "heavy",
    },
    dinner: {
      mealType: "dinner",
      kcalPercent: 0.37,
      cookedProteinTarget: 75,
      cookedCarbTarget: 45,
      maxFat: 10,
      weight: "medium",
    },
  },

  vegan: {
    planId: "vegan",
    kcal: 1900,
    breakfast: {
      mealType: "breakfast",
      kcalPercent: 0.26,
      cookedProteinTarget: 35,
      cookedCarbTarget: 55,
      maxFat: 15,
      weight: "medium",
    },
    lunch: {
      mealType: "lunch",
      kcalPercent: 0.38,
      cookedProteinTarget: 55,
      cookedCarbTarget: 75,
      maxFat: 14,
      weight: "heavy",
    },
    dinner: {
      mealType: "dinner",
      kcalPercent: 0.36,
      cookedProteinTarget: 50,
      cookedCarbTarget: 65,
      maxFat: 14,
      weight: "medium",
    },
  },

  gf_df: {
    planId: "gf_df",
    kcal: 2000,
    breakfast: {
      mealType: "breakfast",
      kcalPercent: 0.25,
      cookedProteinTarget: 50,
      cookedCarbTarget: 45,
      maxFat: 14,
      weight: "medium",
    },
    lunch: {
      mealType: "lunch",
      kcalPercent: 0.38,
      cookedProteinTarget: 85,
      cookedCarbTarget: 70,
      maxFat: 12,
      weight: "heavy",
    },
    dinner: {
      mealType: "dinner",
      kcalPercent: 0.37,
      cookedProteinTarget: 80,
      cookedCarbTarget: 65,
      maxFat: 12,
      weight: "medium",
    },
  },

  carnivore: {
    planId: "carnivore",
    kcal: 2100,
    breakfast: {
      mealType: "breakfast",
      kcalPercent: 0.3,
      cookedProteinTarget: 70,
      cookedCarbTarget: 0,
      maxFat: 35,
      weight: "heavy",
    },
    lunch: {
      mealType: "lunch",
      kcalPercent: 0.36,
      cookedProteinTarget: 95,
      cookedCarbTarget: 0,
      maxFat: 35,
      weight: "heavy",
    },
    dinner: {
      mealType: "dinner",
      kcalPercent: 0.34,
      cookedProteinTarget: 90,
      cookedCarbTarget: 0,
      maxFat: 35,
      weight: "heavy",
    },
  },
}

export const G7_BREAKFAST_ROTATION: Record<number, G7ProteinCore> = {
  1: "eggs",
  2: "oats",
  3: "eggs",
  4: "protein_shake",
  5: "eggs",
  6: "oats",
  7: "eggs",
}

export const G7_SAVORY_WEEK_ROTATION = [
  {
    day: 1,
    lunchProtein: "chicken",
    lunchCarb: "rice",
    dinnerProtein: "lean_beef",
    dinnerCarb: "rice",
    note: "Classic launch day: familiar, high compliance.",
  },
  {
    day: 2,
    lunchProtein: "chicken",
    lunchCarb: "pasta",
    dinnerProtein: "lean_beef",
    dinnerCarb: "pasta",
    note: "Pasta day: comfort but controlled fat.",
  },
  {
    day: 3,
    lunchProtein: "chicken",
    lunchCarb: "whole_wheat_bread",
    dinnerProtein: "lean_beef",
    dinnerCarb: "whole_wheat_bread",
    note: "Street-food illusion day: quesadilla + hawawshi.",
  },
  {
    day: 4,
    lunchProtein: "chicken",
    lunchCarb: "pasta",
    dinnerProtein: "lean_beef",
    dinnerCarb: "rice",
    note: "Mixed carb day: pink pasta + beef stir fry.",
  },
  {
    day: 5,
    lunchProtein: "chicken",
    lunchCarb: "burger_bun",
    dinnerProtein: "lean_beef",
    dinnerCarb: "rice",
    note: "Craving-control day: burger + kofta bowl.",
  },
  {
    day: 6,
    lunchProtein: "chicken",
    lunchCarb: "sweet_potato",
    dinnerProtein: "lean_beef",
    dinnerCarb: "whole_wheat_bread",
    note: "Fajita + quesadilla day.",
  },
  {
    day: 7,
    lunchProtein: "tuna",
    lunchCarb: "rice",
    dinnerProtein: "fish",
    dinnerCarb: "potato",
    note: "Light finish day with tuna/fish rotation.",
  },
] as const

export function getPlanDistribution(planId: G7PlanId) {
  return G7_PLAN_DISTRIBUTIONS[planId]
}

export function getMealSlotTarget(planId: G7PlanId, mealType: G7MealType) {
  const distribution = getPlanDistribution(planId)
  return distribution[mealType]
}

export function getTargetCalories(planId: G7PlanId, mealType: G7MealType) {
  const distribution = getPlanDistribution(planId)
  const slot = getMealSlotTarget(planId, mealType)

  return Math.round(distribution.kcal * slot.kcalPercent)
}

export function getBreakfastCoreForDay(day: number) {
  return G7_BREAKFAST_ROTATION[day]
}

export function getSavoryRotationForDay(day: number) {
  return G7_SAVORY_WEEK_ROTATION.find((item) => item.day === day)
}