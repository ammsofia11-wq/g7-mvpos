import { getMemory, saveMemory } from "@/lib/g7-memory"
import { G7Plan } from "./g7-plans"

// ================= TYPES =================

type EvolutionState = {
  planStability: Partial<Record<G7Plan, number>>
  lastPlan?: G7Plan
  adaptationScore: number
}

// ================= INIT =================

function getState(): EvolutionState {
  const memory = getMemory()

  return memory.evolution || {
    planStability: {},
    adaptationScore: 0
  }
}

// ================= CORE EVOLUTION =================

// 🧠 Learn system behavior
export function evolveSystem(plan: G7Plan) {
  const state = getState()

  // 🔥 init safe increment
  state.planStability[plan] =
    (state.planStability[plan] || 0) + 1

  state.adaptationScore += 1

  // 🔥 detect fatigue correctly
  const maxStable = Math.max(
    ...Object.values(state.planStability).map(v => v || 0)
  )

  const fatigue = maxStable > 5

  // 🧠 SAFE MERGE SAVE (NOT overwrite)
  saveMemory({
    evolution: {
      ...state,
      lastPlan: plan
    },
    lastPlan: plan,
    fatigueMode: fatigue
  })

  return {
    stability: state.planStability,
    adaptationScore: state.adaptationScore,
    fatigue
  }
}

// 🧠 Auto adaptation engine
export function autoAdaptPlan(currentPlan: G7Plan): G7Plan {
  const state = getState()

  const count = state.planStability[currentPlan] || 0
  const fatigue = count > 4

  if (fatigue) {
    const fallback: G7Plan =
      currentPlan === "keto"
        ? "vegan"
        : currentPlan === "vegan"
        ? "fat_loss"
        : "keto"

    return fallback
  }

  return currentPlan
}