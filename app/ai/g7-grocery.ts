import type { WeeklyPlan } from "./g7-types"

// ================= TYPES =================

type GroceryItem = {
  name: string
  totalGrams: number
  estimatedCost: number
}

// ================= ENGINE =================

export function generateGroceryList(weekly: WeeklyPlan) {

  const map: Record<string, GroceryItem> = {}

  for (const day of weekly.days) {

    for (const ing of day.dish.ingredients) {

      if (!map[ing.name]) {
        map[ing.name] = {
          name: ing.name,
          totalGrams: 0,
          estimatedCost: 0
        }
      }

      map[ing.name].totalGrams += ing.grams
      map[ing.name].estimatedCost += ing.cost
    }
  }

  const list = Object.values(map)

  const totalCost = list.reduce((sum, i) => sum + i.estimatedCost, 0)

  return {
    items: list,
    totalCost: Math.round(totalCost * 100) / 100
  }
}