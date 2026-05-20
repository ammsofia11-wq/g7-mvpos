import { G7Plan } from "./g7-plans"
import { generateG7Dish } from "./g7-engine"

// 🍽️ Predict next meal (FIXED)
export function predictNextMeal(plan: G7Plan) {
  const dish = generateG7Dish(plan)

  return {
    prediction: {
      nextPlan: plan,
      confidence: 1,
      reason: "User selected plan"
    },
    dish
  }
}

// 📅 Predict full week (FIXED)
export function predictWeeklyPlan(plan: G7Plan) {
  const week = []

  for (let i = 0; i < 7; i++) {
    week.push({
      day: i + 1,
      dish: generateG7Dish(plan)
    })
  }

  return {
    prediction: {
      nextPlan: plan,
      confidence: 1,
      reason: "User selected plan"
    },
    week
  }
}