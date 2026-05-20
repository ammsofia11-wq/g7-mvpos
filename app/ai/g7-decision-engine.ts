import { G7Plan } from "./g7-plans"
import { generateG7Dish } from "./g7-engine"
import { getMemory } from "@/lib/g7-memory"

// 🧠 Fake user signals (later replace with real analytics)
type UserState = {
  mood?: "low" | "normal" | "high"
  activityLevel?: "low" | "medium" | "high"
  lastPlan?: G7Plan
}

// 🔍 Build user state from memory
export function getUserState(): UserState {
  const memory = getMemory() as any

  return {
    mood: memory.mood ?? "normal",
    activityLevel: "medium",
    lastPlan: memory.planHistory?.slice(-1)[0] as G7Plan
  }
}

// 🧠 Decision Engine Core
export function decidePlan(state: UserState): G7Plan {
  const { mood, activityLevel, lastPlan } = state

  // 🔥 RULE 1
  if (mood === "low") {
    return "fat_loss"
  }

  // ⚡ RULE 2
  if (activityLevel === "high") {
    return "athlete"
  }

  // 🥑 RULE 3
  if (lastPlan) {
    return lastPlan
  }

  return "fat_loss"
}

// 🍽️ FINAL AI OUTPUT
export function generateSmartMeal() {
  const state = getUserState()
  const plan = decidePlan(state)

  const dish = generateG7Dish(plan)

  return {
    plan,
    dish,
    reason: "AI Decision Engine optimized your nutrition based on current state"
  }
}