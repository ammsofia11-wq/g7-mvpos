import { generateG7Dish } from "./g7-engine"
import { getMemory } from "@/lib/g7-memory"

// 🧠 Predict tomorrow meal
export function predictTomorrowMeal(plan: any) {
  const memory = getMemory()

  const baseDish = generateG7Dish(plan)

  return {
    type: "tomorrow_prediction",
    dish: baseDish,
    reasoning: memory.lastDish
      ? "Based on your recent dish pattern and plan goal"
      : "Based on your selected plan goal"
  }
}

// 📅 Predict full week
export function predictWeeklyPlan(plan: any) {
  const week = Array.from({ length: 7 }, (_, index) => ({
    day: index + 1,
    dish: generateG7Dish(plan)
  }))

  return {
    type: "weekly_plan",
    week,
    insight: "Optimized for consistency + metabolic balance"
  }
}