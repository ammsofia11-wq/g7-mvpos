import { G7Plan } from "@/app/ai/g7-plans"

// ================= TYPES =================

type EvolutionState = {
  planStability: Partial<Record<G7Plan, number>>
  lastPlan?: G7Plan
  adaptationScore: number
}

type Memory = {
  plan?: G7Plan
  lastPlan?: G7Plan
  lastDish?: string
  planHistory?: G7Plan[]
  fatigueMode?: boolean
  evolution?: EvolutionState
}

// ================= KEY =================

const KEY = "g7_memory"

// ================= CORE =================

export function getMemory(): Memory {
  if (typeof window === "undefined") return {}

  const data = localStorage.getItem(KEY)
  if (!data) return {}

  try {
    return JSON.parse(data) as Memory
  } catch {
    return {}
  }
}

export function saveMemory(data: Partial<Memory>) {
  if (typeof window === "undefined") return

  const current = getMemory()

  const updated: Memory = {
    ...current,
    ...data
  }

  localStorage.setItem(KEY, JSON.stringify(updated))
}

export function pushPlan(plan: G7Plan) {
  const memory = getMemory()
  const history = memory.planHistory || []
  const updated = [...history, plan].slice(-20)

  saveMemory({
    planHistory: updated,
    lastPlan: plan
  })
}

export function clearMemory() {
  if (typeof window === "undefined") return
  localStorage.removeItem(KEY)
}