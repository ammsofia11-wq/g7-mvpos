import { G7Plan } from "./g7-plans"
import { G7Flavor, generateG7Meal } from "./g7-meal-engine"

export type G7WeeklyDay = {
  day: number
  title: string
  plan: G7Plan
  flavor: G7Flavor
  mealName: string
  calories: number
  protein: number
  carbs: number
  fat: number
  kitchenMode: string
  prepFocus: string
}

export type G7WeeklySystem = {
  title: string
  targetPlan: G7Plan
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  averageCalories: number
  shoppingList: string[]
  batchPrepCalendar: string[]
  productionNotes: string[]
  days: G7WeeklyDay[]
}

const WEEKLY_FLAVOR_ROTATION: G7Flavor[] = [
  "Chef Signature",
  "Mediterranean",
  "Asian Fusion",
  "Mexican",
  "Middle Eastern",
  "Italian",
  "American",
]

const DAY_TITLES = [
  "Reset & Structure",
  "Flavor Adaptation",
  "Energy Control",
  "Satiety Build",
  "Performance Stability",
  "Comfort Execution",
  "Repeat & Review",
]

const PREP_FOCUS = [
  "Base prep and portion control",
  "Fresh garnish and sauce control",
  "Protein batch execution",
  "Carb or low-carb base consistency",
  "Midweek storage and reheating",
  "Comfort meal assembly",
  "Review, repeat, and simplify",
]

function cleanIngredientName(value: string) {
  return value.split("—")[0]?.trim() || value
}

function uniqueList(items: string[]) {
  return Array.from(new Set(items))
}

export function generateG7WeeklySystem(plan: G7Plan): G7WeeklySystem {
  const days: G7WeeklyDay[] = WEEKLY_FLAVOR_ROTATION.map((flavor, index) => {
    const meal = generateG7Meal(plan, flavor)

    return {
      day: index + 1,
      title: DAY_TITLES[index],
      plan,
      flavor,
      mealName: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      kitchenMode: meal.kitchenOS.productionMode,
      prepFocus: PREP_FOCUS[index],
    }
  })

  const meals = WEEKLY_FLAVOR_ROTATION.map((flavor) =>
    generateG7Meal(plan, flavor)
  )

  const shoppingList = uniqueList(
    meals.flatMap((meal) => meal.ingredients.map(cleanIngredientName))
  )

  const totalCalories = days.reduce((sum, day) => sum + day.calories, 0)
  const totalProtein = days.reduce((sum, day) => sum + day.protein, 0)
  const totalCarbs = days.reduce((sum, day) => sum + day.carbs, 0)
  const totalFat = days.reduce((sum, day) => sum + day.fat, 0)

  return {
    title: `7-Day G7 ${plan.replace("_", " ").toUpperCase()} System`,
    targetPlan: plan,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    averageCalories: Math.round(totalCalories / 7),
    shoppingList,
    batchPrepCalendar: [
      "Day 0: Batch proteins, cook base carbs or low-carb bases, portion sauces.",
      "Day 1–3: Use first production cycle with fresh garnish and controlled reheating.",
      "Day 4: Refresh vegetables, sauces, herbs, and high-risk fresh items.",
      "Day 5–7: Use second production cycle and simplify repeat meals.",
    ],
    productionNotes: [
      "Keep sauces packed separately to protect texture and macro accuracy.",
      "Label each meal by day, system, flavor, and reheating method.",
      "Use batch prep for proteins and bases, then finish fresh elements daily.",
      "Review repeatability after 7 days and keep the strongest flavor systems.",
    ],
    days,
  }
}