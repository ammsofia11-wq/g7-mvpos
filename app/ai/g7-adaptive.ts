import { getMemory, saveMemory } from "@/lib/g7-memory"
import { generateG7Dish } from "./g7-engine"
import { G7Plan } from "./g7-plans"

// ================= TYPES =================

type FlavorProfile = {
  spicy?: number
  sweet?: number
  savory?: number
}

// ================= ANALYSIS ENGINE =================

function analyzeUser() {
  const memory = getMemory() as any

  const flavor: FlavorProfile = memory.flavorProfile || {}

  const total =
    (flavor.spicy || 0) +
    (flavor.sweet || 0) +
    (flavor.savory || 0)

  const dominant = Object.entries(flavor).sort(
    (a, b) => (b[1] as number) - (a[1] as number)
  )[0]?.[0] as string | undefined

  return {
    dominantFlavor: dominant,
    totalInteractions: total,
    mood: memory.mood ?? "normal"
  }
}

// ================= ADAPTIVE ENGINE =================

export function generateAdaptiveDish(plan: G7Plan) {
  const analysis = analyzeUser()

  let dish = generateG7Dish(plan)

  // 🧠 create immutable copy (FIX 1)
  let adaptiveDish = { ...dish }

  // 🔴 RULE 1: mood adaptation
  if (analysis.mood === "low") {
    adaptiveDish = {
      ...adaptiveDish,
      name: "Comfort " + adaptiveDish.name
    }
  }

  // 🟡 RULE 2: repetition boost
  if (analysis.totalInteractions > 5) {
    adaptiveDish = {
      ...adaptiveDish,
      name: "Variety Boost " + adaptiveDish.name
    }
  }

  // 🟢 RULE 3: flavor reinforcement
  if (analysis.dominantFlavor) {
    adaptiveDish = {
      ...adaptiveDish,
      name: `${analysis.dominantFlavor.toUpperCase()} ${adaptiveDish.name}`
    }
  }

  // 🧠 SAFE MEMORY UPDATE (FIX 2)
  const memory = getMemory() as any

  saveMemory(
    memory.planHistory?.slice(-1)[0] || "fat_loss"
  )

  return adaptiveDish
}