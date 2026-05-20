import { G7Plan } from "./g7-plans"

// ================= TYPES =================

type Behavior = {
  planHistory: G7Plan[]
}

// ================= MEMORY =================

// 🧠 مؤقتًا (in-memory fallback)
let memory: Behavior = {
  planHistory: []
}

// ================= CORE =================

// 🔍 قراءة السلوك
export function getBehavior(): Behavior {
  return memory
}

// 🧠 تسجيل اختيار جديد
export function learn(plan: G7Plan) {
  memory.planHistory = [...memory.planHistory, plan].slice(-10)
}

// 🧠 معرفة أكثر Plan مستخدم
export function getDominantPlan(): G7Plan | null {
  if (memory.planHistory.length === 0) return null

  const counts: Record<string, number> = {}

  for (const p of memory.planHistory) {
    counts[p] = (counts[p] || 0) + 1
  }

  let best: G7Plan | null = null
  let max = 0

  for (const key in counts) {
    if (counts[key] > max) {
      max = counts[key]
      best = key as G7Plan
    }
  }

  return best
}