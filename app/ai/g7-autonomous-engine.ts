import { generateG7Dish } from "./g7-engine"
import { G7Plan } from "./g7-plans"

type AutonomousOutput = {
  meal: ReturnType<typeof generateG7Dish>
  meta: {
    plan: G7Plan
    status: "success"
  }
}

// ================= AUTONOMOUS SYSTEM =================

export function runAutonomousSystem(plan: G7Plan): AutonomousOutput {
  // 🧠 Safety: ensure plan exists
  if (!plan) {
    throw new Error("Invalid plan provided to autonomous system")
  }

  const meal = generateG7Dish(plan)

  return {
    meal,
    meta: {
      plan,
      status: "success"
    }
  }
}