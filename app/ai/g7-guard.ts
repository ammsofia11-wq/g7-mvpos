import { G7Plan } from "./g7-plans"

// 🧠 All valid plans registry
const VALID_PLANS: G7Plan[] = [
  "fat_loss",
  "keto",
  "diabetic",
  "athlete",
  "vegan",
  "gf_df",
  "carnivore"
]

// 🔍 Validate plan input
export function validatePlan(input: any): G7Plan {
  if (typeof input !== "string") {
    return "fat_loss"
  }

  if (VALID_PLANS.includes(input as G7Plan)) {
    return input as G7Plan
  }

  return "fat_loss"
}

// 🧠 Safe memory validator
export function validateMemory(memory: any) {
  return {
    plan: validatePlan(memory?.plan),
    lastDish: typeof memory?.lastDish === "string" ? memory.lastDish : null,
    flavorProfile: memory?.flavorProfile || {}
  }
}